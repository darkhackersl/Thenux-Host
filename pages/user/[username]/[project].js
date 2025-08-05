// pages/user/[username]/[project].js

import memoryStore from '../../../lib/memoryStore';

export default function HostedSite({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function getServerSideProps({ params }) {
  const { username, project } = params;
  const key = `${username}-${project}`;
  const data = memoryStore[key];

  if (!data) {
    return { notFound: true };
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>${data.css || ''}</style>
</head>
<body>
  ${data.html || ''}
  <script>${data.js || ''}</script>
</body>
</html>
`;

  return {
    props: { html }
  };
}

