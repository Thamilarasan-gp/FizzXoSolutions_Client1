import React, { useEffect, useRef } from "react";
import "./AboutSection.css";

const AboutSection = () => {
    const aboutRef = useRef(null);

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
                <h2>About Us</h2>
                <p>
                    Welcome to our platform! We are dedicated to providing an innovative space
                    where creativity meets technology. Our mission is to empower users by offering 
                    an interactive experience that enhances engagement and collaboration.
                </p>
                <p>
                    Whether you are exploring events, galleries, or uploading content, we ensure 
                    a seamless and user-friendly journey. Join us and be a part of something amazing!
                </p>
            </div>
            <div className="about-image">
                <img src="data:image/jpeg;base64,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" alt="About Us" />
            </div>
        </div>
    );
};

export default AboutSection;
