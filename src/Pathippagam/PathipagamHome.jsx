import React from 'react'
import PathipagamBooks from './PathippagamBooks'
import PathipagamEvent from './PathipagamEvent'
import NavBar from '../User/NavBar'
import ContactForm from '../User/ContactForm'
import Footer from '../User/Footer'
import { LanguageProvider } from "../LanguageContext"; 
const PathipagamHome = () => {
  return (
    <div>
          <LanguageProvider>
        <NavBar/>
        <PathipagamBooks/>
        <PathipagamEvent/>
        <ContactForm/>
        <Footer/>
          </LanguageProvider>
       
    </div>
  )
}

export default PathipagamHome