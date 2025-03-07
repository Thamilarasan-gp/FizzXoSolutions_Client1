import React from 'react'
import EventSection from './EventSection'
import GallerySection from './GallerySection'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import Navbar from './NavBar'
import Footer from './Footer'
import ContactForm from './ContactForm'
import AchievementSection from './AchievementSection'
function UserHome() {
  return (
<>
<Navbar/>
<HeroSection/>
<AboutSection/>
<EventSection />
<GallerySection />
<AchievementSection/>
<ContactForm/>
<Footer/>
</>
  )
}

export default UserHome