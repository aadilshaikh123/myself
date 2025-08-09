import { useState, useEffect } from 'react';
import { Mail, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });

    e.currentTarget.reset();
  };

  const skills = [
    { category: 'AI & Machine Learning', skills: [
      { name: 'PyTorch', level: 90 },
      { name: 'TensorFlow', level: 85 },
      { name: 'Scikit-learn', level: 95 },
    ]},
    { category: 'Programming', skills: [
      { name: 'Python', level: 95 },
      { name: 'R', level: 80 },
      { name: 'SQL', level: 88 },
    ]},
    { category: 'Data & Tools', skills: [
      { name: 'Pandas/NumPy', level: 92 },
      { name: 'Jupyter/Colab', level: 95 },
      { name: 'Docker', level: 75 },
    ]},
  ];

  const projects = [
    {
      title: 'Deep Learning Model Optimizer',
      description: 'Developed an automated hyperparameter tuning system that improved model performance by 23% across multiple neural network architectures.',
      technologies: ['PyTorch', 'Optuna', 'MLflow'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    },
    {
      title: 'Smart Traffic Monitoring',
      description: 'Computer vision system for real-time traffic analysis using YOLO and OpenCV, achieving 94% accuracy in vehicle detection and classification.',
      technologies: ['OpenCV', 'YOLO', 'Python'],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    },
    {
      title: 'Social Media Sentiment Analyzer',
      description: 'NLP pipeline for real-time sentiment analysis of social media posts using transformer models and deployed with Flask API.',
      technologies: ['BERT', 'Flask', 'Hugging Face'],
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    },
  ];

  const experiences = [
    {
      title: 'AI Research Intern',
      company: 'TechCorp AI Labs',
      period: 'Summer 2024',
      description: 'Developed novel deep learning architectures for time series forecasting, resulting in 15% improvement in prediction accuracy. Collaborated with senior researchers on optimizing transformer models for edge deployment.',
      color: 'neural-cyan'
    },
    {
      title: 'Data Science Teaching Assistant',
      company: 'University of Technology',
      period: 'Fall 2023 - Present',
      description: 'Supporting 150+ students in Data Structures and Machine Learning courses. Created interactive tutorials and automated grading systems using Python, improving student engagement by 40%.',
      color: 'neural-purple'
    },
    {
      title: 'Junior Data Analyst',
      company: 'StartupX Analytics',
      period: 'Summer 2023',
      description: 'Built predictive models for customer behavior analysis using Python and R. Implemented data pipelines that reduced processing time by 60% and created dashboards for stakeholder reporting.',
      color: 'neural-cyan'
    },
  ];

  return (
    <div className="content-overlay">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6">
        <div className="glass-card p-4 mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold gradient-text font-poppins">Aadilnawaz Shaikh</div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-neural-cyan transition-colors font-montserrat ${
                    activeSection === item.toLowerCase() ? 'text-neural-cyan' : 'text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="glass-card p-12 max-w-4xl mx-auto text-center float-animation">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text font-poppins">Aadilnawaz Shaikh</h1>
          <h2 className="text-2xl md:text-3xl font-light mb-8 gradient-text font-roboto">AI & Data Science Engineer</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto font-montserrat">
            Passionate about transforming data into intelligent solutions. Specialized in machine learning, 
            deep learning, and building scalable AI systems that make a real-world impact.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="glass-card px-8 py-4 hover:bg-neural-cyan hover:bg-opacity-20 transition-all bg-transparent border-0"
            >
              View My Work
            </Button>
            <Button 
              onClick={() => window.open('Aadilnawaz_DS_resume.pdf', '_blank')}
              className="glass-card px-8 py-4 hover:bg-neural-purple hover:bg-opacity-20 transition-all bg-transparent border-0"
            >
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-4xl font-bold mb-8 text-center gradient-text font-poppins">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
                  alt="Alex Chen - AI Data Science Engineer" 
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed font-montserrat">
                  I'm a final-year Computer Science student specializing in Artificial Intelligence and Data Science. 
                  My journey began with curiosity about how machines can learn and evolved into a passion for creating 
                  intelligent systems that solve complex real-world problems.
                </p>
                <p className="text-gray-300 leading-relaxed font-montserrat">
                  With experience in deep learning, natural language processing, and computer vision, I've worked on 
                  projects ranging from predictive analytics to autonomous systems. I believe in the power of data-driven 
                  decision making and ethical AI development.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neural-cyan font-poppins">15+</div>
                    <div className="text-sm text-gray-400 font-montserrat">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neural-purple font-poppins">3.8</div>
                    <div className="text-sm text-gray-400 font-montserrat">GPA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text font-poppins">Technical Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skillGroup, groupIndex) => (
                <div key={groupIndex} className="space-y-4">
                  <h3 className="text-xl font-semibold text-neural-cyan mb-4 font-roboto">{skillGroup.category}</h3>
                  <div className="space-y-3">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-montserrat">{skill.name}</span>
                          <span className="text-sm font-montserrat">{skill.level}%</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2">
                          <div 
                            className="skill-progress" 
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text font-poppins">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="glass-card p-6 hover:scale-105 transition-transform">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-xl font-semibold mb-3 text-neural-cyan font-roboto">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 font-montserrat">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-neural-purple bg-opacity-20 rounded text-xs font-montserrat"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="text-neural-cyan hover:text-white transition-colors text-sm font-montserrat flex items-center gap-1">
                  View Project <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text font-poppins">Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className={`border-l-2 border-${exp.color} pl-6`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white font-roboto">{exp.title}</h3>
                    <span className={`text-${exp.color === 'neural-cyan' ? 'neural-purple' : 'neural-cyan'} font-medium font-montserrat`}>
                      {exp.period}
                    </span>
                  </div>
                  <h4 className={`text-${exp.color} mb-3 font-roboto`}>{exp.company}</h4>
                  <p className="text-gray-300 leading-relaxed font-montserrat">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text font-poppins">Education</h2>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2 text-white font-roboto">Bachelor of Science in Computer Science</h3>
              <h4 className="text-xl text-neural-cyan mb-3 font-roboto">Specialization: Artificial Intelligence & Data Science</h4>
              <p className="text-gray-300 mb-4 font-montserrat">University of Technology • 2021-2025 • GPA: 3.8/4.0</p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h5 className="text-lg font-semibold mb-4 text-neural-purple font-roboto">Relevant Coursework</h5>
                  <ul className="text-gray-300 space-y-2 text-left font-montserrat">
                    <li>• Machine Learning & Deep Learning</li>
                    <li>• Natural Language Processing</li>
                    <li>• Computer Vision</li>
                    <li>• Statistical Learning Theory</li>
                    <li>• Big Data Analytics</li>
                    <li>• Neural Networks & AI</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-lg font-semibold mb-4 text-neural-purple font-roboto">Achievements</h5>
                  <ul className="text-gray-300 space-y-2 text-left font-montserrat">
                    <li>• Dean's List (Fall 2023, Spring 2024)</li>
                    <li>• AI Research Excellence Award</li>
                    <li>• Best Project Award - ML Course</li>
                    <li>• Scholarship Recipient</li>
                    <li>• Published Research Paper</li>
                    <li>• IEEE Student Member</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-4xl font-bold mb-8 text-center gradient-text font-poppins">Get In Touch</h2>
            <p className="text-gray-300 text-center mb-12 leading-relaxed font-montserrat">
              I'm always excited to discuss AI projects, research opportunities, or potential collaborations. 
              Let's connect and explore how we can work together!
            </p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neural-cyan bg-opacity-20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-neural-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold font-roboto">Email</h4>
                    <p className="text-gray-300 font-montserrat">alex.chen@email.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neural-purple bg-opacity-20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-neural-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold font-roboto">Location</h4>
                    <p className="text-gray-300 font-montserrat">San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-neural-cyan bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <Linkedin className="w-6 h-6 text-neural-cyan" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-neural-purple bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <Github className="w-6 h-6 text-neural-purple" />
                  </a>
                </div>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <Input
                  name="name"
                  placeholder="Your Name"
                  className="bg-white bg-opacity-5 border-white border-opacity-20 focus:border-neural-cyan"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className="bg-white bg-opacity-5 border-white border-opacity-20 focus:border-neural-cyan"
                />
                <Textarea
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                  className="bg-white bg-opacity-5 border-white border-opacity-20 focus:border-neural-cyan resize-none"
                />
                <Button
                  type="submit"
                  className="w-full glass-card hover:bg-neural-cyan hover:bg-opacity-20 transition-all font-semibold bg-transparent border-0 font-montserrat"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center">
        <div className="glass-card p-6 max-w-4xl mx-auto">
          <p className="text-gray-400 font-montserrat">
            © 2024 Alex Chen. Designed with neural networks in mind.
          </p>
        </div>
      </footer>
    </div>
  );
}
