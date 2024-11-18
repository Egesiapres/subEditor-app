import React, { createContext, useState } from "react";
import { Subtitle } from "../subtitlesEditor/ModalUpload";
import {
  // eslint-disable-next-line no-unused-vars
  // clearSessionStorageItems,
  getSessionStorageItem,
  Item,
} from "../utils/sessionStorage";

type SubtitlesData = Item | null;

type MediaData = Item | string;

export interface SubtitleEditorContext {
  subtitlesData: SubtitlesData;
  videoData: MediaData;
  audioData: MediaData;
  selectedRows: Array<Subtitle> | [];
  clickedTime: number | null;
}

export const SubtitleEditorContext =
  createContext<SubtitleEditorContext | null>(null);

export const SubtitleEditorContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // clearSessionStorageItems();

  const _subtitlesData = getSessionStorageItem("subtitles");
  const _videoData = getSessionStorageItem("video");
  const _audioData = getSessionStorageItem("audio");

  // console.log(sessionStorage);

  const [subtitlesData, setSubtitlesData] = useState<Item | null>(
    _subtitlesData || null
  );
  const [videoData, setVideoData] = useState<MediaData>(_videoData || "");
  const [audioData, setAudioData] = useState<MediaData>(_audioData || "");

  const [selectedRows, setSelectedRows] = useState<Array<Subtitle> | []>([]);

  const [clickedTime, setClickedTime] = useState<number | null>(null);

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
  };

  return (
    <SubtitleEditorContext.Provider value={value}>
      {children}
    </SubtitleEditorContext.Provider>
  );
};
