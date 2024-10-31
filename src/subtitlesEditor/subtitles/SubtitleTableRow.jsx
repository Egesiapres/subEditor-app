import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import { useContext } from "react";
import { formatTimestamp } from "subtitle";
import { SubtitleEditorContext } from "../../context/SubtitleEditorContext";

export default function SubtitleTableRow({
  row,
  modalSubtitle,
  isReadOnly = false,
  isPlaying,
}) {
  const { selectedRows, setSelectedRows, setClickedTime } = useContext(
    SubtitleEditorContext
  );

  const [firstRow] = selectedRows;

  const handleChange = e => {
    const isChecked = e.target.checked;

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

  const isDisabled = selectedRows?.length >= 1;

  const isSelected = selectedRows?.some(
    selectedRow => selectedRow.id === row.id
  );

  const isNext =
    selectedRows &&
    (firstRow?.id === row.id - 1 || firstRow?.id === row.id + 1);

  return (
    <TableRow
      hover
      sx={{
        backgroundColor: isPlaying ? "#e1f5fe" : null,
      }}
    >
      {!isReadOnly && (
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
      )}

      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">
        <Button
          size="small"
          color="secondary"
          onClick={() => setClickedTime(row.start)}
        >
          {formatTimestamp(row.start)}
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button
          size="small"
          color="secondary"
          onClick={() => setClickedTime(row.end)}
        >
          {formatTimestamp(row?.end)}
        </Button>
      </TableCell>
      <TableCell align="center">{formatTimestamp(row.duration)}</TableCell>
      <TableCell align="center">{row?.text}</TableCell>

      {!isReadOnly && (
        <TableCell key={row.id}>
          <IconButton
            onClick={modalSubtitle.open}
            disabled={selectedRows.length > 0}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
}
