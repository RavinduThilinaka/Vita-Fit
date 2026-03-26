"use client";

import { motion } from "framer-motion";

const images = [
  "https://cdn.pixabay.com/photo/2017/04/27/08/29/man-2264825_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/22/22/25/abs-1850926_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/19/12/43/barbell-1839086_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/07/02/10/22/training-828726_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/03/27/07/08/man-1282232_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg",
];

export default function Gallery() {
  return (
    <section className="py-24 bg-background relative" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-4"
          >
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">FACILITIES</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg"
          >
            Take a look inside our state-of-the-art gyms equipped with everything you need to crush your fitness goals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((src, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl aspect-square md:aspect-[4/5] bg-foreground/5 shadow-lg"
            >
              <img 
                src={src} 
                alt={`Vita-Fit Facility ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Premium Zone
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
