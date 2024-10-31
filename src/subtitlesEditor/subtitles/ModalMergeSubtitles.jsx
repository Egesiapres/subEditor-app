import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { stringifySync } from "subtitle";
import videojs from "video.js";
import { fakeRequest } from "../../api/api";
import { SubtitleEditorContext } from "../../context/SubtitleEditorContext";
import CustomTypography from "../../ui/CustomTypography";
import ModalCloseButton from "../../ui/ModalCloseButton";
import {
  clearSessionStorageItem,
  setSessionStorageItem,
} from "../../utils/sessionStorage";
import { capitalizeFirstChar } from "../../utils/text";
import SubtitleTableRow from "./SubtitleTableRow";

export default function ModalMergeSubtitles({ modal, fileType, status }) {
  const { subtitlesData, setSubtitlesData, selectedRows, setSelectedRows } =
    useContext(SubtitleEditorContext);

  const player = videojs.players?.video_js;

  const { name, subtitles } = subtitlesData;

  const [firstRow, secondRow] = selectedRows.sort((a, b) => a.id - b.id);

  const mergedRow = {
    id: secondRow.id - firstRow.id,
    start: firstRow.start,
    end: secondRow.end,
    text: `${firstRow.text} ${secondRow.text}`,
    duration: secondRow.end - firstRow.start,
  };

  // console.log("mergedRow", mergedRow);

  const handleSave = async () => {
    status.setLoading();

    try {
      subtitles.splice(subtitles.indexOf(firstRow), 2, mergedRow);

      const _subtitles = subtitles.map(
        // eslint-disable-next-line no-unused-vars
        ({ id: noSyncedId, ...rest }, index) => ({
          id: index + 1,
          ...rest,
        })
      );

      const formattedSubtitles = _subtitles.map(({ start, end, text }) => ({
        data: { start, end, text },
        type: "cue",
      }));

      // Get Vtt object using crateUrlObject (as for the video file)
      const vttContent = stringifySync(formattedSubtitles, {
        format: "WebVTT",
      });
      const vttBlob = new Blob([vttContent]);

      const _subtitlesData = {
        name,
        url: URL.createObjectURL(vttBlob),
        subtitles: _subtitles,
      };

      await fakeRequest();

      clearSessionStorageItem(fileType);
      setSubtitlesData(null);

      const remoteTextTracks = player.remoteTextTracks();

      player.removeRemoteTextTrack(remoteTextTracks[0]);

      setSessionStorageItem(fileType, _subtitlesData);
      setSubtitlesData(_subtitlesData);
      setSelectedRows([]);

      player.currentTime(0);
      // player.currentTime(msToSeconds(mergedRow.start, true));

      status.setSuccess();
      modal.close();
    } catch (err) {
      status.setError(err);
    }
  };

  return (
    <Dialog
      open={modal.isOpen}
      onClose={modal.close}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Merge {capitalizeFirstChar(fileType)}
        <ModalCloseButton modal={modal} />
      </DialogTitle>

      <DialogContent>
        <Grid2
          container
          spacing={2}
        >
          <Grid2 size={12}>
            <Typography variant="body">
              The merge of the Rows #{firstRow.id} and #{secondRow.id} will
              result in:
            </Typography>
          </Grid2>

          <Grid2 size={12}>
            <Paper elevation={2}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {Object.keys(firstRow).map((header, index) => (
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
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <SubtitleTableRow
                      row={mergedRow}
                      isReadOnly
                    />
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid2>
        </Grid2>
      </DialogContent>

      <DialogActions>
        <Button onClick={modal.close}>Cancel</Button>

        <LoadingButton
          onClick={handleSave}
          variant="contained"
          color="primary"
          loading={status?.isLoading}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
