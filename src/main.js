import './assets/main.css'

import { createApp } from 'vue'

// a state management library so we can store the user's state
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import { useUserStore } from './stores/user'

const app = createApp(App)
const pinia = createPinia()

// sets the baseURL for all the requests that will be sent by Axios
axios.defaults.baseURL = 'http://127.0.0.1:8000'

app.use(pinia)
app.use(router, axios)

app.mount('#app')

const userStore = useUserStore(pinia)

window.pinia = pinia
window.userStore = userStore

