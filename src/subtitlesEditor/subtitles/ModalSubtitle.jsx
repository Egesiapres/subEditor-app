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
import { useContext, useState } from "react";
import { stringifySync } from "subtitle";
import videojs from "video.js";
import { fakeRequest } from "../../api/api";
import { SubtitleEditorContext } from "../../context/SubtitleEditorContext";
import ModalCloseButton from "../../ui/ModalCloseButton";
import {
  clearSessionStorageItem,
  setSessionStorageItem,
} from "../../utils/sessionStorage";
import { capitalizeFirstChar } from "../../utils/text";
import { msToSeconds } from "../../utils/time";

export default function ModalSubtitle({ modal, fileType, row, status }) {
  const { subtitlesData, setSubtitlesData } = useContext(SubtitleEditorContext);

  const player = videojs.players?.video_js;

  const { subtitles } = subtitlesData;

  // const [duration, setDuration] = useState(row?.duration || 0);

  const startTime = subtitles[row?.id - 1].start || 0;

  const endTime = subtitles[row?.id - 1].end || 0;

  const [text, setText] = useState(row?.text || "");

  const pastEndTime = subtitles[row?.id - 2]?.end || 0;

  const nextStartTime = subtitles[row?.id]?.start || endTime;

  const isFirstStartTime = row?.id - 1 === 0;

  const isLastEndTime = row?.id === subtitles.length;

  const minStartTime = isFirstStartTime ? pastEndTime : pastEndTime + 1;

  const maxEndTime = isLastEndTime ? nextStartTime : nextStartTime - 1;

  const [durationSlider, setDurationSlider] = useState([startTime, endTime]);

  const [startTimeSlider, endTimeSlider] = durationSlider;

  const handleSave = async () => {
    status.setLoading();

    try {
      row["start"] = startTimeSlider;
      row["end"] = endTimeSlider;
      row["duration"] = endTimeSlider - startTimeSlider;
      row["text"] = text;

      // row["end"] = startTime + duration;

      subtitles[row.id - 1] = row;

      const formattedSubtitles = subtitles.map(({ start, end, text }) => ({
        data: { start, end, text },
        type: "cue",
      }));

      // Get Vtt object using crateUrlObject (as for the video file)
      const vttContent = stringifySync(formattedSubtitles, {
        format: "WebVTT",
      });

      const vttBlob = new Blob([vttContent]);

      const _subtitlesData = {
        name: subtitlesData.name,
        url: URL.createObjectURL(vttBlob),
        subtitles,
      };

      // console.log("_subtitlesData", _subtitlesData, "subtitles", subtitles);

      await fakeRequest();

      clearSessionStorageItem(fileType);
      setSubtitlesData(null);

      const remoteTextTracks = player.remoteTextTracks();
      player.removeRemoteTextTrack(remoteTextTracks[0]);

      setSessionStorageItem(fileType, _subtitlesData);
      setSubtitlesData(_subtitlesData);

      player.currentTime(0);
      // player.currentTime(msToSeconds(startTimeSlider, true));

      status.setSuccess();
      modal.close();
    } catch (err) {
      status.setError(err);
    }
  };

  const isDecimals = true;

  const marks = [
    {
      value: minStartTime,
      label: `${msToSeconds(minStartTime, isDecimals)}s`,
    },
    {
      value: maxEndTime,
      label: `${msToSeconds(maxEndTime, isDecimals)}s`,
    },
  ];

  return (
    <Dialog
      open={modal.isOpen}
      onClose={modal.close}
      fullWidth
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
              You can change the duration editing the start/end time, and the
              text of a Subtitle:
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
                value={startTimeSlider}
                onChange={e => {
                  const value = Number(e.target.value);

                  if (value >= minStartTime && value < endTimeSlider) {
                    setDurationSlider([value, endTimeSlider]);
                  }
                }}
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
                onChange={(e, value) => setDurationSlider(value)}
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
                value={endTimeSlider}
                onChange={e => {
                  const value = Number(e.target.value);

                  if (value <= maxEndTime) {
                    setDurationSlider([startTimeSlider, value]);
                  }
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">ms</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>

            {/* // ? Easier duration editing */}
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
