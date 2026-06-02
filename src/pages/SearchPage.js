import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';

/* ─── Inject fonts once ─── */
if (!document.getElementById('verdant-fonts')) {
  const link = document.createElement('link');
  link.id = 'verdant-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap';
  document.head.appendChild(link);
}

/* ─── Inject keyframes & hover utilities once ─── */
if (!document.getElementById('verdant-search-styles')) {
  const s = document.createElement('style');
  s.id = 'verdant-search-styles';
  s.textContent = `
    @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
    @keyframes spin    { to{transform:rotate(360deg)} }
    @keyframes pulseGold {
      0%,100%{opacity:1;transform:scale(1);box-shadow:0 0 0 0 rgba(255,215,0,.45)}
      50%    {opacity:.85;transform:scale(1.1);box-shadow:0 0 0 7px rgba(255,215,0,0)}
    }
    @keyframes shimmer {
      0%  {background-position:-700px 0}
      100%{background-position: 700px 0}
    }

    .vs-f1{animation:fadeUp .55s cubic-bezier(.16,1,.3,1) .05s both}
    .vs-f2{animation:fadeUp .55s cubic-bezier(.16,1,.3,1) .14s both}
    .vs-f3{animation:fadeUp .55s cubic-bezier(.16,1,.3,1) .23s both}
    .vs-f4{animation:fadeUp .55s cubic-bezier(.16,1,.3,1) .32s both}

    .vs-input:hover  { border-color:rgba(255,215,0,.3)!important; }
    .vs-input:focus  { border-color:rgba(255,215,0,.55)!important; box-shadow:0 0 0 3px rgba(255,215,0,.1)!important; background:#1A1A1A!important; outline:none; }

    .vs-btn:hover    { filter:brightness(1.09); box-shadow:0 8px 28px rgba(255,215,0,.42)!important; transform:translateY(-2px); }
    .vs-btn:active   { transform:translateY(0); filter:brightness(1); }

    .vs-clear:hover  { background:rgba(255,215,0,.1)!important; border-color:rgba(255,215,0,.35)!important; color:#FFD700!important; }

    .vs-chip:hover   { background:rgba(255,215,0,.18)!important; border-color:rgba(255,215,0,.5)!important; color:#FFD700!important; cursor:pointer; }
    .vs-chip-active  { background:rgba(255,215,0,.18)!important; border-color:rgba(255,215,0,.5)!important; color:#FFD700!important; }

    .vs-card-empty:hover { border-color:rgba(255,215,0,.3)!important; }

    .vs-spinner {
      width:44px; height:44px; border-radius:50%;
      border:2.5px solid rgba(255,215,0,.15);
      border-top-color:#FFD700;
      animation:spin .85s linear infinite;
    }

    .vs-skeleton {
      background: linear-gradient(90deg, #111111 25%, #1A1A1A 50%, #111111 75%);
      background-size:700px 100%;
      animation:shimmer 1.5s ease-in-out infinite;
      border-radius:12px;
    }

    ::-webkit-scrollbar{ width:7px; }
    ::-webkit-scrollbar-track{ background:#000000; }
    ::-webkit-scrollbar-thumb{ background:#FFD700; border-radius:8px; }
    ::-webkit-scrollbar-thumb:hover{ background:#FFC107; }
  `;
  document.head.appendChild(s);
}

/* ─── Black Background Theme Design Tokens (matching homepage) ─── */
const T = {
  goldGradient:  'linear-gradient(135deg, #FFD700 0%, #FFC107 50%, #FFB300 100%)',
  goldPrimary:   '#FFD700',
  goldPale:      '#FFE082',
  textPrimary:   '#FFFFFF',
  textSecondary: '#E0E0E0',
  textMuted:     '#A0A0A0',
  textInverse:   '#000000',
  bgPrimary:     '#000000',
  bgCard:        '#0A0A0A',
  bgElevated:    '#111111',
  forestDeep:    '#0A0A0A',
  borderSubtle:  'rgba(255,215,0,.1)',
  borderDefault: 'rgba(255,215,0,.15)',
  borderStrong:  'rgba(255,215,0,.3)',
  shadowGold:    '0 0 28px rgba(255,215,0,.16),0 8px 24px rgba(0,0,0,.4)',
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
    padding: '5px 16px',
    border: `1px solid ${T.borderDefault}`,
    borderRadius: 9999, background: 'rgba(255,215,0,.06)',
    marginBottom: 16,
  }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.goldPrimary, animation: 'pulseGold 2.4s ease-in-out infinite', display: 'inline-block' }} />
    <span style={{ fontFamily: T.fontBody, fontSize: 11, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: T.goldPrimary }}>
      {children}
    </span>
  </div>
);

/* ─── Room type chips data ─── */
const ROOM_TYPES = [
  { value: '',          label: 'All Types' },
  { value: 'single',   label: 'Single Room' },
  { value: 'shared',   label: 'Shared Room' },
  { value: 'apartment',label: 'Apartment' },
  { value: 'studio',   label: 'Studio' },
];

/* ─── Skeleton card ─── */
const SkeletonCard = () => (
  <div style={{ background: T.bgCard, border: `1px solid ${T.borderSubtle}`, borderRadius: 20, overflow: 'hidden' }}>
    <div className="vs-skeleton" style={{ height: 200 }} />
    <div style={{ padding: 24 }}>
      <div className="vs-skeleton" style={{ height: 20, marginBottom: 12, width: '70%' }} />
      <div className="vs-skeleton" style={{ height: 14, marginBottom: 8, width: '50%' }} />
      <div className="vs-skeleton" style={{ height: 14, marginBottom: 20, width: '40%' }} />
      <div className="vs-skeleton" style={{ height: 36, width: '60%' }} />
    </div>
  </div>
);

/* ─── Main Component ─── */
const SearchPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultCount, setResultCount] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    roomType: '',
    location: '',
  });

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchListings = async (overrideFilters) => {
    setLoading(true);
    try {
      const active = overrideFilters ?? filters;
      const params = new URLSearchParams();
      if (active.minPrice)  params.append('minPrice',  active.minPrice);
      if (active.maxPrice)  params.append('maxPrice',  active.maxPrice);
      if (active.roomType)  params.append('roomType',  active.roomType);
      if (active.location)  params.append('location',  active.location);

const { data } = await axios.get(`https://msa-yathu-api.onrender.com/api/listings?${params}`);
      setListings(data);
      setResultCount(data.length);
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoomType = (value) => {
    const next = { ...filters, roomType: value };
    setFilters(next);
    fetchListings(next);
  };

  const applyFilters = () => fetchListings();

  const clearFilters = () => {
    const reset = { minPrice: '', maxPrice: '', roomType: '', location: '' };
    setFilters(reset);
    fetchListings(reset);
  };

  const hasActiveFilters = filters.minPrice || filters.maxPrice || filters.roomType || filters.location;

  /* ── Styles ── */
  const s = {
    page: { fontFamily: T.fontBody, background: T.bgPrimary, color: T.textPrimary, minHeight: '100vh' },
    wrap: { maxWidth: 1240, margin: '0 auto', padding: '0 28px' },

    /* Nav */
    nav: {
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(0,0,0,.95)',
      backdropFilter: 'blur(16px) saturate(1.8)',
      WebkitBackdropFilter: 'blur(16px) saturate(1.8)',
      borderBottom: `1px solid ${T.borderSubtle}`,
    },
    navInner: {
      maxWidth: 1240, margin: '0 auto', padding: '0 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 64,
    },
    logo: {
      fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 700,
      background: T.goldGradient,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      textDecoration: 'none',
    },
    navResult: {
      fontSize: 13, color: T.textMuted, fontWeight: 500,
    },

    /* Hero */
    pageHero: {
      padding: '56px 0 48px',
      background: `radial-gradient(ellipse 70% 50% at 50% 0%,rgba(255,215,0,.05) 0%,transparent 72%)`,
      borderBottom: `1px solid ${T.borderSubtle}`,
      marginBottom: 48,
    },
    heroH1: {
      fontFamily: T.fontDisplay,
      fontSize: 'clamp(34px,5vw,58px)',
      fontWeight: 700, lineHeight: 1.08,
      letterSpacing: '-0.03em',
      color: T.textPrimary, marginBottom: 10,
    },
    heroSub: {
      fontSize: 16, fontWeight: 300, color: T.textSecondary,
    },

    /* Layout */
    layout: { display: 'grid', gridTemplateColumns: '300px 1fr', gap: 36, alignItems: 'start' },

    /* Filter sidebar */
    sidebar: {
      background: T.bgCard,
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 20,
      overflow: 'hidden',
      position: 'sticky', top: 80,
    },
    sidebarHeader: {
      padding: '22px 24px',
      borderBottom: `1px solid ${T.borderSubtle}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: `linear-gradient(135deg,rgba(255,215,0,.06) 0%,transparent 100%)`,
      position: 'relative',
    },
    sidebarTopLine: {
      position: 'absolute', top: 0, left: 0, right: 0, height: 1,
      background: T.goldGradient, opacity: .5,
    },
    sidebarTitle: {
      fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 700,
      color: T.textPrimary,
    },
    clearBtn: {
      fontSize: 11, fontWeight: 600,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      color: T.textMuted,
      background: 'transparent',
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 8, padding: '5px 12px', cursor: 'pointer',
      transition: 'all .18s',
    },
    sidebarBody: { padding: '24px' },

    filterGroup: { marginBottom: 28 },
    filterLabel: {
      display: 'block', fontSize: 11, fontWeight: 600,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: T.textMuted, marginBottom: 10,
    },
    filterInput: {
      width: '100%',
      background: T.bgElevated,
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 10, padding: '11px 14px',
      fontFamily: T.fontBody, fontSize: 14,
      color: T.textPrimary,
      outline: 'none', transition: 'all .18s',
      caretColor: T.goldPrimary,
      boxSizing: 'border-box',
    },
    priceRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },

    /* Room type chips */
    chipsWrap: { display: 'flex', flexWrap: 'wrap', gap: 8 },
    chip: {
      padding: '7px 14px',
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 9999,
      background: 'rgba(255,215,0,.04)',
      fontSize: 12, fontWeight: 500,
      color: T.textSecondary,
      cursor: 'pointer',
      transition: 'all .15s',
      userSelect: 'none',
    },

    applyBtn: {
      width: '100%',
      background: T.goldGradient, color: T.textInverse,
      border: 'none', borderRadius: 12,
      fontFamily: T.fontBody,
      fontSize: 13, fontWeight: 600,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      padding: '14px 0', cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(255,215,0,.3)',
      transition: 'all .2s',
      marginTop: 4,
    },

    /* Results */
    resultsHeader: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 28,
    },
    resultsMeta: {
      fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 700,
      color: T.textPrimary,
    },
    resultsCount: {
      fontSize: 13, fontWeight: 500, color: T.textMuted,
      background: T.bgElevated,
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 9999, padding: '5px 14px',
    },

    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24 },

    /* Empty state */
    empty: {
      background: T.bgCard,
      border: `1px solid ${T.borderSubtle}`,
      borderRadius: 20,
      padding: '80px 40px',
      textAlign: 'center',
      gridColumn: '1 / -1',
    },
    emptyIcon: { fontSize: 48, marginBottom: 20, display: 'block' },
    emptyH3: {
      fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 700,
      color: T.textPrimary, marginBottom: 10,
    },
    emptyP: { fontSize: 15, color: T.textMuted, lineHeight: 1.7, marginBottom: 28 },
  };

  return (
    <div style={s.page}>

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <a href="/" style={s.logo}>MSA Yathu</a>
          {resultCount !== null && !loading && (
            <span style={s.navResult}>
              {resultCount} {resultCount === 1 ? 'property' : 'properties'} found
            </span>
          )}
        </div>
      </nav>

      {/* ── PAGE HERO ── */}
      <div style={s.pageHero}>
        <div style={s.wrap}>
          <div className="vs-f1" style={{ marginBottom: 12 }}>
            <SectionLabel>Browse Listings</SectionLabel>
          </div>
          <h1 className="vs-f2" style={s.heroH1}>
            Find Your <GoldText>Perfect Accommodation</GoldText>
          </h1>
          <p className="vs-f3" style={s.heroSub}>
            Filter by price, room type, and location to discover the right fit for you.
          </p>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ ...s.wrap, paddingBottom: 80 }}>
        <div style={s.layout}>

          {/* ── SIDEBAR ── */}
          <aside className="vs-f3" style={s.sidebar}>
            <div style={s.sidebarHeader}>
              <div style={s.sidebarTopLine} />
              <span style={s.sidebarTitle}>Filters</span>
              {hasActiveFilters && (
                <button className="vs-clear" style={s.clearBtn} onClick={clearFilters}>
                  Clear all
                </button>
              )}
            </div>

            <div style={s.sidebarBody}>

              {/* Price range */}
              <div style={s.filterGroup}>
                <label style={s.filterLabel}>Price Range (MK)</label>
                <div style={s.priceRow}>
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="vs-input"
                    style={s.filterInput}
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="vs-input"
                    style={s.filterInput}
                  />
                </div>
              </div>

              {/* Room type chips */}
              <div style={s.filterGroup}>
                <label style={s.filterLabel}>Room Type</label>
                <div style={s.chipsWrap}>
                  {ROOM_TYPES.map(rt => (
                    <span
                      key={rt.value}
                      className={`vs-chip ${filters.roomType === rt.value ? 'vs-chip-active' : ''}`}
                      style={s.chip}
                      onClick={() => handleRoomType(rt.value)}
                    >
                      {rt.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div style={s.filterGroup}>
                <label style={s.filterLabel}>Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Zomba, Blantyre…"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="vs-input"
                  style={s.filterInput}
                />
              </div>

              {/* Apply */}
              <button className="vs-btn" style={s.applyBtn} onClick={applyFilters}>
                Search Properties →
              </button>

            </div>
          </aside>

          {/* ── RESULTS ── */}
          <div>
            <div style={s.resultsHeader}>
              <span style={s.resultsMeta}>
                {loading
                  ? 'Searching…'
                  : resultCount === null
                    ? 'All Properties'
                    : <><GoldText>{resultCount}</GoldText> {resultCount === 1 ? 'Property' : 'Properties'} Found</>
                }
              </span>
              {hasActiveFilters && !loading && (
                <span style={s.resultsCount}>Filtered results</span>
              )}
            </div>

            {loading ? (
              <div style={s.grid}>
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : listings.length === 0 ? (
              <div style={s.empty}>
                <span style={s.emptyIcon}>🏠</span>
                <h3 style={s.emptyH3}>No Properties Found</h3>
                <p style={s.emptyP}>
                  We couldn't find any accommodations matching your filters.<br />
                  Try widening your search or clearing the filters.
                </p>
                <button
                  className="vs-clear"
                  style={{ ...s.clearBtn, padding: '11px 28px', fontSize: 13 }}
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="vs-f4" style={s.grid}>
                {listings.map(listing => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default SearchPage;