import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { Card, Divider } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useContext } from "react";
import { SubtitleEditorContext } from "../context/SubtitleEditorContext";
import CustomCardHeader from "../ui/CustomCardHeader";
import Error from "../ui/Error";
import Info from "../ui/Info";
import Loading from "../ui/Loading";

export default function AudioBox({ videoStatus }) {
  const { audio } = useContext(SubtitleEditorContext);

  const table = (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>{"Waveform"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  return (
    <Card variant="outlined">
      <CustomCardHeader
        subheader="Audio WaveForm"
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
      ) : audio ? (
        table
      ) : (
        <Info text="No Video file detected. The WaveForm will appear once the Video has been uploaded." />
      )}
    </Card>
  );
}
