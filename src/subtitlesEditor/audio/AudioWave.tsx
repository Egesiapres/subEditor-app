// eslint-disable-next-line no-unused-vars
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import WavesurferPlayer from "@wavesurfer/react";
import { useContext, useEffect, useMemo, useState } from "react";
import videojs from "video.js";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { SubtitleEditorContext } from "../../context/SubtitleEditorContext";
import theme from "../../theme/theme";
import { msToSeconds } from "../../utils/time";

export default function AudioWave({ audioData }) {
  const { subtitlesData } = useContext(SubtitleEditorContext);

  const player = videojs.players?.video_js;

  const [wavesurfer, setWavesurfer] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [isPlaying, setIsPlaying] = useState(false);

  const plugins = useMemo(() => {
    const regions = RegionsPlugin.create();
    const timeline = TimelinePlugin.create();
    const hover = HoverPlugin.create({
      lineColor: "#ff0000",
      lineWidth: 2,
      labelBackground: "#555",
      labelColor: "#fff",
      labelSize: "12px",
    });

    const plugins = [regions, timeline, hover];

    return plugins;
  }, []);

  // Regions random colors
  const random = (min, max) => Math.random() * (max - min) + min;
  const randomColor = () =>
    `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

  useEffect(() => {
    plugins[0].clearRegions();

    if (wavesurfer && subtitlesData) {
      subtitlesData.subtitles.forEach(subtitle => {
        plugins[0].addRegion({
          start: msToSeconds(subtitle.start, true),
          end: msToSeconds(subtitle.end, true),
          content: subtitle.text,
          color: randomColor(),
          // color: "rgba(222, 216, 243, 0.5)",          
          drag: false,
          resize: false,
        });
      });
    }

    // debug
    // console.log("regions", plugins[0].regions);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wavesurfer, subtitlesData]);

  useEffect(() => {
    if (player) {
      player.on("play", () => {
        wavesurfer.play();
        wavesurfer.setMuted(true);
        setIsPlaying(true);
      });

      player.on("pause", () => {
        wavesurfer.pause();
        setIsPlaying(false);
      });

      player.on("seeked", () => {
        wavesurfer.seekTo(player.currentTime() / wavesurfer.getDuration());
        setIsPlaying(false);
      });

      player.on("seeked", () => {
        player.currentTime() === 0 && wavesurfer.seekTo(0);
        setIsPlaying(false);
      });

      return () => {
        player.off("play");
        player.off("pause");
        player.off("seeked");
      };
    }
  }, [player, wavesurfer]);

  const onReady = ws => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onInteraction = () => {
    const wsCurrentTime = wavesurfer.getCurrentTime();

    player.currentTime(wsCurrentTime);
    player.pause();
  };

  // const onPlayPause = () => {
  //   if (wavesurfer) {
  //     if (isPlaying) {
  //       wavesurfer.pause();
  //       player.pause();
  //       setIsPlaying(false);
  //     } else {
  //       wavesurfer.play();
  //       player.play();
  //       setIsPlaying(true);
  //     }
  //   }
  // };

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell sx={{ p: 0 }}>
            <WavesurferPlayer
              height={200}
              barHeight={1.5}
              barWidth={1.5}
              barRadius={2}
              barGap={1}
              waveColor={theme.palette.secondary.main}
              progressColor={theme.palette.primary.main}
              url={`${audioData.url}`}
              onReady={onReady}
              onInteraction={onInteraction}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              plugins={plugins}
            />
          </TableCell>
        </TableRow>

        {/* <TableRow>
          <TableCell>
            <Button
              size="small"
              variant="outlined"
              onClick={onPlayPause}
            >
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  );
}
