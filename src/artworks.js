const DEFAULT_ARTWORKS = [
  { id: 1, title: 'Untitled I', year: 2023, medium: 'Oil on canvas', size: 'tall', img: 'https://picsum.photos/seed/art1/600/900' },
  { id: 2, title: 'Golden Hour', year: 2023, medium: 'Acrylic on canvas', size: 'wide', img: 'https://picsum.photos/seed/art2/900/600' },
  { id: 3, title: 'Fragment', year: 2022, medium: 'Mixed media', size: 'square', img: 'https://picsum.photos/seed/art3/600/600' },
  { id: 4, title: 'Silence', year: 2022, medium: 'Watercolor', size: 'tall', img: 'https://picsum.photos/seed/art4/600/900' },
  { id: 5, title: 'Horizon', year: 2023, medium: 'Oil on canvas', size: 'wide', img: 'https://picsum.photos/seed/art5/900/600' },
  { id: 6, title: 'Drift', year: 2021, medium: 'Ink on paper', size: 'square', img: 'https://picsum.photos/seed/art6/600/600' },
  { id: 7, title: 'Ember', year: 2022, medium: 'Acrylic', size: 'square', img: 'https://picsum.photos/seed/art7/600/600' },
  { id: 8, title: 'Reverie', year: 2021, medium: 'Charcoal', size: 'tall', img: 'https://picsum.photos/seed/art8/600/900' },
];

const STORAGE_KEY = 'ap_artworks';

export function getArtworks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  // First visit: seed defaults into storage
  saveArtworks(DEFAULT_ARTWORKS);
  return DEFAULT_ARTWORKS;
}

export function saveArtworks(artworks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(artworks));
}

export function addArtwork(artwork) {
  const artworks = getArtworks();
  const newArtwork = { ...artwork, id: Date.now() };
  const updated = [newArtwork, ...artworks];
  saveArtworks(updated);
  return updated;
}

export function deleteArtwork(id) {
  const updated = getArtworks().filter((a) => a.id !== id);
  saveArtworks(updated);
  return updated;
}
