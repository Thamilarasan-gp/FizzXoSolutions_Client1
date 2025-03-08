import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./AchievementSection.css";

import { API_BASE_URL } from "../../api"; 

const AchievementSection = () => {
    const [achievements, setAchievements] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/achievements`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch achievements");
                return res.json();
            })
            .then((data) => setAchievements(data))
            .catch((error) => setError(error.message));
    }, []);

    return (
        <div className="achievement-section">
            <h2><span>OUR</span> ACHIEVEMENTS</h2>
            {error && <p className="error-message">Error: {error}</p>}
            
            {achievements.length === 0 && !error ? (
                <p className="no-achievements">No achievements found</p>
            ) : (
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    speed={1200}  /* Smoother transition */
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="swiper-container"
                >
                    {achievements.map((achievement) => (
                        <SwiperSlide key={achievement._id} className="achievement-card">
                            <div className="card-container">
                                <img 
                                    src={achievement.photoUrl ? achievement.photoUrl : "default-image.jpg"} 
                                    alt={achievement.title || "Achievement"} 
                                    className="card-image"
                                />
                                <div className="achievement-overlay">
                                    <h3>{achievement.title}</h3>
                                    <p className="description">{achievement.description}</p>
                                    {achievement.date && (
                                        <p className="date">
                                            {new Date(achievement.date).toLocaleDateString()}
                                        </p>
                                    )}
                                    {achievement.location && <p className="location">{achievement.location}</p>}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default AchievementSection;