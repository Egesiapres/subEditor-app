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
import { fakeRequest } from "../../api/api";
import { UploadContext } from "../../context/UploadContext";
import CustomTypography from "../../ui/CustomTypography";
import ModalCloseButton from "../../ui/ModalCloseButton";
import { capitalizeFirstChar } from "../../utils/text";
import SubtitleTableRow from "./SubtitleTableRow";

export default function ModalMergeSubtitles({ modal, fileType, status }) {
  const { subtitles, setSubtitles, selectedRows, setSelectedRows } =
    useContext(UploadContext);

  const [firstRow, secondRow] = selectedRows.sort((a, b) => a.id - b.id);

  const mergedRow = {
    id: secondRow.id - firstRow.id,
    start: firstRow.start,
    end: secondRow.end,
    text: `${firstRow.text} ${secondRow.text}`,
    duration: secondRow.end - firstRow.start,
  };

  console.log("mergedRow", mergedRow);

  const handleSave = async () => {
    status?.setLoading();

    try {
      let _subtitles = [...subtitles];
      _subtitles.splice(subtitles.indexOf(firstRow), 2, mergedRow);

      // eslint-disable-next-line no-unused-vars
      _subtitles = _subtitles.map(({ id: noSyncedId, ...rest }, index) => ({
        id: index + 1,
        ...rest,
      }));

      console.log(_subtitles);

      await fakeRequest();
      setSubtitles(_subtitles);

      status.setSuccess();
      modal.close();

      setSelectedRows([]);
    } catch (err) {
      status?.setError(err);
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
