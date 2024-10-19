import { Container, Grid2 } from "@mui/material";
import { useStatus } from "../hooks/useStatus";
import AudioWaveform from "./AudioWaveForm";
import SubtitleTable from "./SubtitleTable";
import VideoPlayer from "./VideoPlayer";

export default function PageSubtitleEditor() {
  const uploadVideoStatus = useStatus();

  return (
    <Container
      maxWidth={false}
      sx={{ my: 3 }}
    >
      <Grid2
        container
        spacing={3}
      >
        <Grid2
          item
          xs={12}
          sm={6}
        >
          <SubtitleTable fileType="Subtitle" />
        </Grid2>

        <Grid2
          item
          xs={12}
          sm={6}
        >
          <VideoPlayer
            fileType="Video"
            uploadStatus={uploadVideoStatus}
          />
        </Grid2>

        <Grid2
          item
          xs={12}
        >
          <AudioWaveform uploadStatus={uploadVideoStatus} />
        </Grid2>
      </Grid2>
    </Container>
  );
}
