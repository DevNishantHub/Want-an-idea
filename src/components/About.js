import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "👩‍💼",
      bio: "Former product manager at a major tech company, passionate about democratizing innovation and connecting creative minds.",
      skills: ["Product Strategy", "User Experience", "Innovation Management"]
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      image: "👨‍💻",
      bio: "Full-stack developer with 8+ years experience building scalable platforms. Believes technology should serve creativity.",
      skills: ["React", "Node.js", "System Architecture"]
    },
    {
      name: "Emma Thompson",
      role: "Community Manager",
      image: "👩‍🎨",
      bio: "Community builder and design thinking facilitator. Helps foster collaboration and meaningful connections between creators.",
      skills: ["Community Building", "Design Thinking", "Content Strategy"]
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      image: "👨‍🔬",
      bio: "Software engineer focused on creating intuitive user experiences. Passionate about open-source and collaborative development.",
      skills: ["Frontend Development", "UI/UX", "Performance Optimization"]
    }
  ];

  const features = [
    {
      icon: "🔍",
      title: "Discover Ideas",
      description: "Browse thousands of innovative project ideas across various categories and difficulty levels."
    },
    {
      icon: "💡",
      title: "Share Your Vision",
      description: "Submit your unique project ideas and get feedback from a community of creators and innovators."
    },
    {
      icon: "🤝",
      title: "Connect & Collaborate",
      description: "Find like-minded individuals to bring your ideas to life through our messaging and collaboration tools."
    },
    {
      icon: "📈",
      title: "Track Progress",
      description: "Monitor your submissions, see engagement metrics, and track the impact of your shared ideas."
    },
    {
      icon: "🎯",
      title: "Smart Filtering",
      description: "Find exactly what you're looking for with advanced search and filtering capabilities."
    },
    {
      icon: "🌟",
      title: "Community Driven",
      description: "Join a vibrant community where innovation thrives and every idea has the potential to make a difference."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Project Ideas Shared" },
    { number: "5,000+", label: "Active Community Members" },
    { number: "500+", label: "Successful Collaborations" },
    { number: "50+", label: "Categories Covered" }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We believe every person has innovative ideas worth sharing. Our platform exists to bring those ideas to light.",
      icon: "💎"
    },
    {
      title: "Community Collaboration",
      description: "Great ideas become greater when people work together. We foster an environment where collaboration thrives.",
      icon: "🤝"
    },
    {
      title: "Accessibility",
      description: "Innovation shouldn't be limited by resources or connections. We make idea sharing accessible to everyone.",
      icon: "🌍"
    },
    {
      title: "Quality & Trust",
      description: "We maintain high standards for content quality while building a trustworthy platform for creative exchange.",
      icon: "⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-indigo-600">WantAnIdea</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're building the world's most vibrant community for sharing, discovering, and collaborating on innovative project ideas. 
              Every great innovation started with a simple idea – we're here to help yours flourish.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 py-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Democratizing Innovation
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    We believe that great ideas can come from anyone, anywhere. Our mission is to create a platform where 
                    innovative thinking is celebrated, nurtured, and transformed into reality through community collaboration.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Whether you're a student with a breakthrough concept, an entrepreneur seeking inspiration, or a developer 
                    looking for your next project, WantAnIdea connects you with the resources and people needed to bring ideas to life.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8">
                    <div className="text-6xl mb-4">🚀</div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Launched in 2024</h4>
                    <p className="text-gray-600">
                      Born from the idea that innovation should be accessible to everyone, everywhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-indigo-200">
              See how our community is making a difference
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-indigo-200 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600">
              Everything you need to share, discover, and collaborate on innovative ideas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-start">
                  <div className="text-3xl mr-4 mt-1">{value.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate individuals building the future of idea sharing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Key milestones in building the WantAnIdea community
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                date: "January 2024",
                title: "The Idea",
                description: "Founded with the vision of creating a global platform for idea sharing and collaboration."
              },
              {
                date: "March 2024",
                title: "Platform Development",
                description: "Began building the core platform with focus on user experience and community features."
              },
              {
                date: "July 2024",
                title: "Beta Launch",
                description: "Launched private beta with 100 early adopters to test and refine the platform."
              },
              {
                date: "October 2024",
                title: "Public Launch",
                description: "Opened the platform to the public and welcomed our first 1,000 community members."
              },
              {
                date: "Present",
                title: "Growing Community",
                description: "Continuing to expand our global community and enhance platform features based on user feedback."
              }
            ].map((milestone, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-32 text-right pr-8">
                  <span className="text-sm font-medium text-indigo-600">{milestone.date}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-indigo-600 rounded-full mt-1"></div>
                <div className="ml-8 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-600">
                Have questions, suggestions, or want to partner with us?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">hello@wantanidea.com</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600">Available 24/7 for support</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🏢</div>
                <h3 className="font-semibold text-gray-900 mb-2">Office</h3>
                <p className="text-gray-600">San Francisco, CA</p>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/submit')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                Share Your Idea
              </button>
              <button
                onClick={() => navigate('/browse')}
                className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors duration-200 font-medium"
              >
                Explore Ideas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
