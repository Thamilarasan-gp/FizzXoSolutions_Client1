import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react"; // Import useState
import EventSection from "./User/EventSection";
import EventPage from "./User/EventPage";
import AddEventForm from "./Admin/AddEventForm";
import GallerySection from "./User/GallerySection";
import UserHome from "./User/UserHome";
import HeroForm from "./Admin/HeroForm";
import AddAchievementForm from "./Admin/AddAchievmentForm";

function App() {
    const [posts, setPosts] = useState([]); // Define state for HeroForm

    return (
        <Router>
            <Routes>
    
                <Route path="/" element={<UserHome />} />
                <Route path="/eventsection" element={<EventSection />} />
                <Route path="/event/:id" element={<EventPage />} />
                <Route path="/gallery" element={<GallerySection />} />
                <Route path="/add" element={<AddEventForm />} />
                <Route path="/heros/upload" element={<HeroForm posts={posts} setPosts={setPosts} />} />
                <Route path="/acheivementform" element={<AddAchievementForm />} />
            </Routes>
        </Router>
    );
}

export default App;
