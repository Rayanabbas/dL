// src/data/appointments.js
export const APPOINTMENTS = [
  {
    id: 'next-1',
    when: 'Vendredi 17 Octobre 2025 - 11:00',
    doctorId: 'pasquet',
    type: 'Deuxième consultation de généraliste',
    address: '106 Rue Réaumur - 75002 Paris',
    sector: 'Conventionné secteur 2',
    isPast: false,
  },
  {
    id: 'past-1',
    when: 'Vendredi 9 mars 2025 - 9:00',
    doctorId: 'bensaid',
    type: 'Première consultation',
    address: '7 Rue Bergère - 75009 Paris',
    sector: 'Consulter le rapport',
    isPast: true,
  },
]
