import { useContext, useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { SubtitleEditorContext } from "../../context/SubtitleEditorContext";
import { msToSeconds } from "../../utils/time";

export default function VideoJS({ options, onReady }) {
  const videoRef = useRef(null);

  const playerRef = useRef(null);

  const { clickedTime, setClickedTime } = useContext(SubtitleEditorContext);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");

      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);

      const remoteTextTracks = player.remoteTextTracks();

      options.tracks
        ? player.addRemoteTextTrack(options.tracks[0])
        : player.removeRemoteTextTrack(remoteTextTracks[0]);

      // debug
      // console.log("remoteTextTracks", remoteTextTracks);

      // 0 has not to be considered a Falsy value
      if (typeof clickedTime === "number") {
        player.currentTime(msToSeconds(clickedTime, true));        
        setClickedTime(null);
        player.pause();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, videoRef, clickedTime]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}
