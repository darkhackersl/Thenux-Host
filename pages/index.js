// pages/index.js

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [project, setProject] = useState('');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [link, setLink] = useState('');

  const handleDeploy = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, project, html, css, js })
    });

    let data;
    try {
      data = await res.json();
    } catch {
      alert('Upload failed');
      return;
    }

    if (data.success) {
      setLink(`${window.location.origin}/${username}/${project}`);
    } else {
      alert('Deploy failed');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🚀 Thenux Static Site Host</h1>
      <form onSubmit={handleDeploy} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Project" required value={project} onChange={(e) => setProject(e.target.value)} />
        <textarea rows={8} placeholder="HTML code..." value={html} onChange={(e) => setHtml(e.target.value)} />
        <textarea rows={6} placeholder="CSS code..." value={css} onChange={(e) => setCss(e.target.value)} />
        <textarea rows={6} placeholder="JS code..." value={js} onChange={(e) => setJs(e.target.value)} />
        <button type="submit">Deploy</button>
      </form>
      {link && (
        <p style={{ marginTop: '1rem' }}>
          ✅ Site live at: <a href={link} target="_blank">{link}</a>
        </p>
      )}
    </div>
  );
}

