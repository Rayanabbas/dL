<template>
  <main class="page">
    <header class="top"><RouterLink to="/">&larr; Accueil</RouterLink><h1>Santé</h1></header>
    <p>Conseils et documents médicaux (placeholder).</p>
    <BottomNav />
  </main>
</template>

<script setup>
import BottomNav from '@/components/BottomNav.vue'
</script>

<style scoped>
.page{padding:16px clamp(16px,4vw,28px) 80px;max-width:1100px;margin:0 auto}
.top{display:flex;align-items:center;gap:10px}
h1{margin-left:auto;margin-right:auto}
@media (min-width:1024px){ .page{padding-bottom:24px} }
</style>



