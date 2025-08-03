// pages/api/upload.js

let memoryStore = {};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, project, html, css, js } = req.body;

  if (!username || !project || !html) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const key = `${username}-${project}`;
  memoryStore[key] = { html, css, js };

  return res.status(200).json({ success: true });
}

export { memoryStore };
