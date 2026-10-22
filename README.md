# webrtc-from-scratch

A small browser client that uses the media APIs a WebRTC app is built on, with no media library in between. It captures a microphone and camera, previews and stops that stream, resizes the camera track to what the device reports it can do, captures a screen, and records that capture locally as WebM. It is for developers who want those calls visible in a page they can run on their own machine.

The second video element, labeled “Their feed,” plays that recording back. This repository stops at local capture and playback.

## Features

- **Camera and microphone capture** with `navigator.mediaDevices.getUserMedia` (`video: true`, `audio: true`), then a preview on the local `<video>` element.
- **Track teardown.** Stopping the preview calls `stop()` on every track and clears the video source.
- **Resolution control.** The “Change screen size” control reads the width and height inputs (defaults `1280` and `720`) and applies them to the camera track with `MediaStreamTrack.applyConstraints`, clamped to `track.getCapabilities()`.
- **Screen capture** with `getDisplayMedia`: video only, `surfaceSwitching: 'include'`.
- **Local recording.** `MediaRecorder` records the screen-capture stream, collects chunks, and plays them back as a `video/webm` blob URL.
- **Step-aware controls.** Each button is painted green when that step is done, blue when it is available, and grey when it is idle.

The audio-input, audio-output, and video-input dropdowns are present in the page. No script in the repository fills them (`inputOutput.js` is referenced only in a comment).

## Tech stack

- Vanilla JavaScript, HTML, and CSS. The page loads classic `<script>` tags. There is no bundler and no frontend framework.
- [Bootstrap 5.3.0-alpha3](https://getbootstrap.com/) from jsDelivr, for the grid and button styles.
- [Node.js](https://nodejs.org/) and [Express 4](https://expressjs.com/) (`express` ^4.19.2) as a static file server.
- Browser APIs: `MediaDevices.getUserMedia`, `MediaDevices.getDisplayMedia`, `MediaStreamTrack.getCapabilities` / `applyConstraints`, and `MediaRecorder`.

## Project structure

```
express.js           Static server on port 3000
index.html           Page layout and script load order
styles.css           Video frame and input sizing
scripts.js           Capture, preview, stop, and click handlers
changeButtons.js     Maps a color list onto Bootstrap button classes
changeVideoSize.js   Applies width and height constraints to the camera track
shareScreen.js       Starts a display capture
screenRecorder.js    Records the display stream and plays it back
```

The scripts share state through globals: `stream` for the camera, `mediaStream` for the display, and `changeButtons` for the controls. `index.html` loads them so those functions exist before a click can call them. Recording reads `mediaStream`, so screen capture has to succeed before **Start recording** does anything.

## Getting started

**Prerequisites**

- Node.js
- A current desktop browser that implements `getUserMedia`, `getDisplayMedia`, and `MediaRecorder` (Chrome, Edge, or Firefox)
- A camera and microphone if you want to exercise capture. The browser shows permission prompts when the page is loaded from this server.

**Install**

```bash
npm install
```

No environment variables are required.

**Run**

```bash
node express.js
```

Open [http://localhost:3000](http://localhost:3000). A full pass through the page:

1. **Share my mic and camera**, then **Show My Video**.
2. Optionally set width and height and click **Change screen size**.
3. **Share Screen**, then **Start recording**, **Stop Recording**, and **Play Recording**. Playback appears under “Their feed.”

There is no build step. `npm test` is the npm placeholder (`echo "Error: no test specified" && exit 1`). This repository has no test suite.

## Project status

Learning prototype. Commits run from April 2024 through July 2024 and cover local capture and recording. Signaling and `RTCPeerConnection` are outside this repository.

## What this demonstrates

- Calling the capture APIs directly, and keeping the camera `MediaStream` separate from the display `MediaStream`.
- Negotiating a requested resolution against the capabilities the track advertises.
- A record-and-playback path from `MediaRecorder` chunks to a `Blob` and an object URL.
- Serving the page from a real origin with a few lines of Express, so the browser can grant device access.
- Tying the controls to the media lifecycle with an explicit color state on each button.

## License

ISC
