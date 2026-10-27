import { apiGet, apiPostForm, apiDelete } from './api';

export async function getArtworks() {
  try {
    return await apiGet('/api/artworks');
  } catch {
    return [];
  }
}

export async function addArtwork(artwork, imageFile) {
  const formData = new FormData();
  formData.append('title', artwork.title);
  formData.append('year', artwork.year);
  formData.append('medium', artwork.medium);
  formData.append('size', artwork.size);

  if (imageFile) {
    formData.append('image', imageFile);
  } else if (artwork.img) {
    formData.append('imageUrl', artwork.img);
  }

  return apiPostForm('/api/artworks', formData);
}

export async function deleteArtwork(id) {
  await apiDelete(`/api/artworks/${id}`);
}
