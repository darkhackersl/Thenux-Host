// pages/api/upload.js

import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, project, html, css, js } = req.body;

  if (!username || !project || !html) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const docRef = doc(db, 'sites', `${username}-${project}`);
    await setDoc(docRef, { username, project, html, css, js });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Firebase Error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
}
