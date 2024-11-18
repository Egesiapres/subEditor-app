import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useRef } from "react";

export default function useFFmpeg(videoData) {
  // const [loaded, setLoaded] = useState(false);

  const ffmpegRef = useRef(new FFmpeg());

  const messageRef = useRef(null);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;

    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });

    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });

    // setLoaded(true);
  };

  const transcode = async (url = videoData.url) => {
    const ffmpeg = ffmpegRef.current;
    const videoURL = url;

    await ffmpeg.writeFile("input.mp4", await fetchFile(videoURL));

    // await ffmpeg.exec(["-i", "input.avi", "audio.mp3"]);
    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-q:a",
      "0",
      "-map",
      "a",
      "audio.mp3",
    ]);

    const fileData = await ffmpeg.readFile("audio.mp3");
    const data = new Uint8Array(fileData);

    return data;
  };

  return {
    ffmpegLoad: load,
    ffmpegTranscode: transcode,
  };
}
