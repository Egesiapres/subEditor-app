import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { Card, Divider } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useContext } from "react";
import { UploadContext } from "../context/UploadContext";
import FeedbackLayout from "../layout/FeedbackLayout";
import CustomCardHeader from "../ui/CustomCardHeader";
import Error from "../ui/Error";
import Info from "../ui/Info";
import Loading from "../ui/Loading";

export default function AudioWaveform({ uploadStatus }) {
  const { audio } = useContext(UploadContext);

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

      {uploadStatus.isLoading ? (
        <Loading />
      ) : uploadStatus.error ? (
        <FeedbackLayout>
          <Error error={uploadStatus.error} />
        </FeedbackLayout>
      ) : audio ? (
        table
      ) : (
        <Info text="No Video detected. The WaveForm will appear once the Video has been uploaded." />
      )}
    </Card>
  );
}
