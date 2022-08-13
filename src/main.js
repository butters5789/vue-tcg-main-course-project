import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store/index';

import BaseBadge from './components/ui/BaseBadge.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';

const vueApp = createApp(App);

vueApp.use(router);
vueApp.use(store);

vueApp.component('base-badge', BaseBadge);
vueApp.component('base-button', BaseButton);
vueApp.component('base-card', BaseCard);

vueApp.mount('#app');
