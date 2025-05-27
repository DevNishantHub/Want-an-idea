import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BrowseIdeas from './components/BrowseIdeas';
import SubmitIdea from './components/SubmitIdea';
import MySubmissions from './components/MySubmissions';
import About from './components/About';
import Auth from './components/Auth';
import ProjectDetails from './components/ProjectDetails';
import UserAccount from './components/UserAccount';
import Footer from './components/Footer';

function App() {
  const [projectIdeas] = useState([
    {
      id: 1,
      title: "Smart Garden Monitor",
      description: "An IoT device that monitors soil moisture, temperature, and light levels in your garden, sending notifications to your phone when plants need care."
    },
    {
      id: 2,
      title: "Local Recipe Exchange",
      description: "A community platform where neighbors can share homemade recipes, organize cooking exchanges, and discover local food traditions."
    },
    {
      id: 3,
      title: "Study Buddy Finder",
      description: "An app that connects students studying similar subjects for group study sessions, with features for scheduling and progress tracking."
    },
    {
      id: 4,
      title: "Eco-Friendly Habit Tracker",
      description: "Track and gamify sustainable daily habits like reducing plastic use, saving energy, and choosing eco-friendly transportation options."
    },
    {
      id: 5,
      title: "Virtual Museum Tours",
      description: "Create immersive VR experiences of famous museums and historical sites, making art and culture accessible to everyone worldwide."
    },
    {
      id: 6,
      title: "Skill Swap Marketplace",
      description: "A platform where people can exchange skills and services without money - trade guitar lessons for web design, cooking for tutoring, etc."
    },
    {
      id: 7,
      title: "Mental Health Journal AI",
      description: "An intelligent journaling app that provides personalized insights and gentle guidance based on mood patterns and mental health goals."
    },
    {
      id: 8,
      title: "Neighborhood Tool Library",
      description: "A sharing platform for tools and equipment in local communities, reducing waste and helping neighbors access what they need."
    }
  ]);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navbar />
          <Routes>
            <Route 
              path="/" 
              element={<Home projectIdeas={projectIdeas} />} 
            />
            <Route 
              path="/project/:id" 
              element={<ProjectDetails projectIdeas={projectIdeas} />} 
            />
            {/* Placeholder routes for future pages */}
            <Route 
              path="/browse" 
              element={<BrowseIdeas projectIdeas={projectIdeas} />} 
            />
            <Route 
              path="/submit" 
              element={<SubmitIdea />} 
            />
            <Route 
              path="/edit/:id" 
              element={<SubmitIdea isEditMode={true} />} 
            />
            <Route 
              path="/my-submissions" 
              element={<MySubmissions />} 
            />
            <Route 
              path="/about" 
              element={<About />} 
            />
            <Route 
              path="/auth" 
              element={<Auth />} 
            />
            <Route 
              path="/account" 
              element={<UserAccount />} 
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
