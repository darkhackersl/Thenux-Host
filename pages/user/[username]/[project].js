// pages/user/[username]/[project].js

import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function RenderedPage({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function getServerSideProps({ params }) {
  const key = `${params.username}-${params.project}`;
  const docRef = doc(db, 'sites', key);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return { notFound: true };

  const data = snapshot.data();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>${data.css || ''}</style>
</head>
<body>
  ${data.html}
  <script>${data.js || ''}</script>
</body>
</html>
`;

  return { props: { html } };
}

