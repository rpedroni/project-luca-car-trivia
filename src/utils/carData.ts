// Car brands and models data for trivia game

export interface CarBrand {
  id: string;
  name: string;
  country: string;
  founded: number;
  logoUrl: string;
  primaryColor: string;
  description: string;
}

export interface CarModel {
  id: string;
  brandId: string;
  name: string;
  fullName: string;
  year: number;
  type: 'supercar' | 'sports' | 'luxury' | 'hypercar';
  topSpeed: number; // mph
  acceleration: number; // 0-60 mph in seconds
  horsepower: number;
  imageUrl: string;
  price: string; // approximate starting price
}

// Premium car brands
export const carBrands: CarBrand[] = [
  {
    id: 'ferrari',
    name: 'Ferrari',
    country: 'Italy',
    founded: 1939,
    logoUrl: 'https://www.carlogos.org/car-logos/ferrari-logo.png',
    primaryColor: '#DC0000',
    description: 'Italian luxury sports car manufacturer',
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    country: 'Italy',
    founded: 1963,
    logoUrl: 'https://www.carlogos.org/car-logos/lamborghini-logo.png',
    primaryColor: '#DDB321',
    description: 'Italian brand of luxury sports cars',
  },
  {
    id: 'porsche',
    name: 'Porsche',
    country: 'Germany',
    founded: 1931,
    logoUrl: 'https://www.carlogos.org/car-logos/porsche-logo.png',
    primaryColor: '#C8102E',
    description: 'German automobile manufacturer specializing in sports cars',
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    country: 'United Kingdom',
    founded: 1985,
    logoUrl: 'https://www.carlogos.org/car-logos/mclaren-logo.png',
    primaryColor: '#FF8700',
    description: 'British automotive manufacturer of luxury, high-performance supercars',
  },
  {
    id: 'bugatti',
    name: 'Bugatti',
    country: 'France',
    founded: 1909,
    logoUrl: 'https://www.carlogos.org/car-logos/bugatti-logo.png',
    primaryColor: '#BE0030',
    description: 'French luxury automobile manufacturer known for hypercars',
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin',
    country: 'United Kingdom',
    founded: 1913,
    logoUrl: 'https://www.carlogos.org/car-logos/aston-martin-logo.png',
    primaryColor: '#006B38',
    description: 'British luxury sports car manufacturer',
  },
  {
    id: 'bentley',
    name: 'Bentley',
    country: 'United Kingdom',
    founded: 1919,
    logoUrl: 'https://www.carlogos.org/car-logos/bentley-logo.png',
    primaryColor: '#333333',
    description: 'British manufacturer of luxury cars and SUVs',
  },
  {
    id: 'rolls-royce',
    name: 'Rolls-Royce',
    country: 'United Kingdom',
    founded: 1904,
    logoUrl: 'https://www.carlogos.org/car-logos/rolls-royce-logo.png',
    primaryColor: '#680021',
    description: 'British luxury automobile maker known for premium quality',
  },
  {
    id: 'mercedes',
    name: 'Mercedes-AMG',
    country: 'Germany',
    founded: 1967,
    logoUrl: 'https://www.carlogos.org/car-logos/mercedes-amg-logo.png',
    primaryColor: '#00ADEF',
    description: 'High-performance subsidiary of Mercedes-Benz',
  },
  {
    id: 'bmw',
    name: 'BMW M',
    country: 'Germany',
    founded: 1972,
    logoUrl: 'https://www.carlogos.org/car-logos/bmw-m-logo.png',
    primaryColor: '#0066B1',
    description: 'High-performance division of BMW',
  },
  {
    id: 'audi',
    name: 'Audi Sport',
    country: 'Germany',
    founded: 1983,
    logoUrl: 'https://www.carlogos.org/car-logos/audi-sport-logo.png',
    primaryColor: '#BB0A30',
    description: 'High-performance subsidiary of Audi',
  },
  {
    id: 'koenigsegg',
    name: 'Koenigsegg',
    country: 'Sweden',
    founded: 1994,
    logoUrl: 'https://www.carlogos.org/car-logos/koenigsegg-logo.png',
    primaryColor: '#FFA500',
    description: 'Swedish manufacturer of high-performance hypercars',
  },
  {
    id: 'pagani',
    name: 'Pagani',
    country: 'Italy',
    founded: 1992,
    logoUrl: 'https://www.carlogos.org/car-logos/pagani-logo.png',
    primaryColor: '#1C1C1C',
    description: 'Italian manufacturer of sports cars and carbon fiber components',
  },
  {
    id: 'maserati',
    name: 'Maserati',
    country: 'Italy',
    founded: 1914,
    logoUrl: 'https://www.carlogos.org/car-logos/maserati-logo.png',
    primaryColor: '#0C2340',
    description: 'Italian luxury vehicle manufacturer',
  },
  {
    id: 'lotus',
    name: 'Lotus',
    country: 'United Kingdom',
    founded: 1952,
    logoUrl: 'https://www.carlogos.org/car-logos/lotus-logo.png',
    primaryColor: '#FFB800',
    description: 'British automotive company that manufactures sports cars',
  },
  {
    id: 'alfa-romeo',
    name: 'Alfa Romeo',
    country: 'Italy',
    founded: 1910,
    logoUrl: 'https://www.carlogos.org/car-logos/alfa-romeo-logo.png',
    primaryColor: '#981E32',
    description: 'Italian luxury car manufacturer',
  },
  {
    id: 'corvette',
    name: 'Corvette',
    country: 'United States',
    founded: 1953,
    logoUrl: 'https://www.carlogos.org/car-logos/corvette-logo.png',
    primaryColor: '#C8102E',
    description: 'American sports car manufactured by Chevrolet',
  },
  {
    id: 'ford-gt',
    name: 'Ford Performance',
    country: 'United States',
    founded: 2000,
    logoUrl: 'https://www.carlogos.org/car-logos/ford-logo.png',
    primaryColor: '#003478',
    description: 'High-performance division of Ford Motor Company',
  },
  {
    id: 'dodge',
    name: 'Dodge SRT',
    country: 'United States',
    founded: 2004,
    logoUrl: 'https://www.carlogos.org/car-logos/srt-logo.png',
    primaryColor: '#BA0C2F',
    description: 'Street and Racing Technology division of Dodge',
  },
  {
    id: 'nissan',
    name: 'Nissan NISMO',
    country: 'Japan',
    founded: 1984,
    logoUrl: 'https://www.carlogos.org/car-logos/nismo-logo.png',
    primaryColor: '#C3002F',
    description: 'Nissan Motorsport performance division',
  },
];

// Sports cars and supercars
export const carModels: CarModel[] = [
  // Ferrari
  {
    id: 'ferrari-sf90',
    brandId: 'ferrari',
    name: 'SF90 Stradale',
    fullName: 'Ferrari SF90 Stradale',
    year: 2024,
    type: 'hypercar',
    topSpeed: 211,
    acceleration: 2.5,
    horsepower: 986,
    imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800',
    price: '$507,000',
  },
  {
    id: 'ferrari-296',
    brandId: 'ferrari',
    name: '296 GTB',
    fullName: 'Ferrari 296 GTB',
    year: 2024,
    type: 'supercar',
    topSpeed: 205,
    acceleration: 2.9,
    horsepower: 819,
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    price: '$322,000',
  },
  {
    id: 'ferrari-812',
    brandId: 'ferrari',
    name: '812 Superfast',
    fullName: 'Ferrari 812 Superfast',
    year: 2024,
    type: 'supercar',
    topSpeed: 211,
    acceleration: 2.9,
    horsepower: 789,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    price: '$363,000',
  },
  // Lamborghini
  {
    id: 'lambo-revuelto',
    brandId: 'lamborghini',
    name: 'Revuelto',
    fullName: 'Lamborghini Revuelto',
    year: 2024,
    type: 'hypercar',
    topSpeed: 217,
    acceleration: 2.5,
    horsepower: 1001,
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: '$608,000',
  },
  {
    id: 'lambo-huracan',
    brandId: 'lamborghini',
    name: 'Huracán',
    fullName: 'Lamborghini Huracán',
    year: 2024,
    type: 'supercar',
    topSpeed: 202,
    acceleration: 2.9,
    horsepower: 631,
    imageUrl: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800',
    price: '$248,000',
  },
  {
    id: 'lambo-urus',
    brandId: 'lamborghini',
    name: 'Urus',
    fullName: 'Lamborghini Urus',
    year: 2024,
    type: 'luxury',
    topSpeed: 190,
    acceleration: 3.5,
    horsepower: 657,
    imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800',
    price: '$233,000',
  },
  // Porsche
  {
    id: 'porsche-918',
    brandId: 'porsche',
    name: '918 Spyder',
    fullName: 'Porsche 918 Spyder',
    year: 2015,
    type: 'hypercar',
    topSpeed: 214,
    acceleration: 2.5,
    horsepower: 887,
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
    price: '$845,000',
  },
  {
    id: 'porsche-gt3',
    brandId: 'porsche',
    name: '911 GT3 RS',
    fullName: 'Porsche 911 GT3 RS',
    year: 2024,
    type: 'sports',
    topSpeed: 184,
    acceleration: 3.2,
    horsepower: 518,
    imageUrl: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800',
    price: '$223,000',
  },
  {
    id: 'porsche-taycan',
    brandId: 'porsche',
    name: 'Taycan Turbo S',
    fullName: 'Porsche Taycan Turbo S',
    year: 2024,
    type: 'luxury',
    topSpeed: 162,
    acceleration: 2.6,
    horsepower: 750,
    imageUrl: 'https://images.unsplash.com/photo-1619362280286-f1f8fd5032ed?w=800',
    price: '$186,000',
  },
  // McLaren
  {
    id: 'mclaren-p1',
    brandId: 'mclaren',
    name: 'P1',
    fullName: 'McLaren P1',
    year: 2015,
    type: 'hypercar',
    topSpeed: 217,
    acceleration: 2.8,
    horsepower: 903,
    imageUrl: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800',
    price: '$1,350,000',
  },
  {
    id: 'mclaren-720s',
    brandId: 'mclaren',
    name: '720S',
    fullName: 'McLaren 720S',
    year: 2024,
    type: 'supercar',
    topSpeed: 212,
    acceleration: 2.8,
    horsepower: 710,
    imageUrl: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800',
    price: '$299,000',
  },
  {
    id: 'mclaren-artura',
    brandId: 'mclaren',
    name: 'Artura',
    fullName: 'McLaren Artura',
    year: 2024,
    type: 'supercar',
    topSpeed: 205,
    acceleration: 3.0,
    horsepower: 671,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    price: '$237,000',
  },
  // Bugatti
  {
    id: 'bugatti-chiron',
    brandId: 'bugatti',
    name: 'Chiron',
    fullName: 'Bugatti Chiron',
    year: 2024,
    type: 'hypercar',
    topSpeed: 261,
    acceleration: 2.4,
    horsepower: 1479,
    imageUrl: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800',
    price: '$3,000,000',
  },
  {
    id: 'bugatti-veyron',
    brandId: 'bugatti',
    name: 'Veyron',
    fullName: 'Bugatti Veyron',
    year: 2015,
    type: 'hypercar',
    topSpeed: 253,
    acceleration: 2.5,
    horsepower: 1001,
    imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800',
    price: '$1,700,000',
  },
  // Aston Martin
  {
    id: 'aston-valkyrie',
    brandId: 'aston-martin',
    name: 'Valkyrie',
    fullName: 'Aston Martin Valkyrie',
    year: 2024,
    type: 'hypercar',
    topSpeed: 250,
    acceleration: 2.5,
    horsepower: 1139,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    price: '$3,500,000',
  },
  {
    id: 'aston-dbs',
    brandId: 'aston-martin',
    name: 'DBS Superleggera',
    fullName: 'Aston Martin DBS Superleggera',
    year: 2024,
    type: 'supercar',
    topSpeed: 211,
    acceleration: 3.4,
    horsepower: 715,
    imageUrl: 'https://images.unsplash.com/photo-1596076249795-0a0c59429b9b?w=800',
    price: '$316,000',
  },
  // Koenigsegg
  {
    id: 'koenigsegg-jesko',
    brandId: 'koenigsegg',
    name: 'Jesko Absolut',
    fullName: 'Koenigsegg Jesko Absolut',
    year: 2024,
    type: 'hypercar',
    topSpeed: 330,
    acceleration: 2.5,
    horsepower: 1600,
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: '$3,400,000',
  },
  {
    id: 'koenigsegg-gemera',
    brandId: 'koenigsegg',
    name: 'Gemera',
    fullName: 'Koenigsegg Gemera',
    year: 2024,
    type: 'hypercar',
    topSpeed: 249,
    acceleration: 1.9,
    horsepower: 1700,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    price: '$1,700,000',
  },
  // Pagani
  {
    id: 'pagani-huayra',
    brandId: 'pagani',
    name: 'Huayra',
    fullName: 'Pagani Huayra',
    year: 2024,
    type: 'hypercar',
    topSpeed: 238,
    acceleration: 2.8,
    horsepower: 764,
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: '$2,600,000',
  },
  // Bentley
  {
    id: 'bentley-continental',
    brandId: 'bentley',
    name: 'Continental GT',
    fullName: 'Bentley Continental GT Speed',
    year: 2024,
    type: 'luxury',
    topSpeed: 208,
    acceleration: 3.5,
    horsepower: 650,
    imageUrl: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800',
    price: '$274,000',
  },
  // Rolls-Royce
  {
    id: 'rr-phantom',
    brandId: 'rolls-royce',
    name: 'Phantom',
    fullName: 'Rolls-Royce Phantom',
    year: 2024,
    type: 'luxury',
    topSpeed: 155,
    acceleration: 5.1,
    horsepower: 563,
    imageUrl: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800',
    price: '$460,000',
  },
  // Mercedes-AMG
  {
    id: 'amg-one',
    brandId: 'mercedes',
    name: 'ONE',
    fullName: 'Mercedes-AMG ONE',
    year: 2024,
    type: 'hypercar',
    topSpeed: 219,
    acceleration: 2.9,
    horsepower: 1049,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    price: '$2,700,000',
  },
  {
    id: 'amg-gt',
    brandId: 'mercedes',
    name: 'GT Black Series',
    fullName: 'Mercedes-AMG GT Black Series',
    year: 2024,
    type: 'supercar',
    topSpeed: 202,
    acceleration: 3.1,
    horsepower: 720,
    imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800',
    price: '$325,000',
  },
  // BMW M
  {
    id: 'bmw-m8',
    brandId: 'bmw',
    name: 'M8 Competition',
    fullName: 'BMW M8 Competition',
    year: 2024,
    type: 'sports',
    topSpeed: 190,
    acceleration: 3.0,
    horsepower: 617,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    price: '$130,000',
  },
  // Corvette
  {
    id: 'corvette-z06',
    brandId: 'corvette',
    name: 'Z06',
    fullName: 'Chevrolet Corvette Z06',
    year: 2024,
    type: 'supercar',
    topSpeed: 195,
    acceleration: 2.6,
    horsepower: 670,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    price: '$111,000',
  },
  // Nissan GT-R
  {
    id: 'gtr-nismo',
    brandId: 'nissan',
    name: 'GT-R NISMO',
    fullName: 'Nissan GT-R NISMO',
    year: 2024,
    type: 'supercar',
    topSpeed: 205,
    acceleration: 2.5,
    horsepower: 600,
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: '$210,000',
  },
  // Lotus
  {
    id: 'lotus-evija',
    brandId: 'lotus',
    name: 'Evija',
    fullName: 'Lotus Evija',
    year: 2024,
    type: 'hypercar',
    topSpeed: 200,
    acceleration: 2.8,
    horsepower: 1972,
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: '$2,100,000',
  },
];

// Utility functions
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomItems<T>(array: T[], count: number): T[] {
  return shuffleArray(array).slice(0, count);
}

export function getBrandById(id: string): CarBrand | undefined {
  return carBrands.find(brand => brand.id === id);
}

export function getModelsByBrand(brandId: string): CarModel[] {
  return carModels.filter(model => model.brandId === brandId);
}

export function getRandomBrands(count: number, exclude?: string[]): CarBrand[] {
  const filtered = exclude
    ? carBrands.filter(brand => !exclude.includes(brand.id))
    : carBrands;
  return getRandomItems(filtered, count);
}

export function getRandomModels(count: number, exclude?: string[]): CarModel[] {
  const filtered = exclude
    ? carModels.filter(model => !exclude.includes(model.id))
    : carModels;
  return getRandomItems(filtered, count);
}
