import React, { useEffect, useRef } from "react";
import "./AboutSection.css";
import img1 from "../assets/bookboy.jpg";
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
                <img src={img1} alt="About Us" />
            </div>
        </div>
    );
};

export default AboutSection;
