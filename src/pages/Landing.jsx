import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Brain, 
  Users, 
  Star, 
  Shield, 
  Zap, 
  Target, 
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  Compass,
  GraduationCap,
  MessageSquare,
  Rocket,
  Target as TargetIcon,
  Users as UsersIcon,
  Zap as ZapIcon
} from "lucide-react";

export default function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
      
      {/* Multi-color Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Red/Orange Blob */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        
        {/* Green/Teal Blob */}
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        
        {/* Purple/Pink Blob */}
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>
        
        {/* Blue/Cyan Blob */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1500"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                             linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}>
        </div>
      </div>

      {/* Floating Multi-color Particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => {
          const colors = [
            'bg-blue-400/30', 'bg-purple-400/30', 'bg-pink-400/30', 
            'bg-orange-400/30', 'bg-emerald-400/30', 'bg-cyan-400/30'
          ];
          const color = colors[i % colors.length];
          return (
            <div 
              key={i}
              className={`absolute w-1 h-1 ${color} rounded-full animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Navigation - Emerald/Teal Theme */}
        <nav className={`px-6 py-4 sm:px-8 lg:px-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                StudyAI
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 font-medium">How it works</a>
              <a href="#testimonials" className="text-gray-300 hover:text-orange-300 transition-colors duration-300 font-medium">Testimonials</a>
              <a href="#pricing" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 font-medium">Pricing</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="hidden sm:inline-block px-4 py-2 text-gray-300 hover:text-emerald-300 transition-colors duration-300 font-medium"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section - Orange/Red Theme */}
        <main className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-24 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Badge - Orange Theme */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-8 animate-pulse">
              <Rocket className="w-4 h-4 text-orange-400 mr-2" />
              <span className="text-sm font-medium bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                AI-Powered Study Abroad Assistant
               
              </span>
            </div>

            {/* Main Heading - Multi-color Gradient */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Your Personal
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                AI Counsellor
              </span>
              <br/>
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Built by Durgarao Gunja
              </span>
                 
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Plan your study-abroad journey with intelligent guidance. 
              <span className="block text-cyan-300 mt-2">
                University matching • Visa guidance • Scholarship discovery
              </span>
            </p>

            {/* Stats - Different Colors for Each */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {[
                { value: "10,000+", label: "Students Guided", icon: <Users className="w-5 h-5" />, color: "from-emerald-400 to-teal-400" },
                { value: "500+", label: "Universities", icon: <Globe className="w-5 h-5" />, color: "from-blue-400 to-cyan-400" },
                { value: "95%", label: "Success Rate", icon: <Target className="w-5 h-5" />, color: "from-orange-400 to-red-400" },
                { value: "$50M+", label: "Scholarships Found", icon: <TrendingUp className="w-5 h-5" />, color: "from-purple-400 to-pink-400" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.icon}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons - Orange/Red Theme */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link 
                to="/signup"
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-3xl flex items-center space-x-3 w-full sm:w-auto justify-center"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <Link 
                to="/login"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-orange-500/20 text-white font-semibold rounded-xl hover:bg-orange-500/20 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl w-full sm:w-auto text-center"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Zap className="w-5 h-5 text-orange-400" />
                  <span>See Live Demo</span>
                </span>
              </Link>
            </div>

            {/* Trust Badges - Different Colors */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">Secure & Confidential</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Award Winning</span>
              </div>
            </div>
          </div>
        </main>

        {/* Features Preview - Multi-color Cards */}
        <section id="features" className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Why Choose AI Counsellor?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Intelligent features designed to simplify your study abroad journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "University Matching",
                description: "AI analyzes your profile to find perfect university matches",
                icon: <GraduationCap className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500",
                borderColor: "border-blue-500/20",
                hoverColor: "hover:border-blue-500/40"
              },
              
              {
                title: "Scholarship Finder",
                description: "Automatically discovers scholarships you qualify for",
                icon: <TargetIcon className="w-8 h-8" />,
                color: "from-orange-500 to-red-500",
                borderColor: "border-orange-500/20",
                hoverColor: "hover:border-orange-500/40"
              },
              {
                title: "Career Guidance",
                description: "Get personalized career path recommendations",
                icon: <Briefcase className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500",
                borderColor: "border-purple-500/20",
                hoverColor: "hover:border-purple-500/40"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`group bg-white/5 backdrop-blur-sm border ${feature.borderColor} ${feature.hoverColor} rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent font-medium`}>
                    Learn more
                  </span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-2 transition-transform duration-300 ${feature.color.includes('blue') ? 'text-blue-400' : feature.color.includes('emerald') ? 'text-emerald-400' : feature.color.includes('orange') ? 'text-orange-400' : 'text-purple-400'}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works - Cyan/Blue Theme */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get started in just 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                number: "01", 
                title: "Create Profile", 
                desc: "Tell us about your academic background and goals",
                icon: <BookOpen className="w-6 h-6" />,
                color: "from-blue-500 to-cyan-500"
              },
              { 
                number: "02", 
                title: "AI Analysis", 
                desc: "Receive personalized university recommendations",
                icon: <Brain className="w-6 h-6" />,
                color: "from-emerald-500 to-teal-500"
              },
              { 
                number: "03", 
                title: "Plan Journey", 
                desc: "Follow step-by-step guidance for applications",
                icon: <Calendar className="w-6 h-6" />,
                color: "from-orange-500 to-red-500"
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="relative group"
              >
                <div className={`bg-gradient-to-br ${step.color} p-1 rounded-2xl h-full`}>
                  <div className="bg-gray-900 rounded-xl p-8 h-full">
                    <div className={`text-5xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-6`}>
                      {step.number}
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300">{step.desc}</p>
                  </div>
                </div>
                
                {/* Connector lines for desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials - Purple/Pink Theme */}
        <section id="testimonials" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of successful students worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                university: "Stanford University",
                text: "The AI counsellor helped me discover scholarships I never knew existed!",
                rating: 5,
                color: "from-purple-500 to-pink-500"
              },
              {
                name: "James Wilson",
                university: "University of Cambridge",
                text: "Visa guidance was spot on. Got my student visa in just 3 weeks!",
                rating: 5,
                color: "from-blue-500 to-cyan-500"
              },
              {
                name: "Priya Patel",
                university: "University of Toronto",
                text: "Perfect university matches based on my profile and preferences.",
                rating: 5,
                color: "from-emerald-500 to-teal-500"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${testimonial.color} p-1 rounded-2xl`}
              >
                <div className="bg-gray-900 rounded-xl p-8 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.university}</p>
                    </div>
                    <UsersIcon className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA - Multi-color Gradient */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
          <div className="bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students who achieved their study abroad dreams with AI guidance
            </p>
            
            {/* Multi-color gradient button */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
              <Link 
                to="/signup"
                className="relative px-10 py-4 bg-gray-900 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <span>Get Started for Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
            
            <p className="text-sm text-gray-400 mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>

        {/* Footer - Emerald/Teal Theme */}
        <footer className="border-t border-emerald-500/20 pt-12 pb-8 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    StudyAI
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Your intelligent study abroad companion.
                </p>
              </div>
              
              {[
                {
                  title: "Product",
                  links: ["Features", "How it works", "Pricing", "API"]
                },
                {
                  title: "Company",
                  links: ["About", "Blog", "Careers", "Press"]
                },
                {
                  title: "Support",
                  links: ["Help Center", "Contact", "Privacy", "Terms"]
                }
              ].map((column, index) => (
                <div key={index}>
                  <h4 className="text-white font-semibold mb-4">{column.title}</h4>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href="#" className="text-gray-400 hover:text-emerald-300 transition-colors text-sm">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                © {new Date().getFullYear()} AI Counsellor. All rights reserved.
              </div>
              <div className="flex space-x-6">
                {["Twitter", "LinkedIn", "Instagram", "YouTube"].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="text-gray-400 hover:text-emerald-300 transition-colors text-sm"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Chat Widget - Orange Theme */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
          <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-4 shadow-2xl cursor-pointer group-hover:scale-110 transition-transform duration-300">
            <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}