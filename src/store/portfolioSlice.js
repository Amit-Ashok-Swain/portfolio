import { createSlice } from "@reduxjs/toolkit";

import profileImg from "../assets/profile.jpeg";
import deepvidImg from "../assets/deepvid.webp";
import songgptImg from "../assets/songgpt.jpg";
import soundofmemeImg from "../assets/soundofmeme.jpg";
import neighborgoodImg from "../assets/neighborgood.png";

const initialState = {
  profile: {
    name: "Amit Ashok Swain",
    roles: [
      "Sr. Engineering Project Manager",
      "Product Builder",
      "AI Specialist",
    ],
    tagline:
      "Driving product excellence, innovation, and delivering value from 0→1.",
    about:
      "Enthusiastic Project and Product Management professional with extensive experience across Software Development, Operations Management, Data Science, and Machine Learning. Committed to driving product excellence, scaling systems, and delivering measurable value to customers.",
    avatar: profileImg,
    socials: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/amit-ashok-s-a510b9b9/",
      },
      { name: "GitHub", url: "https://github.com/Amit-Ashok-Swain" },
      { name: "Substack", url: "https://substack.com/@amitashokswain7" },
    ],
  },

  skills: [
    "Product Management",
    "Product Ideation",
    "Product Design",
    "Product Development",
    "Product Engineering",
    "Product Analytics",
    "Java",
    "Spring Boot",
    "Agile & Scrum",
    "Project Management",
    "Machine Learning",
    "AWS EC2",
    "Data Science",
    "System Design",
    "Python",
    "Django & Fast API",
    "JavaScript",
    "MERN Stack",
    "JAM Stack",
    "Flutter",
    "Kotlin",
    "Web3",
  ],

  techMatrix: [
    {
      category: "Strategy & Roadmap",
      items: [
        "Vision & Roadmaps",
        "Agile (Scrum/Kanban)",
        "Market Research",
        "KPIs & North-Star Metric",
        "Cross-functional Leadership",
      ],
    },
    {
      category: "Languages & Core",
      items: [
        "Java",
        "Python",
        "C++",
        "Kotlin",
        "Dart",
        "Data Structures (DSA)",
        "OOPS",
        "System Design (LLD/HLD)",
      ],
    },
    {
      category: "Frameworks & AI",
      items: [
        "Spring Boot",
        "Hibernate / JPA",
        "Django & Flask",
        "Flutter",
        "Machine Learning",
        "Data Science",
      ],
    },
    {
      category: "Cloud & Infrastructure",
      items: [
        "AWS EC2",
        "GitHub Actions",
        "Docker",
        "CI/CD Pipelines",
        "Microservices",
      ],
    },
    {
      category: "Databases & Persistence",
      items: [
        "MySQL",
        "Vector Databases",
        "Relational Modeling",
        "Data Pipelines",
      ],
    },
    {
      category: "Analytics & Management",
      items: [
        "JIRA & Asana",
        "Mixpanel & Amplitude",
        "Figma",
        "Tableau",
        "Product Analytics",
      ],
    },
  ],

  certifications: [
    { title: "IBM AI Product Management Professional", issuer: "IBM" },
    { title: "IBM Product Management Professional", issuer: "IBM" },
    { title: "Management Consulting Professional", issuer: "Emory University" },
    {
      title: "LeanPM® Yellow Belt Certified",
      issuer: "Lean Project Management",
    },
    { title: "Hackerrank Software Engineer Certified", issuer: "HackerRank" },
    { title: "Certified Digital Marketing Expert", issuer: "ICTRD" },
  ],

  trajectory: [
    {
      type: "experience",
      year: "Nov 2024 - Present",
      title: "Sr. Engineering Project Manager",
      institution: "Persist Ventures (Los Angeles, USA)",
      description:
        "Managing 40+ in-house, Web3, and client projects across AI, robotics, and social platforms. Leading agile roadmaps for DeepVid.ai and SongGPT, ensuring on-time delivery and rigorous QA.",
    },
    {
      type: "experience",
      year: "Feb 2023 - Dec 2024",
      title: "Digital Project Manager",
      institution: "GSK GlaxoSmithKline PLC",
      description:
        "Led global digital campaigns for brands like Nucala and Shingrix. Improved project timelines by 100% and streamlined approvals, reducing execution times by 35% using JIRA and Veeva Vault.",
    },
    {
      type: "experience",
      year: "Aug 2021 - Jan 2023",
      title: "Operations Manager",
      institution: "Teleperformance Global Services",
      description:
        "Led the SIRVA relocation operations. Enhanced operational efficiency by 57% and reduced systematic errors by 87% through strategic process improvements and team mentoring.",
    },
    {
      type: "experience",
      year: "2021 - 2024 (Internships)",
      title: "Product, Data & Engineering Roles",
      institution: "Healtether, Geekster, Access Million, DevTown",
      description:
        "Extensive background building MERN-based edtech tools, developing machine learning data pipelines, and executing market research for 0→1 product strategies.",
    },
    {
      type: "education",
      year: "May 2022",
      title: "Bachelor's in Computer Engineering",
      institution: "MGM College of Engineering & Technology",
      description:
        "Achieved 1st Rank in Maharashtra State Level Chess Games (2015) and solved 600+ DSA/SQL questions across Leetcode and HackerRank.",
    },
  ],

  projects: [
    {
      id: 1,
      title: "DeepVid.ai",
      tagline: "Viral AI Content Platform",
      techStack: ["AI Models", "Real-time Gen", "Agile / Scrum"],
      description:
        "A leading platform empowering independent producers to create professional-quality music, comedy, videos, and scripts instantly.",
      color: "bg-slate-900",
      border: "border-orange-500/50",
      image: deepvidImg,
      link: "https://deepvid.ai/",
      codeSnippet: `POST /api/v1/generate-video
{
  "prompt": "Cinematic 4k render",
  "model": "deepvid-omni-v2",
  "resolution": "1080p",
  "webhooks": ["https://client.com/hook"]
}
>> 200 OK
>> INITIALIZING GPU CLUSTER...`,
    },
    {
      id: 2,
      title: "SongGPT",
      tagline: "AI Music Generator",
      techStack: ["Product Strategy", "Web3", "Audio Processing"],
      description:
        "Combines the UX of ChatGPT with Spotify’s ecosystem. Transforms videos, images, PDFs, and text into custom songs.",
      color: "bg-slate-900",
      border: "border-slate-700",
      image: songgptImg,
      link: "https://songgpt.com/",
      codeSnippet: `import { AudioEngine } from '@songgpt/core';
import { Web3Wallet } from 'ethers';

const stream = await AudioEngine.synthesize({
   genre: 'synthwave',
   lyrics: user.prompt,
   wallet: user.walletAddress,
   quality: 'lossless'
});
console.log("Audio matrix generated.");`,
    },
    {
      id: 3,
      title: "Sound Of Meme",
      tagline: "Web3 AI Audio Engine",
      techStack: ["Cross-functional Lead", "AI Music", "Web3"],
      description:
        "An AI music platform seamlessly combining advanced AI and Web3 integration to turn memes, gifs, and ideas into professional soundtracks.",
      color: "bg-slate-900",
      border: "border-slate-700",
      image: soundofmemeImg,
      link: "https://soundofmeme.com/",
      codeSnippet: `pragma solidity ^0.8.0;
contract MemeAudio is ERC721 {
   function mintTrack(address to, string memory uri) public {
      uint256 tokenId = _tokenIds.current();
      _mint(to, tokenId);
      _setTokenURI(tokenId, uri);
   }
} // Deployed on Ethereum Mainnet`,
    },
    {
      id: 4,
      title: "NeighborGood",
      tagline: "Localized Delivery & Community",
      techStack: ["Market Research", "UX Design", "System Architecture"],
      description:
        "Conceptualized localized applications emphasizing regional cuisine, eco-friendly delivery, and community event planning.",
      color: "bg-slate-900",
      border: "border-slate-700",
      image: neighborgoodImg,
      link: "https://neighborgood.io/",
      codeSnippet: `@RestController
@RequestMapping("/api/events")
public class EventController {
    @PostMapping("/local")
    public ResponseEntity<Event> createEvent(
        @RequestBody EventReq req) {
        return ResponseEntity.ok(
            eventService.save(req)
        );
    }
}`,
    },
  ],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
});

export default portfolioSlice.reducer;
