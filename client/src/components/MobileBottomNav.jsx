import React from 'react';
import { Zap, LayoutGrid, PlusCircle, Heart, User } from 'lucide-react';

export default function MobileBottomNav({
  viewMode,
  setViewMode,
  onOpenListProperty,
  wishlistCount,
  onOpenWishlist,
  currentUser,
  onOpenAuth
}) {
  return (
    <nav className="hidden-desktop" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '64px',
      background: '#ffffff',
      borderTop: '1px solid rgba(15, 23, 42, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 50,
      boxShadow: '0 -4px 20px rgba(11, 28, 61, 0.08)'
    }}>
      {/* 1. Instants */}
      <button
        onClick={() => setViewMode('reels')}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: viewMode === 'reels' ? 'var(--accent-primary)' : 'var(--text-muted)',
          cursor: 'pointer',
          padding: '6px'
        }}
      >
        <Zap size={20} strokeWidth={viewMode === 'reels' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10px', fontWeight: viewMode === 'reels' ? 700 : 500 }}>Instants</span>
      </button>

      {/* 2. Inventory */}
      <button
        onClick={() => setViewMode('catalogue')}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: viewMode === 'catalogue' ? 'var(--accent-primary)' : 'var(--text-muted)',
          cursor: 'pointer',
          padding: '6px'
        }}
      >
        <LayoutGrid size={20} strokeWidth={viewMode === 'catalogue' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10px', fontWeight: viewMode === 'catalogue' ? 700 : 500 }}>Catalogue</span>
      </button>

      {/* 3. List Property (Center Highlight CTA) */}
      <button
        onClick={onOpenListProperty}
        style={{
          background: 'var(--accent-primary)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '50%',
          width: '46px',
          height: '46px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(11, 28, 61, 0.4)',
          transform: 'translateY(-10px)'
        }}
        title="List Inventory"
      >
        <PlusCircle size={26} strokeWidth={2.4} />
      </button>

      {/* 4. Wishlist */}
      <button
        onClick={onOpenWishlist}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '6px',
          position: 'relative'
        }}
      >
        <Heart size={20} />
        {wishlistCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '12px',
            background: 'var(--accent-rose)',
            color: '#fff',
            fontSize: '9px',
            fontWeight: 700,
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {wishlistCount}
          </span>
        )}
        <span style={{ fontSize: '10px', fontWeight: 500 }}>Saved</span>
      </button>

      {/* 5. Profile */}
      <button
        onClick={onOpenAuth}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: currentUser ? 'var(--accent-primary)' : 'var(--text-muted)',
          cursor: 'pointer',
          padding: '6px'
        }}
      >
        <User size={20} strokeWidth={currentUser ? 2.4 : 1.8} />
        <span style={{ fontSize: '10px', fontWeight: currentUser ? 700 : 500 }}>
          {currentUser ? 'Profile' : 'Sign In'}
        </span>
      </button>
    </nav>
  );
}
