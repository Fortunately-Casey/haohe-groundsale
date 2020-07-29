<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.van-checkbox__icon--checked {
  border: 1px solid #fff !important;
}
.van-uploader__preview-image {
  width: 130px !important;
}
.van-uploader__upload {
  width: 130px !important;
}
</style>
