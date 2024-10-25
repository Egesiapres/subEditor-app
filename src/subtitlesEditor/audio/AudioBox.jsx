import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { Card, Divider } from "@mui/material";
import { useContext } from "react";
import { SubtitleEditorContext } from "../../context/SubtitleEditorContext";
import CustomCardHeader from "../../ui/CustomCardHeader";
import Error from "../../ui/Error";
import Info from "../../ui/Info";
import Loading from "../../ui/Loading";
import AudioWave from "./AudioWave";

export default function AudioBox({ videoStatus }) {
  const { audioData, videoData } = useContext(SubtitleEditorContext);

  return (
    <Card variant="outlined">
      <CustomCardHeader
        subheader="Audio WaveForm"
        fileData={audioData}
        avatar={
          <GraphicEqIcon
            fontSize="small"
            color="action"
          />
        }
        action={false}
      />

      <Divider />

      {videoStatus.isLoading ? (
        <Loading />
      ) : videoStatus.error ? (
        <Error error={videoStatus.error} />
      ) : videoData ? (
        <AudioWave videoData={videoData} />
      ) : (
        <Info text="No Video file detected. The WaveForm will appear once the Video has been uploaded." />
      )}
    </Card>
  );
}
