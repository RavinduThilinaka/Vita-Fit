"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

const branches = [
  {
    name: "Downtown Elite",
    address: "123 Commerce Way, City Center",
    phone: "+1 (555) 123-4567",
    hours: "24/7 Access",
    image: "https://cdn.pixabay.com/photo/2014/12/20/09/18/bodybuilding-574211_1280.jpg",
  },
  {
    name: "Westside Iron",
    address: "894 Iron Boulevard, Westend",
    phone: "+1 (555) 987-6543",
    hours: "Mon-Sun: 5AM - 11PM",
    image: "https://cdn.pixabay.com/photo/2016/09/27/18/43/gym-1699104_1280.jpg",
  },
  {
    name: "Uptown Wellness",
    address: "444 Serenity Lane, Uptown",
    phone: "+1 (555) 345-6789",
    hours: "Mon-Sun: 6AM - 10PM",
    image: "https://cdn.pixabay.com/photo/2018/04/05/17/21/weightlifting-3293457_1280.jpg",
  },
  {
    name: "South Bay Athletics",
    address: "77 Ocean Drive, South Bay",
    phone: "+1 (555) 222-3333",
    hours: "24/7 Access",
    image: "https://cdn.pixabay.com/photo/2021/01/04/06/20/man-5883500_1280.jpg",
  }
];

export default function Locations() {
  return (
    <section className="py-24 bg-background relative" id="locations">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-4"
          >
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">LOCATIONS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg"
          >
            Find a Vita-Fit branch near you and start your transformation journey today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-foreground/5 border border-foreground/10 rounded-3xl overflow-hidden hover:bg-foreground/10 transition-colors duration-300 relative flex flex-col p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{branch.name}</h3>
              
              <div className="space-y-4 flex-1">
                <p className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  {branch.address}
                </p>
                <p className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  {branch.phone}
                </p>
                <p className="flex items-start gap-3 text-sm text-gray-400">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  {branch.hours}
                </p>
              </div>
              
              <button className="w-full mt-8 flex items-center justify-center gap-2 bg-foreground/10 hover:bg-primary text-white py-4 rounded-xl font-bold transition-colors group/btn">
                <Navigation className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" /> Get Directions
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
