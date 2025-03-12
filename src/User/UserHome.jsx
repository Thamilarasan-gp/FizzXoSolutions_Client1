import React from "react";
import { LanguageProvider } from "../LanguageContext"; 
import EventSection from "./EventSection";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import Navbar from "./NavBar";
import Footer from "./Footer";
import ContactForm from "./ContactForm";
import AchievementSection from "./AchievementSection";
import RecentBooks from "./RecentBooks";
import GotoPathipagam from "./GotoPathipagam";
import Newsletter from "./Newsletter";

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
      <GallerySection />
      <Newsletter />
      <ContactForm />
      <Footer />
    </LanguageProvider>
  );
}

export default UserHome;
