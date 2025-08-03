import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Form error' });

    const username = fields.username;
    const project = fields.project;
    const zip = files.zip;

    const extractPath = path.join(process.cwd(), 'public', 'sites', username + '-' + project);
    fs.mkdirSync(extractPath, { recursive: true });

    const zipFile = new AdmZip(zip.filepath);
    zipFile.extractAllTo(extractPath, true);

    res.json({ success: true });
  });
}
