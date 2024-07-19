let recorder;
const recordedVideoEl = document.querySelector('#other-video');
chunks = [];

const startRecording = () => {
  //   if (!stream) {
  if (!mediaStream) {
    console.log('No stream');
    return;
  }
  console.log('Recording started');
  //   recorder = new MediaRecorder(stream);
  recorder = new MediaRecorder(mediaStream);
  recorder.ondataavailable = (e) => {
    console.log('data is available');
    chunks.push(e.data);
  };

  recorder.start();

  changeButtons([
    'green',
    'green',
    'blue',
    'blue',
    'green',
    'blue',
    'grey',
    'blue',
  ]);
};

const stopRecording = () => {
  if (!recorder) {
    console.log('No recorder');
    return;
  }
  console.log('Recording stopped');
  recorder.stop();
  changeButtons([
    'green',
    'green',
    'blue',
    'blue',
    'green',
    'green',
    'blue',
    'blue',
  ]);
};

playRecording = () => {
  if (!chunks.length) {
    console.log('No chunks');
    return;
  }

  const blob = new Blob(chunks, {
    type: 'video/webm',
  });

  recordedVideoEl.src = URL.createObjectURL(blob);

  recordedVideoEl.play();
  changeButtons([
    'green',
    'green',
    'blue',
    'blue',
    'green',
    'green',
    'green',
    'blue',
  ]);
};
