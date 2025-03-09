import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import "./ContactForm.css";

const ContactForm = () => {
    const [result, setResult] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
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
                text: "Message sent successfully!",
                icon: "success"
            });
            setResult("Form Submitted Successfully");
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
                        <h2>Get in Touch</h2>
                        <motion.div 
                            className="input-box"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label htmlFor="name">Name</label>
                            <input type="text" className="field" placeholder="Enter your name" id="name" name="name" required />
                        </motion.div>
                        <motion.div 
                            className="input-box"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label htmlFor="email">Email</label>
                            <input type="email" className="field" placeholder="Enter your email" id="email" name="email" required />
                        </motion.div>
                        <motion.div 
                            className="input-box"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label htmlFor="message">Message</label>
                            <textarea className="field mess" placeholder="Enter your message" id="message" name="message" required></textarea>
                        </motion.div>
                        <motion.button 
                            type="submit" 
                            className="submit"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>

                <motion.div 
                    className="contact-image-container"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <img 
                        src="https://blog.pincel.app/wp-content/uploads/2023/09/0-add-hidden-text-or-symbol-into-AI-photo.jpg" 
                        alt="Contact Us" 
                        className="contact-image"
                    />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ContactForm;
