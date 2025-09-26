<template>
  <main class="search-page">
    <!-- Bandeau -->
    <header class="hero">
      <h1>Que recherchons nous&nbsp;?</h1>

      <div class="searchbar">
        <img :src="assets.search" alt="" />
        <input
          v-model="q"
          type="text"
          placeholder="Nom, spécialité, établissement"
          @input="applyFilters"
          @keyup.enter="submit"
        />
      </div>
    </header>

    <section class="container">
      <!-- Filtres spécialités -->
      <ul class="specs">
        <li
          v-for="s in specialties"
          :key="s"
          :class="{ active: chosen === s }"
          @click="toggleSpec(s)"
        >
          {{ s }}
        </li>
        <li v-if="chosen || q" class="clear" @click="clearFilters">Tout</li>
      </ul>

      <!-- Titre selon l'état -->
      <h2 class="listTitle">
        <template v-if="chosen">
          {{ chosen }} — {{ filtered.length }} praticien(s)
        </template>
        <template v-else>
          Tous les praticiens — {{ filtered.length }}
        </template>
      </h2>

      <!-- Liste -->
      <div v-if="filtered.length" class="results">
        <DoctorCard
          v-for="d in filtered"
          :key="d.id"
          :doctor="d"
          @book="book"
        />
      </div>

      <div v-else class="empty">
        Aucun praticien trouvé.
        <button @click="clearFilters">Réinitialiser</button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DoctorCard from '@/components/DoctorCard.vue'
import doctors from '@/data/doctors'

import searchIco from '@/assets/icon-search.svg'
const assets = { search: searchIco }

/* Spécialités disponibles (doivent correspondre aux valeurs de doctors.js) */
const specialties = [
  'Médecin généraliste',
  'Cardiologue',
  'Dermatologue',
  'Gynécologue',
  'Pédiatre',
  'Ophtalmologiste',
  'Orthopédiste'
]

const router = useRouter()
const route = useRoute()

/* États */
const q = ref((route.query.q || '').toString())
const chosen = ref((route.query.spec || '').toString())

/* Garder l’URL synchronisée avec les filtres (mais liste complète par défaut) */
function applyFilters () {
  const query = {}
  if (q.value.trim()) query.q = q.value.trim()
  if (chosen.value) query.spec = chosen.value
  router.replace({ path: '/search', query })
}
watch(() => route.query, (nv) => {
  q.value = (nv.q || '').toString()
  chosen.value = (nv.spec || '').toString()
})

/* Filtrage : si aucun filtre => TOUTE la liste (triée) */
const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  const spec = chosen.value
  return doctors
    .filter(d => {
      const byText = !s || [d.name, d.specialty, d.city, d.address]
        .some(v => v.toLowerCase().includes(s))
      const bySpec = !spec || d.specialty === spec
      return byText && bySpec
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
})

/* Actions UI */
function toggleSpec (spec) {
  chosen.value = (chosen.value === spec) ? '' : spec
  applyFilters()
  nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
}
function clearFilters () {
  q.value = ''
  chosen.value = ''
  applyFilters()
}
function submit () {
  if (!q.value.trim()) return
  applyFilters()
}
function book (d) {
  alert(`Prendre RDV avec ${d.name}`)
}
</script>

<style scoped>
*{box-sizing:border-box}
.search-page{--blue:#0d63c7;--ink:#0b2744;--bg:#f6f8fb;--border:#e8eef6}
.search-page{background:var(--bg);min-height:100vh;color:var(--ink);padding-bottom:32px}

.hero{background:var(--blue);color:#fff;text-align:center;padding:28px 16px 72px;
  border-bottom-left-radius:22px;border-bottom-right-radius:22px}
.hero h1{margin:0 0 10px;font-size:clamp(22px,4.5vw,34px);line-height:1.15}

.searchbar{position:relative;max-width:920px;margin:-26px auto 0;padding:0 16px}
.searchbar>img{position:absolute;left:28px;top:50%;transform:translateY(-50%);width:18px}
.searchbar>input{
  width:100%;padding:14px 18px 14px 52px;
  border-radius:999px;border:1px solid var(--border);background:#fff;
  box-shadow:0 16px 32px rgba(0,0,0,.12);font-size:16px;color:#1b2a3a;outline:0
}

.container{max-width:960px;margin:22px auto 0;padding:0 16px}

/* Chips de spécialités */
.specs{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0 0 14px;padding:0}
.specs li{
  border:1px solid var(--border);background:#fff;border-radius:999px;
  padding:8px 12px;font-weight:800;font-size:14px;cursor:pointer
}
.specs li.active{background:#0a3d62;color:#fff;border-color:#0a3d62}
.specs li.clear{background:#f1f4f9}

/* Liste */
.listTitle{margin:6px 0 10px;font-size:18px;color:#2b3952}
.results{display:grid;gap:12px}
.empty{background:#fff;border:1px solid var(--border);border-radius:18px;padding:24px;text-align:center}
.empty button{margin-top:12px;border:1px solid var(--border);border-radius:999px;padding:8px 12px;font-weight:700;background:#fff}
</style>
