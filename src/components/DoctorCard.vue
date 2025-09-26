<template>
  <article class="card">
    <div class="photo" :style="bgImage(doctor.photo)"></div>

    <div class="body">
      <div class="top">
        <a href="#" class="name">{{ doctor.name }}</a>
        <div class="rating" :aria-label="`Note ${doctor.rating}/5`">
          <span v-for="i in 5" :key="i">{{ i <= rounded ? '★' : '☆' }}</span>
          <small>{{ doctor.rating.toFixed(1) }}</small>
        </div>
      </div>

      <div class="spec">{{ doctor.specialty }}</div>

      <div class="row">
        <span class="pin">📍</span>
        <span>{{ doctor.address }}</span>
      </div>

      <div class="row">
        <span class="shield">🛡️</span>
        <span>{{ doctor.sector }}</span>
      </div>

      <div class="tags">
        <span v-if="doctor.emergency" class="pill">Reçoit en urgence</span>
        <span class="pill grey">{{ doctor.city }}</span>
      </div>
    </div>

    <button class="cta" @click="$emit('book', doctor)">Prendre RDV</button>
  </article>
</template>

<script setup>
const props = defineProps({ doctor: { type: Object, required: true } })
const rounded = Math.round(props.doctor.rating || 0)
function bgImage (src){ return { backgroundImage:`url(${src})`, backgroundSize:'cover', backgroundPosition:'center' } }
</script>

<style scoped>
.card{
  display:grid;grid-template-columns:88px 1fr auto;gap:14px;align-items:center;
  background:#fff;border:1px solid #e8eef6;border-radius:18px;padding:14px;
  box-shadow:0 10px 22px rgba(0,0,0,.06)
}
.photo{width:88px;height:88px;border-radius:16px;background:#e2e7f1}
.body{min-width:0}
.top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.name{color:#1370d2;font-weight:900}
.rating{white-space:nowrap;font-size:14px;color:#ffb400}
.rating small{color:#6a7a90;margin-left:4px}
.spec{color:#2b3952;font-weight:700;margin:2px 0 8px}
.row{display:flex;align-items:center;gap:8px;color:#2b3952;font-size:13px;margin:4px 0}
.pill{display:inline-block;background:#fff;border:1px solid #e8eef6;border-radius:999px;padding:4px 10px;font-weight:800;font-size:12px;margin-right:6px}
.pill.grey{background:#f6f8fb}
.cta{background:#0a3d62;color:#fff;border-radius:999px;padding:10px 14px;font-weight:900}
@media (max-width: 480px){
  .card{grid-template-columns:72px 1fr;grid-auto-flow:row}
  .cta{grid-column:1 / -1;justify-self:end;margin-top:8px}
  .photo{width:72px;height:72px}
}
</style>

