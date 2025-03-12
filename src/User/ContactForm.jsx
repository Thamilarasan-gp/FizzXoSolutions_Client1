import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext"; // Import Language Context
import "./ContactForm.css";
import contactimg from "../assets/Untitled design (5).png";

const ContactForm = () => {
    const [result, setResult] = useState(null);
    const { language } = useLanguage(); // Get selected language

    const translations = {
        en: {
            title: "Get in Touch",
            name: "Name",
            email: "Email",
            message: "Message",
            placeholderName: "Enter your name",
            placeholderEmail: "Enter your email",
            placeholderMessage: "Enter your message",
            send: "Send Message",
            success: "Message sent successfully!",
        },
        ta: {
            title: "தொடர்பில் இருங்கள்",
            name: "பெயர்",
            email: "மின்னஞ்சல்",
            message: "செய்தி",
            placeholderName: "உங்கள் பெயரை உள்ளிடவும்",
            placeholderEmail: "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
            placeholderMessage: "உங்கள் செய்தியை உள்ளிடவும்",
            send: "செய்தியை அனுப்பவும்",
            success: "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது!",
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult(language === "en" ? "Sending...." : "அனுப்பப்படுகிறது...");
        const formData = new FormData(event.target);
        formData.append("access_key", "285197e6-21f4-420f-9df0-3f9a9fc36c4e");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            Swal.fire({
                title: "Success!",
                text: translations[language].success,
                icon: "success"
            });
            setResult(translations[language].success);
            event.target.reset();
        } else {
            setResult(data.message);
        }
    };

    return (
        <motion.section 
            className="contact"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="contact-container">
                <motion.div 
                    className="contact-form-container"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <form onSubmit={onSubmit}>
                        <motion.h2 
                            className="contact-title"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {translations[language].title}
                        </motion.h2>
                        <motion.div 
                            className="input-box"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label htmlFor="name">{translations[language].name}</label>
                            <input type="text" className="field" placeholder={translations[language].placeholderName} id="name" name="name" required />
                        </motion.div>
                        <motion.div 
                            className="input-box"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label htmlFor="email">{translations[language].email}</label>
                            <input type="email" className="field" placeholder={translations[language].placeholderEmail} id="email" name="email" required />
                        </motion.div>
                        <motion.div 
                            className="input-box"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label htmlFor="message">{translations[language].message}</label>
                            <textarea className="field mess" placeholder={translations[language].placeholderMessage} id="message" name="message" required></textarea>
                        </motion.div>
                        <motion.button 
                            type="submit" 
                            className="submit-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            {translations[language].send}
                        </motion.button>
                    </form>
                </motion.div>

                <motion.div 
                    className="contact-image-container"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.img 
                        src={contactimg} 
                        alt="Contact Us" 
                        className="contact-image"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        style={{ width: "130%", height: "100%" }}
                    />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ContactForm;
