import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, IconButton, TableCell, TableRow } from "@mui/material";
import { useContext } from "react";
import { formatTimestamp } from "subtitle";
import { UploadContext } from "../../context/UploadContext";

export default function SubtitleTableRow({
  row,
  modalSubtitle,
  isReadOnly = false,
}) {
  const { selectedRows, setSelectedRows } = useContext(UploadContext);

  const [firstRow] = selectedRows;

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

  const isDisabled = selectedRows?.length >= 1;

  const isSelected = selectedRows?.some(
    selectedRow => selectedRow.id === row.id
  );

  const isNext =
    selectedRows &&
    (firstRow?.id === row.id - 1 || firstRow?.id === row.id + 1);

  return (
    <TableRow hover>
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

      <TableCell align="center">{row?.id}</TableCell>
      <TableCell align="center">{formatTimestamp(row?.start)}</TableCell>
      <TableCell align="center">{formatTimestamp(row?.end)}</TableCell>
      <TableCell align="center">{formatTimestamp(row?.duration)}</TableCell>
      <TableCell align="center">{row?.text}</TableCell>

      {!isReadOnly && (
        <TableCell key={row?.id}>
          <IconButton onClick={modalSubtitle.open}>
            <EditIcon fontSize="small" />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
}
