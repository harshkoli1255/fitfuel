const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./lib/data/generated-products.json', 'utf8'));

const map = {
  "whey-proteins": "protein",
  "whey-isolates": "protein",
  "vegan-proteins": "protein",
  "plant-protein": "protein",
  "protein-powder": "protein",
  "mass-gainers": "protein",
  "creatines": "creatine",
  "pre-workouts": "pre-workout",
  "pre-workout": "pre-workout",
  "aminos---bcaa-s": "sports-nutrition",
  "glutamines": "sports-nutrition",
  "l-carnitine": "sports-nutrition",
  "fat-burners": "sports-nutrition",
  "carbos": "sports-nutrition",
  "shilajit": "sports-nutrition",
  "t-boosters": "sports-nutrition",
  "multivitamins": "multivitamins",
  "fish-oil": "omega-3",
  "biotin": "vitamins",
  "collagen": "vitamins",
  "l-glutathione": "vitamins",
  "cla": "vitamins",
  "shakers": "shakers",
  "gym-t-shirt": "accessories",
  "protein-bars": "protein-bars",
  "peanut-butter": "healthy-snacking",
  "muesli": "healthy-snacking",
  "oats": "healthy-snacking",
  "other-essentials": "accessories",
  "0": "accessories"
};

for (const p of data) {
  if (map[p.categoryId]) {
    p.categoryId = map[p.categoryId];
  } else {
    console.log("Unmapped:", p.categoryId);
  }
}

fs.writeFileSync('./lib/data/generated-products.json', JSON.stringify(data, null, 2));
