"use client";

import React, { useState, useMemo, useEffect } from "react";

// NOTE: Drinks that use the teaspresso machine have been reclassified into "Teaspresso"
const initialDrinks = [
  {
    name: "Blueberry Matcha",
    category: "Matcha",
    ingredients: [
      "Blueberry puree - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Ice - 75%",
      "Milk - to line",
      "Matcha - 1 serving"
    ],
    steps: [
      "Add blueberry puree in cup: 25% = 30g, 50% = 40g, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Add 75% ice.",
      "Add milk to line.",
      "Mix blueberry with milk.",
      "Make matcha.",
      "Pour matcha in cup."
    ],
    notes: "75% and 100% add cane sugar with blueberry puree."
  },
  {
    name: "Coconut Matcha",
    category: "Matcha",
    ingredients: [
      "Coconut syrup - 1 / 2 / 3 / 4 pumps depending on sweetness",
      "Ice - 75%",
      "Milk - to line",
      "Matcha - 1 serving"
    ],
    steps: [
      "Add coconut pump in cup: 25% = 1 pump, 50% = 2 pumps, 75% = 3 pumps, 100% = 4 pumps.",
      "Add 75% ice.",
      "Add milk to line.",
      "Mix coconut with milk.",
      "Make matcha.",
      "Pour matcha in cup."
    ],
    notes: "Coconut pumps increase with sweetness level."
  },
  {
    name: "Banana Cream Matcha",
    category: "Matcha",
    ingredients: [
      "Banana puree - 30g / 40g depending on sweetness",
      "Vanilla syrup - 1 pump",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Ice - 75%",
      "Milk - to smaller line",
      "Matcha - 1 serving",
      "Brulee - 1 scoop",
      "White cover - 1"
    ],
    steps: [
      "Add banana puree in cup: 25% = 30g banana + 1 pump vanilla, 50% = 40g banana + 1 pump vanilla, 75% = 40g banana + 1 pump vanilla + 0.1 cane sugar, 100% = 40g banana + 1 pump vanilla + 0.2 cane sugar.",
      "Add 75% ice.",
      "Add milk to smaller line.",
      "Mix banana with milk.",
      "Make matcha.",
      "Pour matcha in cup.",
      "Put 1 scoop of brulee on top.",
      "Cap with white cover."
    ],
    notes: "Banana cream matcha gets brulee topping and white cover."
  },
  {
    name: "Caramel Brulee Matcha",
    category: "Matcha",
    ingredients: [
      "Caramel puree - 1 / 2 pumps depending on sweetness",
      "Ice - 75%",
      "Milk - to smaller line",
      "Matcha - 1 serving",
      "Brulee - 1 scoop",
      "White cover - 1"
    ],
    steps: [
      "Add caramel puree in cup: 50% = 1 pump caramel, 100% = 2 pumps caramel.",
      "Add 75% ice.",
      "Add milk to smaller line.",
      "Mix caramel with milk.",
      "Make matcha.",
      "Pour matcha in cup.",
      "Put 1 scoop of brulee on top.",
      "Cap with white cover."
    ],
    notes: "This recipe only specifies 50% and 100% caramel amounts in the guide."
  },
  {
    name: "Brown Sugar Matcha",
    category: "Matcha",
    ingredients: [
      "Brown sugar boba - 1 scoop",
      "Brown sugar - 10g / 20g / 30g / 40g depending on sweetness",
      "Ice - 75%",
      "Milk - to line",
      "Matcha - 1 serving"
    ],
    steps: [
      "Add 1 scoop brown sugar boba.",
      "Add brown sugar around cup: 25% = 10g, 50% = 20g, 75% = 30g, 100% = 40g.",
      "Add 75% ice.",
      "Add milk to line.",
      "Make matcha.",
      "Pour matcha in cup."
    ],
    notes: "Brown sugar amount changes with sweetness selection."
  },
  {
    name: "Creamy Uji Matcha",
    category: "Matcha",
    ingredients: [
      "Vanilla syrup - 1 / 2 / 3 / 4 pumps depending on sweetness",
      "Ice - 75%",
      "Milk - to small line",
      "Matcha - 1 serving",
      "Cream Cloud - 1 scoop"
    ],
    steps: [
      "Add vanilla pump in cup: 25% = 1 pump, 50% = 2 pumps, 75% = 3 pumps, 100% = 4 pumps.",
      "Add 75% ice.",
      "Add milk to small line.",
      "Mix vanilla with milk.",
      "Make matcha.",
      "Pour matcha in cup.",
      "Add 1 scoop Cream Cloud."
    ],
    notes: "Creamy Uji Matcha gets cream cloud on top."
  },
  {
    name: "Uji Matcha",
    category: "Matcha",
    ingredients: [
      "Vanilla syrup - 1 / 2 / 3 / 4 pumps depending on sweetness",
      "Ice - 75%",
      "Milk - to line",
      "Matcha - 1 serving"
    ],
    steps: [
      "Add vanilla pump in cup: 25% = 1 pump, 50% = 2 pumps, 75% = 3 pumps, 100% = 4 pumps.",
      "Add 75% ice.",
      "Add milk to line.",
      "Mix vanilla with milk.",
      "Make matcha.",
      "Pour matcha in cup."
    ],
    notes: "Classic Uji Matcha with vanilla syrup."
  },
  {
    name: "Mango Matcha",
    category: "Matcha",
    ingredients: [
      "Mango jam - 1 / 2 scoops depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Ice - 75%",
      "Milk - to line",
      "Matcha - 1 serving"
    ],
    steps: [
      "Add mango jam into cup: 25% = 1 scoop, 50% = 2 scoops, 75% = 2 scoops + 0.1 cane sugar, 100% = 2 scoops + 0.2 cane sugar.",
      "Add 75% ice.",
      "Add milk to line.",
      "Make matcha.",
      "Pour matcha in cup."
    ],
    notes: "75% and 100% add cane sugar with mango jam."
  },
  {
    name: "Strawberry Matcha",
    category: "Matcha",
    ingredients: [
      "Strawberry jam - 1 / 2 scoops depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Ice - 75%",
      "Milk - to line",
      "Matcha - 1 serving"
    ],
    steps: [
      "Add strawberry jam into cup: 25% = 1 scoop, 50% = 2 scoops, 75% = 2 scoops + 0.1 cane sugar, 100% = 2 scoops + 0.2 cane sugar.",
      "Add 75% ice.",
      "Add milk to line.",
      "Make matcha.",
      "Pour matcha in cup."
    ],
    notes: "75% and 100% add cane sugar with strawberry jam."
  },
  {
    name: "Rosy Matcha",
    category: "Matcha",
    ingredients: [
      "Rose syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Ice - 75%",
      "Milk - to small line",
      "Matcha - 1 serving"
    ],
    steps: [
      "Add rose syrup to cup: 25% = 30g, 50% = 40g, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Add 75% ice.",
      "Add milk to small line.",
      "Mix rose with milk.",
      "Make matcha.",
      "Pour matcha in cup."
    ],
    notes: "75% and 100% add cane sugar with the rose syrup."
  },
  {
    name: "House Special (Boba)",
    category: "Teaspresso",
    ingredients: [
      "Boba - 1 scoop",
      "House Black - teaspresso base",
      "Ice - full ice in large shaker",
      "Creamer - 1 full scoop",
      "Cane sugar - 0.7 / 1.4 / 2.1 / 2.9 depending on sweetness"
    ],
    steps: [
      "1 scoop boba in cup.",
      "Put House Black in teaspresso.",
      "Press 'M'.",
      "Fill large shaker with full ice.",
      "Add 1 full scoop creamer.",
      "Add cane sugar: 25% = 0.7, 50% = 1.4, 75% = 2.1, 100% = 2.9.",
      "Add tea to shaker.",
      "Shake on 'A'.",
      "Pour in cup."
    ],
    notes: "House Special (Boba) follows the standard teaspresso milk tea pattern."
  },
  {
    name: "Phoenix Oolong",
    category: "Teaspresso",
    ingredients: [
      "Phoenix Oolong - teaspresso base",
      "Ice - full ice in large shaker",
      "Creamer - 1 full scoop",
      "Cane sugar - 0.7 / 1.4 / 2.1 / 2.9 depending on sweetness"
    ],
    steps: [
      "Put Phoenix Oolong in teaspresso.",
      "Press 'M'.",
      "Fill large shaker with full ice.",
      "Add 1 full scoop creamer.",
      "Add cane sugar: 25% = 0.7, 50% = 1.4, 75% = 2.1, 100% = 2.9.",
      "Add tea to shaker.",
      "Shake on 'A'.",
      "Pour in cup."
    ],
    notes: "Standard teaspresso milk tea flow."
  },
  {
    name: "Lychee Black",
    category: "Teaspresso",
    ingredients: [
      "Lychee - 1 scoop in cup",
      "Lychee tea - teaspresso base",
      "Ice - full ice in large shaker",
      "Cane sugar - 0.7 / 1.4 / 2.1 / 2.9 depending on sweetness"
    ],
    steps: [
      "1 scoop lychee in cup.",
      "Put Lychee in teaspresso.",
      "Press 'G'.",
      "Fill large shaker with full ice.",
      "Add cane sugar: 25% = 0.7, 50% = 1.4, 75% = 2.1, 100% = 2.9.",
      "Add tea to shaker.",
      "Shake on 'A'.",
      "Pour in cup."
    ],
    notes: "Fruit-forward teaspresso drink."
  },
  {
    name: "White Grape Oolong",
    category: "Teaspresso",
    ingredients: [
      "White Grape - teaspresso base",
      "Ice - full ice in large shaker",
      "Cane sugar - 0.7 / 1.4 / 2.1 / 2.9 depending on sweetness"
    ],
    steps: [
      "Put White Grape in teaspresso.",
      "Press 'G'.",
      "Fill large shaker with full ice.",
      "Add cane sugar: 25% = 0.7, 50% = 1.4, 75% = 2.1, 100% = 2.9.",
      "Add tea to shaker.",
      "Shake on 'A'.",
      "Pour in cup."
    ],
    notes: "White Grape Oolong follows the teaspresso fruit tea style."
  },
  {
    name: "Earl Grey Boba",
    category: "Teaspresso",
    ingredients: [
      "Boba - 1 scoop",
      "Earl Grey - teaspresso base",
      "Ice - full ice in large shaker",
      "Creamer - 1 full scoop",
      "Brown sugar - 10g / 20g / 30g / 40g depending on sweetness"
    ],
    steps: [
      "1 scoop boba in cup.",
      "Put Earl Grey in teaspresso.",
      "Press 'M'.",
      "Fill large shaker with full ice.",
      "Add 1 full scoop creamer.",
      "Add brown sugar: 25% = 10g, 50% = 20g, 75% = 30g, 100% = 40g.",
      "Add tea to shaker.",
      "Shake on 'A'.",
      "Pour in cup."
    ],
    notes: "Uses brown sugar instead of cane sugar."
  },
  {
    name: "Premium Oolong",
    category: "Teaspresso",
    ingredients: [
      "Premium Oolong - teaspresso base",
      "Ice - full ice in large shaker",
      "Creamer - 1 full scoop",
      "Cane sugar - 0.7 / 1.4 / 2.1 / 2.9 depending on sweetness"
    ],
    steps: [
      "Put Premium Oolong in teaspresso.",
      "Press 'M'.",
      "Fill large shaker with full ice.",
      "Add 1 full scoop creamer.",
      "Add cane sugar: 25% = 0.7, 50% = 1.4, 75% = 2.1, 100% = 2.9.",
      "Add tea to shaker.",
      "Shake on 'A'.",
      "Pour in cup."
    ],
    notes: "Standard premium oolong teaspresso recipe."
  },
  {
    name: "Peach Mountain Green",
    category: "Fruit Tea",
    ingredients: [
      "Toppings - as requested",
      "Ice - 75% of shaker",
      "Peach jam - 2 / 3 scoops depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Green tea - fill to 500mL"
    ],
    steps: [
      "Add toppings to cup.",
      "Add 75% ice to shaker.",
      "Scoop peach jam: 25% = 2 scoops, 50% = 3 scoops, 75% = 3 scoops + 0.1 cane, 100% = 3 scoops + 0.2 cane.",
      "Fill to 500mL with green tea.",
      "Cover and shake well.",
      "Add to cup."
    ],
    notes: "Peach Mountain Green uses peach jam rather than syrup."
  },
  {
    name: "Mango Passion Oolong",
    category: "Fruit Tea",
    ingredients: [
      "Toppings - as requested",
      "Ice - 75% of shaker",
      "Passionfruit jam - 1 scoop",
      "Mango syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Oolong tea - fill to 500mL"
    ],
    steps: [
      "Add toppings to cup.",
      "Add 75% ice to shaker.",
      "Add 1 scoop passionfruit jam.",
      "Add mango syrup: 25% = 30g, 50% = 40g, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Fill to 500mL with oolong tea.",
      "Cover and shake well.",
      "Add to cup."
    ],
    notes: "Uses oolong tea base with passionfruit jam and mango syrup."
  },
  {
    name: "Mango Strawberry Oolong",
    category: "Fruit Tea",
    ingredients: [
      "Toppings - as requested",
      "Ice - 75% of shaker",
      "Mango jam - 1 scoop",
      "Strawberry syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Oolong tea - fill to 500mL"
    ],
    steps: [
      "Add toppings to cup.",
      "Add 75% ice to shaker.",
      "Add 1 scoop mango jam.",
      "Add strawberry syrup: 25% = 30g, 50% = 40g, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Fill to 500mL with oolong tea.",
      "Cover and shake well.",
      "Add to cup."
    ],
    notes: "Uses oolong tea base with mango jam and strawberry syrup."
  },
  {
    name: "Pineapple Passion Fruit Green",
    category: "Fruit Tea",
    ingredients: [
      "Toppings - as requested",
      "Ice - 75% of shaker",
      "Passionfruit jam - 1 scoop",
      "Pineapple syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Green tea - fill to 500mL"
    ],
    steps: [
      "Add toppings to cup.",
      "Add 75% ice to shaker.",
      "Add 1 scoop passionfruit jam.",
      "Add pineapple syrup: 25% = 30g, 50% = 40g, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Fill to 500mL with green tea.",
      "Cover and shake well.",
      "Add to cup."
    ],
    notes: "Uses green tea base with passionfruit jam and pineapple syrup."
  },
  {
    name: "Kumquat Lemon Oolong",
    category: "Fruit Tea",
    ingredients: [
      "Toppings - as requested",
      "Ice - 75% of shaker",
      "Lemon syrup - 40g",
      "Cane sugar - 0.1 / 0.2 / 0.3 / 0.4 depending on sweetness",
      "Green tea - fill to 500mL"
    ],
    steps: [
      "Add toppings to cup.",
      "Add 75% ice to shaker.",
      "Add lemon syrup: 25% = 40g lemon + 0.1 cane, 50% = 40g lemon + 0.2 cane, 75% = 40g lemon + 0.3 cane, 100% = 40g lemon + 0.4 cane.",
      "Fill to 500mL with green tea.",
      "Cover and shake well.",
      "Add to cup."
    ],
    notes: "The recipe guide lists green tea fill for this drink."
  },
  {
    name: "Mango Lemon Green",
    category: "Fruit Tea",
    ingredients: [
      "Toppings - as requested",
      "Ice - 75% of shaker",
      "Mango jam - 1 scoop",
      "Lemon syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Green tea - fill to 500mL"
    ],
    steps: [
      "Add toppings to cup.",
      "Add 75% ice to shaker.",
      "Add 1 scoop mango jam.",
      "Add lemon syrup: 25% = 30g lemon, 50% = 40g lemon, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Fill to 500mL with green tea.",
      "Cover and shake well.",
      "Add to cup."
    ],
    notes: "Mango Lemon Green uses mango jam plus lemon syrup."
  },
  {
    name: "Mango Jasmine Green",
    category: "Teaspresso",
    ingredients: [
      "Jasmine tea - teaspresso base",
      "Ice - full shaker",
      "Mango - 1 scoop",
      "Mango syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness"
    ],
    steps: [
      "Put jasmine in teaspresso machine.",
      "Press 'G'.",
      "Fill shaker with ice.",
      "Add mango: 25% = 1 scoop mango + 30g mango syrup, 50% = 1 scoop mango + 40g mango syrup, 75% = 1 scoop mango + 40g mango syrup + 0.1 cane sugar, 100% = 1 scoop mango + 40g mango syrup + 0.2 cane sugar.",
      "Pour tea in shaker.",
      "Shake on 'A'."
    ],
    notes: "Mango Jasmine Green uses teaspresso jasmine tea instead of a 500mL fill line."
  },
  {
    name: "Strawberry Lemonade Oolong",
    category: "Fruit Tea",
    ingredients: [
      "Toppings - as requested",
      "Ice - 75% of shaker",
      "Strawberry syrup - 30g / 40g depending on sweetness",
      "Lemon - 25g",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Oolong tea - fill to 500mL"
    ],
    steps: [
      "Add toppings to cup.",
      "Add 75% ice to shaker.",
      "Add strawberry lemon syrup: 25% = 30g strawberry + 25g lemon, 50% = 40g strawberry + 25g lemon, 75% = 40g strawberry + 25g lemon + 0.1 cane, 100% = 40g strawberry + 25g lemon + 0.2 cane.",
      "Fill to 500mL with oolong tea.",
      "Cover and shake well.",
      "Add to cup."
    ],
    notes: "Strawberry Lemonade Oolong combines strawberry syrup with lemon."
  },
  {
    name: "Pineapple Coconut Green",
    category: "Fruit Tea",
    ingredients: [
      "Toppings - as requested",
      "Ice - 75% of shaker",
      "Pineapple syrup - 30g / 40g depending on sweetness",
      "Coconut syrup - 1 pump",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Oolong tea - fill to 500mL"
    ],
    steps: [
      "Add toppings to cup.",
      "Add 75% ice to shaker.",
      "Add pineapple lemon syrup: 25% = 30g pineapple + 1 pump coconut, 50% = 40g pineapple + 1 pump coconut, 75% = 40g pineapple + 1 pump coconut + 0.1 cane, 100% = 40g pineapple + 1 pump coconut + 0.2 cane.",
      "Fill to 500mL with oolong tea.",
      "Cover and shake well.",
      "Add to cup."
    ],
    notes: "The guide lists Oolong tea fill for Pineapple Coconut Green."
  },
  {
    name: "Citrus Iced Tea",
    category: "Fruit Tea",
    ingredients: [
      "Pu'Er tea - teaspresso base",
      "Ice - full shaker",
      "Orange syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness"
    ],
    steps: [
      "Put Pu'Er tea in teaspresso machine.",
      "Press 'G'.",
      "Fill shaker with ice.",
      "Add orange syrup: 25% = 30g orange, 50% = 40g orange, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Pour tea in shaker.",
      "Shake on 'A'."
    ],
    notes: "Listed in multiple tabs in the PDF; kept once here."
  },
  {
    name: "Tiramisu Coffee",
    category: "Coffee",
    ingredients: [
      "Small clear coffee cup - 1",
      "Salted caramel syrup - 1 / 2 / 3 / 4 pumps depending on sweetness",
      "Ice - 50%",
      "Milk - to line above middle of cup",
      "Espresso shot - 1",
      "Cream Cloud - 1 scoop",
      "Cocoa powder - dash"
    ],
    steps: [
      "Get small clear coffee cup.",
      "Add salted caramel syrup: 25% = 1 pump, 50% = 2 pumps, 75% = 3 pumps, 100% = 4 pumps.",
      "Add 50% ice.",
      "Add milk to line above middle of cup.",
      "Stir with bar spoon.",
      "Make espresso shot.",
      "Pour espresso shot on milk.",
      "Add 1 scoop Cream Cloud.",
      "Add dashes of cocoa powder on top."
    ],
    notes: "Coffee recipe from the Coffee section of the guide."
  },
  {
    name: "Coconut Vanilla Coffee",
    category: "Coffee",
    ingredients: [
      "Small clear coffee cup - 1",
      "Coconut milk - 100g",
      "Salted caramel syrup - 1 / 2 / 3 / 4 pumps depending on sweetness",
      "Ice - 50%",
      "Milk - to top line",
      "Espresso shot - 1"
    ],
    steps: [
      "Get small clear coffee cup.",
      "Add 100g coconut milk.",
      "Add salted caramel syrup: 25% = 1 pump, 50% = 2 pumps, 75% = 3 pumps, 100% = 4 pumps.",
      "Add 50% ice.",
      "Add milk to top line.",
      "Stir with bar spoon.",
      "Make espresso shot.",
      "Pour espresso shot on milk."
    ],
    notes: "Coconut Vanilla Coffee uses coconut milk plus regular milk."
  },
  {
    name: "Brown Sugar Coffee",
    category: "Coffee",
    ingredients: [
      "Boba - 1 scoop",
      "Ice - 50% of shaker",
      "Brown sugar - 10g / 20g / 30g / 40g depending on sweetness",
      "Espresso shot - 1",
      "Milk - top with milk"
    ],
    steps: [
      "1 scoop boba in cup.",
      "Fill shaker 50% ice.",
      "Add brown sugar: 25% = 10g, 50% = 20g, 75% = 30g, 100% = 40g.",
      "Add espresso shot to shaker.",
      "Shake and pour into cup.",
      "Top with milk."
    ],
    notes: "Brown Sugar Coffee uses espresso shaken with brown sugar."
  },
  {
    name: "Ube Coffee",
    category: "Coffee",
    ingredients: [
      "Ube syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Ice - 50%",
      "Milk - as needed",
      "Espresso shot - 1"
    ],
    steps: [
      "Add ube syrup: 25% = 30g, 50% = 40g, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Fill 50% ice.",
      "Add milk.",
      "Stir syrup with bar spoon.",
      "Add espresso shot."
    ],
    notes: "75% and 100% add cane sugar with ube syrup."
  },
  {
    name: "Honeydew Coffee",
    category: "Coffee",
    ingredients: [
      "Honeydew syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Ice - 50%",
      "Milk - as needed",
      "Espresso shot - 1"
    ],
    steps: [
      "Add honeydew syrup: 25% = 30g, 50% = 40g, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Fill 50% ice.",
      "Add milk.",
      "Stir syrup with bar spoon.",
      "Add espresso shot."
    ],
    notes: "75% and 100% add cane sugar with honeydew syrup."
  },
  {
    name: "Caramel Brulee Coffee",
    category: "Coffee",
    ingredients: [
      "Caramel syrup - 1 / 2 pumps depending on sweetness",
      "Ice - 50%",
      "Milk - to middle line",
      "Espresso shot - 1",
      "Brulee Cream - 1 scoop"
    ],
    steps: [
      "Add caramel pump: 50% = 1 pump caramel, 100% = 2 pumps caramel.",
      "Fill 50% ice.",
      "Add milk to middle line.",
      "Stir syrup with bar spoon.",
      "Add espresso shot.",
      "Add 1 scoop Brulee Cream."
    ],
    notes: "Caramel Brulee Coffee only specifies 50% and 100% caramel amounts in the guide."
  },
  {
    name: "Rosy Coffee",
    category: "Coffee",
    ingredients: [
      "Rose syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Ice - 50%",
      "Milk - as needed",
      "Espresso shot - 1"
    ],
    steps: [
      "Add rose syrup: 25% = 30g rose syrup, 50% = 40g rose, 75% = 40g rose + 0.1 cane sugar, 100% = 40g rose + 0.2 cane sugar.",
      "Fill 50% ice.",
      "Add milk.",
      "Stir syrup with bar spoon.",
      "Add espresso shot."
    ],
    notes: "Listed in both Coffee and Seasonal tabs; kept once here."
  },
  {
    name: "Ube Boba",
    category: "Milk Tea",
    ingredients: [
      "Ice - full ice to cup",
      "Ube powder - 4 / 5 scoops depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Hot water - 150mL",
      "Milk - top with milk"
    ],
    steps: [
      "Add full ice to cup.",
      "Get shaker and add ube powder: 25% = 4 scoops, 50% = 5 scoops, 75% = 5 scoops + 0.1 cane sugar, 100% = 5 scoops + 0.2 cane sugar.",
      "Add 150mL hot water and mix.",
      "Pour into cup and mix with bar spoon.",
      "Top with milk."
    ],
    notes: "Powder-based milk tea."
  },
  {
    name: "Honeydew",
    category: "Milk Tea",
    ingredients: [
      "Ice - full ice to cup",
      "Honeydew powder - 4 / 5 scoops depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Hot water - 150mL",
      "Milk - top with milk"
    ],
    steps: [
      "Add full ice to cup.",
      "Get shaker and add honeydew powder: 25% = 4 scoops, 50% = 5 scoops, 75% = 5 scoops + 0.1 cane sugar, 100% = 5 scoops + 0.2 cane sugar.",
      "Add 150mL hot water and mix.",
      "Pour into cup and mix with bar spoon.",
      "Top with milk."
    ],
    notes: "Powder-based honeydew milk tea."
  },
  {
    name: "Mint Green",
    category: "Teaspresso",
    ingredients: [
      "Jasmine - teaspresso base",
      "Ice - full ice in shaker",
      "Creamer - 1 scoop",
      "Mint Green syrup - 1 / 2 / 3 / 4 pumps depending on sweetness"
    ],
    steps: [
      "Put jasmine in teaspresso.",
      "Press 'G'.",
      "Add full ice in shaker.",
      "Add 1 scoop creamer in shaker.",
      "Add Mint Green pump: 25% = 1 pump, 50% = 2 pumps, 75% = 3 pumps, 100% = 4 pumps.",
      "Add jasmine tea to shaker.",
      "Shake on 'A'.",
      "Pour into cup and top with ice."
    ],
    notes: "Mint Green is a jasmine-based milk tea with creamer."
  },
  {
    name: "Roasted Oolong Boba",
    category: "Milk Tea",
    ingredients: [
      "Boba - 1 scoop",
      "Roasted Oolong - teaspresso base",
      "Ice - full ice in large shaker",
      "Creamer - 1 full scoop",
      "Brown sugar - 10g / 20g / 30g / 40g depending on sweetness"
    ],
    steps: [
      "1 scoop boba in cup.",
      "Put Roasted Oolong in teaspresso.",
      "Press 'M'.",
      "Fill large shaker with full ice.",
      "Add 1 full scoop creamer.",
      "Add brown sugar: 25% = 10g, 50% = 20g, 75% = 30g, 100% = 40g.",
      "Add tea to shaker.",
      "Shake on 'A'.",
      "Pour in cup."
    ],
    notes: "Listed in both Teaspresso and Milk Tea tabs; kept once here."
  },
  {
    name: "Jasmine Green",
    category: "Teaspresso",
    ingredients: [
      "Jasmine - teaspresso base",
      "Ice - full shaker",
      "Cane sugar - 0.7 / 1.4 / 2.1 / 2.9 depending on sweetness"
    ],
    steps: [
      "Put jasmine in teaspresso machine.",
      "Press 'G'.",
      "Fill shaker with ice.",
      "Add cane sugar: 25% = 0.7, 50% = 1.4, 75% = 2.1, 100% = 2.9.",
      "Pour tea in shaker.",
      "Shake on 'A'."
    ],
    notes: "Simple jasmine milk tea base from the guide."
  },
  {
    name: "Chai Tea Boba",
    category: "Milk Tea",
    ingredients: [
      "Boba - 1 scoop",
      "Ice - full ice",
      "Creamer - 1 scoop",
      "Chai syrup - 1 / 2 / 3 / 4 pumps depending on sweetness",
      "Hot water - 150mL",
      "Milk - top with milk"
    ],
    steps: [
      "1 scoop boba in cup.",
      "Add full ice.",
      "Add 1 scoop creamer in shaker.",
      "Add Chai pump: 25% = 1 pump, 50% = 2 pumps, 75% = 3 pumps, 100% = 4 pumps.",
      "Add 150mL hot water and mix.",
      "Pour into cup and mix with bar spoon.",
      "Top with milk."
    ],
    notes: "Chai Tea Boba mixes with hot water before topping with milk."
  },
  {
    name: "Thai Tea",
    category: "Milk Tea",
    ingredients: [
      "Ice - full ice to cup",
      "Thai powder - 4 / 5 scoops depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Hot water - 150mL",
      "Milk - top with milk"
    ],
    steps: [
      "Add full ice to cup.",
      "Get shaker and add Thai powder: 25% = 4 scoops, 50% = 5 scoops, 75% = 5 scoops + 0.1 cane sugar, 100% = 5 scoops + 0.2 cane sugar.",
      "Add 150mL hot water and mix.",
      "Pour into cup and mix with bar spoon.",
      "Top with milk."
    ],
    notes: "Thai Tea is another powder-based milk tea."
  },
  {
    name: "Caramel Apple Boba",
    category: "Milk Tea",
    ingredients: [
      "Boba - 1 scoop",
      "Roasted Oolong - teaspresso base",
      "Ice - full ice in large shaker",
      "Creamer - 1 full scoop",
      "Caramel Apple syrup - 1 / 2 / 3 / 4 pumps depending on sweetness"
    ],
    steps: [
      "1 scoop boba in cup.",
      "Put Roasted Oolong in teaspresso.",
      "Press 'M'.",
      "Fill large shaker with full ice.",
      "Add 1 full scoop creamer.",
      "Add Caramel Apple pump: 25% = 1 pump, 50% = 2 pumps, 75% = 3 pumps, 100% = 4 pumps.",
      "Add tea to shaker.",
      "Shake on 'A'.",
      "Pour in cup."
    ],
    notes: "Listed in Seasonal, Teaspresso, and Milk Tea; kept once here."
  },
  {
    name: "Mango Coconut Milk Tea",
    category: "Milk Tea",
    ingredients: [
      "Mango jam - 1 scoop around cup",
      "Ice - 75% of shaker",
      "Creamer - 1 scoop",
      "Orange / mango component - 20g",
      "Coconut syrup - 1 / 2 pumps depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Green tea - fill 550mL"
    ],
    steps: [
      "Spread 1 scoop mango around cup.",
      "Fill shaker 75% ice.",
      "Add 1 scoop of creamer.",
      "Add Mango/Coconut: 25% = 20g orange + 1 pump coconut, 50% = 20g orange + 2 pumps coconut, 75% = 20g orange + 2 pumps coconut + 0.1 cane sugar, 100% = 20g orange + 2 pumps coconut + 0.2 cane sugar.",
      "Fill 550mL green tea.",
      "Shake on 'A'.",
      "Pour into cup."
    ],
    notes: "Recipe text in the guide says Mango/Coconut with orange measurement wording."
  },
  {
    name: "Orange Jasmine Milk Tea",
    category: "Teaspresso",
    ingredients: [
      "Jasmine tea - teaspresso base",
      "Ice - full shaker",
      "Orange syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness"
    ],
    steps: [
      "Put Jasmine tea in teaspresso.",
      "Press 'G'.",
      "Fill shaker with ice.",
      "Add orange syrup: 25% = 30g orange, 50% = 40g orange, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Pour tea in shaker.",
      "Shake on 'A'."
    ],
    notes: "Listed in Seasonal and Milk Tea; kept once here."
  },
  {
    name: "House Special Boba Oats",
    category: "Milk Tea",
    ingredients: [
      "Oats - 1 scoop",
      "Boba - 1 scoop",
      "Ice - 75% of shaker",
      "Creamer - 1 scoop",
      "Oolong tea - fill to 450mL",
      "Brown sugar - 10g / 20g / 30g / 40g depending on sweetness"
    ],
    steps: [
      "Get a cup.",
      "Add 1 scoop oats.",
      "Add 1 scoop boba.",
      "Grab a shaker.",
      "Fill 75% ice.",
      "Add 1 scoop creamer.",
      "Fill to 450mL oolong.",
      "Cover it.",
      "Shake it on 'A'.",
      "Add sugar around the cup: 25% = 10g brown sugar, 50% = 20g, 75% = 30g, 100% = 40g.",
      "Pour tea in cup."
    ],
    notes: "Same drink concept as your earlier House Special Boba & Oats naming."
  },
  {
    name: "Brown Sugar Boba",
    category: "Milk Tea",
    ingredients: [
      "Boba - 1 scoop",
      "Brown sugar - 10g / 20g / 30g / 40g depending on sweetness",
      "Ice - 75% of cup",
      "Milk - fill remaining cup"
    ],
    steps: [
      "Add 1 scoop boba into cup.",
      "Add sugar: 25% = 10g brown sugar, 50% = 20g, 75% = 30g, 100% = 40g.",
      "Coat walls in brown sugar.",
      "Add 75% ice.",
      "Fill with milk."
    ],
    notes: "Brown sugar amount changes with sweetness selection."
  },
  {
    name: "Oreo Brulee Boba",
    category: "Milk Tea",
    ingredients: [
      "Oreo - 1 scoop",
      "Boba - 1 scoop",
      "Brown sugar - 10g / 20g / 30g / 40g depending on sweetness",
      "Ice - 75% of cup",
      "Milk - fill remaining cup"
    ],
    steps: [
      "Add 1 scoop Oreo into cup.",
      "Add 1 scoop boba.",
      "Add sugar: 25% = 10g brown sugar, 50% = 20g, 75% = 30g, 100% = 40g.",
      "Add 75% ice.",
      "Fill with milk."
    ],
    notes: "Brown sugar amount changes with sweetness selection."
  },
  {
    name: "Strawberry Milk Cloud",
    category: "Milk Tea",
    ingredients: [
      "Ice - fill shaker to 50%",
      "Milk - 450mL",
      "Strawberry syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Cream Cloud - top layer",
      "White cap - 1"
    ],
    steps: [
      "Get a shaker.",
      "Fill 50% ice.",
      "Fill 450mL milk.",
      "Add strawberry syrup: 25% = 30g strawberry syrup, 50% = 40g strawberry syrup, 75% = 40g strawberry syrup + 0.1 cane sugar, 100% = 40g strawberry syrup + 0.2 cane sugar.",
      "Cover shaker.",
      "Shake on 'E'.",
      "Pour in cup.",
      "Add Cream Cloud on top.",
      "Top with White Cap."
    ],
    notes: "Strawberry Milk Cloud uses the E shake setting."
  },
  {
    name: "Strawberry Cheesecake",
    category: "Frappe",
    ingredients: [
      "Cream Cloud - 1 scoop into cup",
      "Ice - 1 scoop into blender",
      "Strawberry jam - 1 / 2 scoops depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Milk - 220mL",
      "Stabilizer - 1/2 scoop"
    ],
    steps: [
      "1 scoop Cream Cloud into cup.",
      "Add 1 scoop of ice into blender.",
      "Add strawberry jam: 25% = 1 scoop strawberry, 50% = 2 scoops strawberry, 75% = 2 scoops strawberry + 0.1 cane sugar, 100% = 2 scoops strawberry + 0.2 cane sugar.",
      "Add 220mL milk.",
      "Add 1/2 scoop stabilizer.",
      "Blend until smooth (use Pulse at the end).",
      "Pour into cup and cap with white."
    ],
    notes: "Cheesecake frappe gets Cream Cloud in the cup first."
  },
  {
    name: "Mint Chocolate",
    category: "Frappe",
    ingredients: [
      "Ice - 1 scoop into blender",
      "Creamer - 1 scoop",
      "Mint Chocolate syrup - 4 pumps",
      "Cane sugar - 0.1 / 0.2 / 0.3 / 0.4 depending on sweetness",
      "Green tea - 220mL",
      "Chocolate chips - 1 scoop",
      "Stabilizer - 1/2 scoop"
    ],
    steps: [
      "Add 1 scoop ice into blender.",
      "Add 1 scoop creamer.",
      "Add Mint Chocolate pump: 25% = 4 pumps + 0.1 cane sugar, 50% = 4 pumps + 0.2 cane sugar, 75% = 4 pumps + 0.3 cane sugar, 100% = 4 pumps + 0.4 cane sugar.",
      "Add 220mL green tea.",
      "Add 1 scoop chocolate chips.",
      "Add 1/2 scoop stabilizer.",
      "Blend until smooth (use Pulse at the end).",
      "Pour into cup and cap with white."
    ],
    notes: "Mint Chocolate frappe uses green tea plus chocolate chips."
  },
  {
    name: "Ube Cloud",
    category: "Frappe",
    ingredients: [
      "Cream Cloud - 1 scoop into cup",
      "Ice - 1 scoop into blender",
      "Milk - 220mL",
      "Ube powder - 4 / 5 scoops depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Stabilizer - 1/2 scoop"
    ],
    steps: [
      "1 scoop Cream Cloud into cup.",
      "Add 1 scoop of ice into blender.",
      "Add 220mL milk.",
      "Add Ube powder: 25% = 4 scoops, 50% = 5 scoops, 75% = 5 scoops + 0.1 cane sugar, 100% = 5 scoops + 0.2 cane sugar.",
      "Add 1/2 scoop stabilizer.",
      "Blend until smooth (use Pulse at the end).",
      "Pour into cup and cap with white."
    ],
    notes: "Ube Cloud gets Cream Cloud in the cup first."
  },
  {
    name: "Pina Colada",
    category: "Frappe",
    ingredients: [
      "Lychee Jelly - 1 scoop",
      "Pomelo - 1 scoop into cup",
      "Coconut milk - 40mL into cup",
      "Ice - 1 scoop into blender",
      "Pineapple syrup - 60g for 50% / 75% / 100%",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Water - 220mL",
      "Stabilizer - 1/2 scoop"
    ],
    steps: [
      "Add 1 scoop Lychee Jelly.",
      "Add 1 scoop Pomelo into cup.",
      "Add 40mL of coconut milk into cup.",
      "Add 1 scoop of ice into blender.",
      "Add pineapple syrup: 50% = 60g pineapple, 75% = 60g pineapple + 0.1 cane sugar, 100% = 60g pineapple + 0.2 cane sugar.",
      "Add 220mL water.",
      "Add 1/2 scoop stabilizer.",
      "Blend until smooth (use Pulse at the end).",
      "Pour into cup and cap with white."
    ],
    notes: "The guide only lists 50%, 75%, and 100% sweetness amounts for Pina Colada."
  },
  {
    name: "Honeydew Frappe",
    category: "Frappe",
    ingredients: [
      "Ice - 1 scoop into blender",
      "Milk - 220mL",
      "Honeydew powder - 4 / 5 scoops depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Stabilizer - 1/2 scoop"
    ],
    steps: [
      "Add 1 scoop of ice into blender.",
      "Add 220mL milk.",
      "Add Honeydew powder: 25% = 4 scoops, 50% = 5 scoops, 75% = 5 scoops + 0.1 cane sugar, 100% = 5 scoops + 0.2 cane sugar.",
      "Add 1/2 scoop stabilizer.",
      "Blend until smooth (use Pulse at the end).",
      "Pour into cup and cap with white."
    ],
    notes: "Powder-based frappe."
  },
  {
    name: "Mango Pomelo",
    category: "Frappe",
    ingredients: [
      "Crystal Boba - 1 scoop",
      "Pomelo - 1 scoop into cup",
      "Coconut milk - 40mL into cup",
      "Ice - 1 scoop into blender",
      "Mango jam - 2 scoops for 50% / 75% / 100%",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Water - 220mL",
      "Stabilizer - 1/2 scoop"
    ],
    steps: [
      "Add 1 scoop Crystal Boba.",
      "Add 1 scoop Pomelo into cup.",
      "Add 40mL of coconut milk into cup.",
      "Add 1 scoop of ice into blender.",
      "Add Mango jam: 50% = 2 scoops mango, 75% = 2 scoops mango + 0.1 cane sugar, 100% = 2 scoops mango + 0.2 cane sugar.",
      "Add 220mL water.",
      "Add 1/2 scoop stabilizer.",
      "Blend until smooth (use Pulse at the end).",
      "Pour into cup and cap with white."
    ],
    notes: "The guide only lists 50%, 75%, and 100% amounts for Mango Pomelo."
  }
];

const emptyForm = {
  name: "",
  category: "Milk Tea",
  ingredientsText: "",
  stepsText: "",
  notes: ""
};

const sweetnessLabels = ["25%", "50%", "75%", "100%"];

function getSweetnessIndex(level) {
  return { "25%": 0, "50%": 1, "75%": 2, "100%": 3 }[level] ?? 3;
}

function getAvailableSweetnesses(drink) {
  if (!drink) return sweetnessLabels;

  const combined = [
    ...(drink.ingredients || []),
    ...(drink.steps || []),
    drink.notes || ""
  ].join(" ");

  const found = sweetnessLabels.filter((level) => combined.includes(level));
  return found.length > 0 ? found : sweetnessLabels;
}

function getSweetnessAdjustedStepText(step, sweetness) {
  const levels = ["25%", "50%", "75%", "100%"];
  const markerPositions = levels
    .map((level) => ({ level, index: step.indexOf(level + " =") }))
    .filter((item) => item.index >= 0);

  if (markerPositions.length === 0) return step;

  const prefix = step
    .slice(0, markerPositions[0].index)
    .trim()
    .replace(/:$/, "")
    .replace(/-$/, "")
    .trim();

  const valuesByLevel = {};

  for (let i = 0; i < markerPositions.length; i++) {
    const current = markerPositions[i];
    const next = markerPositions[i + 1];
    const valueStart = current.index + (current.level + " =").length;
    const valueEnd = next ? next.index : step.length;
    let value = step.slice(valueStart, valueEnd).trim();

    while (value.startsWith(",") || value.startsWith(" ")) {
      value = value.slice(1).trimStart();
    }
    while (value.endsWith(",") || value.endsWith(".") || value.endsWith(" ")) {
      value = value.slice(0, -1).trimEnd();
    }

    valuesByLevel[current.level] = value;
  }

  return valuesByLevel[sweetness] ? prefix + ": " + valuesByLevel[sweetness] + "." : step;
}

function getSweetnessAdjustedIngredients(drink, sweetness) {
  if (!drink) return [];

  return (drink.ingredients || []).map((ingredient) => {
    const marker = " depending on sweetness";
    if (!ingredient.includes(marker) || !ingredient.includes("/") || !ingredient.includes(" - ")) {
      return ingredient;
    }

    const dashIndex = ingredient.indexOf(" - ");
    const markerIndex = ingredient.indexOf(marker);
    const prefix = ingredient.slice(0, dashIndex + 3);
    const valuePart = ingredient.slice(dashIndex + 3, markerIndex);
    const values = valuePart.split("/").map((value) => value.trim());

    if (values.length === 4) {
      return prefix + values[getSweetnessIndex(sweetness)];
    }

    return ingredient;
  });
}

function getSweetnessAdjustedSteps(drink, sweetness) {
  if (!drink) return [];

  const sweetnessMap = {
    "25%": {
      brownSugar: "10g brown sugar",
      fruitSyrup: "30g syrup",
      fruitSyrupWithSugar: "30g syrup",
      mangoJam: "1 scoop mango jam",
      caneSugar: "no cane sugar"
    },
    "50%": {
      brownSugar: "20g brown sugar",
      fruitSyrup: "40g syrup",
      fruitSyrupWithSugar: "40g syrup",
      mangoJam: "2 scoops mango jam",
      caneSugar: "no cane sugar"
    },
    "75%": {
      brownSugar: "30g brown sugar",
      fruitSyrup: "40g syrup",
      fruitSyrupWithSugar: "40g syrup + 0.1 cane sugar",
      mangoJam: "2 scoops mango jam + 0.1 cane sugar",
      caneSugar: "0.1 cane sugar"
    },
    "100%": {
      brownSugar: "40g brown sugar",
      fruitSyrup: "40g syrup",
      fruitSyrupWithSugar: "40g syrup + 0.2 cane sugar",
      mangoJam: "2 scoops mango jam + 0.2 cane sugar",
      caneSugar: "0.2 cane sugar"
    }
  };

  const config = sweetnessMap[sweetness] || sweetnessMap["100%"];

  switch (drink.name) {
    case "Brown Sugar Boba":
      return [
        "Add 1 scoop boba into cup.",
        `Add ${config.brownSugar}.`,
        "Coat walls in brown sugar.",
        "Add 75% ice.",
        "Fill with milk."
      ];

    case "Oreo Brûlée Boba":
      return [
        "Add 1 scoop Oreo into cup.",
        "Add 1 scoop boba.",
        `Add ${config.brownSugar}.`,
        "Add 75% ice.",
        "Fill with milk."
      ];

    case "Mango Strawberry Oolong":
      return [
        "Add toppings to cup.",
        "Add 75% ice to shaker.",
        "Add 1 scoop mango jam.",
        `Add strawberry syrup: ${config.fruitSyrupWithSugar}.`,
        "Fill to 500mL with green tea.",
        "Cover and shake well.",
        "Add to cup."
      ];

    case "Mango Passionfruit Oolong":
      return [
        "Add toppings to cup.",
        "Add 75% ice to shaker.",
        "Add 1 scoop passionfruit jam.",
        `Add mango syrup: ${config.fruitSyrupWithSugar}.`,
        "Fill to 500mL with green tea.",
        "Cover and shake well.",
        "Add to cup."
      ];

    case "Pineapple Passionfruit Green":
      return [
        "Add toppings to cup.",
        "Add 75% ice to shaker.",
        "Add 1 scoop passionfruit jam.",
        `Add pineapple syrup: ${config.fruitSyrupWithSugar}.`,
        "Fill to 500mL with green tea.",
        "Cover and shake well.",
        "Add to cup."
      ];

    case "Mango Pomelo Frappe":
      return [
        "Add 1 scoop crystal boba to cup.",
        "Add 40mL coconut milk.",
        "Add 1 scoop pomelo.",
        "Get blender and add 1 scoop ice.",
        "Add 250mL water.",
        `Add ${config.mangoJam}.`,
        "Cover blender.",
        "Blend until smooth. Use pulse for any ice chunks.",
        "Pour in cup.",
        "Cap with white lid."
      ];

    case "House Special Boba & Oats":
      return [
        "Get a cup.",
        "Add 1 scoop oats.",
        "Add 1 scoop boba.",
        "Grab a shaker and fill 75% with ice.",
        "Add 1 scoop creamer.",
        "Fill to 450mL with oolong tea.",
        "Cover it.",
        "Shake it on 'A'.",
        `Add ${config.brownSugar} around the cup.`,
        "Pour tea in cup."
      ];

    case "Caramel Brulee Matcha":
      return [
        `Add ${sweetness === "100%" ? "2 pumps caramel puree" : "1 pump caramel puree"} in cup.`,
        "Add 75% ice.",
        "Add milk to smaller line.",
        "Mix caramel with milk.",
        "Make matcha.",
        "Pour matcha in cup.",
        "Put 1 scoop of brulee on top.",
        "Cap with white cover."
      ];

    case "Caramel Apple Boba":
      return [
        "1 scoop boba in cup.",
        "Put roasted oolong in teaspresso.",
        "Press 'M'.",
        "Fill large shaker with full ice.",
        "Add 1 full scoop creamer.",
        `Add ${sweetness === "25%" ? "1 pump caramel apple" : sweetness === "50%" ? "2 pumps caramel apple" : sweetness === "75%" ? "3 pumps caramel apple" : "4 pumps caramel apple"}.`,
        "Add tea to shaker.",
        "Shake on 'A'.",
        "Pour in cup."
      ];

    case "Brown Sugar Matcha":
      return [
        "Add 1 scoop brown sugar boba.",
        `Add ${config.brownSugar} around cup.`,
        "Add 75% ice.",
        "Add milk to line.",
        "Make matcha.",
        "Pour matcha in cup."
      ];

    case "Salted Caramel Boba":
      return [
        "1 scoop boba in cup.",
        "Put roasted oolong in teaspresso.",
        "Press 'M'.",
        "Fill large shaker with full ice.",
        "Add 1 full scoop creamer.",
        `Add ${sweetness === "25%" ? "1 pump salted caramel" : sweetness === "50%" ? "2 pumps salted caramel" : sweetness === "75%" ? "3 pumps salted caramel" : "4 pumps salted caramel"}.`,
        "Add tea to shaker.",
        "Shake on 'A'.",
        "Pour in cup."
      ];

    case "Rosy Matcha":
      return [
        `Add rose syrup: ${config.fruitSyrupWithSugar}.`,
        "Add 75% ice.",
        "Add milk to small line.",
        "Mix rose with milk.",
        "Make matcha.",
        "Pour matcha in cup."
      ];

    case "Citrus Iced Tea":
      return [
        "Put Pu'Er tea in teaspresso machine.",
        "Press 'G'.",
        "Fill shaker with ice.",
        `Add orange syrup: ${config.fruitSyrupWithSugar}.`,
        "Pour tea in shaker.",
        "Shake on 'A'."
      ];

    case "Orange Jasmine Milk Tea":
      return [
        "Put jasmine tea in teaspresso.",
        "Press 'G'.",
        "Fill shaker with ice.",
        `Add orange syrup: ${config.fruitSyrupWithSugar}.`,
        "Pour tea in shaker.",
        "Shake on 'A'."
      ];

    case "Rosy Coffee":
      return [
        `Add rose syrup: ${config.fruitSyrupWithSugar}.`,
        "Add 60% ice.",
        "Fill milk to line near top.",
        "Add one shot espresso."
      ];

    default:
      return drink.steps;
  }
}

export default function MonTeaRecipePrototype() {
  const [drinks, setDrinks] = useState(initialDrinks);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(initialDrinks[0]);
  const [sweetness, setSweetness] = useState("100%");
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const availableSweetnesses = selected ? getAvailableSweetnesses(selected) : sweetnessLabels;
  const displayedSteps = selected ? (selected.steps || []).map((step) => getSweetnessAdjustedStepText(step, sweetness)) : [];
  const displayedIngredients = selected ? getSweetnessAdjustedIngredients(selected, sweetness) : [];

  const categories = ["All", "Matcha", "Teaspresso", "Fruit Tea", "Coffee", "Milk Tea", "Frappe"];

  const filteredDrinks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return drinks.filter((drink) => {
      const matchesSearch =
        !q ||
        drink.name.toLowerCase().includes(q) ||
        drink.category.toLowerCase().includes(q) ||
        drink.ingredients.some((item) => item.toLowerCase().includes(q));

      const matchesCategory = category === "All" || drink.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [drinks, search, category]);

  useEffect(() => {
    if (!selected && filteredDrinks.length > 0) {
      setSelected(filteredDrinks[0]);
      return;
    }

    if (selected && !drinks.find((d) => d.name === selected.name && d.category === selected.category)) {
      setSelected(filteredDrinks[0] || null);
    }
  }, [drinks, filteredDrinks, selected]);

  useEffect(() => {
    if (!selected) return;
    const allowed = getAvailableSweetnesses(selected);
    if (!allowed.includes(sweetness)) {
      setSweetness(allowed.includes("100%") ? "100%" : allowed[0]);
    }
  }, [selected, sweetness]);

  function openAddForm() {
    setEditingIndex(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(drink) {
    const index = drinks.findIndex((d) => d.name === drink.name && d.category === drink.category);
    setEditingIndex(index);
    setForm({
      name: drink.name,
      category: drink.category,
      ingredientsText: drink.ingredients.join("\n"),
      stepsText: drink.steps.join("\n"),
      notes: drink.notes
    });
    setShowForm(true);
  }

  function handleSaveRecipe() {
    const newDrink = {
      name: form.name.trim(),
      category: form.category,
      ingredients: form.ingredientsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      steps: form.stepsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      notes: form.notes.trim() || "No additional notes."
    };

    if (!newDrink.name || newDrink.ingredients.length === 0 || newDrink.steps.length === 0) {
      return;
    }

    if (editingIndex !== null) {
      const updated = [...drinks];
      updated[editingIndex] = newDrink;
      setDrinks(updated);
      setSelected(newDrink);
    } else {
      const updated = [newDrink, ...drinks];
      setDrinks(updated);
      setSelected(newDrink);
      setCategory("All");
      setSearch("");
    }

    setShowForm(false);
    setEditingIndex(null);
    setForm(emptyForm);
  }

  return (
    <div className="min-h-screen bg-[#f7f5ed] text-[#3f4a3c] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="inline-block rounded-full border border-[#c9dcc7] bg-[#e8f2e3] px-3 py-1 text-xs tracking-wide uppercase text-[#6f8a6d] mb-3">
            Recipe System Prototype
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Mon Tea Recipe Hub</h1>
          <p className="text-[#7d8777] mt-3 max-w-2xl">
            A mobile-friendly recipe reference for staff so every drink stays consistent, searchable, and easy to update.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-5">
          <div className="rounded-3xl border border-[#d9e6d4] bg-[#fffdf7] p-4 shadow-lg shadow-[#dfe8d8]/60">
            <label className="block text-sm text-[#6f7d69] mb-2">Search drinks, categories, or ingredients</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Try: mango, taro, milk tea..."
              className="w-full rounded-2xl bg-[#f7f5ed] border border-[#d9e6d4] px-4 py-3 outline-none focus:border-[#9fc29a]"
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-sm border transition ${
                    category === cat
                      ? "bg-[#e8f2e3] border-[#9fc29a]"
                      : "bg-[#faf8f1] border-[#edf2e7] hover:bg-[#f1f6ec]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={openAddForm}
              className="mt-4 w-full rounded-2xl bg-[#dfeeda] border border-[#b9d3b3] px-4 py-3 text-sm font-semibold text-[#587054] hover:bg-[#d5e9cf] transition"
            >
              + Add New Recipe
            </button>

            <div className="mt-4 space-y-2 max-h-[70vh] overflow-y-auto pr-1">
              {filteredDrinks.length > 0 ? (
                filteredDrinks.map((drink) => {
                  const active = selected?.name === drink.name;
                  return (
                    <button
                      key={`${drink.name}-${drink.category}`}
                      onClick={() => setSelected(drink)}
                      className={`w-full text-left rounded-2xl p-4 transition border ${
                        active
                          ? "bg-[#e8f2e3] border-[#9fc29a]"
                          : "bg-[#faf8f1] border-[#edf2e7] hover:bg-[#f1f6ec]"
                      }`}
                    >
                      <div className="text-base font-semibold">{drink.name}</div>
                      <div className="text-sm text-[#7d8777] mt-1">{drink.category}</div>
                    </button>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-[#d9e6d4] p-6 text-[#7d8777] text-sm">
                  No drinks found.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-[#d9e6d4] bg-[#fffdf7] p-5 md:p-6 shadow-lg shadow-[#dfe8d8]/60">
            {selected ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                  <div>
                    <div className="text-sm uppercase tracking-wide text-[#7ea07b] mb-2">{selected.category}</div>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{selected.name}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center justify-end">
                    <button
                      onClick={() => openEditForm(selected)}
                      className="px-3 py-2 rounded-xl text-sm border bg-[#fff7df] border-[#ead9a7] text-[#8a6d2f] hover:bg-[#fdf1ca] transition"
                    >
                      Edit Recipe
                    </button>
                    {sweetnessLabels.map((level) => {
                      const isAvailable = availableSweetnesses.includes(level);
                      return (
                        <button
                          key={level}
                          onClick={() => isAvailable && setSweetness(level)}
                          disabled={!isAvailable}
                          className={`px-3 py-2 rounded-xl text-sm border transition ${
                            !isAvailable
                              ? "bg-[#efeee8] border-[#e3dfd2] text-[#b0ab9b] cursor-not-allowed"
                              : sweetness === level
                                ? "bg-[#e8f2e3] border-[#9fc29a]"
                                : "bg-[#faf8f1] border-[#edf2e7] hover:bg-[#f1f6ec]"
                          }`}
                        >
                          {level} sweet
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <section className="rounded-3xl bg-[#f7fbf4] border border-[#e4ecde] p-5">
                    <h3 className="text-lg font-semibold mb-4">Ingredients & Measurements</h3>
                    <ul className="space-y-3 text-[#4c5948]">
                      {displayedIngredients.map((ingredient, index) => (
                        <li key={index} className="rounded-2xl bg-[#fffdf7] border border-[#edf2e7] px-4 py-3">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-3xl bg-[#f7fbf4] border border-[#e4ecde] p-5">
                    <h3 className="text-lg font-semibold mb-4">Steps & Instructions</h3>
                    <ol className="space-y-3 text-[#4c5948]">
                      {displayedSteps.map((step, index) => (
                        <li key={index} className="flex gap-3 rounded-2xl bg-[#fffdf7] border border-[#edf2e7] px-4 py-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dfeeda] text-[#6f8a6d] text-sm font-semibold">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                </div>

                <section className="mt-5 rounded-3xl bg-[#f7fbf4] border border-[#e4ecde] p-5">
                  <h3 className="text-lg font-semibold mb-2">Notes</h3>
                  <div className="text-sm text-[#7ea07b] mb-2">Selected Sweetness: {sweetness}</div>
                  <p className="text-[#5d6859]">{selected.notes}</p>
                </section>
              </>
            ) : (
              <div className="text-[#7d8777]">Select a drink to view the recipe.</div>
            )}
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/25 flex items-start md:items-center justify-center p-0 md:p-4 overflow-y-auto">
            <div className="w-full h-full md:h-auto md:max-w-2xl rounded-none md:rounded-3xl border-0 md:border border-[#d9e6d4] bg-[#fffdf7] p-4 md:p-6 shadow-2xl md:my-4 max-h-screen md:max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 z-10 bg-[#fffdf7] flex items-start justify-between gap-3 mb-5 pb-3 border-b border-[#edf2e7]">
                <div>
                  <div className="text-sm uppercase tracking-wide text-[#7ea07b] mb-2">
                    {editingIndex !== null ? "Edit Recipe" : "Add Recipe Template"}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-[#3f4a3c]">
                    {editingIndex !== null ? "Update drink recipe" : "Create a new drink recipe"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-3 py-2 rounded-xl text-sm border bg-[#faf8f1] border-[#edf2e7] hover:bg-[#f1f6ec]"
                >
                  Close
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#6f7d69] mb-2">Drink Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Example: Wintermelon Milk Tea"
                    className="w-full rounded-2xl bg-[#f7f5ed] border border-[#d9e6d4] px-4 py-3 outline-none focus:border-[#9fc29a]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#6f7d69] mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-2xl bg-[#f7f5ed] border border-[#d9e6d4] px-4 py-3 outline-none focus:border-[#9fc29a]"
                  >
                    {["Matcha", "Teaspresso", "Fruit Tea", "Coffee", "Milk Tea", "Frappe"].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm text-[#6f7d69] mb-2">Ingredients & Measurements</label>
                <textarea
                  value={form.ingredientsText}
                  onChange={(e) => setForm({ ...form, ingredientsText: e.target.value })}
                  placeholder={"One ingredient per line\nBlack tea - 6 oz\nCreamer - 2 oz\nSimple syrup - 1 oz"}
                  rows={4}
                  className="w-full rounded-2xl bg-[#f7f5ed] border border-[#d9e6d4] px-4 py-3 outline-none focus:border-[#9fc29a]"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm text-[#6f7d69] mb-2">Steps & Instructions</label>
                <textarea
                  value={form.stepsText}
                  onChange={(e) => setForm({ ...form, stepsText: e.target.value })}
                  placeholder={"One step per line\nAdd tea to shaker\nAdd milk and syrup\nShake with ice\nPour and serve"}
                  rows={4}
                  className="w-full rounded-2xl bg-[#f7f5ed] border border-[#d9e6d4] px-4 py-3 outline-none focus:border-[#9fc29a]"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm text-[#6f7d69] mb-2">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Optional notes for sweetness, toppings, cup size, or reminders"
                  rows={3}
                  className="w-full rounded-2xl bg-[#f7f5ed] border border-[#d9e6d4] px-4 py-3 outline-none focus:border-[#9fc29a]"
                />
              </div>

              <div className="sticky bottom-0 bg-[#fffdf7] mt-5 flex flex-wrap gap-3 justify-end pt-3 border-t border-[#edf2e7]">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-3 rounded-2xl text-sm border bg-[#faf8f1] border-[#edf2e7] hover:bg-[#f1f6ec] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRecipe}
                  className="px-4 py-3 rounded-2xl text-sm font-semibold bg-[#dfeeda] border border-[#b9d3b3] text-[#587054] hover:bg-[#d5e9cf] transition"
                >
                  {editingIndex !== null ? "Save Changes" : "Add Recipe"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
