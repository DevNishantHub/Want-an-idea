import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const psychologyPrinciples = [
    {
      title: "Social Proof",
      description: "See what's trending and join 10,000+ innovators already sharing breakthrough ideas",
      icon: "👥",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Cognitive Anchoring",
      description: "95% of funded projects started with a simple idea - yours could be next",
      icon: "⚓",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Loss Aversion",
      description: "Don't let your breakthrough idea slip away - capture and share it before someone else does",
      icon: "⚡",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Bandwagon Effect",
      description: "Join the most popular innovation community and be part of the next big thing",
      icon: "🚀",
      color: "from-green-500 to-teal-500"
    }
  ];

  const uniqueFeatures = [
    {
      icon: "🧠",
      title: "Psychology-Driven Design",
      description: "Our platform leverages cognitive science to optimize idea discovery and sharing",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: "🎯",
      title: "Intelligent Matching",
      description: "AI-powered algorithms connect you with ideas and creators that match your interests",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: "📊",
      title: "Real-Time Analytics",
      description: "Track your idea's impact with detailed engagement metrics and community feedback",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      icon: "🌐",
      title: "Global Innovation Network",
      description: "Connect with creators, entrepreneurs, and innovators from around the world",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: "🔮",
      title: "Trend Prediction",
      description: "Stay ahead with insights into emerging trends and market opportunities",
      gradient: "from-green-500 to-blue-600"
    },
    {
      icon: "🎨",
      title: "Creative Inspiration",
      description: "Advanced tools for brainstorming, ideation, and project development",
      gradient: "from-yellow-500 to-orange-600"
    }
  ];

  const impactStats = [
    { 
      number: "10,000+", 
      label: "Ideas Shared",
      description: "Breakthrough concepts submitted",
      icon: "💡"
    },
    { 
      number: "5,000+", 
      label: "Active Innovators",
      description: "Creative minds in our community",
      icon: "👥"
    },
    { 
      number: "500+", 
      label: "Successful Projects",
      description: "Ideas turned into reality",
      icon: "🚀"
    },
    { 
      number: "50+", 
      label: "Industry Categories",
      description: "Domains we cover",
      icon: "🎯"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & Cognitive Scientist",
      image: "👩‍🔬",
      bio: "PhD in Cognitive Psychology, former innovation consultant. Pioneering the intersection of psychology and idea sharing.",
      skills: ["Cognitive Science", "Innovation Psychology", "Product Strategy"],
      highlight: "Published researcher in behavioral economics"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & AI Architect",
      image: "👨‍💻",
      bio: "Machine learning expert building intelligent systems that understand and enhance human creativity.",
      skills: ["AI/ML", "System Architecture", "React"],
      highlight: "Former Google AI team member"
    },
    {
      name: "Emma Thompson",
      role: "Community Psychologist",
      image: "👩‍🎨",
      bio: "Specialist in social dynamics and community building. Designs experiences that foster genuine idea sharing and inspiration.",
      skills: ["Social Psychology", "Community Design", "UX Research"],
      highlight: "Expert in online community psychology"
    },
    {
      name: "David Kim",
      role: "Innovation Engineer",
      image: "👨‍🔬",
      bio: "Full-stack developer and startup veteran. Turns complex ideas into intuitive user experiences.",
      skills: ["Full-Stack Development", "Startup Experience", "UI/UX"],
      highlight: "Built 3 successful startups"
    }
  ];

  const journeyMilestones = [
    {
      year: "2023",
      title: "The Psychology Insight",
      description: "Discovered how cognitive biases could revolutionize idea sharing platforms",
      icon: "🧠",
      status: "completed"
    },
    {
      year: "Early 2024",
      title: "Research & Development",
      description: "Conducted extensive research on innovation psychology and platform design",
      icon: "🔬",
      status: "completed"
    },
    {
      year: "Mid 2024",
      title: "Alpha Testing",
      description: "Private testing with psychology researchers and innovation experts",
      icon: "🧪",
      status: "completed"
    },
    {
      year: "Late 2024",
      title: "Beta Community",
      description: "Launched with 1,000 early adopters and validated our psychology-driven approach",
      icon: "👥",
      status: "completed"
    },
    {
      year: "2025",
      title: "Scale & Impact",
      description: "Growing global community and expanding our cognitive enhancement features",
      icon: "🌍",
      status: "current"
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">      {/* Hero Section with Floating Elements */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 to-pink-100/30"></div>
        {/* Floating geometric shapes - warm theme */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-400/20 rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-pink-400/25 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="text-8xl animate-pulse">🧠</div>
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">💡</div>
                <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce delay-75">🚀</div>
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-6">
              Where Psychology Meets Innovation
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              <span className="text-orange-600 font-semibold">WantAnIdea</span> isn't just another idea platform. 
              We're the world's first <span className="text-pink-600 font-semibold">psychology-driven</span> innovation ecosystem 
              that understands how your mind works and optimizes every interaction for maximum creative potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/submit')}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-orange-500/25 transform hover:scale-105"
              >
                🚀 Launch Your Idea
              </button>
              <button
                onClick={() => navigate('/browse')}
                className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 font-bold text-lg backdrop-blur-sm"
              >
                🔍 Explore Innovation
              </button>
            </div>
          </div>
        </div>
      </div>      {/* Psychology Principles Section */}
      <div className="py-20 bg-gradient-to-r from-orange-100 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🧠 Psychology-Powered Innovation
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We leverage cutting-edge cognitive science to create an environment where your best ideas naturally emerge and thrive
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {psychologyPrinciples.map((principle, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${principle.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                <div className="relative bg-white/80 backdrop-blur-sm border border-orange-200 rounded-2xl p-8 hover:border-orange-400 transition-all duration-300 shadow-lg">
                  <div className="flex items-start">
                    <div className="text-4xl mr-6 mt-2">{principle.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{principle.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Impact Stats with Animated Counters */}
      <div className="py-20 bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">📈 Our Growing Impact</h2>
            <p className="text-xl text-gray-700">
              Real numbers from a real community making real change
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white/90 backdrop-blur-sm border border-orange-200 rounded-2xl p-8 text-center hover:border-orange-400 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
                  <div className="text-4xl mb-4 group-hover:animate-bounce">{stat.icon}</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-900 font-semibold text-lg mb-2">{stat.label}</div>
                  <div className="text-gray-600 text-sm">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Unique Features Showcase */}
      <div className="py-20 bg-gradient-to-r from-yellow-100 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">✨ What Makes Us Different</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're not just another idea platform. We're a cognitive enhancement system designed for innovators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueFeatures.map((feature, index) => (
              <div key={index} className="group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}></div>
                <div className="relative bg-white/80 backdrop-blur-sm border border-orange-200 rounded-2xl p-8 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Team Section with Enhanced Profiles */}
      <div className="py-20 bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">👥 The Minds Behind the Magic</h2>
            <p className="text-xl text-gray-700">
              A diverse team of psychologists, engineers, and innovators united by one vision
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white/90 backdrop-blur-sm border border-orange-200 rounded-2xl p-8 text-center hover:border-orange-400 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
                  <div className="text-6xl mb-6 group-hover:animate-pulse">{member.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                  <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg p-3 mb-4">
                    <p className="text-pink-600 text-sm font-medium">{member.highlight}</p>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-3 py-1 bg-gradient-to-r from-orange-200 to-pink-200 text-orange-700 text-xs rounded-full border border-orange-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Innovation Journey Timeline */}
      <div className="py-20 bg-gradient-to-r from-pink-100 to-orange-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🗓️ Our Innovation Journey</h2>
            <p className="text-xl text-gray-700">
              From psychological insight to global platform
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 to-pink-500"></div>
            
            {journeyMilestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className={`bg-white/90 backdrop-blur-sm border ${milestone.status === 'current' ? 'border-orange-500' : 'border-orange-200'} rounded-2xl p-6 shadow-lg`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-orange-600 font-bold text-lg">{milestone.year}</span>
                      <span className="text-3xl">{milestone.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full ${milestone.status === 'current' ? 'bg-orange-500 animate-pulse' : 'bg-gradient-to-r from-orange-500 to-pink-500'} border-4 border-white`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-pink-200/20 rounded-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-orange-200 rounded-3xl p-12 text-center shadow-2xl">
              <div className="text-6xl mb-8">🌟</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Revolutionize Innovation?</h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands of innovators who are already experiencing the power of psychology-driven idea sharing. 
                Your breakthrough idea is just one click away.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="text-center">
                  <div className="text-3xl mb-3">🧠</div>
                  <h3 className="font-bold text-gray-900 mb-2">Smart Platform</h3>
                  <p className="text-gray-600 text-sm">Psychology-optimized experience</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="font-bold text-gray-900 mb-2">Instant Impact</h3>
                  <p className="text-gray-600 text-sm">Share ideas in minutes</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🌍</div>
                  <h3 className="font-bold text-gray-900 mb-2">Global Reach</h3>
                  <p className="text-gray-600 text-sm">Connect worldwide</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/submit')}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-orange-500/25 transform hover:scale-105"
                >
                  🚀 Share Your First Idea
                </button>
                <button
                  onClick={() => navigate('/browse')}
                  className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 font-bold text-lg backdrop-blur-sm"
                >
                  🔍 Discover Innovations
                </button>
              </div>
              
              <div className="mt-8 text-gray-600 text-sm">
                <p>📧 hello@wantanidea.com | 💬 24/7 Support | 🏢 San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
