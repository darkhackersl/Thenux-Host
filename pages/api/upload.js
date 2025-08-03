import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, project, html, css, js } = req.body;

  if (!username || !project || !html) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const folderPath = path.join(process.cwd(), 'public', 'sites', `${username}-${project}`);
  fs.mkdirSync(folderPath, { recursive: true });

  const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${project}</title>
  <style>${css || ''}</style>
</head>
<body>
  ${html}
  <script>${js || ''}</script>
</body>
</html>
  `.trim();

  fs.writeFileSync(path.join(folderPath, 'index.html'), content, 'utf8');

  res.status(200).json({ success: true });
}
