import React, { useState } from 'react';
import { 
  Zap, 
  LayoutGrid, 
  MapPin, 
  Heart, 
  Sparkles,
  Search,
  ChevronDown,
  PlusCircle,
  User,
  Share2,
  RotateCw,
  LogOut,
  Compass,
  Building,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import OyeLogo from './OyeLogo';

export default function Navbar({
  currentCity,
  onSelectCity,
  onOpenLocationModal,
  viewMode,
  setViewMode,
  wishlistCount,
  onOpenWishlist,
  onOpenAISearch,
  onOpenListProperty,
  currentUser,
  onOpenAuth,
  onLogout,
  onDetectGPS,
  isDetectingGPS
}) {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🌟 Explore Oye Properties — India & Dubai's premier luxury real estate catalogue and vertical video reel portal:\n${window.location.origin}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <header className="navbar-header">
      {/* Left: Brand Logo & Desktop Dropdowns */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setViewMode('reels')}
          style={{ cursor: 'pointer' }}
        >
          <OyeLogo />
        </div>

        {/* Dropdown 1: Explore Menu (Desktop Only) */}
        <div 
          style={{ position: 'relative' }} 
          className="hidden-mobile"
          onMouseEnter={() => setExploreOpen(true)}
          onMouseLeave={() => setExploreOpen(false)}
        >
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Explore Markets <ChevronDown size={14} />
          </button>

          {exploreOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '240px',
              background: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '12px',
              zIndex: 60
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
                Prime Markets
              </div>
              {['All Cities', 'Mumbai', 'Delhi NCR', 'Dubai', 'Goa', 'Bangalore', 'Hyderabad'].map(c => (
                <div
                  key={c}
                  onClick={() => {
                    onSelectCity(c === 'All Cities' ? 'all' : c);
                    setExploreOpen(false);
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: currentCity === c ? 700 : 500,
                    color: currentCity === c ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    background: currentCity === c ? 'var(--bg-secondary)' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => {
                    if (currentCity !== c) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span>{c}</span>
                  {currentCity === c && <CheckCircle2 size={13} color="var(--accent-primary)" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown 2: Services Menu (Desktop Only) */}
        <div 
          style={{ position: 'relative' }} 
          className="hidden-mobile"
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Services <ChevronDown size={14} />
          </button>

          {servicesOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '260px',
              background: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '12px',
              zIndex: 60
            }}>
              <div 
                onClick={() => { setViewMode('catalogue'); setServicesOpen(false); }}
                style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Full Inventory Portfolio</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Browse 16+ luxury penthouses & estates</div>
              </div>

              <div 
                onClick={() => { onOpenAISearch(); setServicesOpen(false); }}
                style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>AI Vibe Search</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Find residences matching your lifestyle</div>
              </div>

              <div 
                onClick={() => { onOpenListProperty(); setServicesOpen(false); }}
                style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-primary)' }}>List Your Estate</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Direct owner & broker listing engine</div>
              </div>
            </div>
          )}
        </div>

        {/* Real-time GPS Location Fetcher (Desktop Only) */}
        <div 
          className="hidden-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '4px 6px 4px 12px'
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent-emerald)'
          }} className="live-pulse" />
          <button
            onClick={onOpenLocationModal}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 4px'
            }}
          >
            <MapPin size={13} color="#2563eb" />
            <span>{currentCity || 'Mumbai'}</span>
          </button>
          
          <button
            onClick={onDetectGPS}
            disabled={isDetectingGPS}
            style={{
              background: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
            title="Real-time GPS Location Fetch"
          >
            <RotateCw size={11} className={isDetectingGPS ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Center: View Switcher (Desktop Only) */}
      <div 
        className="hidden-mobile"
        style={{
          background: 'var(--bg-secondary)',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <button
          id="view-mode-reels"
          onClick={() => setViewMode('reels')}
          style={{
            background: viewMode === 'reels' ? 'var(--accent-primary)' : 'transparent',
            color: viewMode === 'reels' ? '#ffffff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '13px',
            padding: '7px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            boxShadow: viewMode === 'reels' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          <Zap size={15} />
          Instants
        </button>

        <button
          id="view-mode-catalogue"
          onClick={() => setViewMode('catalogue')}
          style={{
            background: viewMode === 'catalogue' ? 'var(--accent-primary)' : 'transparent',
            color: viewMode === 'catalogue' ? '#ffffff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '13px',
            padding: '7px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            boxShadow: viewMode === 'catalogue' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          <LayoutGrid size={15} />
          Massive Inventory
        </button>
      </div>

      {/* Right: Actions Cluster (Zero Overflow on Mobile) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Search Icon Button (Opens Search Modal) */}
        <button
          id="btn-navbar-search"
          onClick={onOpenAISearch}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
          title="Search Properties, Vibes & Locations"
        >
          <Search size={16} />
        </button>

        {/* Mobile-Only Compact City Switcher Badge */}
        <button
          onClick={onOpenLocationModal}
          className="hidden-desktop"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '5px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--accent-primary)',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
          title="Change City"
        >
          <MapPin size={12} color="#2563eb" />
          <span style={{ maxWidth: '75px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentCity === 'all' ? 'All Cities' : currentCity || 'Mumbai'}
          </span>
        </button>

        {/* WhatsApp Share Button */}
        <button
          onClick={handleShareWhatsApp}
          className="btn-whatsapp"
          style={{ fontSize: '12px', padding: '7px 12px' }}
          title="Share Portal on WhatsApp"
        >
          <Share2 size={13} />
          <span className="hidden-mobile">WhatsApp</span>
        </button>

        {/* AI Vibe Search Trigger (Desktop Only) */}
        <button
          id="btn-ai-search-trigger"
          onClick={onOpenAISearch}
          className="btn-secondary hidden-mobile"
          style={{ fontSize: '12px', padding: '7px 14px' }}
        >
          <Sparkles size={14} color="#2563eb" />
          <span>AI Vibe Search</span>
        </button>

        {/* Wishlist Pill (Desktop Only — on mobile, it's in bottom bar) */}
        <button
          id="btn-wishlist-trigger"
          onClick={onOpenWishlist}
          className="hidden-mobile"
          style={{
            background: wishlistCount > 0 ? 'rgba(225, 29, 72, 0.08)' : 'var(--bg-secondary)',
            color: wishlistCount > 0 ? 'var(--accent-rose)' : 'var(--text-secondary)',
            border: wishlistCount > 0 ? '1px solid rgba(225, 29, 72, 0.3)' : '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '7px 14px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Heart size={14} fill={wishlistCount > 0 ? 'currentColor' : 'none'} />
          <span>Wishlist</span>
          <span>({wishlistCount})</span>
        </button>

        {/* List Property CTA (Desktop Only — on mobile, it's the center + button in bottom bar) */}
        <button
          id="btn-navbar-list-property"
          onClick={onOpenListProperty}
          className="btn-primary hidden-mobile"
          style={{ fontSize: '12px', padding: '8px 16px' }}
        >
          <PlusCircle size={15} />
          <span>List Inventory</span>
        </button>

        {/* Profile / Auth Button (Desktop Only — on mobile, it's in bottom bar) */}
        <div style={{ position: 'relative' }} className="hidden-mobile">
          {currentUser ? (
            <div>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 12px 4px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    {currentUser.name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown size={12} color="var(--text-muted)" />
              </button>

              {profileMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: '200px',
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '8px',
                  marginTop: '6px',
                  zIndex: 60
                }}>
                  <div 
                    onClick={() => { onOpenListProperty(); setProfileMenuOpen(false); }}
                    style={{ padding: '8px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: 'var(--text-primary)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    + Add New Property
                  </div>
                  <div 
                    onClick={() => { onLogout(); setProfileMenuOpen(false); }}
                    style={{ padding: '8px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={13} />
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              id="btn-navbar-auth"
              onClick={onOpenAuth}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '7px 14px' }}
            >
              <User size={14} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
