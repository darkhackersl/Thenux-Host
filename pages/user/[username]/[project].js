import fs from 'fs';
import path from 'path';

export default function StaticSite({ html }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export async function getServerSideProps(context) {
  const { username, project } = context.params;
  const filePath = path.join(process.cwd(), 'public', 'sites', `${username}-${project}`, 'index.html');

  if (!fs.existsSync(filePath)) {
    return {
      notFound: true
    };
  }

  const html = fs.readFileSync(filePath, 'utf8');

  return {
    props: { html }
  };
}
