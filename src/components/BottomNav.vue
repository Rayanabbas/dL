<!-- src/components/BottomNav.vue -->
<template>
  <nav class="bottom">
    <RouterLink to="/" class="item" :class="{active: route.path==='/' }">
      <span class="ico">🏠</span><span>Accueil</span>
    </RouterLink>
    <button class="item" @click="$emit('open-search')">
      <span class="ico">🔍</span><span>Recherche</span>
    </button>
    <RouterLink to="/appointments" class="item" :class="{active: route.path==='/appointments'}">
      <span class="ico">📅</span><span>Agenda</span>
    </RouterLink>
    <a class="item" href="#">
      <span class="ico">❤️</span><span>Santé</span>
    </a>
    <a class="item" href="#">
      <span class="ico">👤</span><span>Profil</span>
    </a>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.bottom{
  position: sticky; bottom:0; left:0; right:0;
  display:flex; justify-content:space-around; gap:.25rem;
  padding:.4rem .5rem; background:#fff; border-top:1px solid #eef1f4;
  z-index:50;
}
.item{
  flex:1; display:flex; flex-direction:column; align-items:center;
  gap:.2rem; padding:.35rem 0; border-radius:.8rem; font-size:.8rem;
  color:#1f2b3a; text-decoration:none; background:transparent; border:none;
}
.item .ico{ font-size:1.1rem; line-height:1; }
.item.active{ color:#0059d6; }
.item:active{ transform:translateY(1px); }
</style>








