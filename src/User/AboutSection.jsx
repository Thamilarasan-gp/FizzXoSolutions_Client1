import React, { useEffect, useRef } from "react";
import { useLanguage } from "../LanguageContext"; // Import Language Context
import "./AboutSection.css";
import img1 from "../assets/bookboy.jpg";

const AboutSection = () => {
    const aboutRef = useRef(null);
    const { language } = useLanguage(); // Get language from context

    const content = {
        en: {
            title: "About Us",
            paragraph1:
                "Welcome to our platform! We are dedicated to providing an innovative space where creativity meets technology.",
            paragraph2:
                "Whether you are exploring events, galleries, or uploading content, we ensure a seamless and user-friendly journey.",
        },
        ta: {
            title: "எங்களை பற்றி",
            paragraph1:
                "எங்கள் தளத்திற்கு வரவேற்கிறோம்! உருவாக்கத்திற்கும் தொழில்நுட்பத்திற்கும் இடையில் ஒரு புதுமையான இடத்தை வழங்க எங்கள் அர்ப்பணிப்பு.",
            paragraph2:
                "நிகழ்வுகள், காட்சிகள், அல்லது உள்ளடக்கங்களைப் பதிவேற்றுவதில் ஆராய்ந்தாலும், பயனர் நட்பு அனுபவத்தை உறுதி செய்கிறோம்.",
        },
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            if (aboutRef.current) observer.unobserve(aboutRef.current);
        };
    }, []);

    return (
        <div className="about-container hidden" ref={aboutRef}>
            <div className="about-text">
                <h2>{content[language].title}</h2>
                <p>{content[language].paragraph1}</p>
                <p>{content[language].paragraph2}</p>
            </div>
            <div className="about-image">
                <img src={img1} alt={content[language].title} />
            </div>
        </div>
    );
};

export default AboutSection;
