import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  InputAdornment,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { fakeRequest } from "../../api/api";
import ModalCloseButton from "../../ui/ModalCloseButton";
import { setSessionStorageItem } from "../../utils/sessionStorage";
import { capitalizeFirstChar } from "../../utils/text";

export default function ModalSubtitle({ modal, fileType, file, row, status }) {
  // const [duration, setDuration] = useState(row?.duration || 0);

  const startTime = file[row?.id - 1].start || 0;

  const endTime = file[row?.id - 1].end || 0;

  const [text, setText] = useState(row?.text || "");

  const pastEndTime = file[row?.id - 2]?.end || 0;

  const nextStartTime = file[row?.id]?.start || endTime;

  const isFirstStartTime = row?.id - 1 === 0;

  const isLastEndTime = row?.id === file.length;

  const minStartTime = isFirstStartTime ? pastEndTime : pastEndTime + 1000;

  const maxEndTime = isLastEndTime ? nextStartTime : nextStartTime - 1000;

  const [durationSlider, setDurationSlider] = useState([startTime, endTime]);

  const handleSave = async () => {
    status.setLoading();

    try {
      row["start"] = durationSlider[0];
      row["end"] = durationSlider[1];
      row["duration"] = durationSlider[1] - durationSlider[0];
      row["text"] = text;

      // row["end"] = startTime + duration;

      file[row.id - 1] = row;

      await fakeRequest();
      setSessionStorageItem("subtitles", file);

      status.setSuccess();
      modal.close();
    } catch (err) {
      status.setError(err);
    }
  };

  const marks = [
    {
      value: minStartTime,
      label: `${Math.floor(minStartTime / 1000)}s`,
    },
    // {
    //   value: 20,
    //   label: '20°C',
    // },
    // {
    //   value: 37,
    //   label: '37°C',
    // },
    {
      value: maxEndTime,
      label: `${Math.floor(maxEndTime / 1000)}s`,
    },
  ];

  return (
    <Dialog
      open={modal.isOpen}
      onClose={modal.close}
      fullWidth
      // maxWidth="sm"
      maxWidth="sm"
    >
      <DialogTitle>
        Edit {capitalizeFirstChar(fileType)}
        <ModalCloseButton modal={modal} />
      </DialogTitle>

      <DialogContent>
        <Typography>Row #{row?.id}:</Typography>

        <Grid2
          sx={{ mt: 2 }}
          container
          spacing={2}
          columnSpacing={5}
        >
          <Grid2>
            <Typography
              variant="body"
              // variant="body2"
              // sx={{ mb: -1.5 }}
            >
              You can edit the duration acting on the start/end time of a
              subtitle:
            </Typography>
          </Grid2>

          <Grid2
            container
            alignItems="center"
            size={12}
          >
            <Grid2 size={2.5}>
              <TextField
                fullWidth
                variant="standard"
                size="small"
                value={durationSlider[0]}
                onChange={e =>
                  setDurationSlider([Number(e.target.value), durationSlider[1]])
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">ms</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>

            <Grid2 size={7}>
              <Slider
                value={durationSlider}
                onChange={(event, value) => setDurationSlider(value)}
                min={minStartTime}
                max={maxEndTime}
                marks={marks}
                disableSwap
              />
            </Grid2>

            <Grid2 size={2.5}>
              <TextField
                fullWidth
                variant="standard"
                size="small"
                value={durationSlider[1]}
                onChange={e =>
                  setDurationSlider([durationSlider[0], Number(e.target.value)])
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">ms</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>

            {/* Edit duration */}
            {/* <Grid2 size={8}>
              <Slider
                value={duration}
                onChange={e => setDuration(e.target.value)}
                min={0}
                max={maxDuration}
              />
            </Grid2>

            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="standard"
                size="small"
                value={duration}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">ms</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2> */}
          </Grid2>

          <Grid2 size={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              type="textarea"
              label="Text"
              placeholder="Type here some text..."
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </Grid2>
        </Grid2>
      </DialogContent>

      <DialogActions>
        <Button onClick={modal.close}>Cancel</Button>
        <LoadingButton
          onClick={handleSave}
          variant="contained"
          color="primary"
          loading={status.isLoading}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
