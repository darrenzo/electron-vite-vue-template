import { createApp } from 'vue'

import './permission'
import App from './App.vue'
import router from './router'
import { errorHandler } from './error'

const app = createApp(App)
app.use(router)
errorHandler(app)

app.mount('#app')

