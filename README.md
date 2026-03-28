# 🏋️ Vitafit Microservices Architecture

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-4.2-green.svg)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/DRF-3.14-red.svg)](https://www.django-rest-framework.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A complete microservices-based fitness application backend with 7 independent services.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture Diagram](#-architecture-diagram)
- [Folder Structure](#-folder-structure)
- [Services & Ports](#-services--ports)
- [Prerequisites](#-prerequisites)
- [Quick Start (5 Minutes)](#-quick-start-5-minutes)
- [Complete Installation](#-complete-installation)
- [Running Services](#-running-services)
- [API Endpoints](#-api-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Testing](#-testing)
- [API Gateway](#-api-gateway)
- [Docker Setup](#-docker-setup)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

Vitafit is a microservices-based fitness application backend with 7 independent services:

| Service | Purpose |
|---------|---------|
| User Service | Authentication, user management, token management |
| Workout Service | Workout plans, exercises, difficulty levels |
| Diet Service | Diet plans, meal types, nutritional info |
| Progress Service | Weight tracking, BMI calculation, progress history |
| Nutrition Service | Supplements, vitamins, dosage information |
| Notification Service | Reminders, alerts, scheduled notifications |
| Tips Service | Health tips, fitness advice |

**Key Features:**
- Independent services with separate databases
- Token-based authentication (django-knox)
- Centralized token validation through User Service
- API Gateway with NGINX
- Swagger documentation for each service
- Microservices communication via REST APIs

---

### Service Communication Flow

1. **Client** → **API Gateway (8000)**
2. **API Gateway** → **Service (8001-8007)**
3. **Service** → **User Service (/api/verify-token/)** for token validation
4. **User Service** → **Returns user data** if token valid

---

## 📁 Folder Structure

vitafit_microservices/
│
├── vitafit_services.py # One-click Python starter
│
├── api-gateway/
│ └── nginx.conf # NGINX gateway config
│
├── user-service/ # Port 8001
│ ├── manage.py
│ ├── requirements.txt
│ ├── db.sqlite3 # User database
│ ├── knox_db.sqlite3 # Token database
│ ├── venv/
│ ├── user_service/
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── wsgi.py
│ └── users/
│ ├── models.py
│ ├── views.py
│ ├── serializers.py
│ ├── urls.py
│ ├── backends.py
│ └── migrations/
│
├── workout-service/ # Port 8002
│ ├── manage.py
│ ├── requirements.txt
│ ├── workout_db.sqlite3
│ ├── venv/
│ ├── workout_service/
│ └── workouts/
│ ├── models.py
│ ├── views.py
│ ├── serializers.py
│ ├── urls.py
│ ├── authentication.py
│ └── migrations/
│
├── diet-service/ # Port 8003
│ ├── manage.py
│ ├── requirements.txt
│ ├── diet_db.sqlite3
│ ├── venv/
│ ├── diet_service/
│ └── diet_plans/
│ ├── models.py
│ ├── views.py
│ ├── serializers.py
│ ├── urls.py
│ ├── authentication.py
│ └── migrations/
│
├── progress-service/ # Port 8004
│ ├── manage.py
│ ├── requirements.txt
│ ├── progress_db.sqlite3
│ ├── venv/
│ ├── progress_service/
│ └── progresses/
│ ├── models.py
│ ├── views.py
│ ├── serializers.py
│ ├── urls.py
│ ├── authentication.py
│ └── migrations/
│
├── nutrition-service/ # Port 8005
│ ├── manage.py
│ ├── requirements.txt
│ ├── nutrition_db.sqlite3
│ ├── venv/
│ ├── nutrition_service/
│ └── supplements/
│ ├── models.py
│ ├── views.py
│ ├── serializers.py
│ ├── urls.py
│ ├── authentication.py
│ └── migrations/
│
├── notification-service/ # Port 8006
│ ├── manage.py
│ ├── requirements.txt
│ ├── notification_db.sqlite3
│ ├── venv/
│ ├── notification_service/
│ └── notifications/
│ ├── models.py
│ ├── views.py
│ ├── serializers.py
│ ├── urls.py
│ ├── authentication.py
│ └── migrations/
│
└── tips-service/ # Port 8007
├── manage.py
├── requirements.txt
├── tips_db.sqlite3
├── venv/
├── tips_service/
└── tips/
├── models.py
├── views.py
├── serializers.py
├── urls.py
├── authentication.py
└── migrations/

🏃‍♂️ Running Services

cd ~/vitafit_microservices
~/vitafit_microservices> python vitafit_services.py
