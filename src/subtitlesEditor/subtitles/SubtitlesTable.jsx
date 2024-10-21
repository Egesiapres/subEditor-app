import EditIcon from "@mui/icons-material/Edit";
import MergeIcon from "@mui/icons-material/Merge";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  Table,
  TableContainer,
  TableHead,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useContext, useState } from "react";
import { formatTimestamp } from "subtitle";
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
import ModalSubtitle from "./ModalSubtitle";

export default function SubtitlesTable({ fileType }) {
  const { subtitles, setSubtitles, video } = useContext(UploadContext);

  const [selectedRows, setSelectedRows] = useState([]);

  const subtitleStatus = useStatus();

  const modalUploadSubtitles = useModal();

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
          subheader="Subtitles Table"
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
            setSelectedRows={setSelectedRows}
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
          setFile={setSubtitles}
          fileType={fileType}
          status={subtitleStatus}
        />
      )}

      {modalConfirmDeleteSubtitles.isOpen && (
        <ModalConfirm
          modal={modalConfirmDeleteSubtitles}
          handleConfirm={handleConfirmDeleteSubtitles}
          fileType={fileType}
          status={subtitleStatus}
        />
      )}
    </>
  );
}

const CustomTableContent = ({
  subtitles,
  fileType,
  selectedRows,
  setSelectedRows,
}) => (
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
          {subtitles.map((subtitle, index) => (
            <CustomTableRow
              key={index}
              row={subtitle}
              fileType={fileType}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

const CustomTableRow = ({ row, fileType, selectedRows, setSelectedRows }) => {
  const { subtitles, setSubtitles } = useContext(UploadContext);

  const rowStatus = useStatus();

  const modalEditSubtitle = useModal();

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
          modalEditSubtitle={modalEditSubtitle}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      )}

      {modalEditSubtitle.isOpen && (
        <ModalSubtitle
          modal={modalEditSubtitle}
          fileType={fileType}
          file={subtitles}
          setFile={setSubtitles}
          row={row}
          status={rowStatus}
        />
      )}
    </>
  );
};

const SubtitleTableRow = ({
  row,
  modalEditSubtitle,
  selectedRows,
  setSelectedRows,
}) => {
  const handleChange = event => {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (selectedRows.length < 2) {
        setSelectedRows([...selectedRows, row]);
      }
    } else {
      setSelectedRows(
        selectedRows.filter(selectedRow => selectedRow.id !== row.id)
      );
    }
  };

  const isDisabled = selectedRows.length >= 1;

  const isSelected = selectedRows.some(
    selectedRow => selectedRow.id === row.id
  );

  const isNext =
    selectedRows[0]?.id === row.id - 1 || selectedRows[0]?.id === row.id + 1;

  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isSelected}
          onChange={handleChange}
          disabled={
            selectedRows.length === 2
              ? !isSelected && isDisabled
              : !isSelected && !isNext && isDisabled
          }
        />
      </TableCell>
      <TableCell align="center">{row?.id}</TableCell>
      <TableCell align="center">{formatTimestamp(row?.start)}</TableCell>
      <TableCell align="center">{formatTimestamp(row?.end)}</TableCell>
      <TableCell align="center">{formatTimestamp(row?.duration)}</TableCell>
      <TableCell align="center">{row?.text}</TableCell>

      <TableCell key={row?.id}>
        <IconButton onClick={modalEditSubtitle.open}>
          <EditIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
