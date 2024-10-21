import YouTubeIcon from "@mui/icons-material/YouTube";
import { Card, CardMedia, Divider } from "@mui/material";
import { useContext } from "react";
import { UploadContext } from "../context/UploadContext";
import useModal from "../hooks/useModal";
import FeedbackLayout from "../layout/FeedbackLayout";
import CustomCardHeader from "../ui/CustomCardHeader";
import Error from "../ui/Error";
import Info from "../ui/Info";
import Loading from "../ui/Loading";
import Warning from "../ui/Warning";
import ModalUpload from "./ModalUpload";

export default function VideoPlayer({ fileType, uploadStatus }) {
  const { video, setVideo, subtitles } = useContext(UploadContext);

  const modalUpload = useModal();

  const subheader = `Video Player${video?.title ? ` - ${video?.title}` : ""}`;

  const table = (
    <CardMedia
      component="video"
      controls
      src={video?.url}
      title={video?.title}
      sx={{ minHeight: 250 }}
    />
  );

  return (
    <>
      <Card variant="outlined">
        <CustomCardHeader
          modal={modalUpload}
          fileType={fileType}
          subheader={subheader}
          avatar={
            <YouTubeIcon
              fontSize="small"
              color="action"
            />
          }
          isUpload={!video}
        />

        <Divider />

        {uploadStatus.isLoading ? (
          <Loading />
        ) : uploadStatus.error ? (
          <FeedbackLayout>
            <Error error={uploadStatus.error} />
          </FeedbackLayout>
        ) : video ? (
          table
        ) : (
          <>
            <CardMedia
              component="video"
              controls
              src={video?.url}
              title={video?.title}              
            />

            <Info text="No Video file detected. To play a Video, please upload a .mp4 file." />
          </>
        )}

        {video && !subtitles && (
          <Warning text="No subtitles file detected. To start editing the Subtitles, please upload a .srt file." />
        )}
      </Card>

      {modalUpload.isOpen && (
        <ModalUpload
          modal={modalUpload}
          fileType="Video"
          setFile={setVideo}
          status={uploadStatus}
        />
      )}
    </>
  );
}
