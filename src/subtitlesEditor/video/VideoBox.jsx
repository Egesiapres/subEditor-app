import YouTubeIcon from "@mui/icons-material/YouTube";
import { Card, Divider } from "@mui/material";
import { useContext, useRef } from "react";
import videojs from "video.js";
import { SubtitleEditorContext } from "../../context/SubtitleEditorContext";
import useModal from "../../hooks/useModal";
import CustomCardHeader from "../../ui/CustomCardHeader";
import Error from "../../ui/Error";
import Info from "../../ui/Info";
import Loading from "../../ui/Loading";
import ModalConfirm from "../../ui/ModalConfirm";
import Warning from "../../ui/Warning";
import { clearSessionStorageItem } from "../../utils/sessionStorage";
import { capitalizeFirstChar } from "../../utils/text";
import ModalUpload from "../ModalUpload";
import VideoJS from "./VideoJS";

export default function VideoBox({ fileType, videoStatus }) {
  const { videoData, video, setVideo, subtitles, subtitlesData } = useContext(
    SubtitleEditorContext
  );

  const playerRef = useRef(null);

  const modalUploadVideo = useModal();

  const modalConfirmDeleteVideo = useModal();

  const videoJsOptions = {
    id: "video_js",
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    ...(video && {
      sources: [
        {
          src: video,
          type: `video/mp4`,
        },
      ],
    }),
    ...(subtitles && {
      tracks: [
        {
          kind: "subtitles",
          src: subtitlesData?.vttUrl || "",
          srcLang: "en",
          label: "English",
          default: true,
        },
      ],
    }),
  };

  // console.log("videoJsOptions", videoJsOptions);

  const handlePlayerReady = player => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });

    player.on("seeked", () => {
      videojs.log("Player has jumped to time: ", player.currentTime());
    });
  };

  const handleConfirmDeleteVideo = () => {
    clearSessionStorageItem(fileType);
    setVideo(null);
  };

  return (
    <>
      <Card variant="outlined">
        <CustomCardHeader
          modal={!video ? modalUploadVideo : modalConfirmDeleteVideo}
          subheader="Video Player"
          fileData={videoData}
          avatar={
            <YouTubeIcon
              fontSize="small"
              color="action"
            />
          }
          isUpload={!video}
        />

        <Divider />

        {videoStatus.isLoading ? (
          <Loading />
        ) : videoStatus.error ? (
          <Error error={videoStatus.error} />
        ) : video ? (
          <VideoJS
            options={videoJsOptions}
            onReady={handlePlayerReady}
          />
        ) : (
          <>
            <VideoJS options={videoJsOptions} />

            <Info text="No Video file detected. To play a Video, please upload a .mp4 file." />
          </>
        )}

        {video && !subtitles && (
          <Warning text="No Subtitles file detected. To start editing the Subtitles, please upload a .srt file." />
        )}
      </Card>

      {modalUploadVideo.isOpen && (
        <ModalUpload
          modal={modalUploadVideo}
          fileType="Video"
          status={videoStatus}
        />
      )}

      {modalConfirmDeleteVideo.isOpen && (
        <ModalConfirm
          modal={modalConfirmDeleteVideo}
          title={`Delete ${capitalizeFirstChar(fileType)}`}
          text="Do you really want to delete the Video?"
          handleConfirm={handleConfirmDeleteVideo}
          status={videoStatus}
        />
      )}
    </>
  );
}
