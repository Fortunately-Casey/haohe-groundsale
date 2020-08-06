import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "lib-flexible/flexible.js";
import '@/assets/css/reset.css';
import Vant from "vant";
import "vant/lib/index.css";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
// import esriLoader from "esri-loader";

Vue.config.productionTip = false
// import esriLoader from "esri-loader";
// esriLoader.loadScript({
//   dojoConfig: {
//     async: true,
//     packages: [
//       {
//         location: "/static",
//         name: "static"
//       }
//     ]
//   },
//   // url: "https://js.arcgis.com/4.15/init.js"
//   url: "/static/arcgis/init.js"
// });

Vue.use(Vant);
Vue.use(Mint);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
