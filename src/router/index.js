// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Appointments from '@/pages/Appointments.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/appointments', component: Appointments },
  ],
  scrollBehavior(){ return { top: 0 } }
})










