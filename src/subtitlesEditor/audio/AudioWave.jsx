import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export default function AudioWave({ audioData }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#4F4A85",
        progressColor: "#383351",
        url: audioData?.url,
      });

      wavesurferRef.current.load(audioData.url);
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [audioData]);

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <div ref={waveformRef}></div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
