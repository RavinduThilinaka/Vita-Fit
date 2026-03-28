#!/usr/bin/env python3
"""
VitaFit Microservices - Run All Services
This script starts all microservices in separate processes
"""

import subprocess
import os
import sys
import time
import signal
import atexit
from pathlib import Path

# Configuration
SERVICES = {
    'user': {
        'port': 8001,
        'path': 'user_service',
        'command': 'python manage.py runserver 8001'
    },
    'workout': {
        'port': 8002,
        'path': 'workout_service',
        'command': 'python manage.py runserver 8002'
    },
    'diet': {
        'port': 8003,
        'path': 'diet_service',
        'command': 'python manage.py runserver 8003'
    },
    'progress': {
        'port': 8004,
        'path': 'progress_service',
        'command': 'python manage.py runserver 8004'
    },
    'nutrition': {
        'port': 8005,
        'path': 'nutrition_service',
        'command': 'python manage.py runserver 8005'
    },
    'notification': {
        'port': 8006,
        'path': 'notification_service',
        'command': 'python manage.py runserver 8006'
    },
    'tips': {
        'port': 8007,
        'path': 'tips_service',
        'command': 'python manage.py runserver 8007'
    }
}

# Store processes
processes = []

def print_banner():
    """Print welcome banner"""
    banner = """
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║     🏋️  VITAFIT MICROSERVICES - ALL SERVICES RUNNER  🏃     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    """
    print(banner)

def print_service_info():
    """Print service information"""
    print("\n📡 SERVICES & PORTS:")
    print("-" * 50)
    for name, config in SERVICES.items():
        print(f"   {name.capitalize():12} → http://localhost:{config['port']}")
    print("-" * 50)
    print("\n🌐 API GATEWAY (NGINX): http://localhost:8000")
    print("\n📚 SWAGGER DOCS:")
    for name in SERVICES.keys():
        print(f"   {name.capitalize():12} → http://localhost:8000/docs/{name}/")
    print("\n" + "=" * 50 + "\n")

def start_service(name, config):
    """Start a single service"""
    service_path = Path(__file__).parent / config['path']
    
    if not service_path.exists():
        print(f"❌ Service path not found: {service_path}")
        return None
    
    # Activate virtual environment and run
    venv_python = service_path / 'venv' / 'bin' / 'python'
    
    if not venv_python.exists():
        print(f"⚠️  Virtual environment not found for {name}, using system python")
        python_cmd = 'python'
    else:
        python_cmd = str(venv_python)
    
    cmd = f"cd {service_path} && {python_cmd} manage.py runserver {config['port']}"
    
    try:
        process = subprocess.Popen(
            cmd,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=1
        )
        print(f"✅ {name.capitalize():12} started on port {config['port']}")
        return process
    except Exception as e:
        print(f"❌ Failed to start {name}: {e}")
        return None

def start_all_services():
    """Start all services"""
    print("🚀 Starting all services...\n")
    
    for name, config in SERVICES.items():
        process = start_service(name, config)
        if process:
            processes.append((name, process))
        time.sleep(1)  # Small delay between starts
    
    print("\n" + "=" * 50)
    print(f"✅ Started {len(processes)}/{len(SERVICES)} services")
    print("=" * 50 + "\n")

def stop_all_services():
    """Stop all services"""
    print("\n🛑 Stopping all services...")
    for name, process in processes:
        try:
            process.terminate()
            process.wait(timeout=5)
            print(f"✅ {name.capitalize():12} stopped")
        except:
            try:
                process.kill()
                print(f"⚠️  {name.capitalize():12} force killed")
            except:
                print(f"❌ {name.capitalize():12} could not be stopped")
    
    print("\n✅ All services stopped!")

def monitor_output():
    """Monitor output from all processes"""
    import threading
    
    def read_output(name, process):
        for line in iter(process.stdout.readline, ''):
            if line:
                print(f"[{name:12}] {line.rstrip()}")
        for line in iter(process.stderr.readline, ''):
            if line:
                print(f"[{name:12}] ERROR: {line.rstrip()}")
    
    threads = []
    for name, process in processes:
        thread = threading.Thread(target=read_output, args=(name, process))
        thread.daemon = True
        thread.start()
        threads.append(thread)
    
    return threads

def check_services():
    """Check if services are running"""
    import requests
    
    print("\n🔍 Checking service health...\n")
    
    all_ok = True
    for name, config in SERVICES.items():
        url = f"http://localhost:{config['port']}"
        try:
            response = requests.get(f"{url}/api/", timeout=2)
            if response.status_code < 500:
                print(f"✅ {name.capitalize():12} → OK (Status: {response.status_code})")
            else:
                print(f"⚠️  {name.capitalize():12} → Error (Status: {response.status_code})")
                all_ok = False
        except requests.exceptions.ConnectionError:
            print(f"❌ {name.capitalize():12} → Not running")
            all_ok = False
        except Exception as e:
            print(f"❌ {name.capitalize():12} → Error: {e}")
            all_ok = False
    
    return all_ok

def interactive_mode():
    """Interactive mode for commands"""
    print("\n" + "=" * 50)
    print("Commands:")
    print("  h  - Show this help")
    print("  s  - Show service status")
    print("  r  - Restart all services")
    print("  l  - Show logs")
    print("  q  - Quit and stop all services")
    print("=" * 50)
    
    while True:
        try:
            cmd = input("\n> ").strip().lower()
            
            if cmd == 'q':
                break
            elif cmd == 's':
                check_services()
            elif cmd == 'r':
                print("Restarting all services...")
                stop_all_services()
                processes.clear()
                start_all_services()
                monitor_output()
            elif cmd == 'l':
                print("Logs are being displayed in real-time...")
            elif cmd == 'h':
                print("Commands: h=help, s=status, r=restart, l=logs, q=quit")
            else:
                print(f"Unknown command: {cmd}")
                
        except KeyboardInterrupt:
            break
        except EOFError:
            break

def main():
    """Main function"""
    # Change to the script directory
    os.chdir(Path(__file__).parent)
    
    # Print banner
    print_banner()
    print_service_info()
    
    # Start all services
    start_all_services()
    
    # Check if any services started
    if not processes:
        print("❌ No services could be started!")
        sys.exit(1)
    
    # Register cleanup on exit
    atexit.register(stop_all_services)
    signal.signal(signal.SIGINT, lambda sig, frame: sys.exit(0))
    signal.signal(signal.SIGTERM, lambda sig, frame: sys.exit(0))
    
    # Monitor output in background
    threads = monitor_output()
    
    # Check service health
    time.sleep(5)
    check_services()
    
    # Print access URLs
    print("\n" + "=" * 50)
    print("🌐 ACCESS URLs:")
    print("-" * 50)
    for name, config in SERVICES.items():
        print(f"   {name.capitalize():12} → http://localhost:{config['port']}/api/")
    print("-" * 50)
    print("\n💡 Press Ctrl+C to stop all services")
    print("=" * 50 + "\n")
    
    # Interactive mode
    try:
        interactive_mode()
    except KeyboardInterrupt:
        pass
    finally:
        stop_all_services()

if __name__ == '__main__':
    main()