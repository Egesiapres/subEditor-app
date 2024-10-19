import YouTubeIcon from "@mui/icons-material/YouTube";
import { Card, CardMedia, Divider } from "@mui/material";
import { useState } from "react";
import useModal from "../hooks/useModal";
import { useStatus } from "../hooks/useStatus";
import FeedbackLayout from "../layout/FeedbackLayout";
import CustomCardHeader from "../ui/CustomCardHeader";
import Error from "../ui/Error";
import Info from "../ui/Info";
import Loading from "../ui/Loading";
import ModalUpload from "./ModalUpload";

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

export default function VideoPlayer({ fileType }) {
  const [video, setVideo] = useState(sampleVideo || null);
  // const [video, setVideo] = useState(null);

  const uploadStatus = useStatus();

  const modalUpload = useModal();

  const subheader = `Video Player${video?.title ? ` - ${video?.title}` : ""}`;

  const table = (
    <CardMedia
      component="video"
      controls
      src={video?.url}
      title={video?.title}
      sx={{ minHeight: 300 }}
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
              sx={{ minHeight: 300 }}
            />

            <Info text="No Video detected. To play a Video, upload a .mp4 file." />
          </>
        )}

        {/* <CardContent>
        <Typography variant="h6">{title}</Typography>
      </CardContent> */}
      </Card>

      {modalUpload.isOpen && (
        <ModalUpload
          modal={modalUpload}
          fileType="Video"
        />
      )}
    </>
  );
}
