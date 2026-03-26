"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Users } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Certified Trainers",
      description: "Our certified trainers provide personalized fitness plans and expert guidance for every member."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: "Top-Tier Equipment",
      description: "Experience world-class workout space with state-of-the-art equipment designed for all fitness levels."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      title: "Flexible Memberships",
      description: "Affordable and flexible plans tailored to suit your lifestyle and fitness goals."
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Why joining <span className="text-primary">VITA-FIT</span><br />can be a gamechanger?
          </motion.h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            We offer more than just a place to workout. We offer a supportive community to help you achieve your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-foreground/5 p-8 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-colors group relative overflow-hidden flex flex-col items-center text-center scale-100 hover:scale-[1.02]"
            >
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
