import { createContext, useState } from "react";
import { clearSessionStorageItems, getSessionStorageItem } from "../utils/sessionStorage";

const sampleVideo = {
  id: "video-002",
  title: "How to Surf - The Complete Beginner's Guide",
  description:
    "Join us for a complete guide on how to surf, from choosing the right board to catching your first wave.",
  duration: "00:15:32", // Durata del video in formato HH:MM:SS
  uploadDate: "2024-09-12", // Data di caricamento
  views: 3500, // Numero di visualizzazioni
  likes: 700, // Numero di "mi piace"
  dislikes: 20, // Numero di "non mi piace"
  url: "https://www.youtube.com/watch?v=2cI_NhUCeJs", // URL del video
  thumbnail: "https://img.youtube.com/vi/2cI_NhUCeJs/0.jpg", // URL della miniatura
  tags: ["Surfing", "Surf Tips", "Beginner Guide", "Sports"], // Tag associati al video
  author: {
    name: "Surfing Lessons with Mike", // Nome dell'autore
    channel: "Surf Academy", // Nome del canale
  },
};

export const UploadContext = createContext();

export const UploadContextProvider = ({ children }) => {
  // clearSessionStorageItems();
  
  console.log(sessionStorage);

  const [subtitles, setSubtitles] = useState(
    getSessionStorageItem("subtitles") || null
  );

  console.log("subtitles", subtitles);

  // const [video, setVideo] = useState(sampleVideo || null);
  const [video, setVideo] = useState(null);

  const [audio, setAudio] = useState(null);

  const value = {
    subtitles,
    video,
    audio,
    setSubtitles,
    setVideo,
    setAudio,
  };

  return (
    <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
  );
};
