export const CATEGORIES = [
  { label: 'All', match: null },
  { label: 'Oil', match: 'oil' },
  { label: 'Pastel', match: 'pastel' },
];

export function filterArtworks(artworks, category) {
  if (category === 'All') return artworks;
  const match = CATEGORIES.find((c) => c.label === category)?.match;
  if (!match) return artworks;
  return artworks.filter((a) => a.medium.toLowerCase().includes(match));
}
