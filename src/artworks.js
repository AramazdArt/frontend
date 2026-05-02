const STORAGE_KEY = 'ap_artworks';
const DEFAULT_IDS = [1, 2, 3, 4, 5, 6, 7, 8];

function stripDefaultArtworks(value) {
  if (!Array.isArray(value)) return value;
  return value.filter((item) => !DEFAULT_IDS.includes(item.id));
}

export function getArtworks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const filtered = stripDefaultArtworks(parsed);
      if (filtered.length !== (Array.isArray(parsed) ? parsed.length : 0)) {
        saveArtworks(filtered);
      }
      return filtered;
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
