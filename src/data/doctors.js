// src/data/doctors.js
// — Photos (assure-toi que ces fichiers existent dans src/assets/)
import dujardin from '@/assets/doctor-dujardin.jpg'
import drip     from '@/assets/doctor-drip.jpg'
import bensaid  from '@/assets/doctor-bensaid.jpg'   // nom exact de ton fichier
import claire   from '@/assets/doctor-claire.jpg'    // optionnel si tu l’as
import amine    from '@/assets/doctor-amine.jpg'     // optionnel
import thomas   from '@/assets/doctor-thomas.jpg'    // optionnel

export const DOCTORS = [
  {
    id: 'pasquet',
    name: 'Dr Jean Dujardin',
    specialty: 'Médecin généraliste',
    address: '106 Rue Réaumur - 75002 Paris',
    urgent: true,
    photo: dujardin,
  },
  {
    id: 'drip',
    name: 'Dr Pierre Drip',
    specialty: 'Cardiologue',
    address: '7 Rue Bergère - 75009 Paris',
    urgent: true,
    photo: drip,
  },
  {
    id: 'bensaid',
    name: 'Dr Alexandre Bensaid',
    specialty: 'Cardiologue',
    address: '7 Rue Bergère - 75009 Paris',
    urgent: false,
    photo: bensaid,
  },
  // Tu peux garder / enlever ces 3 si tu n’as pas encore les images
  ...(claire ? [{
    id: 'claire',
    name: 'Dr Claire Martin',
    specialty: 'Dermatologue',
    address: '12 Rue des Écoles - 75005 Paris',
    urgent: false,
    photo: claire,
  }] : []),
  ...(amine ? [{
    id: 'amine',
    name: 'Dr Amine Haddad',
    specialty: 'Pédiatre',
    address: '2 Av. Voltaire - 75011 Paris',
    urgent: false,
    photo: amine,
  }] : []),
  ...(thomas ? [{
    id: 'thomas',
    name: 'Dr Thomas Leroy',
    specialty: 'Ophtalmologiste',
    address: '18 Rue de Rennes - 75006 Paris',
    urgent: false,
    photo: thomas,
  }] : []),
]


