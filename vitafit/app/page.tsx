import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Services from "../components/Services";
import Memberships from "../components/Memberships";
import Gallery from "../components/Gallery";
import AppBanner from "../components/AppBanner";
import Locations from "../components/Locations";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <Memberships />
      <Gallery />
      <AppBanner />
      <Locations />
      <Footer />
    </main>
  );
}
