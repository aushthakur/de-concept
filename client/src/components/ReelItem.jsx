import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  Info, 
  PhoneCall, 
  Share2, 
  Volume2, 
  VolumeX, 
  MapPin, 
  BedDouble, 
  Maximize2, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  Bath, 
  Compass, 
  ShieldCheck, 
  Check, 
  Play, 
  Pause, 
  Calculator, 
  Images, 
  Award,
  ChevronRight,
  Maximize
} from 'lucide-react';

export default function ReelItem({
  property,
  isActive,
  isMuted,
  onToggleMute,
  isWishlisted,
  onToggleWishlist,
  onOpenDetail,
  onOpenCallback,
  isMobile
}) {
  const videoRef = useRef(null);
  const [likesCount, setLikesCount] = useState(property.likesCount || 1280);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);

  // Auto-play / pause video when slide enters / leaves active viewport
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              if (videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current.play();
                setIsPlaying(true);
              }
            });
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  // Sync mute state with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleTogglePlay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowPlayOverlay(true);
    setTimeout(() => setShowPlayOverlay(false), 700);
  };

  const handleLike = (e) => {
    e?.stopPropagation();
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 800);

    if (!isWishlisted) {
      setLikesCount(prev => prev + 1);
    } else {
      setLikesCount(prev => Math.max(0, prev - 1));
    }
    onToggleWishlist(property);
  };

  const handleShareWhatsApp = (e) => {
    e?.stopPropagation();
    const text = encodeURIComponent(
      `🏡 Check out this luxury residence on LUMIÈRE:\n*${property.title}*\n📍 ${property.location.locality}, ${property.location.city}\n💰 Asking: ${property.priceFormatted} (${property.pricePerSqFt})\n✨ Specs: ${property.bhk} BHK • ${property.areaSqFt} sq.ft\n🔗 Explore here: ${window.location.origin}?prop=${property.id}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleFullscreenVideo = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  // Calculate estimated monthly EMI (approx 8.5% over 20 years = 0.86% factor per month)
  const estMonthlyEmi = Math.round((property.price * 0.0086) / 100000 * 10) / 10;

  // ==========================================
  // DESKTOP FULL-WIDTH HORIZONTAL SLIDER VIEW
  // ==========================================
  if (!isMobile) {
    return (
      <div className="reel-slide reel-card" id={`reel-slide-${property.id}`}>
        {/* Left Side: Pure White Master Estate Card */}
        <div className="reel-desktop-info-panel">
          <div>
            {/* Top Row: Location & Verified / Owner Badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: 'var(--accent-primary)',
                fontWeight: 700
              }}>
                <MapPin size={13} color="#2563eb" />
                <span>{property.location.locality}, {property.location.city}</span>
              </div>

              {property.isOwnerListing ? (
                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  color: '#1d4ed8',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <CheckCircle2 size={12} />
                  Direct Owner Listed
                </div>
              ) : (
                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  color: '#047857',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ShieldCheck size={12} />
                  Verified RERA Estate
                </div>
              )}
            </div>

            {/* Price Showcase with Estimated EMI Badge */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '2px' }}>
                Offered Price
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '34px',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}>
                  {property.priceFormatted}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  ({property.pricePerSqFt})
                </span>
              </div>

              {/* Estimated EMI Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                marginTop: '6px',
                background: '#f8fafc',
                border: '1px solid var(--border-subtle)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11px',
                color: 'var(--text-secondary)'
              }}>
                <Calculator size={12} color="#2563eb" />
                <span>Est. EMI: <strong style={{ color: 'var(--accent-primary)' }}>₹{estMonthlyEmi} L/mo*</strong></span>
              </div>
            </div>

            {/* Title & Poetic Architectural Tagline */}
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '23px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: '6px'
            }}>
              {property.title}
            </h2>

            <p style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              marginBottom: '16px'
            }}>
              {property.tagline}
            </p>

            {/* Core Specifications 4-Tile Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              marginBottom: '16px',
              background: 'var(--bg-secondary)',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BedDouble size={16} color="#2563eb" />
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Configuration</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-primary)' }}>{property.bhk} BHK Suite</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Maximize2 size={16} color="#2563eb" />
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Carpet Area</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-primary)' }}>{property.areaSqFt.toLocaleString()} sq.ft</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bath size={16} color="#2563eb" />
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Bathrooms</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-primary)' }}>{property.baths || property.bhk} Luxury Baths</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={16} color="#2563eb" />
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Availability</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#047857' }}>{property.status}</div>
                </div>
              </div>
            </div>

            {/* Signature Amenities */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '6px' }}>
                Signature Highlights
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                {(property.amenities || ['Private Infinity Pool', 'Sea View Terrace', 'Private Lift', 'Smart Home Automation']).slice(0, 4).map((am, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-primary)', fontWeight: 600 }}>
                    <span style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#eff6ff',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      flexShrink: 0
                    }}>✓</span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Photo Gallery Strip (Preview More Views) */}
            {property.images && property.images.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Architectural Views
                  </span>
                  <button 
                    onClick={() => onOpenDetail(property)}
                    style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                  >
                    <span>View Gallery</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {property.images.slice(0, 3).map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => onOpenDetail(property)}
                      style={{
                        flex: 1,
                        height: '52px',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <img 
                        src={img} 
                        alt="Property Preview" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Clusters (100% User Friendly & High Contrast) */}
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <button
                id={`btn-desktop-callback-${property.id}`}
                onClick={() => onOpenCallback(property)}
                className="btn-primary"
                style={{ flex: 1.1, justifyContent: 'center', padding: '12px 14px', fontSize: '13px' }}
              >
                <PhoneCall size={15} />
                <span>Get a Call Back</span>
              </button>

              <button
                id={`btn-desktop-knowmore-${property.id}`}
                onClick={() => onOpenDetail(property)}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center', padding: '12px 14px', fontSize: '13px' }}
              >
                <Info size={15} />
                <span>Deep Specs & Tour</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                id={`btn-desktop-whatsapp-${property.id}`}
                onClick={handleShareWhatsApp}
                className="btn-whatsapp"
                style={{ flex: 1, justifyContent: 'center', padding: '9px 12px', fontSize: '12px' }}
                title="Share Estate Brochure on WhatsApp"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Brochure</span>
              </button>

              <button
                id={`btn-desktop-wishlist-${property.id}`}
                onClick={handleLike}
                className={`btn-secondary ${isWishlisted ? 'active-heart' : ''}`}
                style={{
                  padding: '9px 14px',
                  fontSize: '12px',
                  color: isWishlisted ? '#f43f5e' : 'var(--text-secondary)',
                  borderColor: isWishlisted ? '#f43f5e' : 'var(--border-subtle)',
                  background: isWishlisted ? '#fff1f2' : 'var(--bg-secondary)',
                  gap: '6px'
                }}
                title="Save to Wishlist Portfolio"
              >
                <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Full-Height Cinematic Video Canvas (Zero Blank Area Left & Right) */}
        <div 
          className="reel-desktop-video-panel"
          onClick={handleTogglePlay}
          style={{ cursor: 'pointer' }}
        >
          <video
            ref={videoRef}
            src={property.reelVideo}
            poster={property.images[0]}
            loop
            muted={isMuted}
            playsInline
          />
          <div className="reel-desktop-video-overlay" />

          {/* Play / Pause Interactive Ripple Overlay */}
          {showPlayOverlay && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              zIndex: 25,
              pointerEvents: 'none',
              animation: 'floatUp 0.3s ease-out'
            }}>
              {isPlaying ? <Play size={32} fill="currentColor" /> : <Pause size={32} fill="currentColor" />}
            </div>
          )}

          {/* Top Left: 4K Ultra HDR Cinematic Badge */}
          <div style={{
            position: 'absolute',
            top: '24px',
            left: '28px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            fontWeight: 800,
            color: 'var(--accent-primary)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.12)',
            zIndex: 20
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }} className="live-pulse" />
            <span>LUMIÈRE 4K HDR • AERIAL TOUR</span>
          </div>

          {/* Top Right: Soundwave Toggle & Fullscreen Button */}
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 20
          }}>
            {/* Audio Toggle with Soundwave Animation */}
            <button
              id={`btn-desktop-mute-${property.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleMute();
              }}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                color: 'var(--accent-primary)',
                fontSize: '12px',
                fontWeight: 700,
                boxShadow: '0 4px 20px rgba(11, 28, 61, 0.15)'
              }}
              title="Toggle Cinematic Audio"
            >
              {isMuted ? (
                <>
                  <VolumeX size={16} />
                  <span>Audio Muted</span>
                </>
              ) : (
                <>
                  <Volume2 size={16} color="#2563eb" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '14px' }}>
                    <div className="soundwave-bar" />
                    <div className="soundwave-bar" />
                    <div className="soundwave-bar" />
                  </div>
                  <span>Sound Active</span>
                </>
              )}
            </button>

            {/* Native Fullscreen Expand Button */}
            <button
              id={`btn-desktop-fullscreen-${property.id}`}
              onClick={handleFullscreenVideo}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--accent-primary)',
                boxShadow: '0 4px 16px rgba(11, 28, 61, 0.12)'
              }}
              title="Full Video Mode"
            >
              <Maximize size={15} />
            </button>
          </div>

          {/* Bottom Floating Hint */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '28px',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '11px',
            fontWeight: 600,
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 10
          }}>
            <Sparkles size={13} />
            <span>Click Video to Pause/Play • Press ← → Arrow Keys to Slide</span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MOBILE VERTICAL REEL FORMAT (9:16 Viewport)
  // ==========================================
  return (
    <div className="reel-slide reel-card" id={`reel-slide-${property.id}`}>
      <div className="reel-mobile-view">
        {/* Fullscreen Video Background */}
        <video
          ref={videoRef}
          className="reel-video"
          src={property.reelVideo}
          poster={property.images[0]}
          loop
          muted={isMuted}
          playsInline
          onClick={handleTogglePlay}
        />

        <div className="reel-gradient-overlay" />

        {/* Top Badges: Location & Verification */}
        <div style={{
          position: 'absolute',
          top: '18px',
          left: '18px',
          right: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--accent-primary)',
            fontWeight: 700,
            boxShadow: '0 4px 14px rgba(11, 28, 61, 0.1)'
          }}>
            <MapPin size={13} color="#2563eb" />
            <span>{property.location.locality}, {property.location.city}</span>
          </div>

          {property.isOwnerListing ? (
            <div style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1d4ed8',
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 12px rgba(11, 28, 61, 0.08)'
            }}>
              <CheckCircle2 size={12} />
              Owner Listed
            </div>
          ) : (
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#047857',
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 12px rgba(11, 28, 61, 0.08)'
            }}>
              <ShieldCheck size={12} />
              Verified Estate
            </div>
          )}
        </div>

        {/* Heart Burst Animation */}
        {showHeartBurst && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 25,
            pointerEvents: 'none'
          }}>
            <Heart 
              size={110} 
              color="#f43f5e" 
              fill="#f43f5e" 
              className="heart-animated"
              style={{ filter: 'drop-shadow(0 0 25px rgba(244, 63, 94, 0.8))' }}
            />
          </div>
        )}

        {/* Right Floating Action Column */}
        <div className="reel-actions-column">
          {/* Wishlist Button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              id={`btn-reel-heart-${property.id}`}
              onClick={handleLike}
              className={`reel-action-btn ${isWishlisted ? 'active-heart' : ''}`}
              title="Add to Wishlist"
            >
              <Heart 
                size={20} 
                fill={isWishlisted ? 'currentColor' : 'none'} 
                strokeWidth={2.2}
              />
            </button>
            <span className="reel-action-label">
              {likesCount > 999 ? (likesCount / 1000).toFixed(1) + 'k' : likesCount}
            </span>
          </div>

          {/* WhatsApp Share Button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              id={`btn-reel-whatsapp-${property.id}`}
              onClick={handleShareWhatsApp}
              className="reel-action-btn"
              style={{ color: '#16a34a' }}
              title="Share Estate on WhatsApp"
            >
              <MessageCircle size={20} strokeWidth={2.4} />
            </button>
            <span className="reel-action-label">WhatsApp</span>
          </div>

          {/* Know More Specs Button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              id={`btn-reel-know-more-${property.id}`}
              onClick={() => onOpenDetail(property)}
              className="reel-action-btn"
              title="Deep Specs & EMI"
            >
              <Info size={20} strokeWidth={2.2} />
            </button>
            <span className="reel-action-label">Specs</span>
          </div>

          {/* Call Back Button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              id={`btn-reel-callback-${property.id}`}
              onClick={() => onOpenCallback(property)}
              className="reel-action-btn"
              style={{
                background: 'var(--accent-primary)',
                color: '#ffffff',
                boxShadow: '0 4px 18px rgba(11, 28, 61, 0.35)'
              }}
              title="Get a Call Back"
            >
              <PhoneCall size={18} strokeWidth={2.4} />
            </button>
            <span className="reel-action-label">Call Back</span>
          </div>

          {/* Sound Toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              id="btn-reel-sound-toggle"
              onClick={(e) => {
                e.stopPropagation();
                onToggleMute();
              }}
              className="reel-action-btn"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} color="#2563eb" />}
            </button>
            <span className="reel-action-label">{isMuted ? 'Muted' : 'Audio'}</span>
          </div>
        </div>

        {/* Reel Bottom Meta Overlay (Pure White Luxury Bottom Sheet) */}
        <div className="reel-meta-content">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                fontWeight: 800,
                color: 'var(--accent-primary)',
                letterSpacing: '-0.02em'
              }}>
                {property.priceFormatted}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px', fontWeight: 600 }}>
                ({property.pricePerSqFt})
              </span>
            </div>

            <div style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              background: '#f8fafc',
              border: '1px solid var(--border-subtle)',
              padding: '2px 7px',
              borderRadius: 'var(--radius-sm)'
            }}>
              EMI ~₹{estMonthlyEmi}L
            </div>
          </div>

          <h2 style={{
            fontSize: '16px',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            marginBottom: '4px'
          }}>
            {property.title}
          </h2>
          
          <p style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: 1.35,
            marginBottom: '10px',
            maxWidth: '100%',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {property.tagline}
          </p>

          {/* Spec Badges Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <span style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--accent-primary)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <BedDouble size={13} color="#2563eb" />
              {property.bhk} BHK
            </span>

            <span style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--accent-primary)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Maximize2 size={13} color="#2563eb" />
              {property.areaSqFt.toLocaleString()} sq.ft
            </span>

            <span style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1d4ed8',
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11px',
              fontWeight: 700
            }}>
              {property.status}
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              id={`btn-bottom-knowmore-${property.id}`}
              onClick={() => onOpenDetail(property)}
              className="btn-secondary"
              style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '9px 10px' }}
            >
              <Info size={14} />
              <span>Specs & EMI</span>
            </button>

            <button
              id={`btn-bottom-callback-${property.id}`}
              onClick={() => onOpenCallback(property)}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '9px 10px' }}
            >
              <PhoneCall size={14} />
              <span>Call Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
