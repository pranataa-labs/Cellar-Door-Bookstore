export interface PostalCodeInfo {
  postalCode: string
  subdistrict: string // Kelurahan / Desa
  district: string    // Kecamatan
  city: string        // Kota / Kabupaten
  province: string    // Provinsi
}

export const INDONESIA_POSTAL_CODES: PostalCodeInfo[] = [
  // DKI Jakarta
  {
    postalCode: '12190',
    subdistrict: 'Senayan',
    district: 'Kebayoran Baru',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
  },
  {
    postalCode: '12730',
    subdistrict: 'Bangka / Kemang',
    district: 'Mampang Prapatan',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
  },
  {
    postalCode: '12950',
    subdistrict: 'Karet Semanggi',
    district: 'Setiabudi',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
  },
  {
    postalCode: '12310',
    subdistrict: 'Pondok Pinang',
    district: 'Kebayoran Lama',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
  },
  {
    postalCode: '10110',
    subdistrict: 'Gambir',
    district: 'Gambir',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
  },
  {
    postalCode: '10310',
    subdistrict: 'Menteng',
    district: 'Menteng',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
  },
  {
    postalCode: '11470',
    subdistrict: 'Tomang',
    district: 'Grogol Petamburan',
    city: 'Jakarta Barat',
    province: 'DKI Jakarta',
  },
  {
    postalCode: '14240',
    subdistrict: 'Kelapa Gading Barat',
    district: 'Kelapa Gading',
    city: 'Jakarta Utara',
    province: 'DKI Jakarta',
  },
  {
    postalCode: '13320',
    subdistrict: 'Bidara Cina',
    district: 'Jatinegara',
    city: 'Jakarta Timur',
    province: 'DKI Jakarta',
  },

  // Jawa Barat & Banten
  {
    postalCode: '40135',
    subdistrict: 'Dago',
    district: 'Coblong',
    city: 'Bandung',
    province: 'Jawa Barat',
  },
  {
    postalCode: '40115',
    subdistrict: 'Citarum',
    district: 'Bandung Wetan',
    city: 'Bandung',
    province: 'Jawa Barat',
  },
  {
    postalCode: '16128',
    subdistrict: 'Pabaton',
    district: 'Bogor Tengah',
    city: 'Bogor',
    province: 'Jawa Barat',
  },
  {
    postalCode: '16424',
    subdistrict: 'Depok Jaya',
    district: 'Pancoran Mas',
    city: 'Depok',
    province: 'Jawa Barat',
  },
  {
    postalCode: '17148',
    subdistrict: 'Pekayon Jaya',
    district: 'Bekasi Selatan',
    city: 'Bekasi',
    province: 'Jawa Barat',
  },
  {
    postalCode: '15310',
    subdistrict: 'Lengkong Gudang',
    district: 'Serpong (BSD)',
    city: 'Tangerang Selatan',
    province: 'Banten',
  },
  {
    postalCode: '15111',
    subdistrict: 'Sukarasa',
    district: 'Tangerang',
    city: 'Tangerang Kota',
    province: 'Banten',
  },

  // DI Yogyakarta & Jawa Tengah
  {
    postalCode: '55271',
    subdistrict: 'Suryatmajan',
    district: 'Danurejan (Malioboro)',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
  },
  {
    postalCode: '55281',
    subdistrict: 'Ngupasan',
    district: 'Gondomanan',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
  },
  {
    postalCode: '50134',
    subdistrict: 'Kembangsari',
    district: 'Semarang Tengah',
    city: 'Semarang',
    province: 'Jawa Tengah',
  },
  {
    postalCode: '57111',
    subdistrict: 'Kauman',
    district: 'Pasar Kliwon',
    city: 'Surakarta (Solo)',
    province: 'Jawa Tengah',
  },

  // Jawa Timur
  {
    postalCode: '60271',
    subdistrict: 'Kedungdoro',
    district: 'Tegalsari',
    city: 'Surabaya',
    province: 'Jawa Timur',
  },
  {
    postalCode: '60111',
    subdistrict: 'Gubeng',
    district: 'Gubeng',
    city: 'Surabaya',
    province: 'Jawa Timur',
  },
  {
    postalCode: '65111',
    subdistrict: 'Klojen',
    district: 'Klojen',
    city: 'Malang',
    province: 'Jawa Timur',
  },

  // Bali
  {
    postalCode: '80361',
    subdistrict: 'Kuta',
    district: 'Kuta',
    city: 'Badung',
    province: 'Bali',
  },
  {
    postalCode: '80232',
    subdistrict: 'Sanur',
    district: 'Denpasar Selatan',
    city: 'Denpasar',
    province: 'Bali',
  },
  {
    postalCode: '80571',
    subdistrict: 'Ubud',
    district: 'Ubud',
    city: 'Gianyar',
    province: 'Bali',
  },

  // Sumatera
  {
    postalCode: '20111',
    subdistrict: 'Petisah Tengah',
    district: 'Medan Petisah',
    city: 'Medan',
    province: 'Sumatera Utara',
  },
  {
    postalCode: '30139',
    subdistrict: 'Bukit Lama',
    district: 'Ilir Barat I',
    city: 'Palembang',
    province: 'Sumatera Selatan',
  },

  // Sulawesi & Kalimantan
  {
    postalCode: '90111',
    subdistrict: 'Baru',
    district: 'Ujung Pandang',
    city: 'Makassar',
    province: 'Sulawesi Selatan',
  },
  {
    postalCode: '76112',
    subdistrict: 'Klandasan Ilir',
    district: 'Balikpapan Kota',
    city: 'Balikpapan',
    province: 'Kalimantan Timur',
  },
]

export function lookupPostalCode(code: string): PostalCodeInfo | null {
  const clean = code.trim()
  if (clean.length < 5) return null
  return INDONESIA_POSTAL_CODES.find(p => p.postalCode === clean) || null
}

export const POPULAR_POSTAL_CODES = [
  { code: '12190', label: '12190 (Kebayoran Baru, Jakarta Selatan)' },
  { code: '40135', label: '40135 (Dago, Bandung)' },
  { code: '55271', label: '55271 (Malioboro, Yogyakarta)' },
  { code: '60271', label: '60271 (Tegalsari, Surabaya)' },
  { code: '80361', label: '80361 (Kuta, Bali)' },
  { code: '20111', label: '20111 (Medan Petisah, Medan)' },
]
