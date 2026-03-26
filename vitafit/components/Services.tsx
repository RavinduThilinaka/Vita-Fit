"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Dumbbell, 
  Utensils, 
  Activity, 
  Beaker, 
  Bell, 
  Lightbulb,
  ArrowRight
} from "lucide-react";

const services = [
  {
    title: "Workout Builder",
    description: "Design and log your custom workout routines with difficulty tracking.",
    icon: Dumbbell,
    href: "/workout-service",
    color: "from-rose-500 to-red-600",
    bgLight: "bg-red-500/10",
    iconColor: "text-red-500"
  },
  {
    title: "Diet Planner",
    description: "Create structured meal plans to hit your exact macronutrient goals.",
    icon: Utensils,
    href: "/diet-plan",
    color: "from-emerald-400 to-green-600",
    bgLight: "bg-emerald-500/10",
    iconColor: "text-emerald-500"
  },
  {
    title: "Progress Tracking",
    description: "Log your weight, BMI, and calories burned to visualize your growth.",
    icon: Activity,
    href: "/progress-tracking",
    color: "from-cyan-400 to-blue-600",
    bgLight: "bg-cyan-500/10",
    iconColor: "text-cyan-500"
  },
  {
    title: "Nutrition Service",
    description: "Monitor supplement dosages and vitamin intakes accurately over time.",
    icon: Beaker,
    href: "/nutrition-service",
    color: "from-purple-500 to-fuchsia-600",
    bgLight: "bg-purple-500/10",
    iconColor: "text-purple-500"
  },
  {
    title: "Notification Center",
    description: "Set custom alarms and reminders for hydration, prep, and workouts.",
    icon: Bell,
    href: "/notification-service",
    color: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-500/10",
    iconColor: "text-amber-500"
  },
  {
    title: "Tips & Advice",
    description: "Access and share expert fitness, flexibility, and cardio advice with others.",
    icon: Lightbulb,
    href: "/tips-advice",
    color: "from-sky-400 to-indigo-500",
    bgLight: "bg-sky-500/10",
    iconColor: "text-sky-500"
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="services">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-4"
          >
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">SERVICES</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg"
          >
            A complete ecosystem of digital fitness tools designed to track, optimize, and elevate your true fitness journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={service.title} href={service.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-full bg-foreground/5 border border-foreground/10 rounded-3xl p-8 hover:bg-foreground/10 transition-colors duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl"
              >
                {/* Hover gradient line at top */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                
                <div className={`w-14 h-14 rounded-2xl ${service.bgLight} flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-sm`}>
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-wide">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  Open Tool <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
