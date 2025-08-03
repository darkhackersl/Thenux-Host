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

    const payload = { username, project, html, css, js };

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      console.error('JSON parse error', err);
      alert('Server error');
      return;
    }

    if (data.success) {
      setLink(`${window.location.origin}/${username}/${project}`);
    } else {
      alert('Deployment failed');
    }
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>🚀 Thenux Static Host</h1>
      <form onSubmit={handleDeploy} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input placeholder="Project Name" value={project} onChange={(e) => setProject(e.target.value)} required />

        <textarea placeholder="HTML code..." value={html} onChange={(e) => setHtml(e.target.value)} rows={10} />
        <textarea placeholder="CSS code..." value={css} onChange={(e) => setCss(e.target.value)} rows={6} />
        <textarea placeholder="JavaScript code..." value={js} onChange={(e) => setJs(e.target.value)} rows={6} />

        <button type="submit" style={{ padding: '10px', fontWeight: 'bold' }}>💾 Deploy</button>
      </form>

      {link && (
        <p style={{ marginTop: '1rem' }}>
          ✅ Your site is live: <a href={link} target="_blank">{link}</a>
        </p>
      )}
    </main>
  );
}
