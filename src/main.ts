import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'animate.css/animate.min.css'

//组件
import MyForm from './components/MyForm.vue'
import MyTable from './components/MyTable.vue'

var app = createApp(App)

app.component("MyForm", MyForm).component("MyTable", MyTable)

app.use(store).use(router).use(Antd).mount('#app')


