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
  subcategory?: string;
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
        allergens: ["gluten", "lacteos"],
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
        allergens: ["crustaceos", "lacteos"],
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
        allergens: ["gluten", "lacteos", "frutos_con_cascara"],
      },
      {
        name: { es: "Ric de Mar", en: "Sea Ric" },
        description: {
          es: "Patata, zanahoria, huevo, gambas, atún, mayonesa",
          en: "Potato, carrot, egg, prawns, tuna, mayonnaise",
        },
        price: 9.0,
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
        price: 5.0,
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
      {
        name: {
          es: "Salchipapa con queso derretido",
          en: "Sausage & Potatoes with Melted Cheese",
        },
        price: 8.0,
        allergens: ["gluten", "lacteos"],
      },
      {
        name: {
          es: "Tabla de Queso (Queso Semicurado)",
          en: "Cheese Board (Semi-cured Cheese)",
        },
        price: 9.0,
        allergens: ["lacteos"],
      },
      {
        name: { es: "Tabla de Jamon Iberico", en: "Iberian Ham Board" },
        price: 9.5,
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
        price: 5.3,
        secondaryPrice: 6.0,
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
    id: "tostadas-desayuno",
    name: { es: "TOSTADAS DE DESAYUNO", en: "BREAKFAST TOASTS" },
    items: [
      {
        name: { es: "Tostada de Aceite", en: "Olive Oil Toast" },
        price: 1.2,
        secondaryPrice: 1.6,
        allergens: ["gluten"],
      },
      {
        name: { es: "Tostada de Mermelada", en: "Jam Toast" },
        price: 1.2,
        secondaryPrice: 1.6,
        allergens: ["gluten"],
      },
      {
        name: { es: "Tostada de Tomate", en: "Tomato Toast" },
        price: 1.3,
        secondaryPrice: 1.7,
        allergens: ["gluten"],
      },
      {
        name: { es: "Tostada de Pavo", en: "Turkey Toast" },
        price: 1.7,
        secondaryPrice: 2.0,
        allergens: ["gluten"],
      },
      {
        name: { es: "Tostada de Pate Iberico", en: "Iberian Pâté Toast" },
        price: 1.2,
        secondaryPrice: 1.5,
        allergens: ["gluten"],
      },
      {
        name: { es: "Tostada de Pate Jamon York", en: "York Ham Pâté Toast" },
        price: 1.2,
        secondaryPrice: 1.5,
        allergens: ["gluten"],
      },
      {
        name: { es: "Tostada de Jamon Iberico", en: "Iberian Ham Toast" },
        price: 2.5,
        secondaryPrice: 3.1,
        allergens: ["gluten"],
      },
      {
        name: { es: "Paté Iberico (Ración)", en: "Iberian Pâté (Portion)" },
        price: 1.9,
        secondaryPrice: 2.9,
      },
      {
        name: { es: "Crema de York (Ración)", en: "York Cream (Portion)" },
        price: 1.8,
        secondaryPrice: 2.6,
        allergens: ["lacteos"],
      },
    ],
  },
  {
    id: "postres",
    name: { es: "POSTRES", en: "DESSERTS" },
    items: [
      {
        name: { es: "Flan de Maiz", en: "Corn Flan" },
        price: 3.0,
        allergens: ["huevo", "lacteos"],
      },
      {
        name: { es: "Postre Ecuador", en: "Ecuador Dessert" },
        price: 3.0,
        allergens: ["huevo", "lacteos"],
      },
      {
        name: { es: "Arroz con leche", en: "Rice Pudding" },
        price: 3.5,
        allergens: ["lacteos"],
      },
      {
        name: { es: "Pudding de Coco", en: "Coconut Pudding" },
        price: 4.5,
        allergens: ["huevo", "lacteos"],
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
        subcategory: "Cervezas",
      },
      {
        name: { es: "Cañón", en: "Draft Beer (Large)" },
        price: 2.7,
        allergens: ["gluten"],
        subcategory: "Cervezas",
      },
      {
        name: { es: "Jarra", en: "Beer Pitcher" },
        price: 3.5,
        allergens: ["gluten"],
        subcategory: "Cervezas",
      },
      {
        name: {
          es: "Cerveza 1906 / Heineken / Est. Galicia",
          en: "1906 / Heineken / Est. Galicia Beer",
        },
        price: 3.0,
        allergens: ["gluten"],
        subcategory: "Cervezas",
      },
      {
        name: { es: "Botellín Cruzcampo", en: "Cruzcampo Bottle" },
        price: 1.5,
        allergens: ["gluten"],
        subcategory: "Cervezas",
      },
      {
        name: { es: "Cruzcampo especial", en: "Cruzcampo Special" },
        price: 3.0,
        allergens: ["gluten"],
        subcategory: "Cervezas",
      },
      {
        name: { es: "Cruzcampo sin gluten", en: "Cruzcampo Gluten Free" },
        price: 3.0,
        subcategory: "Cervezas",
      },
      {
        name: { es: "Alhambra Reserva", en: "Alhambra Reserva" },
        price: 3.0,
        allergens: ["gluten"],
        subcategory: "Cervezas",
      },
      {
        name: { es: "Alhambra 196", en: "Alhambra 196" },
        price: 3.0,
        allergens: ["gluten"],
        subcategory: "Cervezas",
      },
      {
        name: { es: "Alhambra Radler", en: "Alhambra Radler" },
        price: 2.5,
        allergens: ["gluten"],
        subcategory: "Cervezas",
      },
      {
        name: { es: "Heineken 0.0", en: "Heineken 0.0" },
        price: 3.0,
        allergens: ["gluten"],
        subcategory: "Cervezas",
      },
      {
        name: { es: "Tostada 0,0", en: "Tostada 0,0" },
        price: 2.8,
        allergens: ["gluten"],
        subcategory: "Cervezas",
      },
      {
        name: { es: "Maho 0.0", en: "Maho 0.0" },
        price: 2.8,
        allergens: ["gluten"],
        subcategory: "Cervezas",
      },
      {
        name: { es: "Tinto de Verano", en: "Summer Wine" },
        price: 3.5,
        allergens: ["sulfitos"],
        subcategory: "Vinos y Sangría",
      },
      {
        name: { es: "Tinto de Vernao 0.0", en: "Vernao 0.0 Wine" },
        price: 3.0,
        allergens: ["sulfitos"],
        subcategory: "Vinos y Sangría",
      },
      {
        name: { es: "Jarra Sangria", en: "Sangria Pitcher" },
        price: 15.0,
        allergens: ["sulfitos"],
        subcategory: "Vinos y Sangría",
      },
      {
        name: { es: "Manzanilla Solera", en: "Manzanilla Solera" },
        price: 3.5,
        allergens: ["sulfitos"],
        subcategory: "Vinos y Sangría",
      },
      {
        name: {
          es: "Vino Tío Pepe / Canasta / Pedro Ximénez",
          en: "Tío Pepe / Canasta / Pedro Ximénez Wine",
        },
        price: 3.0,
        allergens: ["sulfitos"],
        subcategory: "Vinos y Sangría",
      },
      {
        name: { es: "Agua", en: "Water" },
        price: 2.0,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: { es: "Botella de Agua", en: "Water Bottle" },
        price: 1.0,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: { es: "Agua con Gas", en: "Sparkling Water" },
        price: 2.5,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: {
          es: "Coca-cola / Coca-cola Zero / Coca-Cola Zero Zero (Sin Azúcar)",
          en: "Coca-cola / Coca-cola Zero / Coca-Cola Zero Zero (Sugar Free)",
        },
        price: 2.2,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: {
          es: "Fanta Limón / Fanta Naranja",
          en: "Fanta Lemon / Fanta Orange",
        },
        price: 2.2,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: {
          es: "Aquarius Limón / Aquarius Naranja",
          en: "Aquarius Lemon / Aquarius Orange",
        },
        price: 2.2,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: { es: "Fuze Tea (Como el nestea)", en: "Fuze Tea (Like Nestea)" },
        price: 2.2,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: { es: "Tónica Royal Bliss", en: "Royal Bliss Tonic" },
        price: 1.5,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: { es: "Red bull", en: "Red Bull" },
        price: 2.5,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: { es: "Refrescos", en: "Soft Drinks" },
        price: 2.2,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: { es: "Agua Solán de Cabras 0.5L", en: "Still Water 0.5L" },
        price: 2.0,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: { es: "Agua con Gas 0.5L", en: "Sparkling Water 0.5L" },
        price: 2.5,
        subcategory: "Refrescos y Aguas",
      },
      {
        name: { es: "Cafe Solo", en: "Espresso" },
        price: 1.3,
        subcategory: "Cafetería",
      },
      {
        name: { es: "Cafe Americano", en: "Americano" },
        price: 1.4,
        subcategory: "Cafetería",
      },
      {
        name: { es: "Café Cortado", en: "Macchiato" },
        price: 1.5,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      },
      {
        name: { es: "Cafe con Leche", en: "Coffee with Milk" },
        price: 1.5,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      },
      {
        name: {
          es: "Café con Leche Sin Lactosa",
          en: "Coffee with Lactose-Free Milk",
        },
        price: 1.6,
        subcategory: "Cafetería",
      },
      {
        name: { es: "Café manchao", en: "Stained Coffee" },
        price: 1.5,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      },
      {
        name: { es: "Capuchino", en: "Cappuccino" },
        price: 1.4,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      },
      {
        name: { es: "Descafeinado de máquina", en: "Decaf Machine Coffee" },
        price: 1.4,
        subcategory: "Cafetería",
      },
      {
        name: {
          es: "Descafeinado de Maquina sin Lactosa",
          en: "Decaf Machine Coffee Lactose-Free",
        },
        price: 1.6,
        subcategory: "Cafetería",
      },
      {
        name: {
          es: "Café manchado c/descafeinado maquina",
          en: "Stained Coffee with Decaf",
        },
        price: 1.6,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      },
      {
        name: { es: "Descafeinado de sobre", en: "Instant Decaf" },
        price: 1.4,
        subcategory: "Cafetería",
      },
      {
        name: {
          es: "Descafinado de sobre con Leche",
          en: "Instant Decaf with Milk",
        },
        price: 1.4,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      },
      {
        name: { es: "Cola Cao", en: "Cola Cao" },
        price: 1.5,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      },
      {
        name: {
          es: "Cola cao c/leche s/lactosa",
          en: "Cola Cao with Lactose-Free Milk",
        },
        price: 1.6,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      },
      {
        name: { es: "Café con Baileys", en: "Coffee with Baileys" },
        price: 3.0,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      },
      {
        name: { es: "Carajillo", en: "Carajillo" },
        price: 2.0,
        subcategory: "Cafetería",
      },
      {
        name: { es: "Tila", en: "Linden Tea" },
        price: 1.4,
        subcategory: "Infusiones y Zumos",
      },
      {
        name: { es: "Menta Poleo", en: "Pennyroyal Tea" },
        price: 1.5,
        subcategory: "Infusiones y Zumos",
      },
      {
        name: { es: "Te Rojo", en: "Red Tea" },
        price: 1.5,
        subcategory: "Infusiones y Zumos",
      },
      {
        name: { es: "Té Verde", en: "Green Tea" },
        price: 1.5,
        subcategory: "Infusiones y Zumos",
      },
      {
        name: {
          es: "Zumo de Naranja / Melocoton / Piña (Minute Maid VN)",
          en: "Orange / Peach / Pineapple Juice (Minute Maid VN)",
        },
        price: 2.0,
        subcategory: "Infusiones y Zumos",
      },
      {
        name: { es: "Batido de Chocolate", en: "Chocolate Milkshake" },
        price: 2.0,
        allergens: ["lacteos"],
        subcategory: "Infusiones y Zumos",
      },
      {
        name: { es: "Batido de fresa", en: "Strawberry Milkshake" },
        price: 2.0,
        allergens: ["lacteos"],
        subcategory: "Infusiones y Zumos",
      },
      {
        name: { es: "Baileys", en: "Baileys" },
        price: 3.5,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      },
      {
        name: { es: "Café con Baileys", en: "Coffee with Baileys" },
        price: 4.5,
        allergens: ["lacteos"],
        subcategory: "Cafetería",
      },
      {
        name: { es: "Cola Cao", en: "Cola Cao" },
        price: 2.0,
        allergens: ["lacteos", "gluten"],
        subcategory: "Cafetería",
      },
    ],
  },
  {
    id: "combinados-chupitos",
    name: { es: "COMBINADOS Y CHUPITOS", en: "MIXED DRINKS & SHOTS" },
    items: [
      {
        name: { es: "Gintonic", en: "Gin & Tonic" },
        price: 7.5,
      },
      {
        name: {
          es: "Cubalibre (Ron & Cocacola)",
          en: "Cuba Libre (Rum & Coke)",
        },
        price: 8.0,
      },
      {
        name: {
          es: "Cacique / Capitan Morgan",
          en: "Cacique / Captain Morgan",
        },
        price: 8.0,
      },
      {
        name: { es: "Beefeater con tónica", en: "Beefeater with Tonic" },
        price: 8.0,
      },
      {
        name: { es: "Habana club", en: "Havana Club" },
        price: 8.5,
      },
      {
        name: {
          es: "Ballantines / Johnnie walker / Abuelo",
          en: "Ballantines / Johnnie Walker / Abuelo",
        },
        price: 8.5,
      },
      {
        name: {
          es: "Puerto de Indias / Bombay tonica",
          en: "Puerto de Indias / Bombay Tonic",
        },
        price: 8.5,
      },
      {
        name: { es: "Heinker 0.0", en: "Heineken 0.0" },
        price: 3.0,
      },
      {
        name: { es: "Chupito", en: "Shot" },
        price: 2.0,
      },
      {
        name: { es: "Chupito Crema Tequila", en: "Tequila Cream Shot" },
        price: 2.5,
      },
      {
        name: { es: "Chupito Anis del mono", en: "Anís del Mono Shot" },
        price: 3.0,
      },
      {
        name: { es: "Chupito Tequila Catrina", en: "Tequila Catrina Shot" },
        price: 10.0,
      },
    ],
  },
  {
    id: "otros",
    name: { es: "OTROS (PAN Y SALSAS)", en: "OTHERS (BREAD & SAUCES)" },
    items: [
      {
        name: { es: "Aperitivos", en: "Snacks" },
        price: 1.5,
      },
      {
        name: { es: "Pan", en: "Bread" },
        price: 1.0,
      },
      {
        name: { es: "Picos", en: "Breadsticks" },
        price: 0.5,
      },
      {
        name: { es: "Salsa Alioli", en: "Alioli Sauce" },
        price: 0.6,
        allergens: ["huevo"],
      },
      {
        name: { es: "Salsa Chimichurri", en: "Chimichurri Sauce" },
        price: 0.7,
      },
      {
        name: { es: "Salsa Picante", en: "Spicy Sauce" },
        price: 0.7,
      },
    ],
  },
  {
    id: "vinos",
    name: { es: "CARTA DE VINOS", en: "WINE MENU" },
    items: [
      {
        name: {
          es: "Azpilicueta (D.O.Ca. Rioja)",
          en: "Azpilicueta (D.O.Ca. Rioja)",
        },
        price: 3.5,
        secondaryPrice: 19.0,
        allergens: ["sulfitos"],
        subcategory: "Tintos",
      },
      {
        name: {
          es: "Marqués de Puerto (D.O.Ca. Rioja)",
          en: "Marqués de Puerto (D.O.Ca. Rioja)",
        },
        price: 3.5,
        secondaryPrice: 18.0,
        allergens: ["sulfitos"],
        subcategory: "Tintos",
      },
      {
        name: {
          es: "Alcorta (D.O. Ribera del Duero)",
          en: "Alcorta (D.O. Ribera del Duero)",
        },
        price: 3.2,
        secondaryPrice: 16.0,
        allergens: ["sulfitos"],
        subcategory: "Tintos",
      },
      {
        name: {
          es: "Solear Barbadillo (Manzanilla)",
          en: "Solear Barbadillo (Manzanilla)",
        },
        price: 2.8,
        secondaryPrice: 20.0,
        allergens: ["sulfitos"],
        subcategory: "Blancos y Generosos",
      },
      {
        name: {
          es: "Montesierra (D.O. Rueda, Verdejo)",
          en: "Montesierra (D.O. Rueda, Verdejo)",
        },
        price: 3.0,
        secondaryPrice: 15.0,
        allergens: ["sulfitos"],
        subcategory: "Blancos y Generosos",
      },
      {
        name: {
          es: "Barbadillo (Castillo de San Diego)",
          en: "Barbadillo (Castillo de San Diego)",
        },
        price: 3.0,
        secondaryPrice: 15.0,
        allergens: ["sulfitos"],
        subcategory: "Blancos y Generosos",
      },
      {
        name: {
          es: "Tierra Blanca (Vino de la Tierra de Cádiz)",
          en: "Tierra Blanca (Vino de la Tierra de Cádiz)",
        },
        price: 3.0,
        secondaryPrice: 15.0,
        allergens: ["sulfitos"],
        subcategory: "Blancos y Generosos",
      },
      {
        name: {
          es: "Sangue Di Giuda (Oltrepò Pavese, Italia)",
          en: "Sangue Di Giuda (Oltrepò Pavese, Italy)",
        },
        price: 3.2,
        secondaryPrice: 18.0,
        allergens: ["sulfitos"],
        subcategory: "Espumosos y Dulces",
      },
      {
        name: {
          es: "Lambrusco Dell' Emilia Giacobozzi (Tinto)",
          en: "Lambrusco Dell' Emilia Giacobozzi (Red)",
        },
        price: 3.0,
        secondaryPrice: 15.0,
        allergens: ["sulfitos"],
        subcategory: "Espumosos y Dulces",
      },
      {
        name: {
          es: "Lambrusco Dell' Emilia Giacobozzi (Rosado)",
          en: "Lambrusco Dell' Emilia Giacobozzi (Rosé)",
        },
        price: 3.0,
        secondaryPrice: 15.0,
        allergens: ["sulfitos"],
        subcategory: "Espumosos y Dulces",
      },
    ],
  },
];
