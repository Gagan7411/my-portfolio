// Default Portfolio Data from Resume
import type { PortfolioData } from "./types"

export const defaultPortfolioData: PortfolioData = {
  hero: {
    name: "Gagan M",
    title:  "Problem Solver Data Analytics Enthusiast AI Enthusiast Web Developer",

    description:
      "As a highly motivated and tech-savvy BCA graduate, I am eager to apply my skills in Artificial Intelligence, Web development and Cloud Development to deliver practical business solutions.",
    email: "mgagan8792@gmail.com",
    phone: "7411685451",
    location: "Bangalore, India",
    image: "/profile-picture.jpg",
    linkedIn: "https://linkedin.com/in/gagan-m-46997a289",
    github: "https://github.com/Gagan7411",
  },
  education: [
    {
      id: "1",
      institution: "MLA Academy of Higher Learning",
      degree: "Bachelor of Computer Application (BCA)",
      field: "Computer Science",
      startYear: 2022,
      endYear: 2025,
      location: "Bengaluru",
    },
    {
      id: "2",
      institution: "Seshadripuram Pre University College",
      degree: "CEBA",
      field: "Commerce",
      startYear: 2020,
      endYear: 2022,
      location: "Bengaluru",
    },
  ],
  skills: [
    { id: "1", name: "Python", category: "Programming" },
    { id: "2", name: "SQL", category: "Database" },
    { id: "3", name: "Microsoft Excel", category: "Data Analytics" },
    { id: "5", name: "AI/ML", category: "AI & Machine Learning" },
    { id: "6", name: "Langchain/RAG", category: "AI & Machine Learning" },
    { id: "7", name: "NLP", category: "AI & Machine Learning" },
    { id: "8", name: "Git", category: "Version Control & Code Collabration" },
    { id: "9", name: "Git-hub", category: "Version Control & Code Collabration" },
    { id: "10", name: "Docker", category: "DevOps" },
    { id: "11", name: "Node.js", category: "Backend" },
    { id: "12", name: "Pandas", category: "Data Analytics" },
    { id: "13", name: "Numpy", category: "Data Analytics" },
  ],
  projects: [
    {
      id: "1",
      title: "AI Voice Assistant",
      description:
        "Python-based voice assistant that performs tasks like playing music, providing real-time information, and telling jokes using voice commands.",
      technologies: ["Python", "pyttsx3", "SpeechRecognition", "pywhatkit"],
      link: "https://github.com/Gagan7411/Chitti-voice-assistant",
      startDate: "2024",
      endDate: "2024",
    },
    {
      id: "2",
      title: "Dental Clinic Website",
      description:
        "User-friendly dental clinic website with both user and admin modules using modern web technologies.",
      technologies: ["Node.js", "Express", "Mongoose", "HTML", "CSS", "JavaScript"],
      startDate: "2024",
      endDate: "2024",
    },
    {
      id: "3",
      title: "Age-Gender Prediction",
      description:"Web application that predicts age and gender from images using deep learning models, built with Flask and TensorFlow.",
      technologies: ["Python", "OpenCV"],
      link: "https://github.com/Gagan7411/age-gender-prediction",
      startDate: "2025",
      endDate: "2025",
    },
    {
      id: "4",
      title: "Smart AI Incident Detection & MLOps Automation",
      description:"An end-to-end AI-powered incident detection system built with complete MLOps integration — automating data ingestion, preprocessing, model training, and deployment using DVC, Git, and Docker. The project ensures reproducibility, continuous integration (CI/CD), and scalable model serving through a production-grade pipeline.",
      technologies: ["Python", "DVC", "Git"," Docker", "FastAPI"],
      link: "https://github.com/Gagan7411/smart-ai-incident-system",
      startDate: "2025",
      endDate: "2025",
    },

      ],
  research: [
    {
      id: "1",
      title: "🚧Google Maps Roadside Safety Platform (POC)",
      description:"Solved the problem of emergency communication in highway dead zones by designing a low-bandwidth, off-grid SOS protocol and an automated crowdsourced peer-to-peer assistance system. This concept enhances the reliability of roadside emergency response, ensuring connectivity even when cellular service fails, while also building a contextual support and monetization layer within Google Maps for real-time driver safety",
      link: "https://github.com/Gagan7411/Google-Map-Roadside-safety-",
    },

    {
      id: "2",
      title: "AI Insight Pen",
      description:
        "AI-powered tool similar to Google Lens, designed to instantly translate, define, and explain text from any screen. Planned for development using Android Studio.",
      link: "https://github.com",
    },
    {
      id: "3",
      title: "AI-Powered Ambulance Priority System",
      description:
        "AI-based extension for Smart Traffic Control that predicts ambulance movement up to 2 km ahead using sensor and GPS data. Automatically adjusts traffic lights, handles multi-ambulance routes, and creates dynamic green corridors for faster emergency response.",
      link: "https://github.com/Gagan7411/Saviour-AI-Traffic-System",
    },
  {
    id: "4",
    title: "⌚ Emergency AI Watch",
    description: "AI-powered wearable assistant that predicts and detects medical emergencies such as falls or cardiac events using personalized ML models and multi-sensor fusion. Warns the user, waits for a response, and auto-initiates SOS calls with live location sharing if no action within 60 seconds. Integrates with the AI Ambulance Priority System for complete emergency response.",
    link: "https://github.com/Gagan7411/Emergency-AI-Watch",
    image: "" // Add an image URL if you have one
  },
  // ... your other research items
]
  
}
