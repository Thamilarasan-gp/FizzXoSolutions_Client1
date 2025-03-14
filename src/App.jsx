import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react"; // Import useState

import EventPage from "./User/EventPage";
import AddEventForm from "./Admin/AddEventForm";

import UserHome from "./User/UserHome";
import HeroForm from "./Admin/HeroForm";
import AddAchievementForm from "./Admin/AddAchievmentForm";
import Forget from "./Authentication/Forget/Forget";
import Log_in from "./Authentication/Login/Log_in";
import Sign_up from "./Authentication/Sigup/Sign_up";
import AddBooks from "./Admin/AddBooks";
import EventSection from "./User/EventSection";
import Pathippagam_home from "./Pathippagam/PathippagamBooks";
import AddPathippagamBooks from "./Admin/AddPathippagamBooks";
import AddPathipagamEventForm from "./Admin/AddPathipagamEventForm";
import PathipagamHome from "./Pathippagam/PathipagamHome";
import PathipagamEventPage from "./Pathippagam/PathipagamEventPage";
import PathipagamEvent from "./Pathippagam/PathipagamEvent";
import Newsletter from "./User/Newsletter";
import AddNewsletterForm from "./Admin/AddNewsletterForm";
import DashNavbar from "./Admin/Dashboard/DashNavbar";

function App() {
  const [posts, setPosts] = useState([]); // Define state for HeroForm

  return (
 
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/eventsection" element={<EventSection />} />
          <Route path="/event/:id" element={<EventPage />} />
      
          <Route path="/add" element={<AddEventForm />} />
          <Route
            path="/heros/upload"
            element={<HeroForm posts={posts} setPosts={setPosts} />}
          />
          <Route path="/acheivementform" element={<AddAchievementForm />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/login" element={<Log_in />} />
          <Route path="/signup" element={<Sign_up />} />
          <Route path="/dash" element={<DashNavbar/>} />
          <Route path="/addbooks" element={<AddBooks />} />
          <Route path="/p_home" element={<Pathippagam_home />} />
          <Route path="/p_books" element={<AddPathippagamBooks />} />
          <Route path="/add_p_events" element={<AddPathipagamEventForm />} />
          <Route path="/pathipagamHome" element={<PathipagamHome />} />
          <Route
            path="/pathipagamevent/:id"
            element={<PathipagamEventPage />}
          />
          <Route path="/pathipagam-event" element={<PathipagamEvent />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/addnewsletter" element={<AddNewsletterForm />} />
        </Routes>
      </Router>
   
  );
}

export default App;
