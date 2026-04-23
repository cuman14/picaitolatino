export interface LocalizedString {
  es: string;
  en: string;
}

export interface MenuItem {
  name: LocalizedString;
  description?: LocalizedString;
  price: string | number;
  secondaryPrice?: string | number;
  allergens?: string[];
  special?: boolean;
}

export interface Category {
  id: string;
  name: LocalizedString;
  items: MenuItem[];
}

export const menuData: Category[] = [
  {
    id: 'especiales',
    name: { es: 'PLATOS ESPECIALES', en: 'CHEF SPECIALS' },
    items: [
      { name: { es: 'La Picaita', en: 'La Picaita' }, description: { es: 'Arroz congris, chorizo, pollo, chicharrón, carne de cerdo, pimientos de Padrón y salsa chimichurri', en: 'Congris rice, chorizo, chicken, pork belly, pork meat, Padrón peppers and chimichurri sauce' }, price: 15.50, allergens: ['eggs'], special: true },
      { name: { es: 'El Poderoso', en: 'The Powerful' }, description: { es: 'Medio aguacate, carne salteada, pimiento rojo y verde, cebolla jardinera, dados de patatas, salsa de soja', en: 'Half avocado, sautéed beef, red and green peppers, onions, diced potatoes, soy sauce' }, price: 14.50, allergens: ['soya'], special: true },
      { name: { es: 'Ropa Vieja', en: 'Ropa Vieja' }, description: { es: 'Tradicional receta de carne desmechada con nuestro toque especial latino', en: 'Traditional shredded beef recipe with our special Latin touch' }, price: 14.00, special: true },
      { name: { es: 'Rellenito', en: 'Rellenito' }, description: { es: '2 unds. Filete de cerdo envuelto con verduras y guarnición de chicharritas de plátano', en: '2 pcs. Pork fillet wrapped with vegetables and plantain chips garnish' }, price: 13.50, allergens: ['celery'], special: true },
      { name: { es: 'Bocaito', en: 'Bocaito' }, description: { es: '4 unds. Base de regañá con dados de queso brie fritos', en: '4 pcs. Crispy flatbread base with fried brie cheese cubes' }, price: 12.50, allergens: ['milk'], special: true },
      { name: { es: 'Morci-Rolls', en: 'Morci-Rolls' }, description: { es: '3 unds. Crujientes de morcilla rellenos de manzana y mozzarella, acompañados de una delicada reducción de manzana artesanal', en: '3 pcs. Crispy black pudding rolls stuffed with apple and mozzarella, served with an artisan apple reduction' }, price: 12.50, allergens: ['milk'], special: true },
      { name: { es: 'Yuca', en: 'Cassava (Yuca)' }, description: { es: 'Con mojo criollo y chicharrón', en: 'With creole mojo sauce and pork belly (chicharrón)' }, price: 12.50, special: true },
      { name: { es: 'Bolón de Plátano', en: 'Plantain Bolón' }, description: { es: 'Relleno de chicharrones, con queso cheddar y un huevo frito', en: 'Stuffed with pork belly, cheddar cheese and a fried egg' }, price: 13.00, allergens: ['eggs', 'milk'], special: true },
    ]
  },
  {
    id: 'empezar',
    name: { es: 'PARA EMPEZAR', en: 'STARTERS' },
    items: [
      { name: { es: 'Croquetas Patata y Pollo', en: 'Potato & Chicken Croquettes' }, description: { es: '6 unidades', en: '6 pieces' }, price: 8.00, allergens: ['gluten', 'eggs'] },
      { name: { es: 'Croquetas de Jamón', en: 'Iberian Ham Croquettes' }, description: { es: '6 unidades', en: '6 pieces' }, price: 8.50, allergens: ['gluten', 'milk'] },
      { name: { es: 'Croquetas Arroz', en: 'Rice Croquettes' }, description: { es: 'Rellena de ternera y queso, 4 unidades', en: 'Stuffed with beef and cheese, 4 pieces' }, price: 9.50, allergens: ['gluten', 'eggs', 'milk'] },
      { name: { es: 'Surtido Croquetas', en: 'Assorted Croquettes' }, description: { es: 'Pollo 2, Jamón 2, Arroz 2', en: 'Chicken 2, Ham 2, Rice 2' }, price: 12.00, allergens: ['gluten', 'eggs', 'milk'] },
      { name: { es: 'Ensalada Costa Fría', en: 'Cold Coast Salad' }, description: { es: 'Mango, lechuga gourmet, aguacate, langostinos, mozzarella', en: 'Mango, gourmet lettuce, avocado, prawns, mozzarella' }, price: 14.50, allergens: ['crustaceans', 'milk'] },
      { name: { es: 'Ensalada Rúcula y Burratina', en: 'Arugula & Burratina Salad' }, description: { es: 'Cebolla roja, tomate cherry, salsa pesto, rúcula, burratina', en: 'Red onion, cherry tomato, pesto sauce, arugula, burratina cheese' }, price: 12.50, allergens: ['milk', 'nuts'] },
      { name: { es: 'Ric de Mar', en: 'Sea Ric' }, description: { es: 'Patata, zanahoria, huevo, gambas, atún, mayonesa', en: 'Potato, carrot, egg, prawns, tuna, mayonnaise' }, price: 12.00, allergens: ['fish', 'eggs', 'crustaceans'] },
    ]
  },
  {
    id: 'raciones',
    name: { es: 'RACIONES', en: 'PORTIONS' },
    items: [
      { name: { es: 'Tostones', en: 'Fried Green Plantains' }, description: { es: '6 unds', en: '6 pcs' }, price: 8.00 },
      { name: { es: 'Arroz congris', en: 'Congris Rice' }, price: 4.50, allergens: ['eggs'] },
      { name: { es: 'Chicharrones', en: 'Pork Belly (Chicharrones)' }, price: 6.50 },
      { name: { es: 'Queso Semi Curado', en: 'Semi-cured Cheese' }, price: 8.50, allergens: ['milk'] },
      { name: { es: 'Jamón Ibérico', en: 'Iberian Ham' }, price: 12.00, allergens: ['eggs'] },
      { name: { es: 'Banderillas', en: 'Pickle Skewers' }, description: { es: '1 und', en: '1 pc' }, price: 1.50, allergens: ['sulphites'] },
    ]
  },
  {
    id: 'tostas',
    name: { es: 'TOSTAS', en: 'TOASTS' },
    items: [
      { name: { es: 'Tosta de Solomillo', en: 'Sirloin Toast' }, description: { es: 'Tomate rodajas, solomillo y manzana asada', en: 'Sliced tomato, sirloin and roasted apple' }, price: 9.50, allergens: ['eggs'] },
      { name: { es: 'Tosta Queso de Cabra', en: 'Goat Cheese Toast' }, description: { es: 'Cebolla caramelizada, queso de cabra, pimiento del piquillo, reducción vinagre Módena', en: 'Caramelized onion, goat cheese, piquillo pepper, balsamic reduction' }, price: 8.50, allergens: ['gluten', 'milk', 'sulphites'] },
      { name: { es: 'Tosta de Cabeza de Lomo', en: 'Pork Collar Toast' }, description: { es: 'Base pimientos asados y cabeza de lomo', en: 'Roasted peppers base and pork collar' }, price: 7.50, allergens: ['eggs'] },
      { name: { es: 'Tosta de Salmón', en: 'Salmon Toast' }, description: { es: 'Guacamole, rodajas salmón, pico de gallo y eneldo', en: 'Guacamole, sliced salmon, pico de gallo and dill' }, price: 12.50, allergens: ['eggs', 'fish'] },
    ]
  },
  {
    id: 'mini-tortillas',
    name: { es: 'MINI TORTILLAS', en: 'MINI SPANISH OMELETTES' },
    items: [
      { name: { es: 'Mini Tortilla Clásica', en: 'Classic Mini Omelette' }, price: 4.50, secondaryPrice: 5.30, allergens: ['eggs'] },
      { name: { es: 'Mini Tortilla Jamón Cocido y Queso Gouda', en: 'Ham & Gouda Cheese Omelette' }, price: 6.20, secondaryPrice: 7.20, allergens: ['eggs', 'milk'] },
      { name: { es: 'Mini Tortilla de Verdura', en: 'Vegetable Omelette' }, price: 6.60, secondaryPrice: 7.00, allergens: ['eggs'] },
      { name: { es: 'Mini Tortilla Queso Cabra y Cebolla', en: 'Goat Cheese & Onion Omelette' }, price: 6.60, secondaryPrice: 7.50, allergens: ['eggs', 'milk', 'sulphites'] },
    ]
  },
  {
    id: 'postres',
    name: { es: 'POSTRES', en: 'DESSERTS' },
    items: [
      { name: { es: 'Flan de Maíz', en: 'Corn Flan' }, price: 5.00, allergens: ['gluten', 'eggs', 'milk'] },
      { name: { es: 'Pudding de Coco', en: 'Coconut Pudding' }, price: 6.70, allergens: ['eggs', 'milk'] },
      { name: { es: 'Arroz con Leche', en: 'Rice Pudding' }, price: 5.50, allergens: ['eggs', 'milk'] },
      { name: { es: 'Postre de Ecuador', en: 'Ecuador Dessert' }, price: 7.00, allergens: ['gluten', 'eggs', 'milk'] },
    ]
  },
  {
    id: 'bebidas',
    name: { es: 'BEBIDAS', en: 'DRINKS' },
    items: [
      { name: { es: 'Caña', en: 'Draft Beer (Small)' }, price: 1.50 },
      { name: { es: 'Cañón', en: 'Draft Beer (Large)' }, price: 2.70 },
      { name: { es: 'Jarra', en: 'Beer Pitcher' }, price: 3.50 },
      { name: { es: 'Cerveza 1906 / Heineken / Est. Galicia', en: '1906 / Heineken / Est. Galicia Beer' }, price: 3.00 },
      { name: { es: 'Refrescos', en: 'Soft Drinks' }, price: 2.20 },
      { name: { es: 'Agua Solán de Cabras 0.5L', en: 'Still Water 0.5L' }, price: 2.00 },
      { name: { es: 'Agua con Gas 0.5L', en: 'Sparkling Water 0.5L' }, price: 2.50 },
      { name: { es: 'Café Solo / Cortado', en: 'Espresso / Macchiato' }, price: 1.40 },
      { name: { es: 'Café con Leche', en: 'Coffee with Milk' }, price: 1.40 },
    ]
  }
];
