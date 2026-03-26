"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, Settings, Activity, Award, Flame, Dumbbell, Calendar, 
  MapPin, Edit3, CheckCircle2, Mail, Phone, CalendarDays, Weight
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getCurrentUser, logout } from "@/app/login/actions";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    current_weight: "",
    gender: "",
    location: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push("/login");
          return;
        }
        setUser(currentUser);
        
        // Initialize form data with user info
        setFormData({
          first_name: currentUser.first_name || "",
          last_name: currentUser.last_name || "",
          email: currentUser.email || "",
          phone: currentUser.phone || "",
          date_of_birth: currentUser.date_of_birth || "",
          current_weight: currentUser.current_weight || "",
          gender: currentUser.gender || "",
          location: currentUser.location || "Colombo, Sri Lanka",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would typically make an API call to update user data
      // For now, we'll just simulate a save
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        setIsEditing(false);
      }, 2000);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const getInitials = () => {
    if (!user) return "?";
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (firstName) {
      return firstName[0].toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "?";
  };

  const getFullName = () => {
    if (!user) return "User";
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user.first_name) {
      return user.first_name;
    }
    return user.email?.split("@")[0] || "User";
  };

  const getMemberSince = () => {
    if (user?.date_joined) {
      const date = new Date(user.date_joined);
      return date.getFullYear();
    }
    return "2024";
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading profile...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null; // Will redirect to login in useEffect
  }

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
              <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden relative shadow-xl bg-gradient-to-r from-primary to-rose-500 flex items-center justify-center">
                {user.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {getInitials()}
                  </span>
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:scale-110 transition-transform shadow-lg cursor-pointer">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left mb-2">
              <h1 className="text-3xl font-black text-white flex items-center justify-center md:justify-start gap-3">
                {getFullName()}
                {user.role === "admin" && (
                  <Award className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />
                )}
                {user.role === "trainer" && (
                  <Award className="w-6 h-6 text-blue-500 fill-blue-500/20" />
                )}
              </h1>
              <p className="text-gray-400 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                <MapPin className="w-4 h-4" /> {formData.location || "Location not set"}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                <CheckCircle2 className="w-3 h-3" /> 
                {user.role === "admin" ? "Admin" : user.role === "trainer" ? "Trainer" : "Elite Member"} 
                Since {getMemberSince()}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => router.push("/settings")}
              className="px-6 py-3 rounded-xl font-bold bg-foreground/10 hover:bg-foreground/20 text-white transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" /> Settings
            </button>
            <button 
              onClick={() => router.push("/membership")}
              className="px-6 py-3 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] shadow-primary/30 flex items-center gap-2"
            >
              Upgrade Plan
            </button>
          </div>
        </motion.div>

        {/* Stats Grid - You can customize these based on real data */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { label: "Current Weight", value: formData.current_weight || "Not set", icon: Weight, color: "text-blue-500", bg: "bg-blue-500/10", suffix: " kg" },
            { label: "Workouts Completed", value: user.workout_count || "0", icon: Dumbbell, color: "text-primary", bg: "bg-primary/10" },
            { label: "Active Streak", value: user.active_streak || "0", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10", suffix: " Days" },
            { label: "Calories/Week", value: user.calories_weekly || "0", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
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
              <h3 className="text-2xl font-black text-white">{stat.value}{stat.suffix || ""}</h3>
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
                  <label className="text-sm font-bold text-gray-300">First Name</label>
                  <input 
                    type="text" 
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Last Name</label>
                  <input 
                    type="text" 
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={true} // Email shouldn't be editable typically
                      className="w-full bg-background border border-foreground/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="+94 XX XXX XXXX"
                      className="w-full bg-background border border-foreground/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Date of Birth</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="date" 
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-background border border-foreground/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Current Weight (kg)</label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="number" 
                      name="current_weight"
                      value={formData.current_weight}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      step="0.1"
                      className="w-full bg-background border border-foreground/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-background border border-foreground/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
                    />
                  </div>
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
              {user.recent_activities && user.recent_activities.length > 0 ? (
                user.recent_activities.map((activity: any, i: number) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== user.recent_activities.length - 1 && <div className="absolute left-[1.15rem] top-8 bottom-[-1.5rem] w-px bg-foreground/10" />}
                    <div className={`w-9 h-9 rounded-full bg-background border border-foreground/10 flex items-center justify-center relative z-10 shrink-0 ${activity.color || 'text-primary'}`}>
                      {activity.icon === 'workout' && <Dumbbell className="w-4 h-4" />}
                      {activity.icon === 'nutrition' && <Activity className="w-4 h-4" />}
                      {activity.icon === 'goal' && <Flame className="w-4 h-4" />}
                      {(!activity.icon || activity.icon === 'default') && <Calendar className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{activity.title}</h4>
                      <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                // Default activities if none exist
                <>
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
                </>
              )}
            </div>
            
            <button 
              onClick={() => router.push("/activity")}
              className="w-full mt-8 py-3 text-sm font-bold text-gray-400 hover:text-white bg-foreground/5 hover:bg-foreground/10 rounded-xl transition-colors"
            >
              View All History
            </button>
          </motion.div>

        </div>
      </div>

      <Footer />
    </main>
  );
}