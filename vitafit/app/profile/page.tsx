"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Settings, Activity, Award, Flame, Dumbbell, Calendar, 
  MapPin, Edit3, CheckCircle2 
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsEditing(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Profile Header Background */}
      <div className="pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background z-0" />
        <img 
          src="https://cdn.pixabay.com/photo/2016/11/22/22/25/abs-1850926_1280.jpg" 
          alt="Profile Cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-0" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-32 pb-24">
        
        {/* Top Section: Avatar & Abstract */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-foreground/5 border border-foreground/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl mb-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden relative shadow-xl">
                <img 
                  src="https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_1280.jpg" 
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:scale-110 transition-transform shadow-lg cursor-pointer">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left mb-2">
              <h1 className="text-3xl font-black text-white flex items-center justify-center md:justify-start gap-3">
                Alex Mercer 
                <Award className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />
              </h1>
              <p className="text-gray-400 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                <MapPin className="w-4 h-4" /> Colombo, Sri Lanka
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                <CheckCircle2 className="w-3 h-3" /> Elite Member Since 2024
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-xl font-bold bg-foreground/10 hover:bg-foreground/20 text-white transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" /> Settings
            </button>
            <button className="px-6 py-3 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] shadow-primary/30 flex items-center gap-2">
              Upgrade Plan
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { label: "Current Weight", value: "78.5 kg", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Workouts", value: "142", icon: Dumbbell, color: "text-primary", bg: "bg-primary/10" },
            { label: "Active Streak", value: "12 Days", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
            { label: "Calories/Week", value: "4,250", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.1) }}
              className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-foreground/10 transition-colors cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-black text-white">{stat.value}</h3>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Personal Information Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-foreground/5 border border-foreground/10 rounded-3xl p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <User className="text-primary w-6 h-6" /> Personal Details
              </h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
              >
                {isEditing ? "Cancel" : "Edit Details"}
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Alex Mercer"
                    disabled={!isEditing}
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Email</label>
                  <input 
                    type="email" 
                    defaultValue="alex.mercer@example.com"
                    disabled={!isEditing}
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Phone Number</label>
                  <input 
                    type="tel" 
                    defaultValue="+94 77 123 4567"
                    disabled={!isEditing}
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Date of Birth</label>
                  <input 
                    type="date" 
                    defaultValue="1992-08-15"
                    disabled={!isEditing}
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                  />
                </div>
              </div>

              {isEditing && (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  type="submit" 
                  disabled={isSaved}
                  className={`mt-4 px-8 py-3 rounded-xl font-bold transition-all text-white ${
                    isSaved 
                    ? "bg-emerald-500 cursor-not-allowed" 
                    : "bg-primary shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-105"
                  }`}
                >
                  {isSaved ? "Saved! ✓" : "Save Changes"}
                </motion.button>
              )}
            </form>
          </motion.div>

          {/* Right Column: Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-foreground/5 border border-foreground/10 rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
              <Calendar className="text-primary w-6 h-6" /> Recent Activity
            </h2>

            <div className="space-y-6">
              {[
                { title: "Completed Powerlifting", time: "Today, 8:00 AM", type: "workout", icon: Dumbbell, color: "text-primary" },
                { title: "Logged Nutrition", time: "Yesterday, 9:30 PM", type: "nutrition", icon: Activity, color: "text-blue-500" },
                { title: "Hit 10k Steps", time: "Mon, 6:00 PM", type: "goal", icon: Flame, color: "text-orange-500" },
                { title: "Updated Diet Plan", time: "Sun, 10:00 AM", type: "diet", icon: Edit3, color: "text-emerald-500" },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 3 && <div className="absolute left-[1.15rem] top-8 bottom-[-1.5rem] w-px bg-foreground/10" />}
                  <div className={`w-9 h-9 rounded-full bg-background border border-foreground/10 flex items-center justify-center relative z-10 shrink-0 ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{activity.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 text-sm font-bold text-gray-400 hover:text-white bg-foreground/5 hover:bg-foreground/10 rounded-xl transition-colors">
              View All History
            </button>
          </motion.div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
