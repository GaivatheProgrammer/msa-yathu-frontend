import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';

/* ─── Google Fonts injected once ─── */
const fontLink = document.getElementById('verdant-fonts');
if (!fontLink) {
  const link = document.createElement('link');
  link.id = 'verdant-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap';
  document.head.appendChild(link);
}

/* ─── Keyframe animations injected once ─── */
const styleTag = document.getElementById('verdant-styles');
if (!styleTag) {
  const s = document.createElement('style');
  s.id = 'verdant-styles';
  s.textContent = `
    @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes shimmer  { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
    @keyframes pulseGold{
      0%,100%{ opacity:1; transform:scale(1); box-shadow:0 0 0 0 rgba(255,215,0,.45); }
      50%    { opacity:.85; transform:scale(1.1); box-shadow:0 0 0 7px rgba(255,215,0,0); }
    }
    @keyframes spin { to { transform:rotate(360deg); } }

    .vd-fade-1{ animation:fadeUp .65s cubic-bezier(.16,1,.3,1) .05s both; }
    .vd-fade-2{ animation:fadeUp .65s cubic-bezier(.16,1,.3,1) .18s both; }
    .vd-fade-3{ animation:fadeUp .65s cubic-bezier(.16,1,.3,1) .31s both; }
    .vd-fade-4{ animation:fadeUp .65s cubic-bezier(.16,1,.3,1) .44s both; }
    .vd-fade-5{ animation:fadeUp .65s cubic-bezier(.16,1,.3,1) .57s both; }
    .vd-fadein{ animation:fadeIn .55s ease both; }

    .vd-card:hover { transform:translateY(-6px) !important; border-color:#FFD700 !important; }
    .vd-stat:hover { transform:translateY(-4px) !important; border-color:#FFD700 !important; }

    .vd-btn-primary:hover  { filter:brightness(1.08); box-shadow:0 10px 32px rgba(255,215,0,.42) !important; transform:translateY(-2px); }
    .vd-btn-outline:hover  { background:rgba(255,215,0,.08) !important; border-color:#FFD700 !important; color:#FFD700 !important; transform:translateY(-2px); }
    .vd-nav-link:hover     { color:#FFD700 !important; background:rgba(255,215,0,.08) !important; }
    .vd-footer-link:hover  { color:#FFD700 !important; }
    .vd-contact-btn:hover  { filter:brightness(1.08); transform:translateY(-2px); }
    .vd-contact-outline:hover { background:rgba(255,215,0,.1) !important; color:#FFD700 !important; transform:translateY(-2px); }

    .vd-spinner {
      width:44px; height:44px; border-radius:50%;
      border:2.5px solid rgba(255,215,0,.15);
      border-top-color:#FFD700;
      animation:spin .9s linear infinite;
      margin:64px auto;
    }

    /* Black Background Theme */
    body {
      background-color: #000000 !important;
    }

    /* Responsive Styles */
    @media (max-width: 1024px) {
      .container { padding: 0 20px; }
    }
    
    @media (max-width: 768px) {
      .vd-fade-1, .vd-fade-2, .vd-fade-3, .vd-fade-4, .vd-fade-5 {
        animation: none !important;
        opacity: 1 !important;
      }
      
      [style*="grid-template-columns: repeat(3, 1fr)"] {
        grid-template-columns: 1fr !important;
      }
      
      [style*="grid-template-columns: repeat(4, 1fr)"] {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      
      .hero h1 {
        font-size: 32px !important;
      }
      
      .hero p {
        font-size: 16px !important;
      }
    }
    
    @media (max-width: 480px) {
      [style*="grid-template-columns: repeat(2, 1fr)"] {
        grid-template-columns: 1fr !important;
      }
    }

    ::-webkit-scrollbar{ width:7px; }
    ::-webkit-scrollbar-track{ background:#000000; }
    ::-webkit-scrollbar-thumb{ background:#FFD700; border-radius:8px; }
    ::-webkit-scrollbar-thumb:hover{ background:#FFC107; }
  `;
  document.head.appendChild(s);
}

/* ─── Black Background Theme Design Tokens ─── */
const T = {
  // Pure Black Background
  bgPrimary: '#000000',
  bgCard: '#0A0A0A',
  bgElevated: '#111111',
  bgHover: '#1A1A1A',
  
  // Yellow/Gold Accents
  yellowBright: '#FFD700',
  yellowPrimary: '#FFC107',
  yellowDeep: '#FFB300',
  yellowGradient: 'linear-gradient(135deg, #FFD700 0%, #FFC107 50%, #FFB300 100%)',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#E0E0E0',
  textMuted: '#A0A0A0',
  textInverse: '#000000',
  
  // Borders
  borderSubtle: 'rgba(255, 215, 0, 0.1)',
  borderDefault: 'rgba(255, 215, 0, 0.15)',
  borderStrong: 'rgba(255, 215, 0, 0.3)',
  
  // Fonts
  fontDisplay: "'Cormorant Garamond', Georgia, serif",
  fontBody: "'DM Sans', system-ui, sans-serif",
};

const GoldText = ({ children, style = {} }) => (
  <span style={{
    background: T.yellowGradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    ...style,
  }}>
    {children}
  </span>
);

const SectionLabel = ({ children }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '6px 18px',
    border: `1px solid ${T.borderDefault}`,
    borderRadius: 9999,
    background: 'rgba(255,215,0,.06)',
    marginBottom: 20,
  }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.yellowBright, animation: 'pulseGold 2.4s ease-in-out infinite', display: 'inline-block' }} />
    <span style={{ fontFamily: T.fontBody, fontSize: 11, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: T.yellowBright }}>
      {children}
    </span>
  </div>
);

const Divider = () => (
  <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${T.borderDefault},transparent)`, margin: '80px 0' }} />
);

const HomePage = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://msa-yathu-api.onrender.com/api/listings');
        setFeaturedListings(data);
      } catch (err) {
        console.error('Failed to fetch listings:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const creatorInfo = {
    name: 'Gaiva',
    role: 'Founder & Full Stack Developer',
    email: 'Whitedaniel381@gmail.com',
    phone: '0886606571',
    location: 'Zomba, UNIMA, Malawi',
    bio: 'Passionate software developer from Malawi dedicated to solving student accommodation challenges across the country.',
    mission: 'To connect students with safe, affordable housing near their universities.',
  };

  const stats = [
    { value: '500+', label: 'Properties Listed' },
    { value: '1,000+', label: 'Students Housed' },
    { value: '50+', label: 'Verified Landlords' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  const steps = [
    { num: '01', icon: '🔍', title: 'Search', desc: 'Browse hundreds of verified properties near your campus.' },
    { num: '02', icon: '💬', title: 'Connect', desc: 'Message landlords directly — no middlemen, no hidden fees.' },
    { num: '03', icon: '🏠', title: 'Move In', desc: 'Visit, choose your perfect home, and settle in.' },
  ];

  const whyUs = [
    { icon: '🛡️', title: 'Verified Listings', desc: 'Every property is reviewed for safety and accuracy before going live.' },
    { icon: '📍', title: 'Campus Proximity', desc: 'Filter by university to find homes within walking distance.' },
    { icon: '💰', title: 'Affordable Pricing', desc: 'Transparent pricing with no surprise charges or agent commissions.' },
  ];

  const s = {
    page: { fontFamily: T.fontBody, background: T.bgPrimary, color: T.textPrimary, minHeight: '100vh' },
    wrap: { maxWidth: 1240, margin: '0 auto', padding: '0 28px' },
    
    hero: { 
      position: 'relative', padding: '120px 0 100px', overflow: 'hidden', 
      background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,215,0,.05) 0%, transparent 70%), ${T.bgPrimary}` 
    },
    heroAccentLine: { 
      position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', 
      width: '55%', height: 1, background: `linear-gradient(90deg,transparent,${T.yellowBright},transparent)` 
    },
    heroInner: { maxWidth: 780, margin: '0 auto', textAlign: 'center' },
    heroEyebrow: { marginBottom: 28 },
    heroH1: { 
      fontFamily: T.fontDisplay, fontSize: 'clamp(32px, 6.5vw, 76px)', fontWeight: 700, 
      lineHeight: 1.05, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 24 
    },
    heroSub: { 
      fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 300, lineHeight: 1.75, 
      color: T.textSecondary, marginBottom: 44 
    },
    
    statsWrap: { 
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, 
      margin: '0 auto 80px', maxWidth: 1240, padding: '0 28px'
    },
    statCard: { 
      background: T.bgCard, border: `1px solid ${T.borderSubtle}`, borderRadius: 18, 
      padding: '36px 20px', textAlign: 'center', transition: 'all .25s', 
      cursor: 'default', position: 'relative', overflow: 'hidden' 
    },
    statValue: { 
      fontFamily: T.fontDisplay, fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 700, lineHeight: 1, 
      background: T.yellowGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', 
      backgroundClip: 'text', display: 'block', marginBottom: 8 
    },
    statLabel: { fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textMuted },
    
    section: { padding: '60px 0' },
    sectionHead: { textAlign: 'center', marginBottom: 56 },
    sectionH2: { 
      fontFamily: T.fontDisplay, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, 
      letterSpacing: '-0.025em', color: T.textPrimary, marginBottom: 14 
    },
    sectionP: { fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, color: T.textSecondary },
    
    grid3: { 
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28,
      '@media (max-width: 768px)': { gridTemplateColumns: '1fr' }
    },
    card: { 
      background: T.bgCard, border: `1px solid ${T.borderSubtle}`, borderRadius: 20, 
      padding: '44px 32px', position: 'relative', overflow: 'hidden', transition: 'all .3s' 
    },
    cardIcon: { 
      width: 56, height: 56, background: 'rgba(255,215,0,.1)', border: `1px solid ${T.borderDefault}`, 
      borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', 
      fontSize: 26, marginBottom: 24 
    },
    stepBadge: { 
      position: 'absolute', top: 20, right: 24, fontFamily: T.fontDisplay, 
      fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 700, lineHeight: 1, 
      background: T.yellowGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', 
      backgroundClip: 'text', opacity: 0.22 
    },
    cardH3: { 
      fontFamily: T.fontDisplay, fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 700, 
      color: T.textPrimary, marginBottom: 12 
    },
    cardP: { fontSize: 'clamp(14px, 1.5vw, 15px)', lineHeight: 1.75, color: T.textSecondary },
    
    featuredSection: { 
      background: T.bgElevated, borderTop: `1px solid ${T.borderSubtle}`, 
      borderBottom: `1px solid ${T.borderSubtle}`, padding: '60px 0' 
    },
    
    ctaSection: { 
      background: T.bgCard, border: `1px solid ${T.borderDefault}`, borderRadius: 24, 
      padding: 'clamp(40px, 5vw, 72px) clamp(24px, 5vw, 56px)', textAlign: 'center', 
      position: 'relative', overflow: 'hidden', marginBottom: 80 
    },
    ctaGlow: { 
      position: 'absolute', top: '-60%', left: '50%', transform: 'translateX(-50%)', 
      width: 500, height: 400, background: 'radial-gradient(ellipse,rgba(255,215,0,.05) 0%,transparent 70%)', 
      pointerEvents: 'none' 
    },
    ctaTopLine: { 
      position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: T.yellowGradient, opacity: 0.5 
    },
    ctaH2: { 
      fontFamily: T.fontDisplay, fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 700, 
      color: T.textPrimary, marginBottom: 14, position: 'relative' 
    },
    ctaP: { 
      fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, color: T.textSecondary, 
      marginBottom: 36, position: 'relative' 
    },
    
    btnOutline: { 
      display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', 
      border: `1px solid ${T.borderStrong}`, color: T.yellowBright, padding: '14px 32px', 
      borderRadius: 9999, fontFamily: T.fontBody, fontSize: 14, fontWeight: 500, 
      letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer', 
      textDecoration: 'none', transition: 'all .2s' 
    },
    
    creatorSection: { 
      background: T.bgCard, border: `1px solid ${T.borderDefault}`, borderRadius: 24, 
      padding: 'clamp(32px, 4vw, 60px)', marginBottom: 80, position: 'relative', overflow: 'hidden' 
    },
    creatorGrid: { 
      display: 'grid', gridTemplateColumns: 'clamp(180px, 25vw, 220px) 1fr', gap: 56, alignItems: 'start',
      '@media (max-width: 768px)': { gridTemplateColumns: '1fr', textAlign: 'center', gap: 32 }
    },
    profileImg: { 
      width: 'clamp(140px, 20vw, 180px)', height: 'clamp(140px, 20vw, 180px)', 
      borderRadius: '50%', objectFit: 'cover', border: `2px solid ${T.yellowBright}`, 
      boxShadow: '0 0 0 6px rgba(255,215,0,.12)' 
    },
    profilePlaceholder: { 
      width: 'clamp(140px, 20vw, 180px)', height: 'clamp(140px, 20vw, 180px)', margin: '0 auto', 
      background: T.yellowGradient, borderRadius: '50%', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', fontSize: 'clamp(48px, 8vw, 72px)', 
      boxShadow: '0 0 0 6px rgba(255,215,0,.12)' 
    },
    creatorName: { 
      fontFamily: T.fontDisplay, fontSize: 'clamp(22px, 3vw, 26px)', fontWeight: 700, 
      background: T.yellowGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', 
      backgroundClip: 'text', marginTop: 16, marginBottom: 4, display: 'block' 
    },
    creatorRole: { fontSize: 'clamp(12px, 1.5vw, 13px)', color: T.textMuted, letterSpacing: '0.04em' },
    creatorBio: { fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.8, color: T.textSecondary, marginBottom: 20 },
    infoGrid: { 
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 28,
      '@media (max-width: 480px)': { gridTemplateColumns: '1fr' }
    },
    infoItem: { 
      background: T.bgElevated, border: `1px solid ${T.borderSubtle}`, borderRadius: 12, padding: '14px 18px' 
    },
    infoLabel: { 
      fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', 
      color: T.yellowBright, marginBottom: 6 
    },
    infoValue: { fontSize: 'clamp(12px, 1.5vw, 14px)', color: T.textPrimary, fontWeight: 500 },
    
    footer: { background: T.bgPrimary, borderTop: `1px solid ${T.borderSubtle}`, padding: '72px 0 36px' },
    footerGrid: { 
      display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56,
      '@media (max-width: 768px)': { gridTemplateColumns: '1fr', gap: 32 }
    },
    footerLogo: { 
      fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 700, background: T.yellowGradient, 
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', 
      display: 'block', marginBottom: 14, textDecoration: 'none' 
    },
    footerTagline: { fontSize: 14, lineHeight: 1.75, color: T.textMuted, maxWidth: 240 },
    footerColHead: { 
      fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', 
      color: T.textMuted, marginBottom: 20 
    },
    footerLink: { 
      display: 'block', fontSize: 14, color: T.textSecondary, textDecoration: 'none', 
      marginBottom: 12, transition: 'color .15s' 
    },
    footerBottom: { 
      borderTop: `1px solid ${T.borderSubtle}`, paddingTop: 28, display: 'flex', 
      alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: T.textMuted,
      '@media (max-width: 768px)': { flexDirection: 'column', gap: 16, textAlign: 'center' }
    },
  };

  return (
    <div style={s.page}>
      {/* HERO SECTION */}
      <section style={s.hero}>
        <div style={s.heroAccentLine} />
        <div style={{ ...s.wrap, textAlign: 'center' }}>
          <div style={s.heroInner}>
            <div className="vd-fade-1" style={s.heroEyebrow}>
              <SectionLabel>Malawi's Student Housing Platform</SectionLabel>
            </div>
            <h1 className="vd-fade-2" style={s.heroH1}>
              Find Your Perfect<br />
              <GoldText>Student Home in Malawi</GoldText>
            </h1>
            <p className="vd-fade-3" style={s.heroSub}>
              Discover safe, affordable, and convenient accommodation<br />near your university — no agents, no hassle.
            </p>
            <div className="vd-fade-4">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ ...s.statsWrap, marginTop: -44 }}>
        {stats.map((st, i) => (
          <div key={st.label} className={`vd-stat vd-fade-${i + 2}`} style={s.statCard}>
            <span style={s.statValue}>{st.value}</span>
            <span style={s.statLabel}>{st.label}</span>
          </div>
        ))}
      </div>

      <div style={s.wrap}>
        <Divider />
        
        {/* HOW IT WORKS */}
        <section>
          <div style={s.sectionHead}>
            <SectionLabel>Simple Process</SectionLabel>
            <h2 style={s.sectionH2}>How It Works</h2>
            <p style={s.sectionP}>Three easy steps to find your new home</p>
          </div>
          <div style={s.grid3}>
            {steps.map((step, i) => (
              <div key={step.num} className={`vd-card vd-fade-${i + 2}`} style={s.card}>
                <span style={s.stepBadge}>{step.num}</span>
                <div style={s.cardIcon}>{step.icon}</div>
                <h3 style={s.cardH3}>{step.title}</h3>
                <p style={s.cardP}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />
      </div>

      {/* FEATURED LISTINGS */}
      <section style={s.featuredSection}>
        <div style={s.wrap}>
          <div style={s.sectionHead}>
            <SectionLabel>Top Picks</SectionLabel>
            <h2 style={s.sectionH2}>Featured Properties</h2>
            <p style={s.sectionP}>Hand-picked accommodations near Malawian universities</p>
          </div>
          
          {loading ? (<div className="vd-spinner" />) : featuredListings.length === 0 ? (
            <p style={{ textAlign: 'center', color: T.textMuted, padding: '40px 0' }}>Loading hostels from Malawi...</p>
          ) : (
            <div style={s.grid3}>
              {featuredListings.map(listing => (<ListingCard key={listing.id || listing._id} listing={listing} />))}
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/search" className="vd-btn-outline" style={s.btnOutline}>Browse All Properties →</Link>
          </div>
        </div>
      </section>

      <div style={s.wrap}>
        <Divider />
        
        {/* WHY CHOOSE US */}
        <section>
          <div style={s.sectionHead}>
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 style={s.sectionH2}>Built for Malawian Students</h2>
            <p style={s.sectionP}>Everything you need to find a home you'll love</p>
          </div>
          <div style={s.grid3}>
            {whyUs.map((w, i) => (
              <div key={w.title} className={`vd-card vd-fade-${i + 2}`} style={s.card}>
                <div style={s.cardIcon}>{w.icon}</div>
                <h3 style={s.cardH3}>{w.title}</h3>
                <p style={s.cardP}>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* CREATOR SECTION */}
        <section>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>Meet the Builder</SectionLabel>
          </div>
          <div style={s.creatorSection}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: T.yellowGradient, opacity: .45 }} />
            <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: 400, height: 400, background: 'radial-gradient(ellipse,rgba(255,215,0,.05) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={s.creatorGrid}>
              <div style={{ textAlign: 'center' }}>
                {!imageError ? (
                  <img src="/images/gaiva-photo.jpg" alt={creatorInfo.name} style={s.profileImg} onError={() => setImageError(true)} />
                ) : (
                  <div style={s.profilePlaceholder}>👨‍💻</div>
                )}
                <span style={s.creatorName}>{creatorInfo.name}</span>
                <p style={{ ...s.creatorRole, textAlign: 'center' }}>{creatorInfo.role}</p>
              </div>
              <div>
                <p style={s.creatorBio}>{creatorInfo.bio}</p>
                <p style={{ ...s.creatorBio, marginBottom: 28 }}><GoldText>Mission: </GoldText>{creatorInfo.mission}</p>
                <div style={s.infoGrid}>
                  {[
                    { label: '📧 Email', value: creatorInfo.email },
                    { label: '📱 Phone', value: creatorInfo.phone },
                    { label: '📍 Location', value: creatorInfo.location },
                    { label: '💬 WhatsApp', value: 'Available 24 / 7' },
                  ].map(item => (
                    <div key={item.label} style={s.infoItem}>
                      <div style={s.infoLabel}>{item.label}</div>
                      <div style={s.infoValue}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                  <a href={`mailto:${creatorInfo.email}`} style={{ ...s.btnOutline, textDecoration: 'none' }}>📧 Send Email</a>
                  <a href={`tel:${creatorInfo.phone}`} style={{ ...s.btnOutline, textDecoration: 'none' }}>📞 Call Now</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <div style={s.ctaSection}>
          <div style={s.ctaGlow} /><div style={s.ctaTopLine} />
          <SectionLabel>For Landlords</SectionLabel>
          <h2 style={s.ctaH2}>Own a Property?</h2>
          <p style={s.ctaP}>List on MSA Yathu and connect with thousands of students<br />looking for quality accommodation right now.</p>
          <Link to="/register" style={{ ...s.btnOutline, textDecoration: 'none' }}>List Your Property →</Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={s.wrap}>
          <div style={s.footerGrid}>
            <div>
              <Link to="/" style={s.footerLogo}>MSA Yathu</Link>
              <p style={s.footerTagline}>Your trusted platform for student accommodation across Malawi.</p>
            </div>
            <div>
              <p style={s.footerColHead}>Explore</p>
              {[['/', 'Home'], ['/search', 'Browse'], ['/register', 'Register']].map(([to, l]) => (
                <Link key={to} to={to} style={s.footerLink}>{l}</Link>
              ))}
            </div>
            <div>
              <p style={s.footerColHead}>Support</p>
              {['Help Center', 'FAQ', 'Contact'].map(l => (<a key={l} href="#" style={s.footerLink}>{l}</a>))}
            </div>
            <div>
              <p style={s.footerColHead}>Contact</p>
              {[`📧 ${creatorInfo.email}`, `📱 ${creatorInfo.phone}`, `📍 ${creatorInfo.location}`].map(line => (
                <p key={line} style={{ ...s.footerTagline, marginBottom: 10 }}>{line}</p>
              ))}
            </div>
          </div>
          <div style={s.footerBottom}>
            <span>© 2024 MSA Yathu. All rights reserved.</span>
            <span>Created with ❤️ by {creatorInfo.name} · {creatorInfo.location}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;