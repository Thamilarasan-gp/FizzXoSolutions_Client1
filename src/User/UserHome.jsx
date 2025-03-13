import React from "react";
import { LanguageProvider } from "../LanguageContext"; 
import EventSection from "./EventSection";

import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import Navbar from "./NavBar";
import Footer from "./Footer";
import ContactForm from "./ContactForm";
import AchievementSection from "./AchievementSection";
import RecentBooks from "./RecentBooks";
import GotoPathipagam from "./GotoPathipagam";
import Newsletter from "./Newsletter";
import CircularGallery from './CircularGallery'
function UserHome() {
  return (
    <LanguageProvider>
      <Navbar />
      <HeroSection />
      <RecentBooks />
      <AboutSection />
      <EventSection />
      <GotoPathipagam />
      <AchievementSection />
   
      <div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.05} />
</div>
      <Newsletter />
      <ContactForm />
      <Footer />
    </LanguageProvider>
  );
}

export default UserHome;
