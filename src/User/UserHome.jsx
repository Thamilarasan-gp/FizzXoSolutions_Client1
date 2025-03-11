import React from 'react'
import EventSection from './EventSection'
import GallerySection from './GallerySection'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import Navbar from './NavBar'
import Footer from './Footer'
import ContactForm from './ContactForm'
import AchievementSection from './AchievementSection'
import RecentBooks from './RecentBooks'
import GotoPathipagam from './GotoPathipagam'
import Newsletter from './Newsletter'
function UserHome() {
  return (
<>
<Navbar/>
<HeroSection/>
<RecentBooks />
<AboutSection/>
<EventSection />
<GotoPathipagam/>
<AchievementSection/>
<GallerySection />
<Newsletter/>
<ContactForm/>
<Footer/>
</>
  )
}

export default UserHome