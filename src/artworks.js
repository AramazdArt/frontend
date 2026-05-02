const STORAGE_KEY = 'ap_artworks';
const DEFAULT_IDS = [1, 2, 3, 4, 5, 6, 7, 8];

function isDefaultArtworks(value) {
  if (!Array.isArray(value) || value.length !== DEFAULT_IDS.length) return false;
  return value.every((item) => DEFAULT_IDS.includes(item.id));
}

export function getArtworks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (isDefaultArtworks(parsed)) {
        saveArtworks([]);
        return [];
      }
      return parsed;
    }
  } catch (e) {}
  return [];
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
