import EditIcon from "@mui/icons-material/Edit";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import {
  Card,
  Divider,
  IconButton,
  Table,
  TableContainer,
  TableHead,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useContext } from "react";
import { UploadContext } from "../context/UploadContext";
import useModal from "../hooks/useModal";
import { useStatus } from "../hooks/useStatus";
import FeedbackLayout from "../layout/FeedbackLayout";
import CustomCardHeader from "../ui/CustomCardHeader";
import CustomTypography from "../ui/CustomTypography";
import Error from "../ui/Error";
import Info from "../ui/Info";
import Loading from "../ui/Loading";
import Warning from "../ui/Warning";
import ModalUpload from "./ModalUpload";
import { capitalizeFirstChar } from "../utils/text";
import ModalConfirm from "../ui/ModalConfirm";

export default function SubtitleTable({ fileType }) {
  const { subtitles, setSubtitles, video } = useContext(UploadContext);

  const uploadStatus = useStatus();

  const modalUploadSubtitle = useModal();

  const modalConfirmDeleteSubtitle = useModal();

  const modalEditSubtitle = useModal();

  return (
    <>
      <Card variant="outlined">
        <CustomCardHeader
          modal={!subtitles ? modalUploadSubtitle : modalConfirmDeleteSubtitle}
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
          <CustomTableContent content={subtitles} />
        ) : (
          <Info text="No Subtitles detected. To see Subtitles details, upload a .srt file." />
        )}

        {subtitles && !video && (
          <Warning text="No Video detected. To display the Subtitles, please upload a .mp4 file." />
        )}
      </Card>

      {modalUploadSubtitle.isOpen && (
        <ModalUpload
          modal={modalUploadSubtitle}
          fileType={fileType}
          setFile={setSubtitles}
          status={uploadStatus}
        />
      )}

      {modalConfirmDeleteSubtitle.isOpen && (
        <ModalConfirm
          modal={modalConfirmDeleteSubtitle}
          fileType={fileType}
          setFile={setSubtitles}
          status={uploadStatus}
        />
      )}
    </>
  );
}

const CustomTableContent = ({ content }) => (
  <TableContainer>
    <Table size="medium">
      <TableHead>
        <TableRow>
          {Object.keys(content[0]).map((header, index) => (
            <TableCell key={index}>
              <CustomTypography variant="body2">
                {header === "id" ? "#" : capitalizeFirstChar(header)}
              </CustomTypography>
            </TableCell>
          ))}
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {content.map((subtitle, index) => (
          <TableRow
            key={index}
            hover
          >
            {Object.values(subtitle).map((value, i) => (
              <TableCell
                key={i}
                align="center"
                sx={{ maxWidth: 280 }}
              >
                {value}
              </TableCell>
            ))}
            <TableCell key={index}>
              <IconButton>
                <EditIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
