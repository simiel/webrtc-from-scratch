const videoEl = document.querySelector('#my-video');
let stream = null;
let mediaStream = null;
const constraints = {
  video: true,
  audio: true,
};

const getMicAndCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    changeButtons([
      'green',
      'blue',
      'blue',
      'grey',
      'grey',
      'grey',
      'grey',
      'grey',
    ]);
  } catch (error) {
    console.log('Error: ', error);
  }
};

const showMyVideo = () => {
  if (!stream) {
    console.log('No stream');
    return;
  }
  console.log('My video is showing');
  videoEl.srcObject = stream;
  const tracks = stream.getTracks();
  console.log(tracks);
  changeButtons([
    'green',
    'green',
    'blue',
    'blue',
    'blue',
    'grey',
    'grey',
    'blue',
  ]);
};

const stopMyVideo = () => {
  if (!stream) {
    console.log('No stream');
    return;
  }
  stream.getTracks().forEach((track) => track.stop());
  videoEl.srcObject = null;
  console.log('My video is stopped');
  changeButtons([
    'green',
    'grey',
    'grey',
    'grey',
    'grey',
    'grey',
    'grey',
    'grey',
  ]);
};

document.querySelector('#share').addEventListener('click', (e) => {
  getMicAndCamera(e);
});

document.querySelector('#show-video').addEventListener('click', (e) => {
  showMyVideo(e);
});

document.querySelector('#stop-video').addEventListener('click', (e) => {
  stopMyVideo(e);
});

document.querySelector('#change-size').addEventListener('click', (e) => {
  changeVideoSize(e);
});

document.querySelector('#start-record').addEventListener('click', (e) => {
  startRecording(e);
});

document.querySelector('#stop-record').addEventListener('click', (e) => {
  stopRecording(e);
});

document.querySelector('#play-record').addEventListener('click', (e) => {
  playRecording(e);
});

document.querySelector('#share-screen').addEventListener('click', (e) => {
  shareScreen(e);
});
