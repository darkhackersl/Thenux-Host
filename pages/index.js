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

    if (!username || !project || !html) {
      alert('Username, Project, and HTML are required!');
      return;
    }

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, project, html, css, js })
    });

    const data = await res.json();
    if (data.success) {
      setLink(`${window.location.origin}/${username}/${project}`);
    } else {
      alert('Failed to deploy');
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem' }}>🌐 Create & Host Your Website</h1>

      <form onSubmit={handleDeploy} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Project Name" value={project} onChange={e => setProject(e.target.value)} />
        
        <textarea placeholder="Write your HTML here..." rows={10} value={html} onChange={e => setHtml(e.target.value)} />
        <textarea placeholder="Write your CSS here..." rows={6} value={css} onChange={e => setCss(e.target.value)} />
        <textarea placeholder="Write your JavaScript here..." rows={6} value={js} onChange={e => setJs(e.target.value)} />

        <button type="submit" style={{ padding: '0.5rem', fontWeight: 'bold' }}>🚀 Deploy Site</button>
      </form>

      {link && (
        <p style={{ marginTop: '1rem' }}>
          ✅ Your site is live: <a href={link} target="_blank">{link}</a>
        </p>
      )}
    </main>
  );
}
