"use client";

import React, { useState, useMemo, useEffect } from "react";

const initialDrinks = [
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
      "Add brown sugar based on sweetness: 25% = 10g, 50% = 20g, 75% = 30g, 100% = 40g.",
      "Coat walls in brown sugar.",
      "Add 75% ice.",
      "Fill with milk."
    ],
    notes: "Brown sugar amount changes with sweetness selection."
  },
  {
    name: "Oreo Brûlée Boba",
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
      "Add brown sugar based on sweetness: 25% = 10g, 50% = 20g, 75% = 30g, 100% = 40g.",
      "Add 75% ice.",
      "Fill with milk."
    ],
    notes: "Brown sugar amount changes with sweetness selection."
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
      "Green tea - fill to 500mL"
    ],
    steps: [
      "Add toppings to cup.",
      "Add 75% ice to shaker.",
      "Add 1 scoop mango jam.",
      "Add strawberry syrup based on sweetness: 25% = 30g, 50% = 40g, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Fill to 500mL with green tea.",
      "Cover and shake well.",
      "Add to cup."
    ],
    notes: "Uses oolong tea base with mango jam and strawberry syrup."
  },
  {
    name: "Mango Passionfruit Oolong",
    category: "Fruit Tea",
    ingredients: [
      "Toppings - as requested",
      "Ice - 75% of shaker",
      "Passionfruit jam - 1 scoop",
      "Mango syrup - 30g / 40g depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness",
      "Green tea - fill to 500mL"
    ],
    steps: [
      "Add toppings to cup.",
      "Add 75% ice to shaker.",
      "Add 1 scoop passionfruit jam.",
      "Add mango syrup based on sweetness: 25% = 30g, 50% = 40g, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Fill to 500mL with green tea.",
      "Cover and shake well.",
      "Add to cup."
    ],
    notes: "Uses oolong tea base with passionfruit jam and mango syrup."
  },
  {
    name: "Pineapple Passionfruit Green",
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
      "Add pineapple syrup based on sweetness: 25% = 30g, 50% = 40g, 75% = 40g + 0.1 cane sugar, 100% = 40g + 0.2 cane sugar.",
      "Fill to 500mL with green tea.",
      "Cover and shake well.",
      "Add to cup."
    ],
    notes: "Uses green tea base with passionfruit jam and pineapple syrup."
  },
  {
    name: "Mango Pomelo Frappe",
    category: "Frappe",
    ingredients: [
      "Crystal boba - 1 scoop",
      "Coconut milk - 40mL",
      "Pomelo - 1 scoop",
      "Ice - 1 scoop",
      "Water - 250mL",
      "Mango jam - 1 or 2 scoops depending on sweetness",
      "Cane sugar - 0 / 0 / 0.1 / 0.2 depending on sweetness"
    ],
    steps: [
      "Add 1 scoop crystal boba to cup.",
      "Add 40mL coconut milk.",
      "Add 1 scoop pomelo.",
      "Get blender and add 1 scoop ice.",
      "Add 250mL water.",
      "Add mango jam based on sweetness: 25% = 1 scoop mango jam, 50% = 2 scoops mango jam, 75% = 2 scoops mango jam + 0.1 cane sugar, 100% = 2 scoops mango jam + 0.2 cane sugar.",
      "Cover blender.",
      "Blend until smooth. Use pulse for any ice chunks.",
      "Pour in cup.",
      "Cap with white lid."
    ],
    notes: "Blend until smooth before pouring into prepared cup."
  },
  {
    name: "House Special Boba & Oats",
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
      "Grab a shaker and fill 75% with ice.",
      "Add 1 scoop creamer.",
      "Fill to 450mL with oolong tea.",
      "Cover it.",
      "Shake it on 'A'.",
      "Add sugar around the cup based on sweetness: 25% = 10g, 50% = 20g, 75% = 30g, 100% = 40g brown sugar.",
      "Pour tea in cup."
    ],
    notes: "Brown sugar amount changes with sweetness selection."
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

  const displayedSteps = selected ? getSweetnessAdjustedSteps(selected, sweetness) : [];

  const categories = ["All", "Teaspresso", "Frappe", "Fruit Tea", "Milk Tea"];

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
                    {sweetnessLabels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSweetness(level)}
                        className={`px-3 py-2 rounded-xl text-sm border transition ${
                          sweetness === level
                            ? "bg-[#e8f2e3] border-[#9fc29a]"
                            : "bg-[#faf8f1] border-[#edf2e7] hover:bg-[#f1f6ec]"
                        }`}
                      >
                        {level} sweet
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <section className="rounded-3xl bg-[#f7fbf4] border border-[#e4ecde] p-5">
                    <h3 className="text-lg font-semibold mb-4">Ingredients & Measurements</h3>
                    <ul className="space-y-3 text-[#4c5948]">
                      {selected.ingredients.map((ingredient, index) => (
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
                    {["Teaspresso", "Frappe", "Fruit Tea", "Milk Tea"].map((cat) => (
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
