import React, { useState, useEffect } from 'react';
import { API_BASE } from './config';
import Navbar from './components/Navbar';
import LocationDetectorModal from './components/LocationDetectorModal';
import ReelCatalogue from './components/ReelCatalogue';
import PropertyGrid from './components/PropertyGrid';
import PropertyDetailModal from './components/PropertyDetailModal';
import CallbackModal from './components/CallbackModal';
import CompareDrawer from './components/CompareDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AIVibeSearchBar from './components/AIVibeSearchBar';
import AuthModal from './components/AuthModal';
import ListPropertyModal from './components/ListPropertyModal';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  const [viewMode, setViewMode] = useState('reels'); // 'reels' or 'catalogue'
  const [currentCity, setCurrentCity] = useState('Mumbai');
  const [detectedLocation, setDetectedLocation] = useState(null);
  const [isDetectingGPS, setIsDetectingGPS] = useState(false);

  // User Profile & Authentication
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lumiere_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [authRedirectReason, setAuthRedirectReason] = useState('');

  // Properties Data
  const [properties, setProperties] = useState([]);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [filters, setFilters] = useState({
    search: '',
    bhk: 'all',
    propertyType: 'all',
    maxPrice: 650000000,
    sort: 'popular'
  });

  // Wishlist (Guest LocalStorage Persistence)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('lumiere_guest_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Compare properties (up to 3)
  const [comparedProperties, setComparedProperties] = useState([]);

  // Modals
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAISearchOpen, setIsAISearchOpen] = useState(false);
  const [activeDetailProperty, setActiveDetailProperty] = useState(null);
  const [activeCallbackProperty, setActiveCallbackProperty] = useState(null);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lumiere_guest_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Initial Auto-Location Detection on App Load with GPS Precision
  useEffect(() => {
    handleDetectGPS(true);
  }, []);

  const detectLocationDefault = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/location/detect`);
      const data = await res.json();
      setDetectedLocation(data);
      if (data.city) {
        setCurrentCity(data.city);
      }
    } catch (err) {
      console.error('Location detect error:', err);
    }
  };

  const handleDetectGPS = (isSilent = false) => {
    if (!navigator.geolocation) {
      if (!isSilent) alert('Geolocation is not supported by your browser.');
      detectLocationDefault();
      return;
    }

    setIsDetectingGPS(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const res = await fetch(`${API_BASE}/api/location/detect?lat=${lat}&lng=${lng}`);
          const data = await res.json();

          // High accuracy reverse geocoding for precise locality
          try {
            const revRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
            );
            if (revRes.ok) {
              const revData = await revRes.json();
              const localityName = revData.locality || revData.city || revData.principalSubdivision;
              if (localityName) {
                data.locality = localityName;
              }
            }
          } catch {
            // fallback to server locality
          }

          setDetectedLocation(data);
          if (data.city) {
            setCurrentCity(data.city);
          }
        } catch (e) {
          console.error('GPS detection fetch error:', e);
          detectLocationDefault();
        } finally {
          setIsDetectingGPS(false);
        }
      },
      (err) => {
        console.warn('Geolocation permission not granted or timeout:', err.message);
        setIsDetectingGPS(false);
        detectLocationDefault();
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  // Fetch properties whenever city or filters change
  useEffect(() => {
    fetchProperties();
  }, [currentCity, filters]);

  // Fetch all reels on mount and keep available for transparent area search
  useEffect(() => {
    fetchReels();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentCity && currentCity !== 'all' && currentCity !== 'All Cities') {
        params.append('city', currentCity);
      }
      if (filters.search) params.append('search', filters.search);
      if (filters.bhk && filters.bhk !== 'all') params.append('bhk', filters.bhk);
      if (filters.propertyType && filters.propertyType !== 'all') params.append('propertyType', filters.propertyType);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.sort) params.append('sort', filters.sort);

      const res = await fetch(`${API_BASE}/api/properties?${params.toString()}`);
      const data = await res.json();
      setProperties(data.properties || []);
    } catch (err) {
      console.error('Fetch properties error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReels = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/properties/reels`);
      const data = await res.json();
      setReels(data.reels || []);
    } catch (err) {
      console.error('Fetch reels error:', err);
    }
  };

  // Wishlist actions
  const handleToggleWishlist = (property) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === property.id);
      if (exists) {
        return prev.filter(item => item.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  // Compare actions
  const handleToggleCompare = (property) => {
    setComparedProperties(prev => {
      const exists = prev.some(item => item.id === property.id);
      if (exists) {
        return prev.filter(item => item.id !== property.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 luxury properties simultaneously.');
        return prev;
      }
      return [...prev, property];
    });
  };

  const handleWatchReel = (property) => {
    setViewMode('reels');
    setReels(prev => {
      const found = prev.find(r => r.id === property.id);
      if (found) {
        return [found, ...prev.filter(r => r.id !== property.id)];
      }
      return [property, ...prev];
    });
  };

  // Listing Inventory Flow (Protected: profile creation is mandatory)
  const handleOpenListProperty = () => {
    if (!currentUser) {
      setAuthRedirectReason('Profile creation is required to list your exclusive real estate inventory.');
      setIsAuthModalOpen(true);
      return;
    }
    setIsListModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('lumiere_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    setIsAuthModalOpen(false);

    // If user intended to list property, automatically open listing modal
    if (authRedirectReason) {
      setAuthRedirectReason('');
      setIsListModalOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('lumiere_user');
    } catch (e) {
      console.error(e);
    }
  };

  const handlePropertyCreated = (newProperty) => {
    setProperties(prev => [newProperty, ...prev]);
    if (newProperty.reelVideo) {
      setReels(prev => [newProperty, ...prev]);
    }
    // Switch to catalogue view to admire the new listing
    setViewMode('catalogue');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: viewMode === 'reels' ? 0 : '70px' }}>
      {/* Top Sticky Navbar */}
      <Navbar
        currentCity={currentCity === 'all' ? 'All Cities' : currentCity}
        onSelectCity={(city) => setCurrentCity(city)}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAISearch={() => setIsAISearchOpen(true)}
        onOpenListProperty={handleOpenListProperty}
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthRedirectReason('');
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
        onDetectGPS={handleDetectGPS}
        isDetectingGPS={isDetectingGPS}
      />

      {/* Main Content Area */}
      <main>
        {viewMode === 'reels' ? (
          <ReelCatalogue
            reels={reels}
            currentCity={currentCity}
            onSelectCity={(city) => setCurrentCity(city)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onOpenDetail={(prop) => setActiveDetailProperty(prop)}
            onOpenCallback={(prop) => setActiveCallbackProperty(prop)}
            onSwitchToCatalogue={() => setViewMode('catalogue')}
          />
        ) : (
          <PropertyGrid
            properties={properties}
            filters={filters}
            onFilterChange={(key, val) => setFilters(prev => ({ ...prev, [key]: val }))}
            onResetFilters={() => setFilters({ search: '', bhk: 'all', propertyType: 'all', maxPrice: 650000000, sort: 'popular' })}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onOpenDetail={(prop) => setActiveDetailProperty(prop)}
            onOpenCallback={(prop) => setActiveCallbackProperty(prop)}
            onWatchReel={handleWatchReel}
            comparedIds={comparedProperties.map(p => p.id)}
            onToggleCompare={handleToggleCompare}
          />
        )}
      </main>

      {/* Floating Compare Tray */}
      <CompareDrawer
        comparedProperties={comparedProperties}
        onRemove={(id) => setComparedProperties(prev => prev.filter(p => p.id !== id))}
        onClear={() => setComparedProperties([])}
        onOpenCallback={(prop) => setActiveCallbackProperty(prop)}
        onOpenDetail={(prop) => setActiveDetailProperty(prop)}
      />

      {/* Location Auto-Detection & City Switcher Modal */}
      <LocationDetectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentCity={currentCity}
        onSelectCity={(city) => setCurrentCity(city)}
        detectedLocation={detectedLocation}
        onDetectGPS={handleDetectGPS}
        isDetectingGPS={isDetectingGPS}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveItem={(id) => setWishlist(prev => prev.filter(item => item.id !== id))}
        onClearWishlist={() => setWishlist([])}
        onOpenDetail={(prop) => setActiveDetailProperty(prop)}
        onOpenCallback={(prop) => setActiveCallbackProperty(prop)}
      />

      {/* Property "Know More" Deep Spec & EMI Modal */}
      {activeDetailProperty && (
        <PropertyDetailModal
          property={activeDetailProperty}
          onClose={() => setActiveDetailProperty(null)}
          isWishlisted={wishlist.some(item => item.id === activeDetailProperty.id)}
          onToggleWishlist={handleToggleWishlist}
          onOpenCallback={(prop) => {
            setActiveDetailProperty(null);
            setActiveCallbackProperty(prop);
          }}
        />
      )}

      {/* "Get a Call Back" Lead Modal */}
      {activeCallbackProperty && (
        <CallbackModal
          property={activeCallbackProperty}
          isOpen={!!activeCallbackProperty}
          onClose={() => setActiveCallbackProperty(null)}
        />
      )}

      {/* AI Vibe Matchmaker Search Modal */}
      <AIVibeSearchBar
        isOpen={isAISearchOpen}
        onClose={() => setIsAISearchOpen(false)}
        onOpenDetail={(prop) => {
          setIsAISearchOpen(false);
          setActiveDetailProperty(prop);
        }}
        onWatchReel={(prop) => {
          setIsAISearchOpen(false);
          handleWatchReel(prop);
        }}
      />

      {/* Profile Creation / Login Modal (Mandatory for listing inventory) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthRedirectReason('');
        }}
        onAuthSuccess={handleAuthSuccess}
        redirectReason={authRedirectReason}
      />

      {/* List Your Own Inventory Modal */}
      <ListPropertyModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onPropertyCreated={handlePropertyCreated}
        currentUser={currentUser}
      />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenListProperty={handleOpenListProperty}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthRedirectReason('');
          setIsAuthModalOpen(true);
        }}
      />
    </div>
  );
}
