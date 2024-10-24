import { Container, Grid2 } from "@mui/material";
import { SubtitleEditorContextProvider } from "../context/SubtitleEditorContext";
import { useStatus } from "../hooks/useStatus";
import AudioBox from "./AudioBox";
import SubtitleBox from "./subtitles/SubtitlesBox";
import VideoBox from "./video/VideoBox";

export default function PageSubtitlesEditor() {
  const videoStatus = useStatus();

  return (
    <SubtitleEditorContextProvider>
      <Container
        maxWidth={false}
        sx={{ my: 3 }}
      >
        <Grid2
          container
          spacing={3}
        >
          <Grid2 size={{ xs: 12, md: 7, xl: 6 }}>
            <SubtitleBox fileType="subtitles" />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 5, xl: 6 }}>
            <VideoBox
              fileType="video"
              videoStatus={videoStatus}
            />
          </Grid2>

          <Grid2 size={12}>
            <AudioBox videoStatus={videoStatus} />
          </Grid2>
        </Grid2>
      </Container>
    </SubtitleEditorContextProvider>
  );
}
