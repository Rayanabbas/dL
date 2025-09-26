<!-- src/pages/Appointments.vue -->
<template>
  <div class="wrap">
    <header class="hero">
      <h1>Mes<br />rendez-vous</h1>
      <div class="emoji">🙂</div>
    </header>

    <section class="tabs">
      <button :class="{on: tab==='next'}" @click="tab='next'">À venir</button>
      <button :class="{on: tab==='past'}" @click="tab='past'">Passés</button>
    </section>

    <section v-if="filtered.length" class="cards">
      <article v-for="rdv in filtered" :key="rdv.id" class="card">
        <div class="date">🕒 {{ rdv.when }}</div>
        <div class="line">
          <img class="avatar" :src="byId(rdv.doctorId)?.photo" alt="" />
          <div class="info">
            <h3>{{ byId(rdv.doctorId)?.name }}</h3>
            <p class="spec">{{ byId(rdv.doctorId)?.specialty }}</p>
            <p class="desc">{{ rdv.type }}</p>
            <p class="addr">📍 {{ rdv.address }}</p>
            <p class="sec">💳 {{ rdv.sector }}</p>
          </div>
          <span class="chev">›</span>
        </div>
      </article>
    </section>

    <div class="cta-zone">
      <RouterLink to="/" class="cta">Recherche</RouterLink>
    </div>

    <BottomNav @open-search="goHomeOpenSearch" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { DOCTORS } from '@/data/doctors'
import { APPOINTMENTS } from '@/data/appointments'
import BottomNav from '@/components/BottomNav.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tab = ref('next')
const filtered = computed(() => APPOINTMENTS.filter(a => tab.value==='next' ? !a.isPast : a.isPast))
const byId = id => DOCTORS.find(d => d.id===id)

function goHomeOpenSearch(){
  router.push({ path:'/', query: { openSearch: '1' } })
}
</script>

<style scoped>
.wrap{ max-width:980px; margin:0 auto; padding-bottom:4.5rem; }
.hero{
  background:#0d63ce; color:#fff; padding:2.5rem 1.25rem 3.25rem; border-radius:0 0 2rem 2rem;
}
.hero h1{ font-weight:800; line-height:1.15; font-size:2.2rem; margin:0; }
.emoji{ font-size:2.2rem; margin-top:.75rem; }

.tabs{ display:flex; gap:.8rem; padding:1rem 1.25rem; }
.tabs button{
  flex:1; padding:.6rem 1rem; border:none; border-radius:.75rem; background:#f2f5fb;
  color:#0d2a47; font-weight:700;
}
.tabs button.on{ background:#ffd15a; }

.cards{ display:grid; gap:1rem; padding:0 1.25rem; }
.card{ background:#fff; border:1px solid #e8edf3; border-radius:1rem; box-shadow:0 4px 18px rgba(16,39,85,.06); }
.date{ background:#ffe08c; padding:.5rem .9rem; border-radius:1rem 1rem 0 0; font-weight:700; }
.line{ display:grid; grid-template-columns:auto 1fr auto; gap:.9rem; padding:1rem; align-items:center; }
.avatar{ width:56px; height:56px; border-radius:50%; object-fit:cover; }
.info h3{ margin:0 0 .1rem 0; font-size:1rem; }
.spec{ margin:.1rem 0; color:#0b2a49; font-weight:600; }
.desc,.addr,.sec{ margin:.1rem 0; color:#334; font-size:.92rem; }
.chev{ font-size:1.8rem; color:#0b2a49; padding:0 .25rem; }

.cta-zone{ display:flex; justify-content:center; padding:1.25rem; }
.cta{
  background:#0d2a49; color:#fff; text-decoration:none; padding:.7rem 1.2rem; border-radius:.9rem; font-weight:800;
}
</style>








