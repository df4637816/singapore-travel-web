/**
 * Data Validation Script
 * Validates restaurant data integrity
 */

import { restaurants, getAllCategories } from '../data/restaurants';
import { categories } from '../data/categories';
import { getRestaurantStats, toGeoJSON } from '../lib/restaurantUtils';

console.log('🔍 Validating Restaurant Data...\n');

// 1. Count restaurants
const totalCount = restaurants.length;
console.log(`✅ Total Restaurants: ${totalCount}`);

// 2. Check for duplicate IDs
const ids = restaurants.map((r) => r.id);
const uniqueIds = new Set(ids);
if (ids.length !== uniqueIds.size) {
  console.error('❌ DUPLICATE IDs FOUND!');
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  console.error('  Duplicates:', duplicates);
} else {
  console.log('✅ No duplicate IDs');
}

// 3. Check for missing required fields
const missingFields = restaurants.filter(
  (r) => !r.id || !r.name || !r.category || !r.coordinates.lat || !r.coordinates.lng,
);
if (missingFields.length > 0) {
  console.error('❌ MISSING REQUIRED FIELDS:', missingFields.length);
  missingFields.forEach((r) => console.error('  -', r.id || 'NO ID', r.name));
} else {
  console.log('✅ All required fields present');
}

// 4. Check coordinates validity (Singapore bounds)
const SINGAPORE_BOUNDS = {
  minLat: 1.15,
  maxLat: 1.48,
  minLng: 103.6,
  maxLng: 104.0,
};

const invalidCoords = restaurants.filter(
  (r) =>
    r.coordinates.lat < SINGAPORE_BOUNDS.minLat ||
    r.coordinates.lat > SINGAPORE_BOUNDS.maxLat ||
    r.coordinates.lng < SINGAPORE_BOUNDS.minLng ||
    r.coordinates.lng > SINGAPORE_BOUNDS.maxLng,
);

if (invalidCoords.length > 0) {
  console.warn(`⚠️  ${invalidCoords.length} restaurants with coordinates outside Singapore bounds:`);
  invalidCoords.forEach((r) =>
    console.warn(`  - ${r.name}: (${r.coordinates.lat}, ${r.coordinates.lng})`),
  );
} else {
  console.log('✅ All coordinates within Singapore bounds');
}

// 5. Category analysis
const usedCategories = getAllCategories();
console.log(`\n📊 Categories Used: ${usedCategories.length}`);
console.log('Categories:', usedCategories.join(', '));

// 6. Category definition check
const definedCategoryNames = new Set(categories.map((c) => c.name));
const undefinedCategories = usedCategories.filter((cat) => !definedCategoryNames.has(cat));
if (undefinedCategories.length > 0) {
  console.warn(`⚠️  ${undefinedCategories.length} categories not defined in categories.ts:`);
  undefinedCategories.forEach((cat) => console.warn(`  - ${cat}`));
} else {
  console.log('✅ All categories defined');
}

// 7. Statistics
const stats = getRestaurantStats();
console.log('\n📈 Restaurant Statistics:');
console.log(`Total: ${stats.total}`);
console.log(`Categories: ${stats.categories}`);
console.log('\nTop 10 Categories by Count:');
stats.byCategory
  .sort((a, b) => b.count - a.count)
  .slice(0, 10)
  .forEach((item) => {
    console.log(`  ${item.category}: ${item.count}`);
  });

// 8. GeoJSON validation
try {
  const geoJSON = toGeoJSON();
  console.log(`\n✅ GeoJSON conversion successful`);
  console.log(`   Features: ${geoJSON.features.length}`);
} catch (error) {
  console.error('❌ GeoJSON conversion failed:', error);
}

console.log('\n✨ Validation Complete!\n');
