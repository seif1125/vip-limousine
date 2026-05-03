import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className="not-found-container" style={{ 
      fontFamily: 'sans-serif', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      margin: 0,
      padding: '20px',
      backgroundColor: '#F8FAFC',
      color: '#0F172A',
      textAlign: 'center'
    }}>
        <img 
          src="/logo.png" 
          alt="Car Not Found" 
          style={{ width: '150px', height: 'auto', marginBottom: '20px' }} 
        />
      <h1 style={{ fontSize: '5rem', margin: 0, fontWeight: 900, color: '#C5A25D' }}>404</h1>
      <h2 style={{ margin: '10px 0 20px', fontWeight: 800, fontSize: '2rem' }}>
        {t('title') || 'Page Not Found'}
      </h2>
      <p style={{ marginBottom: '30px', fontSize: '1.2rem', color: '#64748B', maxWidth: '400px' }}>
        {t('description') || "The resource you are looking for does not exist."}
      </p>
      <Link 
        href="/" 
        style={{ 
          color: '#FFFFFF', 
          backgroundColor: '#0F172A', 
          padding: '14px 32px', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          transition: 'background-color 0.2s',
          display: 'inline-block'
        }}
      >
        {t('goHome') || 'Return Home'}
      </Link>
    </div>
  );
}