export interface NAP {
  name: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneInternational: string;
  email: string;
}

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
}

export interface BusinessHours {
  days: string;
  open: string;
  close: string;
}

/**
 * Verified geographical coordinates of the office.
 * Leave undefined while not confirmed via official geocoding (Google Maps,
 * IBGE). LocalBusinessSchema renders the `geo` block conditionally — no
 * coordinates are ever broadcast as JSON-LD until they're set here.
 */
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface SiteConfig {
  name: string;
  url: string;
  foundingYear: number;
  nap: NAP;
  hours: BusinessHours;
  whatsapp: string;
  social: SocialLinks;
  crcSp?: string;
  geo?: GeoCoordinates;
}
