"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Memberships() {
  const plans = [
    {
      name: "Monthly",
      price: "15,000",
      features: ["Full gym access", "Free fitness assessment", "Locker access"],
      popular: false
    },
    {
      name: "Annual",
      price: "120,000",
      features: ["All Monthly features", "2 Free Personal Training Sessions", "Body composition analysis", "Access to all 24 locations"],
      popular: true
    }
  ];

  return (
    <section className="py-24 bg-foreground/5 relative" id="memberships">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Initiate Your <span className="text-primary">Journey</span>
          </motion.h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Unbeatable savings, personalized fitness, and pure excitement!
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
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
              }}
              className={`relative bg-background p-8 rounded-3xl border transition-all duration-500 overflow-hidden group hover:-translate-y-3 ${plan.popular ? 'border-primary shadow-[0_20px_40px_-15px_rgba(239,68,68,0.3)]' : 'border-foreground/10 hover:shadow-2xl hover:border-foreground/30'}`}
            >
              {/* Animated glowing background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${plan.popular ? 'opacity-50' : ''}`} />

              {plan.popular && (
                <div className="absolute top-0 right-8 bg-primary text-primary-foreground px-4 py-2 rounded-b-xl text-xs font-black tracking-widest shadow-lg shadow-primary/30 z-10">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4 relative z-10">{plan.name}</h3>
              <div className="mb-6 flex items-baseline text-5xl font-extrabold flex-wrap relative z-10">
                <span className="text-2xl font-medium text-gray-500 mr-2">Rs.</span>
                {plan.price}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/checkout?plan=${plan.name.toLowerCase()}`} className="w-full block">
                <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-[1.02]' : 'bg-foreground/5 hover:bg-foreground/10 text-foreground'}`}>
                  Choose {plan.name}
                </button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
