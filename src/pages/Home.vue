<!-- src/pages/Home.vue -->
<template>
  <div class="page">
    <!-- HERO BLEU + emoji -->
    <header class="hero">
      <div class="top">
        <div class="logo">Doctolib</div>
        <div class="avatar">A</div>
      </div>

      <h2 class="claim">Je t’accompagne<br><span>aujourd’hui !</span></h2>

      <!-- Grand emoji en arrière-plan -->
      <div class="emoji-bg">😊</div>

      <!-- Barre de recherche -->
      <div class="search-wrap">
        <button class="loupe">🔍</button>
        <input
          ref="searchRef"
          class="search"
          type="search"
          placeholder="Nom, spécialité, établissement"
          v-model="query"
          @focus="openSearchList()"
          @input="openSearchList()"
        />
      </div>
    </header>

    <!-- Titre section -->
    <h3 class="section-title">De quoi as-tu besoin ?</h3>

    <!-- AGENDA -->
    <section class="agenda">
      <div class="agenda-head">
        <div class="ttl">📅 Actualité de ton agenda</div>
        <div class="chevs">
          <button class="round">‹</button>
          <button class="round">›</button>
        </div>
      </div>

      <article class="agenda-card">
        <div class="datecol">
          <div class="dayline"><strong>Vendredi 17 Octobre 2025</strong></div>
          <div class="hour">11:00</div>
        </div>
        <div class="infocol">
          <div class="line">
            <strong>Dr Jean-Pierre Pasquet</strong> – <a href="#" class="link">Consultation</a>
          </div>
          <div class="spec">Médecin généraliste</div>
        </div>
      </article>

      <div class="cta-zone">
        <RouterLink class="cta" to="/appointments">Mes rendez-vous</RouterLink>
      </div>
    </section>

    <!-- Dernières consultations -->
    <section class="last-consults">
      <h4>Mes dernières consultations</h4>
      <article class="lc-card">
        <img class="lc-avatar" :src="byId('bensaid')?.photo" alt="">
        <div class="lc-info">
          <div class="lc-title"><strong>Dr Alexandre Bensaid</strong></div>
          <div class="lc-spec">Cardiologue</div>
        </div>
        <a href="#" class="lc-link">Voir le compte rendu →</a>
      </article>
      <button class="repro">Reprogrammer un consultation ?</button>
    </section>

    <!-- Nos soignants -->
    <section class="carrou">
      <h4>Mes soignants</h4>
      <div class="doc-line" v-for="d in doctors.slice(0,2)" :key="d.id">
        <img :src="d.photo" class="mini" alt="">
        <div class="mini-info">
          <div class="name">{{ d.name }}</div>
          <div class="spec">{{ d.specialty }}</div>
        </div>
        <div class="addr">📍 {{ d.address }}</div>
        <span class="chev">›</span>
      </div>
    </section>

    <!-- Listings promo -->
    <section class="promo">
      <h4>je t’aide à trouver<br/><span class="big">Les praticiens adaptés à ta recherche !</span></h4>

      <div class="promo-row">
        <article class="promo-card yellow">
          <div class="badge">⏱ Reçoit en urgence</div>
          <div class="promo-name">Dr Jean Dujardin</div>
          <div class="promo-spec">Médecin généraliste</div>
          <img :src="byId('pasquet')?.photo" class="promo-img" alt="">
        </article>

        <article class="promo-card blue">
          <div class="badge">⏱ Reçoit en urgence</div>
          <div class="promo-name">Dr Pierre Drip</div>
          <div class="promo-spec">Cardiologue</div>
          <img :src="byId('drip')?.photo" class="promo-img" alt="">
        </article>
      </div>
    </section>

    <!-- Infos santé -->
    <section class="health">
      <h4>Tes infos santé bien rangées <span class="heart">💛</span></h4>
      <div class="grid">
        <article class="docu">
          <h5>Mes Documentats</h5>
          <p>Retrouve tes ordonnances, comptes rendus et suivis médicaux dans un espace centralisé et confidentiel.</p>
        </article>
        <article class="ante">
          <h5>Mes Antécédents</h5>
          <p>Suis tes rendez-vous et données clés, simples et adaptées à tes besoins.</p>
        </article>
      </div>
      <div class="health-cta">
        <a href="#" class="cta big">Ma santé</a>
      </div>
    </section>

    <!-- BottomNav -->
    <BottomNav @open-search="openSearchList(true)" />

    <!-- ====== LISTE DE RECHERCHE (s’ouvre au clic sur la barre) ====== -->
    <div v-if="searchOpen" class="overlay" @click.self="closeSearch">
      <div class="panel">
        <div class="panel-head">
          <input
            ref="searchRef2"
            class="panel-input"
            type="search"
            placeholder="Nom, spécialité, établissement"
            v-model="query"
          />
          <button class="panel-close" @click="closeSearch">✕</button>
        </div>

        <ul class="panel-list">
          <li v-for="doc in filtered" :key="doc.id" class="row">
            <img :src="doc.photo" class="row-img" alt="">
            <div class="row-body">
              <div class="row-name">{{ doc.name }}</div>
              <div class="row-spec">{{ doc.specialty }}</div>
              <div class="row-addr">📍 {{ doc.address }}</div>
            </div>
            <button class="row-book">Prendre RDV</button>
          </li>
          <li v-if="!filtered.length" class="empty">Aucun résultat…</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
import { DOCTORS } from '@/data/doctors'
import { useRoute } from 'vue-router'

const route = useRoute()
const doctors = DOCTORS

function byId(id){ return doctors.find(d => d.id===id) }

// — Recherche
const query = ref('')
const searchOpen = ref(false)
const searchRef = ref(null)
const searchRef2 = ref(null)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if(!q) return doctors
  return doctors.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.specialty.toLowerCase().includes(q) ||
    d.address.toLowerCase().includes(q)
  )
})

function openSearchList(fromNav=false){
  searchOpen.value = true
  // focus input du panneau
  nextTick(() => (searchRef2.value?.focus()))
  if(fromNav) query.value = ''
}
function closeSearch(){ searchOpen.value = false }

onMounted(() => {
  // si on vient de la bottom-nav "Recherche"
  if(route.query.openSearch === '1'){
    openSearchList(true)
  }
  // fermer avec Échap
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeSearch() })
})
</script>

<style scoped>
.page{ max-width:980px; margin:0 auto; padding-bottom:4.8rem; }

/* HERO */
.hero{
  position:relative; background:#0d63ce; color:#fff;
  padding:1.25rem 1.25rem 5.5rem; border-radius:0 0 2rem 2rem;
  overflow:hidden;
}
.top{ display:flex; justify-content:space-between; align-items:center; }
.logo{ font-weight:800; font-style:italic; letter-spacing:.5px; opacity:.95; }
.avatar{ width:34px; height:34px; border-radius:50%; background:#ffd15a; color:#0b2a49; display:grid; place-items:center; font-weight:800; }
.claim{ margin:1rem 0 0; font-weight:800; line-height:1.15; font-size:2.15rem; }
.claim span{ font-size:2.3rem; }
.emoji-bg{
  position:absolute; inset:auto -140px -120px -140px; top:0;
  font-size:22rem; text-align:center; opacity:.22; filter:blur(1px);
  pointer-events:none;
}

/* Search bar */
.search-wrap{
  position:absolute; left:50%; transform:translateX(-50%);
  bottom:-26px; width:min(760px, calc(100% - 2.5rem));
  background:#fff; border-radius:999px; box-shadow:0 10px 40px rgba(0,0,0,.12);
  display:flex; align-items:center; padding:.55rem .9rem; gap:.5rem;
}
.loupe{ border:none; background:#ffd15a; width:34px; height:34px; border-radius:999px; }
.search{ flex:1; border:none; outline:none; font-size:1rem; }

/* Section titles */
.section-title{ text-align:center; margin:3.2rem 0 1.2rem; color:#0b2a49; }

/* Agenda */
.agenda{ background:#f7f9fd; margin:0 1rem; padding:1rem; border-radius:1.2rem; box-shadow:0 10px 30px rgba(16,39,85,.08); }
.agenda-head{ display:flex; justify-content:space-between; align-items:center; }
.ttl{ font-weight:800; color:#fff; background:#1560d0; padding:.85rem 1rem; border-radius:.9rem; }
.chevs{ display:flex; gap:.55rem; }
.round{ width:34px; height:34px; border-radius:999px; border:none; background:#fff; box-shadow:0 2px 8px rgba(16,39,85,.15); }
.agenda-card{ margin-top:.75rem; background:#fff; border:1px solid #e8edf3; border-radius:.9rem; display:grid; grid-template-columns:120px 1fr; }
.dayline{ padding:.8rem .9rem .2rem; }
.hour{ font-weight:900; font-size:1.4rem; padding:0 .9rem .9rem; }
.infocol{ padding:.8rem .9rem; }
.link{ color:#1560d0; font-weight:800; text-decoration:none; }
.cta-zone{ display:flex; justify-content:center; padding:1rem 0 .2rem; }
.cta{ background:#ffd15a; color:#0b2a49; font-weight:900; padding:.7rem 1.1rem; border-radius:.8rem; text-decoration:none; box-shadow:0 8px 18px rgba(255,209,90,.4); }

/* Last consults */
.last-consults{ padding:1.25rem; }
.last-consults h4{ margin:.2rem 0 1rem; color:#0b2a49; }
.lc-card{ background:#fff; border:1px solid #e8edf3; border-radius:1rem; padding:.8rem; display:grid; grid-template-columns:auto 1fr auto; gap:.8rem; align-items:center; }
.lc-avatar{ width:44px; height:44px; border-radius:50%; object-fit:cover; }
.lc-link{ color:#1560d0; text-decoration:none; font-weight:800; }
.repro{ margin:1rem auto 0; display:block; background:#eaf2ff; border:1px solid #cfe0ff; color:#0b2a49; border-radius:999px; padding:.55rem 1rem; }

/* Carrou */
.carrou{ padding:0 1.25rem 1rem; }
.doc-line{ display:grid; grid-template-columns:auto 1fr auto auto; gap:.7rem; align-items:center; background:#fff; border:1px solid #e8edf3; border-radius:1rem; padding:.6rem .8rem; margin:.5rem 0; }
.mini{ width:38px; height:38px; border-radius:50%; object-fit:cover; }
.addr{ opacity:.8; }
.chev{ font-size:1.5rem; }

/* Promo */
.promo{ padding:0 1.25rem 1.25rem; }
.promo h4{ margin:.4rem 0 1rem; color:#0b2a49; }
.promo .big{ font-weight:800; }
.promo-row{ display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
.promo-card{ position:relative; overflow:hidden; border-radius:1.2rem; padding:1rem; min-height:170px; }
.promo-card.yellow{ background:#ffd15a; }
.promo-card.blue{ background:#dfeaff; }
.badge{ background:#fff; padding:.35rem .6rem; border-radius:999px; font-weight:800; display:inline-block; margin-bottom:.5rem; }
.promo-name{ font-weight:900; }
.promo-spec{ opacity:.85; margin-bottom:.5rem; }
.promo-img{ position:absolute; right:0; bottom:0; width:55%; height:auto; object-fit:cover; }

/* Health */
.health{ padding:0 1.25rem 2rem; }
.grid{ display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
.docu{ background:#0c57d2; color:#fff; border-radius:1.2rem; padding:1rem; }
.ante{ background:#ffd15a; color:#0b2a49; border-radius:1.2rem; padding:1rem; }
.health-cta{ display:flex; justify-content:center; margin-top:1rem; }
.cta.big{ padding:.85rem 1.4rem; }

/* Overlay (recherche) */
.overlay{
  position:fixed; inset:0; background:rgba(6,20,43,.25); backdrop-filter:blur(2px);
  display:flex; align-items:flex-start; justify-content:center; padding:5rem 1rem 2rem; z-index:100;
}
.panel{
  width:min(840px,100%); background:#fff; border-radius:1rem; overflow:hidden;
  box-shadow:0 20px 60px rgba(6,20,43,.25);
}
.panel-head{ display:flex; gap:.5rem; padding:.7rem; border-bottom:1px solid #eef1f4; }
.panel-input{ flex:1; border:1px solid #e3e9f2; border-radius:.6rem; padding:.55rem .7rem; outline:none; }
.panel-close{ border:none; background:#f2f5fb; border-radius:.6rem; padding:.55rem .7rem; font-weight:800; }
.panel-list{ max-height:60vh; overflow:auto; }
.row{ display:grid; grid-template-columns:auto 1fr auto; gap:.9rem; align-items:center; padding:.8rem; border-bottom:1px solid #f3f6fb; }
.row-img{ width:56px; height:56px; border-radius:50%; object-fit:cover; }
.row-name{ font-weight:800; }
.row-spec,.row-addr{ opacity:.85; }
.row-book{ background:#ffd15a; border:none; border-radius:.7rem; padding:.5rem .8rem; font-weight:800; color:#0b2a49; }
.empty{ padding:1rem; text-align:center; color:#556; }
@media (max-width:780px){
  .promo-row,.grid{ grid-template-columns:1fr; }
  .agenda-card{ grid-template-columns:1fr; }
}
</style>





