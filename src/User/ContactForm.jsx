import React from "react";
import Swal from "sweetalert2";
import "./ContactForm.css";
 // Import your image

const ContactForm = () => {
    const [result, setResult] = React.useState(null);

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
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <section className="contact">
            <div className="contact-container">
                {/* Left: Contact Form */}
                <div className="contact-form-container">
                    <form onSubmit={onSubmit}>
                        <h2>Get in Touch</h2>
                        <div className="input-box">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="field" placeholder="Enter your name" id="name" name="name" required />
                        </div>
                        <div className="input-box">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="field" placeholder="Enter your email" id="email" name="email" required />
                        </div>
                        <div className="input-box">
                            <label htmlFor="message">Message</label>
                            <textarea className="field mess" placeholder="Enter your message" id="message" name="message" required></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                </div>

                {/* Right: Image */}
                <div className="contact-image-container">
                    <img src="https://blog.pincel.app/wp-content/uploads/2023/09/0-add-hidden-text-or-symbol-into-AI-photo.jpg" alt="Contact Us" className="contact-image" />
                </div>
            </div>
        </section>
    );
};

export default ContactForm;