import { createContext, useState } from "react";
import videojs from "video.js";
import {
  // eslint-disable-next-line no-unused-vars
  clearSessionStorageItems,
  getSessionStorageItem,
} from "../utils/sessionStorage";

export const SubtitleEditorContext = createContext();

export const SubtitleEditorContextProvider = ({ children }) => {
  // clearSessionStorageItems();

  const _subtitlesData = getSessionStorageItem("subtitles");
  const _videoData = getSessionStorageItem("Video");
  const _audioData = getSessionStorageItem("audio");

  console.log(sessionStorage);

  const [subtitlesData, setSubtitlesData] = useState(_subtitlesData || null);
  const [videoData, setVideoData] = useState(_videoData || "");
  const [audioData, setAudioData] = useState(_audioData || "");

  const [selectedRows, setSelectedRows] = useState([]);

  const player = videojs?.players?.video_js;
  // console.log("player", player);

  const [clickedTime, setClickedTime] = useState(null);

  const value = {
    subtitlesData,
    videoData,
    audioData,
    selectedRows,
    clickedTime,

    setSubtitlesData,
    setVideoData,
    setAudioData,
    setSelectedRows,
    setClickedTime,

    player,
  };

  return (
    <SubtitleEditorContext.Provider value={value}>
      {children}
    </SubtitleEditorContext.Provider>
  );
};