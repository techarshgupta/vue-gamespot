import Vue from 'vue'
import App from './App.vue'
import router from  './routes'
import store from './Store/store'


/* GLOBAL BUTTON */
import compButton from './components/UI/button';
Vue.component('app-button', compButton);


/* MATERIAL DESIGN */
import { MdCard, MdButton, MdDialog, MdContent, MdTable, MdDialogConfirm } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
Vue.use(MdCard);
Vue.use(MdButton);
Vue.use(MdDialog);
Vue.use(MdContent);
Vue.use(MdTable);
Vue.use(MdDialogConfirm);


/* RESOURCE */
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'https://gamespot-b2d43.firebaseio.com/';


/* MISC (VALIDATE)*/
import vuelidate from 'vuelidate'
import wysiwyg from "vue-wysiwyg"
Vue.use(vuelidate);
Vue.use(wysiwyg, {}); // config is optional. more below

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
