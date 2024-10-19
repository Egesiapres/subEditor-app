import SubtitlesIcon from "@mui/icons-material/Subtitles";
import {
  Card,
  Divider,
  Paper,
  Table,
  TableContainer,
  TableHead,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import useModal from "../hooks/useModal";
import { useStatus } from "../hooks/useStatus";
import FeedbackLayout from "../layout/FeedbackLayout";
import CustomCardHeader from "../ui/CustomCardHeader";
import CustomTypography from "../ui/CustomTypography";
import Error from "../ui/Error";
import Info from "../ui/Info";
import Loading from "../ui/Loading";
import ModalUpload from "./ModalUpload";

const sampleSubtitles = [
  {
    "#": 1,
    Start: "00:00:10",
    End: "00:00:15",
    Duration: "00:00:05",
    Text: "Welcome to our surfing tutorial! Get ready to ride the waves.",
  },
  {
    "#": 2,
    Start: "00:00:16",
    End: "00:00:20",
    Duration: "00:00:04",
    Text: "First, let’s check your surfboard and gear.",
  },
  {
    "#": 3,
    Start: "00:00:21",
    End: "00:00:26",
    Duration: "00:00:05",
    Text: "Finding the right wave is key to a good ride.",
  },
  {
    "#": 4,
    Start: "00:00:27",
    End: "00:00:32",
    Duration: "00:00:05",
    Text: "Paddle hard to catch the wave when it approaches.",
  },
  {
    "#": 5,
    Start: "00:00:33",
    End: "00:00:38",
    Duration: "00:00:05",
    Text: "Stand up quickly and maintain your balance.",
  },
  {
    "#": 6,
    Start: "00:00:39",
    End: "00:00:44",
    Duration: "00:00:05",
    Text: "Always remember to have fun and stay safe!",
  },
];

export default function SubtitleTable({ fileType }) {
  const [subtitles, setSubtitles] = useState(sampleSubtitles || null);
  // const [subtitles, setSubtitles] = useState(null);

  const uploadStatus = useStatus();

  const modalUpload = useModal();

  const table = (
    <TableContainer component={Paper}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            {Object.keys(sampleSubtitles[0]).map(key => (
              <TableCell key={key}>
                <CustomTypography variant="body2">{key}</CustomTypography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sampleSubtitles.map((subtitle, index) => (
            <TableRow key={index}>
              {Object.values(subtitle).map((value, i) => (
                <TableCell key={i}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <Card
        variant="outlined"
        sx={{ minWidth: 300 }}
      >
        <CustomCardHeader
          modal={modalUpload}
          fileType={fileType}
          subheader="Subtitle Table"
          avatar={
            <SubtitlesIcon
              fontSize="small"
              color="action"
            />
          }
          isUpload={!subtitles}
        />

        <Divider />

        {uploadStatus.isLoading ? (
          <Loading />
        ) : uploadStatus.error ? (
          <FeedbackLayout>
            <Error error={uploadStatus.error} />
          </FeedbackLayout>
        ) : subtitles ? (
          table
        ) : (
          <Info text="No Subtitles detected. To see Subtitles details, upload a .srt file." />
        )}

        {/* {table} */}
      </Card>

      {modalUpload.isOpen && (
        <ModalUpload
          modal={modalUpload}
          fileType={fileType}
        />
      )}
    </>
  );
}
