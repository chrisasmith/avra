// test data

export default {
  industries: [
    { name: 'Auto', id: 'auto' },
    {
      name: 'Beverages',
      id: 'beverages',
      subsections: [
        { id: 'beer', name: 'Beer' },
        { id: 'liquor', name: 'Liquor' },
        { id: 'soft_drinks', name: 'Soft Drinks' },
      ],
    },
    { name: 'Financial Services', id: 'financial_services' },
    {
      name: 'Telco',
      id: 'telco',
      subsections: [
        { id: 'telephone', name: 'Telephone' },
        { id: 'internet', name: 'Internet service' },
        { id: 'wireless_phone_carriers', name: 'Wireless/cell phone' },
        { id: 'cable_tv', name: 'Cable/TV ' },
      ],
    },
    { name: 'Travel', id: 'travel' },
    { name: 'Retail', id: 'retail' },
    { name: 'Consumer Electronics', id: 'consumer_electronics' },
    { name: 'Quick Service Restaurants', id: 'quick_service_restaurants' },
    { name: 'Grocery / Convenience', id: 'grocery_convenience' },
    { name: 'Other', id: 'other' },
  ],

  soft_drinks: [
    {
      name: 'All',
      id: 'all',
      values: [
        { title: 'Diet Mist TWST', value: 2.08 },
        { title: 'Caffeine Free Diet Pepsi', value: 1.91 },
        { title: 'Canada Dry', value: 1.77 },
        { title: 'Diet Pepsi', value: 1.76 },
        { title: 'Other diet soft drink', value: 1.66 },
        { title: 'Diet A&W Root Beer', value: 1.43 },
        { title: 'Fresca', value: 1.32 },
        { title: 'Barq\'s Root Beer', value: 1.22 },
        { title: 'Seagram\'s', value: 1.21 },
        { title: 'Diet Sunkist', value: 1.18 },
        { title: 'Pepsi', value: 1.17 },
      ],
    },
    {
      name: 'Diet',
      id: 'diet',
      values: [
        { title: 'Diet Mist TWST', value: 2.08 },
        { title: 'Caffeine Free Diet Pepsi', value: 1.91 },
        { title: 'Pepsi Max', value: 1.79 },
        { title: 'Diet Pepsi', value: 1.76 },
        { title: 'Other diet soft drink', value: 1.66 },
        { title: 'Store brand diet soft drink', value: 1.64 },
        { title: 'Diet A&W Root Beer', value: 1.43 },
        { title: 'Fresca', value: 1.32 },
        { title: 'Diet Sunkist', value: 1.18 },
        { title: 'Diet Mountain Dew', value: 1.10 },
      ],
    },
    {
      name: 'Regular',
      id: 'regular',
      values: [
        { title: 'Canada Dry', value: 1.77 },
        { title: 'Store brand regular soft drink', value: 1.57 },
        { title: 'Barq\'s Root Beer', value: 1.22 },
        { title: 'Seagram\'s', value: 1.21 },
        { title: 'Pepsi', value: 1.17 },
        { title: 'Crush', value: 1.05 },
        { title: 'Mountain Dew', value: 0.96 },
        { title: 'A&W Root Beer', value: 0.94 },
        { title: 'Mist TWST', value: 0.86 },
        { title: 'Sprite', value: 0.81 },
      ],
    },
    {
      name: 'Energy',
      id: 'energy',
      values: [
        { title: 'Red Bull', value: 0.94 },
        { title: 'Other energy drink', value: 0.88 },
        { title: 'Monster', value: 0.86 },
        { title: 'RockStar', value: 0.79 },
        { title: '5-hour Energy', value: 0.66 },
        { title: 'AMP', value: 0.62 },
        { title: 'Full Throttle', value: 0.59 },
        { title: 'NOS', value: 0.31 },
      ],
    },
    {
      name: 'Sports',
      id: 'sports',
      values: [
        { title: 'PowerAde', value: 1.10 },
        { title: 'Gatorade', value: 0.97 },
        { title: 'Other sports drink', value: 0.92 },
      ],
    },
  ],
  beer: [
    {
      id: 'all',
      name: 'All',
      values: [
        { title: 'Labatt Blue', value: 5.28 },
        { title: 'Samuel Adams', value: 2.46 },
        { title: 'Sam Adams Light', value: 2.39 },
        { title: 'Keystone Light', value: 1.95 },
        { title: 'Any malt alternative', value: 1.75 },
        { title: 'Pabst Blue Ribbon', value: 1.74 },
        { title: 'Michelob Light', value: 1.72 },
        { title: 'Redd\'s Apple Ale', value: 1.71 },
        { title: 'Coors Light', value: 1.64 },
        { title: 'Heineken', value: 1.61 },
      ],
    },
    {
      id: 'imported',
      name: 'Imported',
      values: [
        { title: 'Labatt Blue', value: 5.28 },
        { title: 'Heineken', value: 1.61 },
        { title: 'Corona Light', value: 1.52 },
        { title: 'Guinness', value: 1.43 },
        { title: 'Stella Artois', value: 1.41 },
        { title: 'Any imported beer', value: 1.27 },
        { title: 'Corona Extra', value: 0.93 },
        { title: 'Becks', value: 0.72 },
        { title: 'Modelo Especial', value: 0.40 },
        { title: 'Tecate', value: 0.40 },
      ],
    },
    {
      id: 'domestic_light',
      name: 'Domestic light',
      values: [
        { title: 'Sam Adams Light', value: 2.39 },
        { title: 'Keystone Light', value: 1.95 },
        { title: 'Michelob Light', value: 1.72 },
        { title: 'Coors Light', value: 1.64 },
        { title: 'Any domestic light beer', value: 1.14 },
        { title: 'Michelob Ultra', value: 1.13 },
        { title: 'Bud Light Lime', value: 0.97 },
        { title: 'Miller Lite', value: 0.93 },
        { title: 'Bud Light', value: 0.89 },
        { title: 'Bud Light Platinum', value: 0.77 },
      ],
    },
  ],
  auto_ownership: [
    {
      id: 'all',
      name: 'All',
      values: [
        { title: 'Infiniti', value: 3.79 },
        { title: 'Smart', value: 3.77 },
        { title: 'Sterling/Land Rover Ltd.', value: 3.25 },
        { title: 'Lincoln', value: 2.82 },
        { title: 'Hyundai', value: 2.4 },
        { title: 'Volvo', value: 2.4 },
        { title: 'Acura', value: 1.82 },
        { title: 'Nissan', value: 1.68 },
        { title: 'Audi', value: 1.56 },
        { title: 'Subaru', value: 1.54 },
      ],
    },
    {
      id: 'compact',
      name: 'Compact',
      values: [
        { title: 'Lexus', value: 8.74 },
        { title: 'Fiat', value: 5.33 },
        { title: 'Hyundai', value: 2.58 },
        { title: 'Mercedes', value: 2.43 },
        { title: 'Subaru', value: 2.01 },
        { title: 'Volkswagen', value: 1.91 },
        { title: 'Audi', value: 1.78 },
        { title: 'Cadillac', value: 1.69 },
        { title: 'Mitsubishi', value: 1.61 },
        { title: 'Honda', value: 1.29 },
      ],
    },
    {
      id: 'large',
      name: 'Large',
      values: [
        { title: 'Cadillac', value: 4.39 },
        { title: 'Kia', value: 1.59 },
        { title: 'Dodge', value: 1.08 },
        { title: 'Hyundai', value: 1.06 },
        { title: 'Chrysler', value: 1.04 },
        { title: 'Chevrolet', value: 0.72 },
        { title: 'Lincoln', value: 0.71 },
        { title: 'Ford', value: 0.7 },
        { title: 'Buick', value: 0.58 },
        { title: 'Toyota', value: 0.5 },
      ],
    },
    {
      id: 'luxury',
      name: 'Luxury',
      values: [
        { title: 'Subaru', value: 4.04 },
        { title: 'Volvo', value: 2.9 },
        { title: 'Chevrolet', value: 1.44 },
        { title: 'Kia', value: 1.42 },
        { title: 'Cadillac', value: 1.33 },
        { title: 'Nissan', value: 1.24 },
        { title: 'Buick', value: 0.85 },
        { title: 'BMW', value: 0.8 },
        { title: 'Audi', value: 0.79 },
        { title: 'Lincoln', value: 0.62 },
      ],
    },
    {
      id: 'mid-size',
      name: 'Mid-size',
      values: [
        { title: 'BMW', value: 13.77 },
        { title: 'Suzuki', value: 8.7 },
        { title: 'Subaru', value: 2.76 },
        { title: 'Mitsubishi', value: 2.42 },
        { title: 'Volkswagen', value: 2.08 },
        { title: 'Kia', value: 1.63 },
        { title: 'Hyundai', value: 1.41 },
        { title: 'Ford', value: 1.18 },
        { title: 'Buick', value: 1.13 },
        { title: 'Toyota', value: 1.13 },
      ],
    },
    {
      id: 'subcompact',
      name: 'Subcompact',
      values: [
        { title: 'Subaru', value: 3.46 },
        { title: 'Smart', value: 2.51 },
        { title: 'Dodge', value: 1.72 },
        { title: 'Honda', value: 1.53 },
        { title: 'BMW', value: 1.52 },
        { title: 'Audi', value: 1.25 },
        { title: 'Volkswagen', value: 1.19 },
        { title: 'Chevrolet', value: 1.14 },
        { title: 'Mazda', value: 1.1 },
        { title: 'Nissan', value: 1.09 },
      ],
    },
    {
      id: 'suv',
      name: 'SUV',
      values: [
        { title: 'Subaru', value: 2.02 },
        { title: 'Volvo', value: 1.95 },
        { title: 'Kia', value: 1.92 },
        { title: 'Honda', value: 1.8 },
        { title: 'Jeep', value: 1.52 },
        { title: 'Mazda', value: 1.26 },
        { title: 'Nissan', value: 1.26 },
        { title: 'Hyundai', value: 1.12 },
        { title: 'Toyota', value: 1.08 },
        { title: 'Sterling/Land Rover Ltd.', value: 1.07 },
      ],
    },
    {
      id: 'truck',
      name: 'Truck',
      values: [
        { title: 'Honda', value: 3.09 },
        { title: 'GMC', value: 1.07 },
        { title: 'Chevrolet', value: 1.06 },
        { title: 'Ram', value: 1.02 },
        { title: 'Toyota', value: 1.02 },
        { title: 'Ford', value: 0.9 },
        { title: 'Dodge', value: 0.75 },
        { title: 'Nissan', value: 0.71 },
        { title: 'Mazda', value: 0.41 },
      ],
    },
    {
      id: 'van',
      name: 'Van',
      values: [
        { title: 'Hyundai', value: 3.46 },
        { title: 'Ram', value: 3.12 },
        { title: 'Kia', value: 1.59 },
        { title: 'Mazda', value: 1.23 },
        { title: 'GMC', value: 1.14 },
        { title: 'Ford', value: 1 },
        { title: 'Honda', value: 1 },
        { title: 'Dodge', value: 0.96 },
        { title: 'Chrysler', value: 0.87 },
        { title: 'Chevrolet', value: 0.82 },
      ],
    },
  ],
  telephone_service_providers: {
    values: [
      { title: 'Other', value: 2.22 },
      { title: 'AT&T', value: 1.84 },
      { title: 'Verizon', value: 1.09 },
      { title: 'None', value: 0.93 },
      { title: 'Charter Spectrum', value: 0.54 },
      { title: 'Skype', value: 0.44 },
      { title: 'Vonage', value: 0.42 },
    ],
  },
  wireless_phone_carriers: {
    values: [
      { title: 'MetroPCS', value: 1.94 },
      { title: 'Cricket', value: 1.90 },
      { title: 'Boost Mobile', value: 1.78 },
      { title: 'T-Mobile', value: 1.71 },
      { title: 'Sprint', value: 1.42 },
      { title: 'Virgin Mobile', value: 1.02 },
      { title: 'AT&T', value: 0.88 },
      { title: 'TracFone', value: 0.70 },
      { title: 'Verizon Wireless', value: 0.66 },
      { title: 'None', value: 0.61 },
      { title: 'Straight Talk', value: 0.54 },
    ],
  },
  internet_services: {
    values: [
      { title: 'Sprint', value: 1.64 },
      { title: 'Charter Spectrum', value: 1.32 },
      { title: 'Cox', value: 1.31 },
      { title: 'AT&T U-verse or DSL', value: 1.09 },
      { title: 'XFINITY Internet / Comcast', value: 0.94 },
      { title: 'Dish Network', value: 0.93 },
      { title: 'Verizon FiOS or DSL', value: 0.59 },
    ],
  },
  cable_tv: {
    values: [
      { title: 'Charter Spectrum', value: 1.19 },
      { title: 'Cox', value: 1.07 },
      { title: 'AT&T U-verse', value: 0.90 },
      { title: 'XFINITY / Comcast', value: 0.84 },
      { title: 'Suddenlink', value: 0.83 },
      { title: 'Verizon FiOS', value: 0.70 },
      { title: 'Mediacom', value: 0.16 },
    ],
  },
  top_partners: {
    values: [
      { title: 'Beer', value: 1.23, tooltip: 'Have bought in the last 4 weeks' },
      { title: 'Auto', value: 1.15, tooltip: 'Intend to buy new in the next 12 months' },
      { title: 'Computer', value: 1.11, tooltip: 'Intend to buy new in the next 12 months' },
      { title: 'Computer accessories', value: 1.18, tooltip: 'Intend to buy new in the next 12 months' },
      { title: 'Computer consoles / games', value: 1.22, tooltip: 'Currently own or have bought in the last 12 months' },
      { title: 'Consumer electronics', value: 1.05, tooltip: 'Intend to buy new in the next 12 months' },
      { title: 'Healthcare products', value: 0.95, tooltip: 'Currently own or have bought in the last 12 months' },
      { title: 'Luxury accessories', value: 1.15, tooltip: 'Currently own or have bought in the last 12 months' },
      { title: 'Mobile devices', value: 1.11, tooltip: 'Currently own or have bought in the last 12 months' },
      { title: 'Soft drinks / Beverages', value: 1.18, tooltip: 'Have bought in the last 4 weeks' },
      { title: 'Spirit Drinks', value: 0.81, tooltip: 'Have bought in the last 4 weeks' },
      { title: 'Sportswear / Equipment', value: 1.33, tooltip: 'Currently own or have bought in the last 12 months' },
      { title: 'Tires', value: 1.00, tooltip: 'Intend to buy new in the next 12 months' },
      { title: 'Wine', value: 0.95, tooltip: 'Have bought in the last 4 weeks' },
    ],
  },
  top_services: {
    values: [
    { title: 'Air travel for business', value: 1.21, tooltip: 'Currently use or have used in last 12 months' },
    { title: 'Air travel for leisure', value: 1.28, tooltip: 'Currently use or have used in last 12 months' },
    { title: 'Banking / Financial services', value: 1.21, tooltip: 'Currently use or have used in last 12 months' },
    { title: 'Credit card', value: 0.96, tooltip: 'Currently use or have used in last 12 months' },
    { title: 'Express / Parcel services', value: 0.95, tooltip: 'Intend to use again new in the next 12 months' },
    { title: 'Insurance', value: 1.25, tooltip: 'Intend to use again new in the next 12 months' },
    { title: 'Lottery / Gambling', value: 1.21, tooltip: 'Currently use or have used in last 12 months' },
    { title: 'Mobile network / wireless', value: 1.05, tooltip: 'Intend to use again new in the next 12 months' },
    { title: 'Pay TV / Subscription TV', value: 1.44, tooltip: 'Intend to use again new in the next 12 months' },
    { title: 'Quick service restaurants', value: 1.05, tooltip: 'Currently use or have used in last 12 months' },
    { title: 'Renewable energy', value: 1.45, tooltip: 'Intend to use again new in the next 12 months' },
    { title: 'Rental car', value: 1.08, tooltip: 'Currently use or have used in last 12 months' },
    { title: 'Sports betting services', value: 1.33, tooltip: 'Currently use or have used in last 12 months' },
    { title: 'Travel / Vacation services', value: 1.29, tooltip: 'Intend to use again new in the next 12 months' },
    ],
  },
}
