<template>
  <div class="enterprise-map">
    <div class="header">
      <div class="back" @click="back">
        <van-icon name="arrow-left" />返回
      </div>我的申请
      <div class="logout">退出登录</div>
    </div>
    <div id="map"></div>
    <van-action-sheet v-model="show" title="标题">
      <div class="content">
        <van-image
          width="130"
          height="80"
          style="margin-right:10px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          @click="choseImage"
        />
        <van-image
          width="130"
          height="80"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          @click="choseImage"
        />
        <div class="chose-button">选择摊位</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import esriLoader from "esri-loader";
// import * as api from "@/service/apiList";
// import http from "@/service/service";
import { Indicator } from "mint-ui";
import { ImagePreview } from "vant";
import { Notify } from "vant";
export default {
  data() {
    return {
      map: {},
      show: false,
    };
  },
  created() {
    let vm = this;
  },
  mounted() {
    let vm = this;
    Indicator.open();
    this.createMap();
  },
  methods: {
    back() {},
    blur() {
      blur();
    },
    choseImage() {
      ImagePreview([
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ]);
    },
    createMap() {
      let vm = this;
      esriLoader
        .loadModules([
          "esri/Basemap",
          "esri/Map",
          "esri/layers/TileLayer",
          "esri/layers/MapImageLayer",
          "esri/geometry/Point",
          "esri/views/MapView",
          "esri/symbols/SimpleMarkerSymbol",
          "esri/symbols/PictureMarkerSymbol",
          "esri/layers/GraphicsLayer",
          "esri/Graphic",
          "esri/tasks/IdentifyTask",
          "esri/tasks/support/IdentifyParameters",
          "esri/tasks/support/Query",
          "esri/tasks/QueryTask",
          "esri/tasks/support/BufferParameters",
          "esri/geometry/SpatialReference",
          "esri/geometry/Circle",
        ])
        .then(function ([
          Basemap,
          Map,
          TileLayer,
          MapImageLayer,
          Point,
          MapView,
          SimpleMarkerSymbol,
          PictureMarkerSymbol,
          GraphicsLayer,
          Graphic,
          IdentifyTask,
          IdentifyParameters,
          Query,
          QueryTask,
          BufferParameters,
          SpatialReference,
          Circle,
        ]) {
          const dynamicLayer = new TileLayer({
            url: "/gis/arcgis/rest/services/NT/DLG_1000_201900/MapServer",
          });
          // const imageLayer = new MapImageLayer({
          //   url: "/map/arcgis/rest/services/NTWD/NTWDMapService/MapServer",
          // });
          const dynamicBasemap = new Basemap({
            baseLayers: [dynamicLayer],
            id: "dynamicLayer",
          });
          const myMap = new Map({
            basemap: dynamicBasemap,
          });
          vm.map = myMap;
          // myMap.add(imageLayer);
          let localPoint = new Point({
            x: 120.86807349300973,
            y: 32.25165337310691,
            spatialReference: {
              wkid: 4490,
            },
          });
          // let point = new Point({
          //   x: Number(vm.location.longitude),
          //   y: Number(vm.location.latitude),
          //   spatialReference: {
          //     wkid: 4490,
          //   },
          // });
          const myView = new MapView({
            container: "map",
            map: myMap,
            zoom: 13,
            logo: false,
            slider: false,
          });
          vm.view = myView;
          vm.view.goTo({
            target: localPoint,
            zoom: 13,
          });
          // if (vm.$route.query.companyID) {
          //   http
          //     .get(api.COMPANYINFOBYTEMP, {
          //       companyID: vm.$route.query.companyID
          //     })
          //     .then(resp => {
          //       Indicator.close();
          //       if (resp.data.data) {
          //         vm.enterpriseName = resp.data.data.companyName;
          //         vm.id = resp.data.data.companyID;
          //         let point1 = new Point({
          //           x: Number(resp.data.data.longitude),
          //           y: Number(resp.data.data.latitude),
          //           spatialReference: {
          //             wkid: 4490
          //           }
          //         });
          //         vm.view.goTo({
          //           target: point1,
          //           zoom: 14
          //         });
          //       }
          //     });
          // } else {

          // }
          // var bluelocSymbol = new PictureMarkerSymbol(blueloc, 24, 26);
          // var startPointGraphic = new Graphic(point, bluelocSymbol);
          // let graphiclayer = new GraphicsLayer({
          //   id: "location",
          // });
          // graphiclayer.add(startPointGraphic);
          // vm.map.add(graphiclayer);
          // Indicator.close();
          vm.view.on("click", function (result) {
            vm.show = true;
            // var queryTask = new QueryTask({
            //   url: "/map/arcgis/rest/services/NTWD/NTWDMapService/MapServer/1"
            // });
            // var circle = new Circle(result.mapPoint, {
            //   radius: 40
            // });
            // var query = new Query({
            //   returnGeometry: true,
            //   where: "1=1",
            //   outFields: ["*"]
            // });
            // query.geometry = circle;
            // query.distance = 20;
            // queryTask.execute(query).then(resp => {
            //   if (resp.features[0]) {
            //     let params = {
            //       companyID: resp.features[0].attributes.Id
            //     };
            //     http.get(api.COMPANYINFOBYTEMP, params).then(resp => {
            //       Indicator.close();
            //       if (resp.data.data) {
            //         vm.enterpriseName = resp.data.data.companyName;
            //         vm.id = resp.data.data.companyID;
            //         vm.$router.push({
            //           path: "/enterpriseDetail",
            //           query: {
            //             companyID: vm.id
            //           }
            //         });
            //       }
            //       console.log(resp.data.data);
            //     });
            //   } else {
            //     Indicator.close();
            //   }
            // });
          });
          vm.view.on("layerview-create", function () {
            Indicator.close();
          });
        });
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
@import url("/static/arcgis/esri.css");
.enterprise-map {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  .header {
    height: 40px;
    background-color: #ed8936;
    color: #fff;
    text-align: center;
    line-height: 40px;
    position: relative;
    font-size: 16px;
    .back {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .logout {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
  }
  #map {
    flex: 1;
    padding: 0;
    position: relative;
    border: none;
  }
  .content {
    display: flex;
    justify-content: center;
    padding-bottom: 70px;
    .chose-button {
      width: 250px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      border-radius: 4px;
      color: #fff;
      background: #ed8936;
      font-size: 16px;
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
    }
  }
}
</style>
