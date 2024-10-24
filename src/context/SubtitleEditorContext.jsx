import { createContext, useRef, useState } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  clearSessionStorageItems,
  getSessionStorageItem,
} from "../utils/sessionStorage";
import videojs from "video.js";

export const SubtitleEditorContext = createContext();

export const SubtitleEditorContextProvider = ({ children }) => {
  // clearSessionStorageItems();

  const subtitlesData = getSessionStorageItem("subtitles");
  const videoData = getSessionStorageItem("video");

  console.log(sessionStorage);

  const [subtitles, setSubtitles] = useState(
    subtitlesData?.fileContent || null
  );

  const [selectedRows, setSelectedRows] = useState([]);

  const [video, setVideo] = useState(videoData?.fileUrl || "");

  const playerRef = useRef(null);

  const player = videojs?.players?.video_js;
  console.log("player", player);

  const [audio, setAudio] = useState(null);

  const [clickedTime, setClickedTime] = useState(null);

  const value = {
    subtitlesData,
    videoData,

    subtitles,
    selectedRows,
    video,
    audio,
    setSubtitles,
    setSelectedRows,
    setVideo,
    setAudio,

    player,
    playerRef,
    clickedTime,
    setClickedTime,
  };

  return (
    <SubtitleEditorContext.Provider value={value}>
      {children}
    </SubtitleEditorContext.Provider>
  );
};
