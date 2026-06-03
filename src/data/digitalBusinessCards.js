import mosesImage from '../assets/moses-dowart-avatar.jpg'

export const CARD_SERVICES = [
  'TMS Implementation',
  'ERP Transformation',
  'Procurement Services',
  'Data Analytics & Reporting',
  'Consulting Services',
]

export const DIGITAL_CARD_PROFILES = [
  {
    id: 'moses-dowart',
    full_name: 'Moses Dowart',
    position: 'Principal Consultant',
    profile_photo: mosesImage,
    phone: '+27739370249',
    whatsapp: '+27739370249',
    email: 'moses@optimumscs.com',
    linkedin: 'https://www.linkedin.com/in/moses-d-801b6914/',
    legacyVcard: '/moses-dowart.vcf',
  },
  {
    id: 'brian-mlambo',
    full_name: 'Brian Mlambo',
    position: '',
    profile_photo: '',
    phone: '+27652065442',
    whatsapp: '+27652065442',
    email: 'bryn@optimumscs.com',
    linkedin: '',
  },
  {
    id: 'nothando-previous-ndlovu',
    full_name: 'Nothando Previous Ndlovu',
    position: '',
    profile_photo: '',
    phone: '+27631631759',
    whatsapp: '+27631631759',
    email: 'nothando@optimumscs.com',
    linkedin: '',
  },
  {
    id: 'tanaka-bhasvi',
    full_name: 'Tanaka Bhasvi',
    position: '',
    profile_photo: '',
    phone: '+27625970511',
    whatsapp: '+27625970511',
    email: 'tanakabhasvi7@gmail.com',
    linkedin: '',
  },
  {
    id: 'tinaye',
    full_name: 'Tinaye',
    position: '',
    profile_photo: '',
    phone: '+27740826883',
    whatsapp: '+27740826883',
    email: 'tinaye@optimumscs.com',
    linkedin: '',
  },
]

export function getDigitalCardProfile(id) {
  return DIGITAL_CARD_PROFILES.find((profile) => profile.id === id)
}
