import React, { useState } from 'react';
import { 
  Heart, 
  Zap, 
  Info, 
  PhoneCall, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2, 
  CheckCircle2,
  MessageCircle,
  Share2,
  Compass
} from 'lucide-react';

export default function PropertyCard({
  property,
  isWishlisted,
  onToggleWishlist,
  onOpenDetail,
  onOpenCallback,
  onWatchReel,
  isCompared,
  onToggleCompare
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleShareWhatsApp = (e) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `🏡 Check out this luxury residence on Oye Properties:\n*${property.title}*\n📍 ${property.location.locality}, ${property.location.city}\n💰 Asking: ${property.priceFormatted} (${property.pricePerSqFt})\n✨ Specs: ${property.bhk} BHK • ${property.areaSqFt} sq.ft\n🔗 View details: ${window.location.origin}?prop=${property.id}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div
      id={`property-card-${property.id}`}
      style={{
        background: '#ffffff',
        border: isHovered ? '1px solid var(--accent-primary)' : '1px solid var(--border-card)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Image with Badges */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(180px, 45vw, 240px)', overflow: 'hidden' }}>
        <img
          src={property.images[0]}
          alt={property.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'none'
          }}
        />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0) 45%, rgba(15,23,42,0.85) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          display: 'flex',
          gap: '6px'
        }}>
          {property.reelVideo && (
            <button
              id={`btn-card-watch-reel-${property.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onWatchReel(property);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: 'var(--accent-primary)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <Zap size={13} color="#2563eb" fill="#2563eb" />
              Watch Instant
            </button>
          )}

          {property.isOwnerListing && (
            <span style={{
              background: 'var(--accent-primary)',
              color: '#ffffff',
              padding: '6px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 700
            }}>
              Owner Listing
            </span>
          )}
        </div>

        {/* Wishlist & WhatsApp Buttons on Image */}
        <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', gap: '6px' }}>
          {/* WhatsApp Share */}
          <button
            onClick={handleShareWhatsApp}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              color: '#25d366',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
            title="Share via WhatsApp"
          >
            <MessageCircle size={17} />
          </button>

          {/* Wishlist */}
          <button
            id={`btn-card-heart-${property.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(property);
            }}
            style={{
              background: isWishlisted ? '#f43f5e' : 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              color: isWishlisted ? '#ffffff' : 'var(--text-secondary)',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={16} fill={isWishlisted ? '#ffffff' : 'none'} />
          </button>
        </div>

        {/* Bottom Image Info: Price Tag & Locality */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '14px',
          right: '14px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 800,
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)'
            }}>
              {property.priceFormatted}
            </div>
            <div style={{ fontSize: '11px', color: '#e2e8f0' }}>
              {property.pricePerSqFt}
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '11px',
            color: 'var(--accent-primary)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <MapPin size={12} color="#2563eb" />
            {property.location.locality}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: 'clamp(12px, 4vw, 18px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2563eb', fontWeight: 700 }}>
            {property.propertyType}
          </span>
          {property.verified && (
            <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700 }}>
              <CheckCircle2 size={12} /> Verified
            </span>
          )}
        </div>

        <h3 style={{
          fontSize: '16px',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1.3,
          marginBottom: '6px',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {property.title}
        </h3>

        <p style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          lineHeight: 1.4,
          marginBottom: '14px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {property.tagline}
        </p>

        {/* Specs Icons Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '8px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <BedDouble size={14} color="var(--accent-primary)" />
            <span style={{ fontWeight: 600 }}>{property.bhk} BHK</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <Bath size={14} color="var(--accent-primary)" />
            <span style={{ fontWeight: 600 }}>{property.baths} Baths</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <Maximize2 size={14} color="var(--accent-primary)" />
            <span style={{ fontWeight: 600 }}>{property.carpetAreaSqFt} sqft</span>
          </div>
        </div>

        {/* Availability & Facing Tags Row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '14px'
        }}>
          {/* Availability / Status */}
          <span style={{
            background: 'rgba(5, 150, 105, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.25)',
            color: '#047857',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            ✓ {property.status}
          </span>

          {/* Direction Facing */}
          {property.facing && (
            <span style={{
              background: 'rgba(217, 119, 6, 0.08)',
              border: '1px solid rgba(217, 119, 6, 0.22)',
              color: '#b45309',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Compass size={11} />
              {property.facing}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            color: isCompared ? 'var(--accent-primary)' : 'var(--text-muted)',
            cursor: 'pointer',
            userSelect: 'none',
            fontWeight: 600
          }}>
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onToggleCompare(property)}
              style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
            />
            <span>Compare specs</span>
          </label>

          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            By {property.builder.name}
          </span>
        </div>

        {/* Action Buttons: Dark Blue Primary + Clean White Secondary */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button
            id={`btn-card-know-more-${property.id}`}
            onClick={() => onOpenDetail(property)}
            className="btn-secondary"
            style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '10px 8px', minHeight: '42px' }}
          >
            <Info size={14} />
            Know More
          </button>

          <button
            id={`btn-card-callback-${property.id}`}
            onClick={() => onOpenCallback(property)}
            className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '10px 8px', minHeight: '42px' }}
          >
            <PhoneCall size={14} />
            Call Back
          </button>
        </div>
      </div>
    </div>
  );
}
