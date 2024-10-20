import { Container, Grid2 } from "@mui/material";
import { UploadContextProvider } from "../context/UploadContext";
import { useStatus } from "../hooks/useStatus";
import AudioWaveform from "./AudioWaveForm";
import SubtitleTable from "./SubtitleTable";
import VideoPlayer from "./VideoPlayer";

export default function PageSubtitleEditor() {
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
          <Grid2
            xs={12}
            sm={6}
          >
            <SubtitleTable fileType="subtitle" />
          </Grid2>

          <Grid2
            xs={12}
            sm={6}
          >
            <VideoPlayer
              fileType="video"
              uploadStatus={uploadVideoStatus}
            />
          </Grid2>

          <Grid2 xs={12}>
            <AudioWaveform uploadStatus={uploadVideoStatus} />
          </Grid2>
        </Grid2>
      </Container>
    </UploadContextProvider>
  );
}
