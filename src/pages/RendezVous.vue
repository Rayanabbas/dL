<template>
  <main class="page">
    <header class="head">
      <h1 class="t1">Mes rendez-vous</h1>
      <div class="emoji">🙂</div>
    </header>

    <section class="container">
      <div class="tabs">
        <button class="tab active">À venir</button>
        <button class="tab">Passés</button>
      </div>

      <article class="card">
        <div class="badge">Vendredi le 17 octobre 2025 – 9h00</div>
        <div class="row">
          <img v-if="photo" :src="photo" class="avatar" alt="">
          <div class="col">
            <div class="name">Dr Jean-Pierre Pasquet</div>
            <div class="spec">Médecin généraliste</div>
            <div class="addr">106 Rue Réaumur – 75002 Paris</div>
          </div>
          <div class="go">›</div>
        </div>
      </article>

      <div class="center"><RouterLink to="/search" class="btn">Recherche</RouterLink></div>
    </section>

    <BottomNav/>
  </main>
</template>

<script setup>
import BottomNav from '@/components/BottomNav.vue'
const files = import.meta.glob('../assets/*', { eager:true, as:'url' })
const photo = files['../assets/doctor-dujardin.jpg'] || ''
</script>

<style scoped>
:root{ --bg:#F6F8FC; --ink:#0D2C4A; --blue:#0D5AB0; --card:#fff; --shadow:0 18px 36px rgba(13,44,74,.12); }
.page{ background:var(--bg); color:var(--ink); min-height:100dvh; }
.head{ background:linear-gradient(180deg,#0A5DB3 0%, #0D5AB0 100%); color:#fff; text-align:center; padding:28px 16px; }
.t1{ margin:0; font-weight:800; }
.emoji{ font-size:34px; margin-top:6px; }
.container{ width:min(900px,92vw); margin:18px auto 24px; }
.tabs{ display:flex; gap:10px; margin:8px 0 14px; }
.tab{ background:#fff; border:1px solid #E7EEF7; border-radius:999px; padding:8px 14px; }
.tab.active{ border-color:#0D5AB0; color:#0D5AB0; font-weight:700; }
.card{ background:#fff; border-radius:16px; padding:14px; box-shadow:var(--shadow); }
.badge{ display:inline-block; background:#FFE081; border-radius:999px; padding:8px 12px; font-weight:800; }
.row{ display:grid; grid-template-columns:auto 1fr auto; gap:12px; align-items:center; margin-top:12px; }
.avatar{ width:56px; height:56px; border-radius:50%; object-fit:cover; }
.name{ font-weight:800; } .spec{ opacity:.7; } .addr{ opacity:.8; }
.go{ font-size:28px; opacity:.5; }
.center{ display:grid; place-items:center; margin-top:18px; }
.btn{ background:#0D5AB0; color:#fff; padding:10px 16px; border-radius:999px; text-decoration:none; font-weight:800; }
</style>
