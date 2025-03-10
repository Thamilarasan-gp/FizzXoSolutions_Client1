import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Dashboard/AchievmentList.css";

import { API_BASE_URL } from "../api";

const AchievmentList = () => {
    const [achievements, setAchievements] = useState([]);
    const [error, setError] = useState(null);
    const [editingAchievement, setEditingAchievement] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        photo: null
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/achievements`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch achievements");
                return res.json();
            })
            .then((data) => setAchievements(data))
            .catch((error) => setError(error.message));
    }, []);

    const handleEditClick = (achievement) => {
        setEditingAchievement(achievement);
        setEditFormData({
            title: achievement.title,
            description: achievement.description,
            date: achievement.date,
            location: achievement.location,
            photo: null
        });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setEditFormData((prevData) => ({
                ...prevData,
                [name]: files[0]
            }));
        } else {
            setEditFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in editFormData) {
            if (editFormData[key]) formDataToSend.append(key, editFormData[key]);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/achievements/${editingAchievement._id}`, {
                method: "PUT",
                body: formDataToSend
            });

            if (!response.ok) throw new Error("Failed to update achievement");

            const updatedAchievement = await response.json();

            setAchievements((prev) =>
                prev.map((ach) => (ach._id === updatedAchievement._id ? updatedAchievement : ach))
            );

            setEditingAchievement(null);
        } catch (error) {
            setError(error.message);
        }
    };

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
                    speed={1200}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
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
                                    <p className="date">{new Date(achievement.date).toLocaleDateString()}</p>
                                    <p className="location">{achievement.location}</p>
                                    <button className="edit-button" onClick={() => handleEditClick(achievement)}>Edit</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {editingAchievement && (
                <div className="edit-modal">
                    <div className="modal-content">
                        <h2>Edit Achievement</h2>
                        <form onSubmit={handleUpdate}>
                            <input type="text" name="title" value={editFormData.title} onChange={handleChange} />
                            <textarea name="description" value={editFormData.description} onChange={handleChange} />
                            <input type="date" name="date" value={editFormData.date} onChange={handleChange} />
                            <input type="text" name="location" value={editFormData.location} onChange={handleChange} />
                            <input type="file" name="photo" accept="image/*" onChange={handleChange} />
                            <button type="submit">Update</button>
                            <button type="button" onClick={() => setEditingAchievement(null)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AchievmentList;
