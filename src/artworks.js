const STORAGE_KEY = 'ap_artworks';

export function getArtworks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
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
