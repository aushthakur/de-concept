import React, { useState } from 'react';
import { API_BASE } from '../config';
import { 
  X, 
  Building2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2, 
  CheckCircle2, 
  UploadCloud, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function ListPropertyModal({
  isOpen,
  onClose,
  currentUser,
  onPropertyCreated
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    propertyType: 'Penthouse',
    city: 'Mumbai',
    locality: '',
    priceCr: '12.50',
    bhk: '4',
    baths: '4',
    areaSqFt: '3500',
    status: 'Ready to Move',
    furnishing: 'Fully Furnished Designer',
    amenities: ['Private Infinity Pool', 'Smart Home Automation', '24/7 Security'],
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    reelVideo: '/videos/reel_worli_sea_face.mp4'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successProperty, setSuccessProperty] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const AMENITIES_LIST = [
    'Private Infinity Pool',
    'Sea / Ocean View',
    'Arnold Palmer Golf Access',
    'Smart Home Automation',
    'Private High-Speed Elevator',
    'Helipad Access',
    'Temperature Controlled Wine Cellar',
    '24/7 White-Glove Concierge',
    'EV Charging Station'
  ];

  const PRESET_IMAGES = [
    { label: 'Sea View Penthouse', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', video: '/videos/reel_worli_sea_face.mp4' },
    { label: 'Private Pool Villa', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', video: '/videos/reel_goa_beach_villa.mp4' },
    { label: 'Golf Greens Duplex', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', video: '/videos/reel_dlf_camellias.mp4' },
    { label: 'Modern Palm Mansion', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80', video: '/videos/reel_palm_jumeirah.mp4' }
  ];

  const handleToggleAmenity = (item) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(item);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter(a => a !== item)
          : [...prev.amenities, item]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.locality || !formData.priceCr) {
      setErrorMsg('Please complete the title, locality, and asking price.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const priceNum = Math.round(parseFloat(formData.priceCr) * 10000000);

    const payload = {
      title: formData.title,
      tagline: formData.tagline || `Exclusive ${formData.bhk} BHK ${formData.propertyType} in ${formData.locality}`,
      propertyType: formData.propertyType,
      bhk: Number(formData.bhk),
      baths: Number(formData.baths),
      price: priceNum,
      priceFormatted: `₹${parseFloat(formData.priceCr).toFixed(2)} Cr`,
      areaSqFt: Number(formData.areaSqFt),
      carpetAreaSqFt: Math.round(Number(formData.areaSqFt) * 0.85),
      location: {
        city: formData.city,
        locality: formData.locality,
        address: `${formData.locality}, ${formData.city}`
      },
      status: formData.status,
      furnishing: formData.furnishing,
      amenities: formData.amenities,
      images: [formData.imageUrl],
      reelVideo: formData.reelVideo,
      ownerInfo: {
        name: currentUser?.name || 'Verified Owner',
        role: currentUser?.role || 'Property Owner',
        phone: currentUser?.phone || '+91 98200 12345'
      }
    };

    try {
      const res = await fetch(`${API_BASE}/api/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.property) {
        setSuccessProperty(data.property);
        onPropertyCreated(data.property);
      } else {
        setErrorMsg(data.error || 'Failed to list property. Please try again.');
      }
    } catch {
      // Fallback
      const localProp = {
        ...payload,
        id: `prop-user-${Date.now().toString(36)}`,
        pricePerSqFt: `₹${Math.round(priceNum / Number(formData.areaSqFt)).toLocaleString()}/sq.ft`,
        builder: { name: currentUser?.name || 'Direct Owner', experience: 'Owner Listed', reraId: 'VERIFIED-OWNER' },
        relationshipManager: {
          name: currentUser?.name || 'Owner',
          role: currentUser?.role || 'Direct Owner',
          phone: currentUser?.phone || '+91 98200 12345',
          rating: 5.0,
          photo: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          whatsapp: '919820014820'
        },
        verified: true,
        isOwnerListing: true,
        likesCount: 1,
        viewsCount: 10
      };
      setSuccessProperty(localProp);
      onPropertyCreated(localProp);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-panel-heavy"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '740px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '28px',
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(15, 23, 42, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        {successProperty ? (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(5, 150, 105, 0.12)',
              border: '2px solid var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--accent-emerald)'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Your Luxury Property is Now Live!
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Your listing has been published to the LUMIÈRE catalogue & reel feed with an verified owner badge.
            </p>

            {/* Preview Card */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              gap: '16px',
              textAlign: 'left',
              marginBottom: '24px'
            }}>
              <img
                src={successProperty.images[0]}
                alt={successProperty.title}
                style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div>
                <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  ✓ Owner Verified Listing
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0' }}>
                  {successProperty.title}
                </h4>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {successProperty.location.locality}, {successProperty.location.city} • {successProperty.bhk} BHK
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '4px' }}>
                  {successProperty.priceFormatted}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              View in Catalogue & Reels
            </button>
          </div>
        ) : (
          /* Form Screen */
          <div>
            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--accent-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    List Your Luxury Inventory
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Listing as: <strong style={{ color: 'var(--accent-primary)' }}>{currentUser?.name}</strong> ({currentUser?.role})
                  </div>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div style={{
                background: 'rgba(225, 29, 72, 0.08)',
                border: '1px solid rgba(225, 29, 72, 0.3)',
                color: '#e11d48',
                fontSize: '12px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '16px'
              }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Row 1: Title & Tagline */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Property Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Imperial Bay Panoramic Penthouse"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Short Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 270° Ocean Views & Private Deck"
                    value={formData.tagline}
                    onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Category, City, Locality */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '13px',
                      outline: 'none',
                      background: '#ffffff'
                    }}
                  >
                    <option value="Penthouse">Penthouse</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Sea-Facing Residence">Sea-Facing Residence</option>
                    <option value="Garden Estate">Garden Estate</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '13px',
                      outline: 'none',
                      background: '#ffffff'
                    }}
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Goa">Goa</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Locality / Area *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Worli Sea Face"
                    value={formData.locality}
                    onChange={e => setFormData({ ...formData, locality: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Row 3: Price in Cr, BHK, Carpet Area */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Asking Price (in ₹ Crores) *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-muted)' }}>₹</span>
                    <input
                      type="number"
                      step="0.1"
                      required
                      placeholder="12.5"
                      value={formData.priceCr}
                      onChange={e => setFormData({ ...formData, priceCr: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 28px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '13px',
                        outline: 'none',
                        fontWeight: 700
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Configuration (BHK)
                  </label>
                  <select
                    value={formData.bhk}
                    onChange={e => setFormData({ ...formData, bhk: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '13px',
                      outline: 'none',
                      background: '#ffffff'
                    }}
                  >
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5 BHK</option>
                    <option value="6">6+ BHK Grand</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Carpet Area (Sq.Ft)
                  </label>
                  <input
                    type="number"
                    placeholder="3500"
                    value={formData.areaSqFt}
                    onChange={e => setFormData({ ...formData, areaSqFt: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Photo & Video Preset Picker */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Architecture Style / Showcase Preset
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {PRESET_IMAGES.map((preset, i) => (
                    <div
                      key={i}
                      onClick={() => setFormData({ ...formData, imageUrl: preset.url, reelVideo: preset.video })}
                      style={{
                        border: formData.imageUrl === preset.url ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: '#ffffff',
                        position: 'relative'
                      }}
                    >
                      <img src={preset.url} alt={preset.label} style={{ width: '100%', height: '54px', objectFit: 'cover' }} />
                      <div style={{ fontSize: '10px', fontWeight: 600, padding: '4px', textAlign: 'center', color: 'var(--text-primary)' }}>
                        {preset.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Checkbox Pills */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Key Amenities
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {AMENITIES_LIST.map(item => {
                    const isChecked = formData.amenities.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleToggleAmenity(item)}
                        style={{
                          background: isChecked ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                          color: isChecked ? '#ffffff' : 'var(--text-secondary)',
                          border: isChecked ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isChecked && <CheckCircle2 size={12} />}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="btn-submit-listing"
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '14px' }}
              >
                {isSubmitting ? 'Publishing Luxury Listing...' : 'Publish Property to Reel & Inventory'}
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
