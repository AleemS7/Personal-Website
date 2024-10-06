"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Mail, Github, Linkedin, MapPin, Moon, Sun, Volume2, VolumeX, Palette } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  name: string;
  description: string;
  image: string;
  tags: string[];
}

interface ColorTheme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
}

function getContrastYIQ(hexcolor: string): 'black' | 'white' {
  const r = parseInt(hexcolor.substr(1,2),16);
  const g = parseInt(hexcolor.substr(3,2),16);
  const b = parseInt(hexcolor.substr(5,2),16);
  const yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? 'black' : 'white';
}

export default function PersonalWebsite() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [colorTheme, setColorTheme] = useState<ColorTheme>({
    background: '#ffffff',
    text: '#000000',
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c'
  });
  const containerRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const projects: Project[] = useMemo(() => [
    {
      name: "project 1",
      description: "bleh bleh bleh blah blah blah blo blo blo bleh blo blah something something something",
      image: "https://i.pinimg.com/736x/32/7e/db/327edb9a15b304efc264668ada03f725.jpg",
      tags: ["awesome tech", "awesome language", "awesome framework"],
    },
    {
      name: "project 2",
      description: "bleh bleh bleh blah blah blah blo blo blo bleh blo blah something something something",
      image: "https://img.freepik.com/free-photo/cute-cat-with-rainbow-sunglasses_23-2150007935.jpg",
      tags: ["awesome tech", "awesome language", "awesome framework"],
    },
  ], []); // Empty dependency array means this will only be created once

  useEffect(() => {
    setSelectedProject(projects[0]);
    audioRef.current = new Audio('/minecraft_volume_alpha.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Set volume to 50%
  }, [projects]); // Added 'projects' to the dependency array

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.log("Audio playback failed:", error));
      }
    }
  }, [isMuted]);

  useEffect(() => {
    // Update scrollbar color based on theme
    document.documentElement.style.setProperty(
      '--scrollbar-color', 
      isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
    );
    document.documentElement.style.setProperty(
      '--scrollbar-hover-color', 
      isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
    );
  }, [isDarkMode, colorTheme]);

  const nameOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 0.2], [1, 3]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);
  const leftContentX = useTransform(scrollYProgress, [0.2, 0.3], [-50, 0]);
  const rightContentX = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  const fetchColorTheme = async () => {
    try {
      const response = await fetch('http://colormind.io/api/', {
        method: 'POST',
        body: JSON.stringify({ model: 'default' })
      });
      const data = await response.json();
      const [bg, , primary, secondary, accent] = data.result.map((color: number[]) => 
        `#${color.map(c => c.toString(16).padStart(2, '0')).join('')}`
      );
      const textColor = getContrastYIQ(bg);
      setColorTheme({ 
        background: isDarkMode ? '#121212' : bg, 
        text: isDarkMode ? '#ffffff' : textColor, 
        primary, 
        secondary, 
        accent 
      });
    } catch (error) {
      console.error('Failed to fetch color theme:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      // Switching to light mode
      setColorTheme({
        background: '#ffffff',
        text: '#000000',
        primary: '#3498db',
        secondary: '#2ecc71',
        accent: '#e74c3c'
      });
    } else {
      // Switching to dark mode
      setColorTheme({
        background: '#121212',
        text: '#ffffff',
        primary: '#3498db',
        secondary: '#2ecc71',
        accent: '#e74c3c'
      });
    }
  };
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div 
      className={`min-h-[200vh] font-[&apos;SF Pro Display&apos;, &apos;Inter&apos;, sans-serif] transition-colors duration-300`}
      style={{ 
        backgroundColor: isDarkMode ? '#121212' : colorTheme.background,
        color: isDarkMode ? '#ffffff' : colorTheme.text
      }}
    >
      <motion.h1 
        className="fixed inset-0 flex items-center justify-center text-8xl font-bold text-center pointer-events-none"
        style={{ opacity: nameOpacity, scale: nameScale, color: colorTheme.text }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        ALEEM SHAIK
      </motion.h1>

      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm`}
        style={{ 
          opacity: headerOpacity,
          backgroundColor: isDarkMode ? 'rgba(18, 18, 18, 0.8)' : `${colorTheme.background}cc`,
          color: isDarkMode ? '#ffffff' : colorTheme.text
        }}
      >
        <div className="w-full px-4 py-1 flex justify-between items-center">
          <span className="text-xs font-bold">Aleem Shaik</span>
          <div className="flex space-x-2">
            <button onClick={toggleDarkMode} className={`p-0.5 rounded-full hover:bg-opacity-20 hover:bg-gray-500`}>
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button onClick={toggleMute} className={`p-0.5 rounded-full hover:bg-opacity-20 hover:bg-gray-500`}>
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <button onClick={fetchColorTheme} className={`p-0.5 rounded-full hover:bg-opacity-20 hover:bg-gray-500`}>
              <Palette size={14} />
            </button>
          </div>
        </div>
        <div className={`w-full h-[0.5px]`} style={{ backgroundColor: colorTheme.text, opacity: 0.2 }}></div>
      </motion.header>

      <div className="min-h-screen pt-[100vh]" ref={containerRef}>
        <motion.main 
          className="max-w-[90%] mx-auto px-4 py-8"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="flex flex-col lg:flex-row">
            <motion.div 
              className={`lg:w-1/3 pr-8 lg:border-r`}
              style={{ x: leftContentX, borderColor: colorTheme.text }}
            >
              <section className="mb-8">
                <p className="mb-4">
                  Hi! I'm a software engineer driven to simplify tasks, streamline
                  workflows, and spark thoughtful interactions through my work.
                </p>
                <p className="text-sm italic mb-4">
                  Studied Computer Science / Applied Data Science @ University of
                  Georgia
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  {[
                    { href: "mailto:aleemshaik1225@gmail.com", icon: Mail, label: "Email" },
                    { href: "https://github.com/AleemS7", icon: Github, label: "GitHub" },
                    { href: "https://www.linkedin.com/in/aleem-shaik-545153183/", icon: Linkedin, label: "LinkedIn" },
                  ].map(({ href, icon: Icon, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center ${isDarkMode ? 'hover:text-gray-300' : 'hover:text-gray-600'} cursor-pointer z-10`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon className="w-4 h-4 mr-1" />
                      <span>{label}</span>
                    </motion.a>
                  ))}
                  <motion.span className="flex items-center" whileHover={{ scale: 1.1 }}>
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Atlanta, Georgia</span>
                  </motion.span>
                </div>
              </section>
            </motion.div>

            <motion.div 
              className="lg:w-2/3 lg:pl-8 mt-8 lg:mt-0"
              style={{ x: rightContentX }}
            >
              <h2 className={`text-xl mb-4 pb-2 border-b w-full`} style={{ borderColor: colorTheme.text }}>
                SELECTED WORK
              </h2>
              <div className="mb-6 flex space-x-4">
                {projects.map((project, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedProject(project)}
                    className={`text-lg hover:underline focus:outline-none cursor-pointer z-10 ${
                      selectedProject?.name === project.name ? 'font-bold' : ''
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {project.name}
                  </motion.button>
                ))}
              </div>
              {selectedProject && (
                <motion.div 
                  className="overflow-y-auto max-h-[calc(100vh-200px)] hide-scrollbar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover mb-4"
                  />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        className={`px-2 py-1 rounded text-sm`}
                        style={{
                          backgroundColor: colorTheme.primary,
                          color: getContrastYIQ(colorTheme.primary)
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <p style={{ color: colorTheme.text }}>
                    {selectedProject.description}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}