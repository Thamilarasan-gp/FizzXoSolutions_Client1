import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import "./PathipagamEventPage.css";
import { API_BASE_URL } from "../api";
const PathipagamEventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const [likes, setLikes] = useState(0);
    const [isLikeLoading, setIsLikeLoading] = useState(false);
    const [hasUserLiked, setHasUserLiked] = useState(false);
    const [hasUserDisliked, setHasUserDisliked] = useState(false);

    useEffect(() => {
        const checkUserInteractions = () => {
            const likedEvents = JSON.parse(localStorage.getItem('likedPathipagamEvents') || '[]');
            const dislikedEvents = JSON.parse(localStorage.getItem('dislikedPathipagamEvents') || '[]');
            setHasUserLiked(likedEvents.includes(id));
            setHasUserDisliked(dislikedEvents.includes(id));
        };

        const fetchEvent = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/pathipagamEvent/pathipagamEvents/${id}`);
                if (!response.ok) throw new Error("Failed to fetch event");
                const data = await response.json();
                setEvent(data);
                setLikes(data.likes || 0);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchEvent();
        checkUserInteractions();
    }, [id]);

    const getYouTubeID = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*[?&]v=|.*\/))([\w-]{11})/);
        return match ? match[1] : null;
    };

    const videoID = event?.youtubeLink ? getYouTubeID(event.youtubeLink) : null;

    const handleLike = async () => {
        if (isLikeLoading || hasUserLiked || hasUserDisliked) return;
        setIsLikeLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/pathipagamEvent/pathipagamEvents/${id}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error("Failed to update like");
            const data = await response.json();
            setLikes(data.likes);
            
            const likedEvents = JSON.parse(localStorage.getItem('likedPathipagamEvents') || '[]');
            likedEvents.push(id);
            localStorage.setItem('likedPathipagamEvents', JSON.stringify(likedEvents));
            setHasUserLiked(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLikeLoading(false);
        }
    };

    const handleDislike = async () => {
        if (hasUserDisliked || hasUserLiked) return;
        
        const dislikedEvents = JSON.parse(localStorage.getItem('dislikedPathipagamEvents') || '[]');
        dislikedEvents.push(id);
        localStorage.setItem('dislikedPathipagamEvents', JSON.stringify(dislikedEvents));
        setHasUserDisliked(true);

        if (hasUserLiked) {
            const likedEvents = JSON.parse(localStorage.getItem('likedPathipagamEvents') || '[]');
            const updatedLikedEvents = likedEvents.filter(eventId => eventId !== id);
            localStorage.setItem('likedPathipagamEvents', JSON.stringify(updatedLikedEvents));
            setHasUserLiked(false);
            setLikes(prev => Math.max(0, prev - 1));
            
            try {
                await fetch(`${API_BASE_URL}/pathipagamEvent/pathipagamEvents/${id}/unlike`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (err) {
                console.error('Error updating like count:', err);
            }
        }
    };

    const handleShare = () => {
        const eventUrl = window.location.href;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Check out this Pathipagam event: " + eventUrl)}`;
        window.open(whatsappUrl, "_blank");
    };

    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!event) return <p>Loading event details...</p>;

    return (
        <div className="pathipagam-event-page">
            <h2>{event.name}</h2>

            {videoID ? (
                <div className="video-container">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoID}?rel=0`}
                        title="YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <img src={event.photoUrl || "default-image.jpg"} alt={event.name} />
            )}

            <div className="video-actions">
                <button 
                    className={`like-btn ${hasUserLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                    disabled={isLikeLoading || hasUserLiked || hasUserDisliked}
                >
                    <FaThumbsUp /> {likes}
                </button>
                <button 
                    className={`dislike-btn ${hasUserDisliked ? 'disliked' : ''}`}
                    onClick={handleDislike}
                    disabled={hasUserDisliked || hasUserLiked}
                >
                    <FaThumbsDown />
                </button>
                <button className="share-btn" onClick={handleShare}>
                    <FaWhatsapp className="whatsapp-icon" /> Share
                </button>
            </div>

            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
        </div>
    );
};

export default PathipagamEventPage;
