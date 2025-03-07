import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventSection from "./User/EventSection";
import EventPage from "./User/EventPage";
import AddEventForm from "./Admin/AddEventForm";
import GallerySection from "./User/GallerySection";
import UserHome from "./User/UserHome";


function App() {
    return (
        <>
         <Router>
            <Routes>
                <Route path="/" element={<UserHome />} />
                <Route path="/eventsection" element={<EventSection />} />
                <Route path="/event/:id" element={<EventPage />} />
                <Route path="/gallery" element={<GallerySection />} />
                <Route path="/add" element={<AddEventForm />} />
               
            </Routes>
        </Router>
       
        </>
       
    );
}

export default App;
