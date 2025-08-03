import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end(); // ✅ THIS line is critical

  const { username, project, html, css, js } = req.body;

  if (!username || !project || !html) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const folder = path.join(process.cwd(), 'public', 'sites', `${username}-${project}`);
  fs.mkdirSync(folder, { recursive: true });

  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${project}</title>
  <style>${css || ''}</style>
</head>
<body>
  ${html || ''}
  <script>${js || ''}</script>
</body>
</html>
  `.trim();

  fs.writeFileSync(path.join(folder, 'index.html'), fullHtml);

  return res.json({ success: true });
}
export default async function handler(req, res) {
  console.log('Method:', req.method);  // 🔍 See if it’s being called

  if (req.method !== 'POST') return res.status(405).end();

