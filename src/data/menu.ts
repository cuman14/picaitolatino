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
    id: "especiales",
    name: { es: "PLATOS ESPECIALES", en: "CHEF SPECIALS" },
    items: [
      {
        name: { es: "La Picaita", en: "La Picaita" },
        description: {
          es: "Arroz congris, chorizo, pollo, chicharrón, carne de cerdo, pimientos de Padrón y salsa chimichurri",
          en: "Congris rice, chorizo, chicken, pork belly, pork meat, Padrón peppers and chimichurri sauce",
        },
        price: 15.5,
        allergens: ["gluten"],
        special: true,
      },
      {
        name: { es: "El Poderoso", en: "The Powerful" },
        description: {
          es: "Medio aguacate, carne salteada, pimiento rojo y verde, cebolla jardinera, dados de patatas, salsa de soja",
          en: "Half avocado, sautéed beef, red and green peppers, onions, diced potatoes, soy sauce",
        },
        price: 14.5,
        allergens: ["soja"],
        special: true,
      },
      {
        name: { es: "Ropa Vieja", en: "Ropa Vieja" },
        description: {
          es: "Tradicional receta de carne desmechada con nuestro toque especial latino",
          en: "Traditional shredded beef recipe with our special Latin touch",
        },
        price: 14.0,
        special: true,
      },
      {
        name: { es: "Rellenito", en: "Rellenito" },
        description: {
          es: "2 unds. Filete de cerdo envuelto con verduras y guarnición de chicharritas de plátano",
          en: "2 pcs. Pork fillet wrapped with vegetables and plantain chips garnish",
        },
        price: 13.5,
        allergens: ["apio"],
        special: true,
      },
      {
        name: { es: "Bocaito", en: "Bocaito" },
        description: {
          es: "4 unds. Base de regañá con dados de queso brie fritos",
          en: "4 pcs. Crispy flatbread base with fried brie cheese cubes",
        },
        price: 12.5,
        allergens: ["lacteos"],
        special: true,
      },
      {
        name: { es: "Morci-Rolls", en: "Morci-Rolls" },
        description: {
          es: "3 unds. Crujientes de morcilla rellenos de manzana y mozzarella, acompañados de una delicada reducción de manzana artesanal",
          en: "3 pcs. Crispy black pudding rolls stuffed with apple and mozzarella, served with an artisan apple reduction",
        },
        price: 12.5,
        allergens: ["lacteos"],
        special: true,
      },
      {
        name: { es: "Yuca", en: "Cassava (Yuca)" },
        description: {
          es: "Con mojo criollo y chicharrón",
          en: "With creole mojo sauce and pork belly (chicharrón)",
        },
        price: 12.5,
        special: true,
      },
      {
        name: { es: "Bolón de Plátano", en: "Plantain Bolón" },
        description: {
          es: "Relleno de chicharrones, con queso cheddar y un huevo frito",
          en: "Stuffed with pork belly, cheddar cheese and a fried egg",
        },
        price: 13.0,
        allergens: ["huevo", "lacteos"],
        special: true,
      },
    ],
  },
  {
    id: "empezar",
    name: { es: "PARA EMPEZAR", en: "STARTERS" },
    items: [
      {
        name: {
          es: "Croquetas Patata y Pollo",
          en: "Potato & Chicken Croquettes",
        },
        description: { es: "6 unidades", en: "6 pieces" },
        price: 8.0,
        allergens: ["gluten", "huevo"],
      },
      {
        name: { es: "Croquetas de Jamón", en: "Iberian Ham Croquettes" },
        description: { es: "6 unidades", en: "6 pieces" },
        price: 8.5,
        allergens: ["gluten", "lacteos"],
      },
      {
        name: { es: "Croquetas Arroz", en: "Rice Croquettes" },
        description: {
          es: "Rellena de ternera y queso, 4 unidades",
          en: "Stuffed with beef and cheese, 4 pieces",
        },
        price: 9.5,
        allergens: ["gluten", "huevo", "lacteos"],
      },
      {
        name: { es: "Surtido Croquetas", en: "Assorted Croquettes" },
        description: {
          es: "Pollo 2, Jamón 2, Arroz 2",
          en: "Chicken 2, Ham 2, Rice 2",
        },
        price: 12.0,
        allergens: ["gluten", "huevo", "lacteos"],
      },
      {
        name: { es: "Ensalada Costa Fría", en: "Cold Coast Salad" },
        description: {
          es: "Mango, lechuga gourmet, aguacate, langostinos, mozzarella",
          en: "Mango, gourmet lettuce, avocado, prawns, mozzarella",
        },
        price: 14.5,
        allergens: ["crustaceos"],
      },
      {
        name: {
          es: "Ensalada Rúcula y Burratina",
          en: "Arugula & Burratina Salad",
        },
        description: {
          es: "Cebolla roja, tomate cherry, salsa pesto, rúcula, burratina",
          en: "Red onion, cherry tomato, pesto sauce, arugula, burratina cheese",
        },
        price: 12.5,
        allergens: ["lacteos", "frutos_con_cascara"],
      },
      {
        name: { es: "Ric de Mar", en: "Sea Ric" },
        description: {
          es: "Patata, zanahoria, huevo, gambas, atún, mayonesa",
          en: "Potato, carrot, egg, prawns, tuna, mayonnaise",
        },
        price: 12.0,
        allergens: ["crustaceos", "huevo", "pescado"],
      },
    ],
  },
  {
    id: "raciones",
    name: { es: "RACIONES", en: "PORTIONS" },
    items: [
      {
        name: { es: "Tostones", en: "Fried Green Plantains" },
        description: { es: "6 unds", en: "6 pcs" },
        price: 8.0,
      },
      {
        name: { es: "Arroz congris", en: "Congris Rice" },
        price: 4.5,
        allergens: ["gluten"],
      },
      {
        name: { es: "Chicharrones", en: "Pork Belly (Chicharrones)" },
        price: 6.5,
      },
      {
        name: { es: "Queso Semi Curado", en: "Semi-cured Cheese" },
        price: 8.5,
        allergens: ["lacteos"],
      },
      { name: { es: "Jamón Ibérico", en: "Iberian Ham" }, price: 12.0 },
      {
        name: { es: "Banderillas", en: "Pickle Skewers" },
        description: { es: "1 und", en: "1 pc" },
        price: 1.5,
        allergens: ["sulfitos"],
      },
    ],
  },
  {
    id: "tostas",
    name: { es: "TOSTAS", en: "TOASTS" },
    items: [
      {
        name: { es: "Tosta de Solomillo", en: "Sirloin Toast" },
        description: {
          es: "Tomate rodajas, solomillo y manzana asada",
          en: "Sliced tomato, sirloin and roasted apple",
        },
        price: 9.5,
        allergens: ["gluten"],
      },
      {
        name: { es: "Tosta Queso de Cabra", en: "Goat Cheese Toast" },
        description: {
          es: "Cebolla caramelizada, queso de cabra, pimiento del piquillo, reducción vinagre Módena",
          en: "Caramelized onion, goat cheese, piquillo pepper, balsamic reduction",
        },
        price: 8.5,
        allergens: ["gluten", "lacteos", "sulfitos"],
      },
      {
        name: { es: "Tosta de Cabeza de Lomo", en: "Pork Collar Toast" },
        description: {
          es: "Base pimientos asados y cabeza de lomo",
          en: "Roasted peppers base and pork collar",
        },
        price: 7.5,
        allergens: ["gluten"],
      },
      {
        name: { es: "Tosta de Salmón", en: "Salmon Toast" },
        description: {
          es: "Guacamole, rodajas salmón, pico de gallo y eneldo",
          en: "Guacamole, sliced salmon, pico de gallo and dill",
        },
        price: 12.5,
        allergens: ["gluten", "pescado"],
      },
    ],
  },
  {
    id: "mini-tortillas",
    name: { es: "MINI TORTILLAS", en: "MINI SPANISH OMELETTES" },
    items: [
      {
        name: { es: "Mini Tortilla Clásica", en: "Classic Mini Omelette" },
        price: 4.5,
        secondaryPrice: 5.3,
        allergens: ["huevo"],
      },
      {
        name: {
          es: "Mini Tortilla Jamón Cocido y Queso Gouda",
          en: "Ham & Gouda Cheese Omelette",
        },
        price: 6.2,
        secondaryPrice: 7.2,
        allergens: ["huevo", "lacteos"],
      },
      {
        name: { es: "Mini Tortilla de Verdura", en: "Vegetable Omelette" },
        price: 6.6,
        secondaryPrice: 7.0,
        allergens: ["huevo"],
      },
      {
        name: {
          es: "Mini Tortilla Queso Cabra y Cebolla",
          en: "Goat Cheese & Onion Omelette",
        },
        price: 6.6,
        secondaryPrice: 7.5,
        allergens: ["huevo", "lacteos", "sulfitos"],
      },
    ],
  },
  {
    id: "postres",
    name: { es: "POSTRES", en: "DESSERTS" },
    items: [
      {
        name: { es: "Flan de Maíz", en: "Corn Flan" },
        price: 5.0,
        allergens: ["gluten", "huevo", "lacteos"],
      },
      {
        name: { es: "Pudding de Coco", en: "Coconut Pudding" },
        price: 6.7,
        allergens: ["huevo", "lacteos"],
      },
      {
        name: { es: "Arroz con Leche", en: "Rice Pudding" },
        price: 5.5,
        allergens: ["gluten", "lacteos"],
      },
      {
        name: { es: "Postre de Ecuador", en: "Ecuador Dessert" },
        price: 7.0,
        allergens: ["gluten", "huevo", "lacteos"],
      },
    ],
  },
  {
    id: "bebidas",
    name: { es: "BEBIDAS", en: "DRINKS" },
    items: [
      {
        name: { es: "Caña", en: "Draft Beer (Small)" },
        price: 1.5,
        allergens: ["gluten"],
      },
      {
        name: { es: "Cañón", en: "Draft Beer (Large)" },
        price: 2.7,
        allergens: ["gluten"],
      },
      {
        name: { es: "Jarra", en: "Beer Pitcher" },
        price: 3.5,
        allergens: ["gluten"],
      },
      {
        name: {
          es: "Cerveza 1906 / Heineken / Est. Galicia",
          en: "1906 / Heineken / Est. Galicia Beer",
        },
        price: 3.0,
        allergens: ["gluten"],
      },
      {
        name: {
          es: "Vino Tío Pepe / Canasta / Pedro Ximénez",
          en: "Tío Pepe / Canasta / Pedro Ximénez Wine",
        },
        price: 3.0,
        allergens: ["sulfitos"],
      },
      { name: { es: "Refrescos", en: "Soft Drinks" }, price: 2.2 },
      {
        name: { es: "Agua Solán de Cabras 0.5L", en: "Still Water 0.5L" },
        price: 2.0,
      },
      {
        name: { es: "Agua con Gas 0.5L", en: "Sparkling Water 0.5L" },
        price: 2.5,
      },
      {
        name: {
          es: "Café Solo / Americano / Infusiones",
          en: "Espresso / Americano / Teas",
        },
        price: 1.4,
      },
      {
        name: {
          es: "Café con Leche / Cortado",
          en: "Coffee with Milk / Macchiato",
        },
        price: 1.4,
        allergens: ["lacteos"],
      },
      {
        name: { es: "Baileys", en: "Baileys" },
        price: 3.5,
        allergens: ["lacteos"],
      },
      {
        name: { es: "Café con Baileys", en: "Coffee with Baileys" },
        price: 4.5,
        allergens: ["lacteos"],
      },
      {
        name: { es: "Cola Cao", en: "Cola Cao" },
        price: 2.0,
        allergens: ["lacteos", "gluten"],
      },
    ],
  },
  {
    id: "vinos",
    name: { es: "CARTA DE VINOS", en: "WINE MENU" },
    items: [
      // TINTOS
      {
        name: {
          es: "Azpilicueta (D.O.Ca. Rioja)",
          en: "Azpilicueta (D.O.Ca. Rioja)",
        },
        price: 3.5,
        secondaryPrice: 19.0,
      },
      {
        name: {
          es: "Marqués de Puerto (D.O.Ca. Rioja)",
          en: "Marqués de Puerto (D.O.Ca. Rioja)",
        },
        price: 3.5,
        secondaryPrice: 18.0,
      },
      {
        name: {
          es: "Alcorta (D.O. Ribera del Duero)",
          en: "Alcorta (D.O. Ribera del Duero)",
        },
        price: 3.2,
        secondaryPrice: 16.0,
      },
      // BLANCOS Y GENEROSOS
      {
        name: {
          es: "Solear Barbadillo (Manzanilla)",
          en: "Solear Barbadillo (Manzanilla)",
        },
        price: 2.8,
        secondaryPrice: 20.0,
      },
      {
        name: {
          es: "Montesierra (D.O. Rueda, Verdejo)",
          en: "Montesierra (D.O. Rueda, Verdejo)",
        },
        price: 3.0,
        secondaryPrice: 15.0,
      },
      {
        name: {
          es: "Barbadillo (Castillo de San Diego)",
          en: "Barbadillo (Castillo de San Diego)",
        },
        price: 3.0,
        secondaryPrice: 15.0,
      },
      {
        name: {
          es: "Tierra Blanca (Vino de la Tierra de Cádiz)",
          en: "Tierra Blanca (Vino de la Tierra de Cádiz)",
        },
        price: 3.0,
        secondaryPrice: 15.0,
      },
      // ESPUMOSOS Y DULCES
      {
        name: {
          es: "Sangue Di Giuda (Oltrepò Pavese, Italia)",
          en: "Sangue Di Giuda (Oltrepò Pavese, Italy)",
        },
        price: 3.2,
        secondaryPrice: 18.0,
      },
      {
        name: {
          es: "Lambrusco Dell' Emilia Giacobozzi (Tinto)",
          en: "Lambrusco Dell' Emilia Giacobozzi (Red)",
        },
        price: 3.0,
        secondaryPrice: 15.0,
      },
      {
        name: {
          es: "Lambrusco Dell' Emilia Giacobozzi (Rosado)",
          en: "Lambrusco Dell' Emilia Giacobozzi (Rosé)",
        },
        price: 3.0,
        secondaryPrice: 15.0,
      },
    ],
  },
];
