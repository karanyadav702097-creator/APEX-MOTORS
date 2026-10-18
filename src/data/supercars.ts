import { Vehicle, GalleryItem, ConfigOption } from '../types';

import vortexImg from '../assets/images/hero_apex_vortex_1792319357109.jpg';
import stratosImg from '../assets/images/apex_stratos_gt_1792319357128.jpg';
import phantomImg from '../assets/images/apex_phantom_track_1792319359080.jpg';
import cockpitImg from '../assets/images/apex_cockpit_interior_1792319360085.jpg';
import wheelImg from '../assets/images/apex_wheel_brake_detail_1792319359921.jpg';
import rearImg from '../assets/images/apex_rear_diffuser_1792319381294.jpg';
import nightTrackImg from '../assets/images/apex_night_speed_1792319380941.jpg';

export const CONCEPT_SUPERCAR_COLLECTION: Vehicle[] = [
  {
    id: 'apex-vortex',
    name: 'APEX VORTEX',
    category: 'Hypercar',
    tagline: 'The Pinnacle of Kinetic Power & Aerodynamic Sculpting',
    power: '1,200 HP',
    horsepowerNum: 1200,
    acceleration: '2.2s',
    topSpeed: '380 km/h',
    topSpeedNum: 380,
    basePrice: 2850000,
    accentColor: '#00E5FF',
    image: vortexImg,
    soundType: 'v8',
    description:
      'Engineered with a high-revving 4.0L Twin-Turbocharged V8 paired with a triple-axial flux electric motor system. The Vortex generates immense lateral grip through active underfloor venturi tunnels and delivers uncompromising road presence.',
    specs: {
      displacement: '4.0-liter Twin-Turbo V8 Hybrid',
      engineType: 'Bi-Turbo Combustion + Tri-Motor KERS',
      torque: '1,350 Nm combined',
      dryWeight: '1,280 kg',
      downforce: '850 kg @ 250 km/h',
      driveType: 'Intelligent All-Wheel Torque Vectoring',
      transmission: '8-Speed Dual-Clutch Seamless Shift',
      chassis: 'Full Monocoque Carbon Pre-Preg T1000',
      brakingDistance: '28.5 m (100–0 km/h)',
    },
    highlights: [
      'Active Variable Venturi Aerodynamics',
      'Dual Liquid-Cooled Inverters with SiC Modules',
      'T1000 Pre-Preg Aerospace Carbon Tub',
      'Millisecond Dynamic Torque Vectoring',
    ],
  },
  {
    id: 'apex-stratos',
    name: 'APEX STRATOS',
    category: 'Electric Performance GT',
    tagline: 'Silent Velocity. Instantaneous 900 HP Grand Touring.',
    power: '900 HP',
    horsepowerNum: 900,
    acceleration: '2.7s',
    topSpeed: '340 km/h',
    topSpeedNum: 340,
    range: '550 km',
    basePrice: 2200000,
    accentColor: '#38BDF8',
    image: stratosImg,
    soundType: 'electric',
    description:
      'The Stratos is a next-generation grand tourer driven by an 800V silicon-carbide quad-motor powertrain. Balancing aerodynamic grand-touring serenity with neck-snapping instantaneous acceleration, it redefines zero-emission velocity.',
    specs: {
      displacement: 'Quad Axial-Flux Electric Motors',
      engineType: '800V Architecture with Liquid Cryo-Loop',
      torque: '1,220 Nm instant',
      batteryCapacity: '105 kWh Silicon-Anode Cells',
      dryWeight: '1,450 kg',
      downforce: '620 kg @ 250 km/h',
      driveType: 'Independent Quad-Wheel Vectoring',
      transmission: 'Dual-Speed Planetary Transmission',
      chassis: 'Hybrid Carbon-Titanium Lightweight Core',
      brakingDistance: '29.2 m (100–0 km/h)',
    },
    highlights: [
      '550 km Estimated Concept Range',
      '10-Minute High-Speed Hypercharge (10–80%)',
      'Acoustic Active Noise Shielding',
      'Predictive Magnetorheological Damping',
    ],
  },
  {
    id: 'apex-phantom',
    name: 'APEX PHANTOM',
    category: 'Track-focused Supercar',
    tagline: 'Unfiltered Aerodynamic Aggression & Circuit Dominance',
    power: '1,050 HP',
    horsepowerNum: 1050,
    acceleration: '2.4s',
    topSpeed: '365 km/h',
    topSpeedNum: 365,
    basePrice: 3400000,
    accentColor: '#F43F5E',
    image: phantomImg,
    soundType: 'v8',
    description:
      'Stripped of all excess, the Phantom is a pure circuit weapon. Featuring a carbon swan-neck active rear wing generating over 1,100 kg of downforce, carbon-ceramic sintered brakes, and a race-spec naturally aspirated high-rev hybrid motor.',
    specs: {
      displacement: '5.2-liter Naturally Aspirated V10 Hybrid',
      engineType: 'High-Revving 9,500 RPM V10 with Boost Recuperation',
      torque: '1,100 Nm',
      dryWeight: '1,190 kg (Ultra-Lightweight)',
      downforce: '1,120 kg @ 250 km/h',
      driveType: 'Rear-Biased Dynamic AWD with Drift Mode',
      transmission: '7-Speed Sequential Dog-Ring Transmission',
      chassis: 'Structural Honeycomb Carbon Composite',
      brakingDistance: '26.8 m (100–0 km/h)',
    },
    highlights: [
      'Active Swan-Neck Dual-Element Aerofoil',
      'Carbon-Ceramic Slotted 420mm Rotors',
      'Full FIA-Grade Integrated Carbon Safety Cell',
      'Telemetry Lap-Analysis System',
    ],
  },
];

export const CONFIG_PAINTS: ConfigOption[] = [
  { id: 'obsidian-black', name: 'Obsidian Stealth', hex: '#0a0b0d', priceDelta: 0, description: 'Deep metallic carbon with ultra-gloss clearcoat' },
  { id: 'liquid-titanium', name: 'Liquid Titanium', hex: '#8e96a0', priceDelta: 18000, description: 'Multilayer liquid metal finish with cold silver highlights' },
  { id: 'electric-cyan', name: 'Apex Electric Cyan', hex: '#00d0e6', priceDelta: 24000, description: 'Iconic bespoke APEX brand luminescent pigment' },
  { id: 'midnight-crimson', name: 'Midnight Crimson', hex: '#8a0c20', priceDelta: 22000, description: 'Dramatic deep blood red with black pearl undertones' },
  { id: 'frost-pearl', name: 'Frost Pearl White', hex: '#e6ebf2', priceDelta: 16000, description: 'Triple-coat iridescent white with metallic flake' },
];

export const CONFIG_WHEELS: ConfigOption[] = [
  { id: 'aero-blade', name: '20"/21" Aero-Blade Carbon', priceDelta: 28000, description: 'Centrally-locked full forged carbon aero wheel' },
  { id: 'forged-spoke', name: '20"/21" Ultra-Light Monoblock', priceDelta: 0, description: 'CNC milled aerospace forged aluminum with satin black' },
  { id: 'titanium-mesh', name: '20"/21" Titanium Mesh', priceDelta: 35000, description: '3D-printed hollow titanium lattice structure' },
];

export const CONFIG_AERO_PACKAGES: ConfigOption[] = [
  { id: 'apex-velocity', name: 'Velocity Aero Pack', priceDelta: 0, description: 'Standard active aero splitters, retractable rear spoiler' },
  { id: 'track-carbon', name: 'Track Carbon Performance Pack', priceDelta: 65000, description: 'Swan-neck dual rear aerofoil, front dive planes, carbon louvers' },
  { id: 'touring-stealth', name: 'Touring Stealth Pack', priceDelta: 32000, description: 'Low-drag active venturi tunnels and sound-dampened aero skirts' },
];

export const CONFIG_CALIPERS: ConfigOption[] = [
  { id: 'caliper-cyan', name: 'Apex Electric Cyan', hex: '#00e5ff', priceDelta: 0 },
  { id: 'caliper-gold', name: 'Acid Competition Gold', hex: '#eab308', priceDelta: 4500 },
  { id: 'caliper-charcoal', name: 'Stealth Charcoal', hex: '#262626', priceDelta: 2500 },
  { id: 'caliper-red', name: 'Rosso Scuderia Red', hex: '#ef4444', priceDelta: 4500 },
];

export const CONFIG_INTERIORS: ConfigOption[] = [
  { id: 'interior-alcantara', name: 'Full Alcantara & Forged Carbon', priceDelta: 0, description: 'Matte forged carbon trim with laser-perforated microfiber' },
  { id: 'interior-semi-aniline', name: 'Semi-Aniline Nappa & Titanium', priceDelta: 24000, description: 'Italian hand-stitched leather with brushed titanium accents' },
  { id: 'interior-race-spec', name: 'Track Spec Clubsport', priceDelta: 40000, description: 'Ultra-thin carbon shells, 6-point harness, fire extinguisher' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Kinetic Front Architecture',
    category: 'Exterior',
    image: vortexImg,
    caption: 'APEX Vortex dynamic front fascia sculpted in aerospace-grade carbon fiber.',
    details: 'Matrix laser headlights with integrated airflow ducts cooling the carbon-ceramic front brakes.',
  },
  {
    id: 'gal-2',
    title: 'Aero Rear Diffuser & Titanium Exhaust',
    category: 'Engineering',
    image: rearImg,
    caption: 'Formula-derived venturi diffusers generating suction downforce without drag penalties.',
    details: 'Centrally-mounted 3D printed Inconel/Titanium exhaust tips with heat-tinted titanium bluing.',
  },
  {
    id: 'gal-3',
    title: 'Next-Gen Driver Cockpit',
    category: 'Interior',
    image: cockpitImg,
    caption: 'Minimalist cockpit architecture focused entirely on telemetry and driver ergonomics.',
    details: 'Yoke-style carbon steering wheel with integrated shift lights and real-time tire pressure telemetry.',
  },
  {
    id: 'gal-4',
    title: 'Carbon-Ceramic Braking System',
    category: 'Engineering',
    image: wheelImg,
    caption: '420mm drilled carbon-ceramic rotors paired with 8-piston monoblock aluminum-lithium calipers.',
    details: 'Engineered to withstand temperatures over 1,000°C with zero thermal brake fade on track.',
  },
  {
    id: 'gal-5',
    title: 'High-Speed Night Circuit Run',
    category: 'Track',
    image: nightTrackImg,
    caption: 'Telemetry validation runs under the floodlights of Circuit de Spa-Francorchamps.',
    details: 'Active aerodynamics dynamically adjust downforce pitch through corners and high-speed straights.',
  },
  {
    id: 'gal-6',
    title: 'APEX Stratos GT Profile',
    category: 'Exterior',
    image: stratosImg,
    caption: 'Pure fluid lines embodying high-velocity grand touring elegance and 900 HP quiet power.',
    details: 'Continuous LED blade lighting running across the bonnet and integrated door aero-channels.',
  },
];
