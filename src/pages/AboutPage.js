import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* ─── Inject fonts once ─── */
if (!document.getElementById('verdant-fonts')) {
  const link = document.createElement('link');
  link.id = 'verdant-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap';
  document.head.appendChild(link);
}

/* ─── Inject keyframes & hover classes once ─── */
if (!document.getElementById('verdant-about-styles')) {
  const s = document.createElement('style');
  s.id = 'verdant-about-styles';
  s.textContent = `
    @keyframes fadeUp  { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
    @keyframes pulseGold {
      0%,100%{opacity:1;transform:scale(1);box-shadow:0 0 0 0 rgba(196,154,46,.45)}
      50%    {opacity:.85;transform:scale(1.1);box-shadow:0 0 0 7px rgba(196,154,46,0)}
    }

    .va-f1{ animation:fadeUp .6s cubic-bezier(.16,1,.3,1) .05s both }
    .va-f2{ animation:fadeUp .6s cubic-bezier(.16,1,.3,1) .15s both }
    .va-f3{ animation:fadeUp .6s cubic-bezier(.16,1,.3,1) .25s both }
    .va-f4{ animation:fadeUp .6s cubic-bezier(.16,1,.3,1) .35s both }
    .va-f5{ animation:fadeUp .6s cubic-bezier(.16,1,.3,1) .45s both }

    .va-card:hover          { transform:translateY(-5px)!important; border-color:rgba(196,154,46,.4)!important; box-shadow:0 0 30px rgba(196,154,46,.15),0 8px 24px rgba(0,0,0,.4)!important; }
    .va-btn-primary:hover   { filter:brightness(1.08); box-shadow:0 10px 30px rgba(196,154,46,.4)!important; transform:translateY(-2px); }
    .va-btn-outline:hover   { background:rgba(196,154,46,.08)!important; border-color:#C49A2E!important; color:#E8C97A!important; transform:translateY(-2px); }
    .va-nav-back:hover      { color:#E8C97A!important; }
    .va-input:focus         { border-color:rgba(196,154,46,.5)!important; box-shadow:0 0 0 3px rgba(196,154,46,.1)!important; background:#16361F!important; }
    .va-tag:hover           { border-color:rgba(196,154,46,.45)!important; color:#E8C97A!important; }
  `;
  document.head.appendChild(s);
}

/* ─── Tokens ─── */
const T = {
  goldGradient:  'linear-gradient(135deg,#E8C97A 0%,#D4A843 35%,#C49A2E 65%,#9E7322 100%)',
  goldPrimary:   '#C49A2E',
  goldPale:      '#E8C97A',
  textPrimary:   '#F0EBE1',
  textSecondary: '#B5AC9A',
  textMuted:     '#766D5E',
  textInverse:   '#081C10',
  bgPrimary:     '#0A1F12',
  bgCard:        '#0F2A18',
  bgElevated:    '#16361F',
  forestDeep:    '#0D2B18',
  borderSubtle:  'rgba(196,154,46,.12)',
  borderDefault: 'rgba(196,154,46,.22)',
  borderStrong:  'rgba(196,154,46,.45)',
  shadowGold:    '0 0 30px rgba(196,154,46,.18),0 8px 24px rgba(0,0,0,.4)',
  fontDisplay:   "'Cormorant Garamond',Georgia,serif",
  fontBody:      "'DM Sans',system-ui,sans-serif",
};

/* ─── Micro-components ─── */
const GoldText = ({ children }) => (
  <span style={{
    background: T.goldGradient,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  }}>{children}</span>
);

const SectionLabel = ({ children }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '6px 18px',
    border: `1px solid ${T.borderDefault}`,
    borderRadius: 9999, background: 'rgba(196,154,46,.06)',
    marginBottom: 20,
  }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.goldPrimary, animation: 'pulseGold 2.4s ease-in-out infinite', display: 'inline-block' }} />
    <span style={{ fontFamily: T.fontBody, fontSize: 11, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: T.goldPrimary }}>
      {children}
    </span>
  </div>
);

const Divider = ({ style = {} }) => (
  <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${T.borderDefault},transparent)`, margin: '64px 0', ...style }} />
);

/* ─── Main Component ─── */
const AboutPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  const skills = [
    { label: 'React & Node.js',   icon: '⚛️' },
    { label: 'MongoDB',           icon: '🍃' },
    { label: 'REST APIs',         icon: '🔗' },
    { label: 'UI / UX Design',    icon: '🎨' },
    { label: 'Full Stack Dev',    icon: '💻' },
    { label: 'Malawi 🇲🇼',        icon: '📍' },
  ];

  const values = [
    { icon: '🛡️', title: 'Safety First',    desc: 'Every listing is reviewed to ensure students find secure, trustworthy accommodation.' },
    { icon: '💰', title: 'Affordability',   desc: 'Committed to connecting students with housing that fits a student budget.' },
    { icon: '🤝', title: 'Community',       desc: 'Building bridges between students and landlords across Malawi.' },
  ];

  const s = {
    page:  { fontFamily: T.fontBody, background: T.bgPrimary, color: T.textPrimary, minHeight: '100vh' },
    wrap:  { maxWidth: 1100, margin: '0 auto', padding: '0 28px' },
    wrapSm:{ maxWidth: 760,  margin: '0 auto', padding: '0 28px' },

    /* Top bar */
    topBar: {
      borderBottom: `1px solid ${T.borderSubtle}`,
      padding: '14px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(10,31,18,.93)',
      backdropFilter: 'blur(14px)',
      position: 'sticky', top: 0, zIndex: 100,
    },
    logo: {
      fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 700,
      background: T.goldGradient,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      textDecoration: 'none',
    },
    navBack: {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 13, fontWeight: 500, color: T.textSecondary,
      textDecoration: 'none', transition: 'color .15s',
      letterSpacing: '0.02em',
    },

    /* Hero */
    hero: {
      padding: '96px 0 80px', textAlign: 'center',
      background: `radial-gradient(ellipse 70% 50% at 50% 0%,rgba(26,77,43,.38) 0%,transparent 70%)`,
      position: 'relative', overflow: 'hidden',
    },
    heroAccent: {
      position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '50%', height: 1,
      background: `linear-gradient(90deg,transparent,${T.goldPrimary},transparent)`,
    },
    heroH1: {
      fontFamily: T.fontDisplay,
      fontSize: 'clamp(38px,6vw,70px)',
      fontWeight: 700, lineHeight: 1.06,
      letterSpacing: '-0.03em',
      color: T.textPrimary, marginBottom: 18,
    },
    heroSub: {
      fontSize: 17, fontWeight: 300, lineHeight: 1.75,
      color: T.textSecondary, maxWidth: 520, margin: '0 auto 0',
    },

    /* Profile card */
    profileCard: {
      background: T.bgCard,
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 24,
      overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '280px 1fr',
      marginBottom: 0,
      position: 'relative',
      transition: 'all .3s',
    },
    profileLeft: {
      background: `linear-gradient(160deg,#12381F 0%,#0D2B18 100%)`,
      borderRight: `1px solid ${T.borderSubtle}`,
      padding: '52px 36px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    },
    profileLeftGlow: {
      position: 'absolute', top: -60, left: -60,
      width: 260, height: 260,
      background: 'radial-gradient(ellipse,rgba(196,154,46,.12) 0%,transparent 70%)',
      pointerEvents: 'none',
    },
    avatar: {
      width: 150, height: 150, borderRadius: '50%',
      background: T.goldGradient,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 64, marginBottom: 24,
      boxShadow: `0 0 0 4px rgba(196,154,46,.2), 0 0 0 8px rgba(196,154,46,.07)`,
    },
    profileName: {
      fontFamily: T.fontDisplay, fontSize: 26, fontWeight: 700,
      background: T.goldGradient,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      marginBottom: 6, textAlign: 'center',
    },
    profileRole: {
      fontSize: 12, fontWeight: 500,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: T.textMuted, marginBottom: 24, textAlign: 'center',
    },
    tagRow: { display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
    tag: {
      padding: '5px 13px',
      border: `1px solid ${T.borderDefault}`,
      borderRadius: 9999, fontSize: 12, fontWeight: 500,
      color: T.textSecondary,
      background: 'rgba(196,154,46,.05)',
      transition: 'all .15s', cursor: 'default',
    },
    profileRight: { padding: '48px 48px' },

    /* Story */
    storyH3: {
      fontFamily: T.fontDisplay, fontSize: 28, fontWeight: 700,
      color: T.textPrimary, marginBottom: 18,
    },
    storyP: { fontSize: 15, lineHeight: 1.82, color: T.textSecondary, marginBottom: 16 },

    missionBox: {
      background: T.bgElevated,
      border: `1px solid ${T.borderSubtle}`,
      borderLeft: `3px solid ${T.goldPrimary}`,
      borderRadius: '0 12px 12px 0',
      padding: '20px 24px', marginTop: 28,
    },
    missionLabel: {
      fontSize: 11, fontWeight: 600,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: T.goldPrimary, marginBottom: 8,
    },
    missionText: { fontSize: 15, lineHeight: 1.75, color: T.textSecondary },

    /* Skills */
    skillsGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14,
      marginTop: 28,
    },
    skillPill: {
      display: 'flex', alignItems: 'center', gap: 10,
      background: T.bgElevated,
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 12, padding: '12px 16px',
      fontSize: 13, fontWeight: 500, color: T.textSecondary,
    },

    /* Values */
    valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 },
    valueCard: {
      background: T.bgCard,
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 20, padding: '36px 28px',
      transition: 'all .3s cubic-bezier(.16,1,.3,1)',
      position: 'relative', overflow: 'hidden',
    },
    valueIcon: {
      width: 52, height: 52,
      background: 'rgba(196,154,46,.1)',
      border: `1px solid ${T.borderDefault}`,
      borderRadius: 14,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 24, marginBottom: 20,
    },
    valueH3: {
      fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 700,
      color: T.textPrimary, marginBottom: 10,
    },
    valueP: { fontSize: 14, lineHeight: 1.75, color: T.textSecondary },

    /* Contact */
    contactGrid: {
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
      alignItems: 'start',
    },
    contactInfoCard: {
      background: T.bgCard,
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 20, padding: '40px 36px',
      position: 'relative', overflow: 'hidden',
    },
    contactInfoGlow: {
      position: 'absolute', bottom: -60, right: -60,
      width: 240, height: 240,
      background: 'radial-gradient(ellipse,rgba(196,154,46,.08) 0%,transparent 70%)',
      pointerEvents: 'none',
    },
    infoRow: {
      display: 'flex', alignItems: 'flex-start', gap: 16,
      padding: '16px 0',
      borderBottom: `1px solid ${T.borderSubtle}`,
    },
    infoIcon: {
      width: 40, height: 40,
      background: 'rgba(196,154,46,.1)',
      border: `1px solid ${T.borderDefault}`,
      borderRadius: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 18, flexShrink: 0,
    },
    infoLabel: { fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textMuted, marginBottom: 4 },
    infoValue: { fontSize: 14, color: T.textPrimary, fontWeight: 500 },

    /* Form */
    formCard: {
      background: T.bgCard,
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 20, padding: '40px 36px',
    },
    formLabel: {
      display: 'block', fontSize: 11, fontWeight: 600,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: T.textMuted, marginBottom: 8,
    },
    formInput: {
      width: '100%',
      background: T.bgElevated,
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 12, padding: '12px 16px',
      fontFamily: T.fontBody, fontSize: 15,
      color: T.textPrimary,
      outline: 'none', transition: 'all .18s',
      caretColor: T.goldPrimary,
      marginBottom: 20,
      boxSizing: 'border-box',
    },
    btnPrimary: {
      width: '100%',
      background: T.goldGradient, color: T.textInverse,
      border: 'none', borderRadius: 12,
      fontFamily: T.fontBody,
      fontSize: 14, fontWeight: 600,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      padding: '15px 0', cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(196,154,46,.3)',
      transition: 'all .2s',
    },
    successBox: {
      background: 'rgba(34,197,94,.08)',
      border: '1px solid rgba(34,197,94,.2)',
      borderRadius: 12, padding: '14px 18px',
      fontSize: 14, color: '#86efac',
      textAlign: 'center', marginBottom: 16,
    },

    /* CTA */
    ctaSection: {
      background: T.bgCard,
      border: `1px solid ${T.borderDefault}`,
      borderRadius: 24,
      padding: '64px 48px', textAlign: 'center',
      marginBottom: 80, position: 'relative', overflow: 'hidden',
    },
    ctaGlow: {
      position: 'absolute', top: '-60%', left: '50%', transform: 'translateX(-50%)',
      width: 460, height: 380,
      background: 'radial-gradient(ellipse,rgba(196,154,46,.09) 0%,transparent 70%)',
      pointerEvents: 'none',
    },
    ctaTopLine: {
      position: 'absolute', top: 0, left: 0, right: 0, height: 1,
      background: T.goldGradient, opacity: .5,
    },
    ctaH2: {
      fontFamily: T.fontDisplay,
      fontSize: 'clamp(26px,4vw,44px)',
      fontWeight: 700, color: T.textPrimary, marginBottom: 14,
      position: 'relative',
    },
    ctaP: { fontSize: 16, fontWeight: 300, color: T.textSecondary, marginBottom: 32, position: 'relative' },
    btnOutline: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'transparent',
      border: `1px solid ${T.borderStrong}`,
      color: T.goldPale,
      padding: '14px 36px', borderRadius: 9999,
      fontFamily: T.fontBody,
      fontSize: 14, fontWeight: 500,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      textDecoration: 'none', cursor: 'pointer',
      transition: 'all .2s',
    },
  };

  return (
    <div style={s.page}>

      {/* ── TOP BAR ── */}
      <nav style={s.topBar}>
        <Link to="/" style={s.logo}>MSA Yathu</Link>
        <Link to="/" className="va-nav-back" style={s.navBack}>← Back to Home</Link>
      </nav>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroAccent} />
        <div style={s.wrap}>
          <div className="va-f1" style={{ marginBottom: 16 }}>
            <SectionLabel>About the Creator</SectionLabel>
          </div>
          <h1 className="va-f2" style={s.heroH1}>
            The Mind Behind<br /><GoldText>MSA Yathu</GoldText>
          </h1>
          <p className="va-f3" style={s.heroSub}>
            A Malawian developer on a mission to make student housing easier, safer, and more accessible for everyone.
          </p>
        </div>
      </section>

      <div style={{ padding: '72px 0' }}>
        <div style={s.wrap}>

          {/* ── PROFILE CARD ── */}
          <div className="va-f3 va-card" style={s.profileCard}>
            {/* Top gold accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: T.goldGradient, opacity: .5, zIndex: 1 }} />

            {/* Left panel */}
            <div style={s.profileLeft}>
              <div style={s.profileLeftGlow} />
              <div style={s.avatar}>👨‍💻</div>
              <div style={s.profileName}>Daniel Gaiva White</div>
              <div style={s.profileRole}>Founder & Full Stack Developer</div>
              <div style={s.tagRow}>
                {skills.map(sk => (
                  <span key={sk.label} className="va-tag" style={s.tag}>{sk.icon} {sk.label}</span>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div style={s.profileRight}>
              <h3 style={s.storyH3}>My Story</h3>
              <p style={s.storyP}>
                I'm Daniel Gaiva White, a passionate software developer from the University of Malawi who experienced firsthand the challenges students face when searching for accommodation near campus.
              </p>
              <p style={s.storyP}>
                The idea for this platform came during my own university search for housing. I realised that many students struggle to find safe, affordable, and convenient places to live, while landlords have difficulty reaching potential tenants.
              </p>
              <p style={s.storyP}>
                That's why I built MSA Yathu — to bridge this gap and make the housing search process easier, faster, and more reliable for everyone involved.
              </p>
              <div style={s.missionBox}>
                <div style={s.missionLabel}>Mission</div>
                <p style={s.missionText}>
                  To empower students across Malawi with easy access to quality accommodation options, and help landlords connect with responsible tenants.
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── VALUES ── */}
          <div className="va-f3" style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>What I Stand For</SectionLabel>
            <h2 style={s.heroH1}>Core Values</h2>
          </div>
          <div style={s.valuesGrid}>
            {values.map((v, i) => (
              <div key={v.title} className={`va-card va-f${i + 3}`} style={s.valueCard}>
                <div style={{ position: 'absolute', top: 0, left: 16, right: 16, height: 1, background: T.goldGradient, opacity: 0, transition: 'opacity .3s' }} />
                <div style={s.valueIcon}>{v.icon}</div>
                <h3 style={s.valueH3}>{v.title}</h3>
                <p style={s.valueP}>{v.desc}</p>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── CONTACT ── */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>Get In Touch</SectionLabel>
            <h2 style={{ ...s.heroH1, fontSize: 'clamp(26px,4vw,44px)' }}>Let's Talk</h2>
            <p style={{ ...s.heroSub, marginTop: 10 }}>Have a question, a property to list, or just want to say hello?</p>
          </div>

          <div style={s.contactGrid}>

            {/* Contact info */}
            <div className="va-f3" style={s.contactInfoCard}>
              <div style={s.contactInfoGlow} />
              <h3 style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 700, color: T.textPrimary, marginBottom: 28 }}>
                Contact Details
              </h3>
              {[
                { icon: '📧', label: 'Email',    value: 'Whitedaniel381@gmail.com' },
                { icon: '📱', label: 'Phone',    value: '0886 606 571' },
                { icon: '📍', label: 'Location', value: 'Zomba, UNIMA, Malawi' },
                { icon: '💬', label: 'WhatsApp', value: 'Available 24 / 7' },
              ].map((item, i) => (
                <div key={item.label} style={{ ...s.infoRow, borderBottom: i === 3 ? 'none' : `1px solid ${T.borderSubtle}` }}>
                  <div style={s.infoIcon}>{item.icon}</div>
                  <div>
                    <div style={s.infoLabel}>{item.label}</div>
                    <div style={s.infoValue}>{item.value}</div>
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
                <a
                  href="mailto:Whitedaniel381@gmail.com"
                  className="va-btn-primary"
                  style={{ ...s.btnPrimary, width: 'auto', padding: '12px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 10 }}
                >
                  📧 Send Email
                </a>
                <a
                  href="tel:0886606571"
                  className="va-btn-outline"
                  style={{ ...s.btnOutline, padding: '11px 22px', borderRadius: 10 }}
                >
                  📞 Call
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="va-f4" style={s.formCard}>
              <h3 style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 700, color: T.textPrimary, marginBottom: 28 }}>
                Send a Message
              </h3>

              {submitted && (
                <div style={s.successBox}>✓ Message sent — I'll get back to you soon!</div>
              )}

              <form onSubmit={handleSubmit}>
                <label style={s.formLabel}>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chisomo Banda"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="va-input"
                  style={s.formInput}
                />

                <label style={s.formLabel}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="va-input"
                  style={s.formInput}
                />

                <label style={s.formLabel}>Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="va-input"
                  style={{ ...s.formInput, resize: 'vertical', lineHeight: 1.6 }}
                />

                <button type="submit" className="va-btn-primary" style={s.btnPrimary}>
                  Send Message →
                </button>
              </form>
            </div>
          </div>

          <Divider />

          {/* ── CTA ── */}
          <div className="va-f4" style={s.ctaSection}>
            <div style={s.ctaGlow} />
            <div style={s.ctaTopLine} />
            <SectionLabel>Ready to Start?</SectionLabel>
            <h2 style={s.ctaH2}>Find Your Perfect Home</h2>
            <p style={s.ctaP}>Browse hundreds of verified student properties across Malawi — no agents, no hidden fees.</p>
            <Link to="/" className="va-btn-outline" style={s.btnOutline}>← Back to Listings</Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AboutPage;