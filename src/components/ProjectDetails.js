import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = ({ projectIdeas }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');

  // Find the project by ID
  const project = projectIdeas.find(idea => idea.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Enhanced project data with metadata
  const projectMetadata = {
    datePosted: "2025-05-20",
    author: "Alex Johnson",
    authorRole: "Full Stack Developer",
    category: "Technology",
    difficulty: "Intermediate",
    estimatedTime: "3-6 months",
    budget: "$5,000 - $15,000",
    techStack: ["React", "Node.js", "MongoDB", "IoT Sensors"],
    collaboratorsNeeded: 3,
    views: 1247,
    likes: 89,
    status: "Open for Collaboration"
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    alert(`Message sent to ${projectMetadata.author}!\n\nFrom: ${senderName}\nMessage: ${message}`);
    setMessage('');
    setSenderName('');
    setSenderEmail('');
    setShowMessageForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Back Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Header */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                    {projectMetadata.status}
                  </span>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>By {projectMetadata.author}</span>
                    <span>•</span>
                    <span>{projectMetadata.datePosted}</span>
                    <span>•</span>
                    <span>{projectMetadata.views} views</span>
                    <span>•</span>
                    <span>{projectMetadata.likes} likes</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex space-x-2 mb-4">
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {projectMetadata.category}
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {projectMetadata.difficulty}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {projectMetadata.estimatedTime}
                </span>
              </div>
            </div>

            {/* Project Description */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Description</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {project.description}
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Real-time monitoring of soil conditions</li>
                <li>Mobile app with push notifications</li>
                <li>Weather integration for smart watering</li>
                <li>Plant database with care instructions</li>
                <li>Community features for sharing tips</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Technical Requirements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projectMetadata.techStack.map((tech, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                    <span className="text-sm font-medium text-gray-800">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phase 1: Research & Planning</h4>
                    <p className="text-sm text-gray-600">Duration: 2-4 weeks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phase 2: Hardware Development</h4>
                    <p className="text-sm text-gray-600">Duration: 8-12 weeks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phase 3: Software Development</h4>
                    <p className="text-sm text-gray-600">Duration: 6-10 weeks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phase 4: Testing & Launch</h4>
                    <p className="text-sm text-gray-600">Duration: 3-4 weeks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Project Metadata */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Budget Range</span>
                  <p className="text-lg font-semibold text-gray-900">{projectMetadata.budget}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Collaborators Needed</span>
                  <p className="text-lg font-semibold text-gray-900">{projectMetadata.collaboratorsNeeded} people</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Timeline</span>
                  <p className="text-lg font-semibold text-gray-900">{projectMetadata.estimatedTime}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Difficulty Level</span>
                  <p className="text-lg font-semibold text-gray-900">{projectMetadata.difficulty}</p>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Project Owner</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{projectMetadata.author}</h4>
                  <p className="text-sm text-gray-600">{projectMetadata.authorRole}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Experienced developer with 5+ years in IoT and full-stack development. 
                Passionate about creating solutions that connect technology with everyday life.
              </p>
              <button 
                onClick={() => setShowMessageForm(true)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Send Message
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Join Project
                </button>
                <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                  Save to Favorites
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Report Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Send Message to {projectMetadata.author}</h3>
              <button 
                onClick={() => setShowMessageForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Hi! I'm interested in collaborating on your project..."
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowMessageForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
