import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth';
import { getArtworks, addArtwork, deleteArtwork } from '../artworks';
import './AdminPanel.css';

const EMPTY_FORM = { title: '', year: new Date().getFullYear(), medium: '', size: 'square', img: '' };

function AdminPanel() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [preview, setPreview] = useState('');
  const [tab, setTab] = useState('add'); // 'add' | 'manage'
  const [success, setSuccess] = useState('');
  const fileRef = useRef();

  useEffect(() => {
    if (!isAuthenticated()) navigate('/admin/login');
    setArtworks(getArtworks());
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'img') setPreview(e.target.value);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((f) => ({ ...f, img: ev.target.result }));
      setPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.img) return;
    const updated = addArtwork(form);
    setArtworks(updated);
    setForm(EMPTY_FORM);
    setPreview('');
    if (fileRef.current) fileRef.current.value = '';
    setSuccess('Artwork added successfully!');
    setTimeout(() => setSuccess(''), 3000);
    setTab('manage');
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this artwork?')) return;
    setArtworks(deleteArtwork(id));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-panel">
      <header className="admin-panel__header">
        <span className="admin-panel__brand">Admin — Aramazd</span>
        <div className="admin-panel__header-right">
          <a href="/" className="admin-panel__link">View Site</a>
          <button className="admin-panel__logout" onClick={handleLogout}>Log Out</button>
        </div>
      </header>

      <main className="admin-panel__main">
        <div className="admin-panel__tabs">
          <button
            className={`admin-panel__tab ${tab === 'add' ? 'active' : ''}`}
            onClick={() => setTab('add')}
          >
            Add Artwork
          </button>
          <button
            className={`admin-panel__tab ${tab === 'manage' ? 'active' : ''}`}
            onClick={() => setTab('manage')}
          >
            Manage ({artworks.length})
          </button>
        </div>

        {success && <div className="admin-panel__success">{success}</div>}

        {tab === 'add' && (
          <form className="admin-panel__form" onSubmit={handleSubmit}>
            <div className="admin-panel__row">
              <div className="admin-panel__field">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="admin-panel__field">
                <label>Year</label>
                <input name="year" type="number" value={form.year} onChange={handleChange} required />
              </div>
            </div>
            <div className="admin-panel__row">
              <div className="admin-panel__field">
                <label>Medium</label>
                <input name="medium" value={form.medium} onChange={handleChange} placeholder="e.g. Oil on canvas" required />
              </div>
              <div className="admin-panel__field">
                <label>Grid Size</label>
                <select name="size" value={form.size} onChange={handleChange}>
                  <option value="square">Square</option>
                  <option value="tall">Tall (portrait)</option>
                  <option value="wide">Wide (landscape)</option>
                </select>
              </div>
            </div>
            <div className="admin-panel__field">
              <label>Image — Upload file</label>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} />
            </div>
            <div className="admin-panel__field">
              <label>— or paste image URL</label>
              <input name="img" value={form.img.startsWith('data:') ? '' : form.img} onChange={handleChange} placeholder="https://..." />
            </div>
            {preview && (
              <div className="admin-panel__preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
            <button type="submit" className="admin-panel__submit">Add to Gallery</button>
          </form>
        )}

        {tab === 'manage' && (
          <div className="admin-panel__artworks">
            {artworks.length === 0 && <p className="admin-panel__empty">No artworks yet.</p>}
            {artworks.map((art) => (
              <div key={art.id} className="admin-panel__artwork-row">
                <img src={art.img} alt={art.title} className="admin-panel__thumb" />
                <div className="admin-panel__artwork-info">
                  <p className="admin-panel__artwork-title">{art.title}</p>
                  <p className="admin-panel__artwork-meta">{art.medium} · {art.year} · {art.size}</p>
                </div>
                <button className="admin-panel__delete" onClick={() => handleDelete(art.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;
