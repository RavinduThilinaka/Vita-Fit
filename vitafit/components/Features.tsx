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

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5, duration: 1 } }
              }}
              className="bg-foreground/5 p-8 rounded-3xl border border-foreground/10 hover:border-primary/50 transition-colors group relative overflow-hidden flex flex-col items-center text-center transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.2)]"
            >
              {/* Animated glowing background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-8 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 relative z-10 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
