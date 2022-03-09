"use strict";

const audioContext = new AudioContext();

const container = document.querySelector(".container");
const canvas = document.querySelector("canvas");
// const file = document.querySelector("#fileupload");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
let audioSource;
let analyser;

// const btnAudioUpload = document.querySelector(".ip-aud");
const colors = ["#2a9d8f", "blue", "green", "white"];

container.addEventListener(
  "click",
  () => {
    const audio1 = document.querySelector(".aud-1");
    audio1.src = "/stream";

    // if (audioSource == undefined) {
    audioSource = audioContext.createMediaElementSource(audio1);
    // }

    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount; // bufferLength has half the value of the fftSize
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = canvas.width / 2 / bufferLength;
    let barHeight;

    const animate = () => {
      let x = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(dataArray);
      //
      drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
      //
      requestAnimationFrame(animate);
    };

    audio1.play();
    animate();
  },
  { once: true }
);

// Upload Music

// btnAudioUpload.addEventListener("click", function () {
//   file.click();
// });

// btnAudioUpload.style.borderColor = colors[0];
// btnAudioUpload.style.color = colors[0];

// file.addEventListener("change", function () {
//   console.log(this.files);

//   const files = this.files;

//   const audio1 = document.querySelector(".aud-1");
//   audio1.src = URL.createObjectURL(files[0]);

//   audio1.load();
//   audio1.play();
//   audioSource = audioContext.createMediaElementSource(audio1);
//   analyser = audioContext.createAnalyser();
//   audioSource.connect(analyser);
//   analyser.connect(audioContext.destination);
//   analyser.fftSize = 512;

//   const bufferLength = analyser.frequencyBinCount; // bufferLength has half the value of the fftSize
//   const dataArray = new Uint8Array(bufferLength);

//   const barWidth = canvas.width / 2 / bufferLength;
//   let barHeight;

//   const animate = () => {
//     let x = 0;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     analyser.getByteFrequencyData(dataArray);

//     drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);

//     requestAnimationFrame(animate);
//   };
//   animate();
// });

const drawVisualiser = (bufferLength, x, barWidth, barHeight, dataArray) => {
  for (let i = 0; i < bufferLength; i++) {
    const r = 200;
    const g = 200;
    const b = 255;
    const hue = i * 15;

    barHeight = dataArray[i] + 20;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i + (Math.PI * 4) / bufferLength);
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 20, barWidth, barHeight);
    x += barWidth;
    ctx.restore();
  }
};
