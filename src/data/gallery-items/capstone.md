---
title: Project SuperLIMBinal
thumb: "./capstone/hand-phone.jpg"
order: 3
images:
  - "./capstone/hand-open.jpg"
  - "./capstone/hand-closed.jpg"
  - "./capstone/prototype.jpg"
  - "./capstone/pcb.jpg"
  - "./capstone/hand-phone.jpg"
---
Developed for my capstone project at the University of Windsor with Claudia Lutfallah in 2018, Project SuperLIMBinal is a system to detect gestures using muscle activation signals and transmit them wirelessly to a robotic arm.

After being unimpressed with the widely available single-channel [MyoWare sensor](https://www.sparkfun.com/products/13723), we built our own with more channels for less money. The decoding of gestures works using sparse nonnegative matrix factorization, which we learned about for the purposes of gesture detection from a [very interesting paper](https://pubmed.ncbi.nlm.nih.gov/19272889/). I did the software portions of this project, and some of the electronics prototyping and development. It was pretty neat.

You can check out the codebase for this project [here, on GitHub](https://github.com/sakibc/project-SuperLIMBinal).

<!-- We designed and tested the filter circuit together in MATLAB, after which I built the prototype 8-channel EMG signal detector on perfboard. When it worked as expected, I redesigned it to fit on a PCB, ordered it, and put it together into a modern marvel of miniaturization. The signals were read using an Arduino Nano, programmed to measure the 8 voltage levels and dump them into its serial port as fast as the poor AVR328P could handle. 200 Hz turned out to be enough for us. -->

 <!-- After implementing and getting it working on prerecorded data in MATLAB, I rewrote it in Python using NumPy and SciPy to do the processing in real time on a Raspberry Pi. The detected gestures and confidence levels were then transmitted over Wi-Fi to another Raspberry Pi controlling our 3D-printed robotic arm. To control the system, I wrote the frontend as a single-page application that let the user train and operate the system. It was pretty neat. -->

