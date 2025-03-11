import React from 'react'
import PathipagamBooks from './PathippagamBooks'
import PathipagamEvent from './PathipagamEvent'
import NavBar from '../User/NavBar'
import ContactForm from '../User/ContactForm'
import Footer from '../User/Footer'
const PathipagamHome = () => {
  return (
    <div>
        <NavBar/>
        <PathipagamBooks/>
        <PathipagamEvent/>
        <PathipagamHome/>
        <ContactForm/>
        <Footer/>
    </div>
  )
}

export default PathipagamHome