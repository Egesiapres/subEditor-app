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
  const { videoData, setVideoData, subtitlesData, setAudioData } = useContext(
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
    ...(videoData && {
      sources: [
        {
          src: videoData.url,
          type: `video/mp4`,
        },
      ],
    }),
    ...(subtitlesData && {
      tracks: [
        {
          kind: "subtitles",
          src: subtitlesData.url,
          srclang: "en",
          label: "English",
          default: true,
        },
      ],
    }),
  };

  // useEffect(() => {
  //   console.log("videoJsOptions", videoJsOptions);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [subtitlesData, videoData]);

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
      videojs.log("player has jumped to time: ", player.currentTime());
    });
  };

  const handleConfirmDeleteVideo = () => {
    clearSessionStorageItem(fileType);
    setVideoData(null);

    clearSessionStorageItem("audio");
    setAudioData(null);
  };

  return (
    <>
      <Card variant="outlined">
        <CustomCardHeader
          modal={!videoData ? modalUploadVideo : modalConfirmDeleteVideo}
          subheader="Video Player"
          fileData={videoData}
          avatar={
            <YouTubeIcon
              fontSize="small"
              color="action"
            />
          }
          isUpload={!videoData}
        />

        <Divider />

        {videoStatus.isLoading ? (
          <Loading />
        ) : videoStatus.error ? (
          <Error error={videoStatus.error} />
        ) : (
          <>
            <VideoJS
              options={videoJsOptions}
              onReady={handlePlayerReady}
            />

            {!videoData && (
              <Info text="No Video file detected. To play a Video, please upload a .mp4 file." />
            )}
          </>
        )}

        {videoData && !subtitlesData && (
          <Warning text="No Subtitles file detected. To start editing the Subtitles, please upload a .srt file." />
        )}
      </Card>

      {modalUploadVideo.isOpen && (
        <ModalUpload
          modal={modalUploadVideo}
          fileType={fileType}
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
