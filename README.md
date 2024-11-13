# Subtitles Editor App

### Description

A personal project to improve my browser built-in API knowledge, experiment with JS libraries that deal with different media types, and strengthen my React/Material UI skills.

### 1. Scope

The goal was to create an app able to deal with different media types, displaying, manipulating, and handle them in synchro.

The app is able to:

- support the upload of video (.mp4) and subtitle (.srt) files
- obtain an audio file (.mp3) converting the uploaded video
- display the uploaded subtitles into a table
- the subtitles table allows the user to:
  - visualize start/end time, text and duration of a subtile
  - move to a specific moment of the video/audio waveform clicking on start/end time of a subtitle
  - edit the start/end time and the text of a subtitle
  - merge two consecutive subtitles
  - highlight the right row when the video/audio waveform is playing
- play the uploaded video trough a player (in synchro with the audio waveform)
- display the waveform of the obtained audio and play it (in synchro with the video)

Browser built-in APIs:

- sessionStorage

External libraries:

- [subtitle.js](https://www.npmjs.com/package/subtitle)
- [video.js](https://videojs.com/)
- [ffmpeg.wasm](https://ffmpegwasm.netlify.app/)
- [wavesurfer.js](https://wavesurfer.xyz/)

### 2. Tools

React, JS, Material UI, Vite, Netlify
