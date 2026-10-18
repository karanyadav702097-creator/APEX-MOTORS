export interface VehicleSpec {
  displacement?: string;
  engineType: string;
  torque: string;
  batteryCapacity?: string;
  driveType: string;
  chassis: string;
  brakingDistance: string;
  dryWeight: string;
  downforce: string;
  transmission: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  tagline: string;
  power: string;
  horsepowerNum: number;
  acceleration: string;
  topSpeed: string;
  topSpeedNum: number;
  range?: string;
  basePrice: number;
  accentColor: string;
  image: string;
  description: string;
  specs: VehicleSpec;
  soundType: 'v8' | 'electric';
  highlights: string[];
}

export interface ConfigOption {
  id: string;
  name: string;
  hex?: string;
  priceDelta: number;
  description?: string;
}

export interface ConfiguratorState {
  vehicleId: string;
  paintColor: string;
  wheelStyle: string;
  interiorTrim: string;
  aeroPackage: string;
  caliperColor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Exterior' | 'Interior' | 'Engineering' | 'Track';
  image: string;
  caption: string;
  details: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  preferredVehicle: string;
  contactMethod: 'concierge' | 'video' | 'atelier';
  preferredTrack: string;
  message: string;
  consent: boolean;
}
