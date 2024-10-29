import MergeIcon from "@mui/icons-material/Merge";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import {
  Button,
  Card,
  Divider,
  Table,
  TableContainer,
  TableHead,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useContext, useEffect, useState } from "react";
import { SubtitleEditorContext } from "../../context/SubtitleEditorContext";
import useModal from "../../hooks/useModal";
import { useStatus } from "../../hooks/useStatus";
import CustomCardHeader from "../../ui/CustomCardHeader";
import CustomTypography from "../../ui/CustomTypography";
import Error from "../../ui/Error";
import Info from "../../ui/Info";
import Loading from "../../ui/Loading";
import ModalConfirm from "../../ui/ModalConfirm";
import Warning from "../../ui/Warning";
import { clearSessionStorageItem } from "../../utils/sessionStorage";
import { capitalizeFirstChar } from "../../utils/text";
import { secondsToMs } from "../../utils/time";
import ModalUpload from "../ModalUpload";
import ModalMergeSubtitles from "./ModalMergeSubtitles";
import ModalSubtitle from "./ModalSubtitle";
import SubtitleTableRow from "./SubtitleTableRow";

export default function SubtitlesBox({ fileType }) {
  const {
    subtitlesData,
    setSubtitlesData,
    videoData,
    selectedRows,
    // player,
  } = useContext(SubtitleEditorContext);

  const subtitleStatus = useStatus();

  const modalUploadSubtitles = useModal();

  const modalMergeSubtitles = useModal();

  const modalConfirmDeleteSubtitles = useModal();

  const handleConfirmDeleteSubtitles = () => {
    clearSessionStorageItem(fileType);
    setSubtitlesData(null);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ minWidth: 500 }}
      >
        <CustomCardHeader
          modal={
            !subtitlesData ? modalUploadSubtitles : modalConfirmDeleteSubtitles
          }
          subheader="Subtitles Data"
          fileData={subtitlesData}
          avatar={
            <SubtitlesIcon
              fontSize="small"
              color="action"
            />
          }
          isUpload={!subtitlesData}          
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
        ) : subtitlesData ? (
          <SubtitleTable
            subtitles={subtitlesData?.subtitles}
            fileType={fileType}
            selectedRows={selectedRows}
          />
        ) : (
          <Info text="No Video file detected. To see Subtitles details, please upload a .srt file." />
        )}

        {subtitlesData && !videoData && (
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

const SubtitleTable = ({ subtitles, fileType, selectedRows }) => {
  const { player } = useContext(SubtitleEditorContext);

  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(-1);

  useEffect(() => {
    if (player) {
      const updateCurrentSubtitle = () => {
        const currentTime = secondsToMs(player?.currentTime());

        // Find the current Subtitle Row Index
        const index = subtitles.findIndex(
          subtitle =>
            currentTime >= subtitle.start && currentTime <= subtitle.end
        );

        setCurrentSubtitleIndex(index);
      };

      // Update the Index every time the time changes
      player.on("timeupdate", updateCurrentSubtitle);

      // Cleanup event listeners
      return () => {
        player.off("timeupdate", updateCurrentSubtitle);
      };
    }
  }, [player, subtitles]);

  return (
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
                isPlaying={index === currentSubtitleIndex}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const CustomTableRow = ({ row, fileType, isPlaying }) => {
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
          isPlaying={isPlaying}
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
