import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home(): React.JSX.Element {
  return (
    <Layout title="Home" description="Nando Docs">
      <main style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Nando Docs</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
            A clean Docusaurus site for AWS, AI, demos, study guides, and technical content.
          </p>
          <Link className="button button--primary button--lg" to="/intro">
            Open documentation
          </Link>
        </section>
      </main>
    </Layout>
  );
}