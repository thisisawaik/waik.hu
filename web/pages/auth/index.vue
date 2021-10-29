<template src="./index.html" />

<script src="./index.ts" />

<style lang="scss" scoped>
.background {
  background-image: url(https://media.discordapp.net/attachments/603942574054440961/855965324637110292/1.png?width=1193&height=671);
  background-position: center;
  background-size: cover;
  height: calc(100vh - 100px);
}
.split {
  height: calc(100vh - 100px);
  width: 50%;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  padding-top: 20px;
}
/* Control the left side */
.left {
  left: 0;
}
/* Control the right side */
.right {
  right: 0;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
