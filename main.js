import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueRouter from 'vue-router';
import Registro from './components/Registro.vue';
import Test from './components/Test.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/registro' },
  { path: '/registro', component: Registro, name: 'Registro' },
  { path: '/test', component: Test, name: 'Test' }
];

const router = new VueRouter({
  routes
});

new Vue({
  vuetify: new Vuetify(),
  router,
  render: h => h(App)
}).$mount('#app');
