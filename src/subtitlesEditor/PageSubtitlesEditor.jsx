import { Container, Grid2 } from "@mui/material";
import { UploadContextProvider } from "../context/UploadContext";
import { useStatus } from "../hooks/useStatus";
import AudioWaveform from "./AudioWaveForm";
import SubtitleTable from "./subtitles/SubtitlesTable";
import VideoPlayer from "./VideoPlayer";

export default function PageSubtitlesEditor() {
  const uploadVideoStatus = useStatus();

  return (
    <UploadContextProvider>
      <Container
        maxWidth={false}
        sx={{ my: 3 }}
      >
        <Grid2
          container
          spacing={3}
        >
          <Grid2 size={{ xs: 12, md: 7, xl: 6 }}>
            <SubtitleTable fileType="subtitles" />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 5, xl: 6 }}>
            <VideoPlayer
              fileType="video"
              uploadStatus={uploadVideoStatus}
            />
          </Grid2>

          <Grid2 size={12}>
            <AudioWaveform uploadStatus={uploadVideoStatus} />
          </Grid2>
        </Grid2>
      </Container>
    </UploadContextProvider>
  );
}
