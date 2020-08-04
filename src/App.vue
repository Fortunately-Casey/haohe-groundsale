<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x:hidden;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
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
.esri-widget {
  display: none!important;
}
.esri-view .esri-view-surface--touch-none::after {
  content: ""!important;
  border: none!important;
  color: rgba(0, 0, 0, 0)!important;
}
.mint-indicator-wrapper {
  z-index: 999!important;
}
.van-field__control:disabled {
  color: #323233!important;
}
.van-field--disabled .van-field__label{
  color: #646566!important;
}
.van-uploader__wrapper--disabled {
  opacity: 1!important;
}
</style>
