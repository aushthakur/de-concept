import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Clapperboard, 
  LayoutGrid, 
  Compass,
  ArrowRight
} from 'lucide-react';
import ReelItem from './ReelItem';

export default function ReelCatalogue({
  reels,
  currentCity,
  onSelectCity,
  wishlist,
  onToggleWishlist,
  onOpenDetail,
  onOpenCallback,
  onSwitchToCatalogue
}) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  // Detect Mobile vs Desktop Screen Breakpoint
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync Active Slide via Intersection Observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll('.reel-slide');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = Array.from(slides).indexOf(entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.5
      }
    );

    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [reels, isMobile]);

  // Robust Scroll To Index Helper
  const scrollToIndex = (index) => {
    if (!containerRef.current || index < 0 || index >= reels.length) return;
    const container = containerRef.current;
    const slides = container.querySelectorAll('.reel-slide');
    const targetSlide = slides[index];
    if (targetSlide) {
      if (isMobile) {
        container.scrollTo({
          top: targetSlide.offsetTop,
          behavior: 'smooth'
        });
      } else {
        container.scrollTo({
          left: targetSlide.offsetLeft,
          behavior: 'smooth'
        });
      }
      setActiveIndex(index);
    }
  };

  const scrollNext = () => {
    if (activeIndex < reels.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  const scrollPrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  // Keyboard Navigation: Arrow Keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, reels.length, isMobile]);

  // Mouse Wheel / Trackpad sideways navigation on Desktop
  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let wheelTimeout = null;

    const handleWheel = (e) => {
      // Ignore if user is hovering inside the scrollable master info panel
      if (e.target.closest('.reel-desktop-info-panel')) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 25) return;

      if (!isScrolling) {
        if (delta > 0) {
          scrollNext();
        } else {
          scrollPrev();
        }
        isScrolling = true;
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          isScrolling = false;
        }, 400);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [activeIndex, reels.length, isMobile]);

  // Touch Swipe Gesture Support (Horizontal on desktop/tablets, vertical on mobile)
  const touchStartPos = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartPos.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartPos.current.y;

    if (!isMobile) {
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          scrollNext();
        } else {
          scrollPrev();
        }
      }
    }
  };

  const cityTabs = ['All Cities', 'Mumbai', 'Delhi NCR', 'Dubai', 'Goa', 'Bangalore', 'Hyderabad'];
  const nextProperty = activeIndex < reels.length - 1 ? reels[activeIndex + 1] : null;

  return (
    <div className="reels-wrapper">
      {/* Floating City Filter Bar */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: isMobile ? '50%' : 'calc(480px + 32px)',
        transform: isMobile ? 'translateX(-50%)' : 'none',
        zIndex: 35,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '5px 8px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 20px rgba(11, 28, 61, 0.12)',
        maxWidth: isMobile ? '92vw' : 'calc(100vw - 540px)',
        overflowX: 'auto',
        scrollbarWidth: 'none'
      }}>
        {cityTabs.map(c => {
          const isSelected = (currentCity === c) || (currentCity === 'all' && c === 'All Cities');
          return (
            <button
              key={c}
              onClick={() => onSelectCity(c === 'All Cities' ? 'all' : c)}
              style={{
                background: isSelected ? 'var(--accent-primary)' : 'transparent',
                color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Main Reels Slider / Reel Viewport Container */}
      <div 
        ref={containerRef} 
        className="reels-main-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {reels.length === 0 ? (
          <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            padding: '24px',
            textAlign: 'center',
            background: '#ffffff'
          }}>
            <Sparkles size={44} color="var(--accent-primary)" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '20px', fontWeight: 800 }}>
              No Video Reels in {currentCity}
            </h3>
            <p style={{ fontSize: '13px', marginBottom: '20px', maxWidth: '420px', lineHeight: 1.5 }}>
              Try selecting "All Cities" to view prime properties in Mumbai, Delhi NCR, Dubai, and Goa.
            </p>
            <button onClick={() => onSelectCity('all')} className="btn-primary">
              Show All Reels
            </button>
          </div>
        ) : (
          reels.map((prop, idx) => (
            <ReelItem
              key={prop.id}
              property={prop}
              isActive={idx === activeIndex}
              isMuted={isMuted}
              onToggleMute={() => setIsMuted(!isMuted)}
              isWishlisted={wishlist.some(item => item.id === prop.id)}
              onToggleWishlist={onToggleWishlist}
              onOpenDetail={onOpenDetail}
              onOpenCallback={onOpenCallback}
              isMobile={isMobile}
            />
          ))
        )}
      </div>

      {/* Desktop Horizontal Floating Arrow: Previous */}
      {!isMobile && reels.length > 1 && (
        <button
          id="btn-reel-slider-prev"
          className="slider-arrow-btn prev"
          onClick={scrollPrev}
          disabled={activeIndex === 0}
          title="Previous Luxury Estate (Arrow Left)"
        >
          <ChevronLeft size={26} strokeWidth={2.4} />
        </button>
      )}

      {/* Desktop Horizontal Floating Arrow: Next */}
      {!isMobile && reels.length > 1 && (
        <button
          id="btn-reel-slider-next"
          className="slider-arrow-btn next"
          onClick={scrollNext}
          disabled={activeIndex >= reels.length - 1}
          title="Next Luxury Estate (Arrow Right)"
        >
          <ChevronRight size={26} strokeWidth={2.4} />
        </button>
      )}

      {/* Desktop Bottom Slider Dock */}
      {!isMobile && reels.length > 0 && (
        <div className="reels-slider-dock">
          {/* Active Slide Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 800,
              color: 'var(--accent-primary)',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>/</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>
                {String(reels.length).padStart(2, '0')}
              </span>
            </div>

            {/* Clickable Progress Dashes */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '6px' }}>
              {reels.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  style={{
                    height: '5px',
                    width: i === activeIndex ? '28px' : '10px',
                    borderRadius: 'var(--radius-full)',
                    background: i === activeIndex ? 'var(--accent-primary)' : 'var(--border-subtle)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  title={`Jump to Estate #${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Center Next Property Teaser */}
          {nextProperty && (
            <div 
              onClick={scrollNext}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                transition: 'background 0.2s ease'
              }}
              title="Click to view next property"
            >
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Up Next:</span>
              <span style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 700, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {nextProperty.title}
              </span>
              <ArrowRight size={13} color="var(--accent-primary)" />
            </div>
          )}

          {/* Right: Switch to Catalogue Grid */}
          <button
            onClick={onSwitchToCatalogue}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--accent-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <LayoutGrid size={14} />
            <span>Full Inventory Grid ({reels.length})</span>
          </button>
        </div>
      )}
    </div>
  );
}
