import { createApp } from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue';
import '@/assets/less/common.less';

const app = createApp(App);
app.use(Vant);

app.mount('#app');
