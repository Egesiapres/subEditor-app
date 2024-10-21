import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import MergeIcon from "@mui/icons-material/Merge";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import {
  Button,
  Card,
  Chip,
  Divider,
  Grid2,
  Table,
  TableContainer,
  TableHead,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useContext } from "react";
import { clearSessionStorageItem } from "../..//utils/sessionStorage";
import { UploadContext } from "../../context/UploadContext";
import useModal from "../../hooks/useModal";
import { useStatus } from "../../hooks/useStatus";
import CustomCardHeader from "../../ui/CustomCardHeader";
import CustomTypography from "../../ui/CustomTypography";
import Error from "../../ui/Error";
import Info from "../../ui/Info";
import Loading from "../../ui/Loading";
import ModalConfirm from "../../ui/ModalConfirm";
import Warning from "../../ui/Warning";
import { capitalizeFirstChar } from "../../utils/text";
import ModalUpload from "../ModalUpload";
import ModalMergeSubtitles from "./ModalMergeSubtitles";
import ModalSubtitle from "./ModalSubtitle";
import SubtitleTableRow from "./SubtitleTableRow";

export default function SubtitlesTable({ fileType }) {
  const { subtitlesData, subtitles, setSubtitles, video, selectedRows } =
    useContext(UploadContext);

  const subtitleStatus = useStatus();

  const modalUploadSubtitles = useModal();

  const modalMergeSubtitles = useModal();

  const modalConfirmDeleteSubtitles = useModal();

  const handleConfirmDeleteSubtitles = () => {
    clearSessionStorageItem(fileType);
    setSubtitles(null);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ minWidth: 500 }}
      >
        <CustomCardHeader
          modal={
            !subtitles ? modalUploadSubtitles : modalConfirmDeleteSubtitles
          }
          subheader={
            <Grid2
              container
              spacing={1}
              alignItems="center"
            >
              <Grid2>Subtitles Table {subtitlesData && "- File:"}</Grid2>

              {subtitlesData && (
                <Chip
                  sx={{ pl: 0.5 }}
                  icon={<FilePresentRoundedIcon fontSize="small" />}
                  label={subtitlesData?.fileName}
                  variant="outlined"
                  // size="small"
                  color="primary"
                />
              )}
            </Grid2>
          }
          avatar={
            <SubtitlesIcon
              fontSize="small"
              color="action"
            />
          }
          isUpload={!subtitles}
          secondButton={
            <Button
              variant="contained"
              startIcon={<MergeIcon />}
              onClick={modalMergeSubtitles.open}
              disabled={selectedRows.length < 2}
            >
              Merge
            </Button>
          }
        />

        <Divider />

        {subtitleStatus.isLoading ? (
          <Loading />
        ) : subtitleStatus.error ? (
          <Error error={subtitleStatus.error} />
        ) : subtitles ? (
          <CustomTableContent
            subtitles={subtitles}
            fileType={fileType}
            selectedRows={selectedRows}
          />
        ) : (
          <Info text="No Subtitles file detected. To see Subtitles details, upload a .srt file." />
        )}

        {subtitles && !video && (
          <Warning text="No Video file detected. To display the Subtitles, please upload a .mp4 file." />
        )}
      </Card>

      {modalUploadSubtitles.isOpen && (
        <ModalUpload
          modal={modalUploadSubtitles}
          fileType={fileType}
          status={subtitleStatus}
        />
      )}

      {modalMergeSubtitles.isOpen && (
        <ModalMergeSubtitles
          modal={modalMergeSubtitles}
          fileType={fileType}
          status={subtitleStatus}
        />
      )}

      {modalConfirmDeleteSubtitles.isOpen && (
        <ModalConfirm
          modal={modalConfirmDeleteSubtitles}
          title={`Delete ${capitalizeFirstChar(fileType)}`}
          text="Do you really want to delete the Subtitles?"
          handleConfirm={handleConfirmDeleteSubtitles}
          status={subtitleStatus}
        />
      )}
    </>
  );
}

const CustomTableContent = ({ subtitles, fileType, selectedRows }) => (
  <>
    <TableContainer>
      <Table>
        <TableHead>
          {selectedRows.length < 2 && (
            <TableRow>
              <TableCell
                colSpan={7}
                sx={{ p: 0 }}
              >
                {selectedRows.length === 1 ? (
                  <Info text="Pease select one more Row." />
                ) : (
                  <Info text="To perform a merge, please select two consecutive Rows." />
                )}
              </TableCell>
            </TableRow>
          )}

          <TableRow>
            <TableCell />

            {Object.keys(subtitles[0]).map((header, index) => (
              <TableCell key={index}>
                <CustomTypography variant="body2">
                  {header === "id"
                    ? "#"
                    : header === "duration"
                    ? `${capitalizeFirstChar(header)} (ms)`
                    : capitalizeFirstChar(header)}
                </CustomTypography>
              </TableCell>
            ))}

            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {subtitles.map((subtitleRow, index) => (
            <CustomTableRow
              key={index}
              row={subtitleRow}
              fileType={fileType}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

const CustomTableRow = ({ row, fileType }) => {
  const rowStatus = useStatus();

  const modalSubtitle = useModal();

  return (
    <>
      {rowStatus.isLoading ? (
        <TableRow>
          <TableCell colSpan={6}>
            <Loading
              size={25}
              sx={{ my: 1 }}
            />
          </TableCell>
        </TableRow>
      ) : rowStatus.error ? (
        <Error error={rowStatus.error} />
      ) : (
        <SubtitleTableRow
          row={row}
          modalSubtitle={modalSubtitle}
        />
      )}

      {modalSubtitle.isOpen && (
        <ModalSubtitle
          modal={modalSubtitle}
          fileType={fileType}
          row={row}
          status={rowStatus}
        />
      )}
    </>
  );
};
