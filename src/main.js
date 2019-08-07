import Vue from 'vue';

import router from './router/index';

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')

if (module.hot) {
	module.hot.accept();
}