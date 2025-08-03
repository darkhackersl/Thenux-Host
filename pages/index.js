import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [project, setProject] = useState('');
  const [zipFile, setZipFile] = useState(null);
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !project || !zipFile) return alert("Fill all fields!");

    const formData = new FormData();
    formData.append('username', username);
    formData.append('project', project);
    formData.append('zip', zipFile);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data.success) {
      setLink(`${window.location.origin}/${username}/${project}`);
    } else {
      alert("Upload failed");
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🗂 Host your static site</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} /><br />
        <input type="text" placeholder="Project name" onChange={e => setProject(e.target.value)} /><br />
        <input type="file" accept=".zip" onChange={e => setZipFile(e.target.files[0])} /><br />
        <button type="submit">Upload & Host</button>
      </form>
      {link && <p>Your site is live at: <a href={link} target="_blank">{link}</a></p>}
    </main>
  );
}
