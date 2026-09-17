import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  PhoneCall, 
  MapPin, 
  Compass, 
  Calculator, 
  Sparkles,
  Share2,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

export default function PropertyDetailModal({
  property,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onOpenCallback
}) {
  if (!property) return null;

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // EMI Calculator State
  const [downpaymentPercent, setDownpaymentPercent] = useState(20);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const interestRateAnnual = 8.5;

  const downpaymentAmount = (property.price * downpaymentPercent) / 100;
  const loanPrincipal = property.price - downpaymentAmount;
  const monthlyRate = interestRateAnnual / 12 / 100;
  const numberOfPayments = loanTenureYears * 12;
  
  const monthlyEMI = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );

  const formatCurrency = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lacs`;
    }
    return `₹${val.toLocaleString()}`;
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🏡 Check out this luxury residence on Oye Properties:\n*${property.title}*\n📍 ${property.location.address}\n💰 Asking: ${property.priceFormatted} (${property.pricePerSqFt})\n✨ Specs: ${property.bhk} BHK • ${property.areaSqFt} sq.ft\n🔗 Explore here: ${window.location.origin}?prop=${property.id}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="glass-panel-heavy"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '880px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
          padding: 0,
          background: '#ffffff',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Top Header Sticky Bar */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: '#ffffff',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--accent-primary)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11px',
              fontWeight: 800
            }}>
              {property.propertyType}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              RERA: {property.builder.reraId}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleShareWhatsApp}
              className="btn-whatsapp"
              style={{ fontSize: '11px', padding: '6px 12px' }}
              title="Share via WhatsApp"
            >
              <MessageCircle size={14} />
              <span>Share</span>
            </button>

            <button
              onClick={() => onToggleWishlist(property)}
              style={{
                background: isWishlisted ? '#fee2e2' : 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: isWishlisted ? '#e11d48' : 'var(--text-secondary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'var(--bg-secondary)',
                border: 'none',
                color: 'var(--text-muted)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Hero Gallery / 360 / Floorplan Container */}
        <div style={{ padding: '24px 24px 0' }}>
          {/* Navigation Tabs (Dark Blue Active) */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '12px'
          }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                background: activeTab === 'overview' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: activeTab === 'overview' ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Gallery & Overview
            </button>

            <button
              onClick={() => setActiveTab('360tour')}
              style={{
                background: activeTab === '360tour' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: activeTab === '360tour' ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Compass size={14} />
              360° Virtual Tour
            </button>

            <button
              onClick={() => setActiveTab('floorplan')}
              style={{
                background: activeTab === 'floorplan' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: activeTab === 'floorplan' ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Floor Plan Blueprint
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              style={{
                background: activeTab === 'calculator' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: activeTab === 'calculator' ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Calculator size={14} />
              Live EMI & ROI
            </button>
          </div>

          {/* TAB 1: Gallery & Overview */}
          {activeTab === 'overview' && (
            <div>
              <div style={{
                position: 'relative',
                height: '360px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                marginBottom: '12px'
              }}>
                <img
                  src={property.images[selectedPhotoIndex] || property.images[0]}
                  alt={property.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(11, 28, 61, 0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '11px',
                  color: '#fff'
                }}>
                  Photo {selectedPhotoIndex + 1} of {property.images.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                {property.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Thumbnail"
                    onClick={() => setSelectedPhotoIndex(i)}
                    style={{
                      width: '72px',
                      height: '52px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: selectedPhotoIndex === i ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      opacity: selectedPhotoIndex === i ? 1 : 0.6
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 360 Virtual Tour Simulation */}
          {activeTab === '360tour' && (
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '20px',
              position: 'relative'
            }}>
              <div style={{
                height: '360px',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <img
                  src={property.virtualTour360.preview}
                  alt="360 preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '12px',
                  color: 'var(--accent-primary)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  <Compass size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
                  Interactive 360° Walkthrough Simulator
                </div>

                {/* Hotspots */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  background: 'rgba(255, 255, 255, 0.95)',
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                    Jump to Room:
                  </span>
                  {property.virtualTour360.rooms.map((room, idx) => (
                    <button
                      key={room}
                      onClick={() => setSelectedPhotoIndex(idx % property.images.length)}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--accent-primary)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      📍 {room}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Floor Plan Blueprint */}
          {activeTab === 'floorplan' && (
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '20px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '16px', marginBottom: '6px', fontWeight: 800 }}>
                Master Floor Plan Architectural Layout
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Super Built-up: {property.areaSqFt} sq.ft | Carpet Area: {property.carpetAreaSqFt} sq.ft | Ceiling Height: 12.5 ft
              </p>
              <div style={{
                maxHeight: '340px',
                display: 'flex',
                justifyContent: 'center',
                background: '#ffffff',
                borderRadius: '8px',
                padding: '12px',
                border: '1px solid var(--border-subtle)'
              }}>
                <img
                  src={property.floorPlanUrl}
                  alt="Architectural Blueprint"
                  style={{ maxHeight: '310px', objectFit: 'contain' }}
                />
              </div>
            </div>
          )}

          {/* TAB 4: Live EMI & ROI Calculator */}
          {activeTab === 'calculator' && (
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '24px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}>
                    <Calculator size={16} color="var(--accent-primary)" />
                    Customize Home Loan Parameters
                  </h4>

                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Down Payment: {downpaymentPercent}%</span>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{formatCurrency(downpaymentAmount)}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="5"
                      value={downpaymentPercent}
                      onChange={e => setDownpaymentPercent(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                    />
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Loan Tenure</span>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{loanTenureYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={loanTenureYears}
                      onChange={e => setLoanTenureYears(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                    />
                  </div>

                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Interest rate benchmarked at 8.50% p.a. Special luxury portfolio rate discounts applicable.
                  </div>
                </div>

                {/* Calculation Outputs Card */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                      Estimated Monthly EMI
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '32px',
                      fontWeight: 800,
                      color: 'var(--accent-primary)',
                      marginTop: '4px'
                    }}>
                      {formatCurrency(monthlyEMI)}
                      <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}> /mo</span>
                    </div>
                  </div>

                  <div style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '14px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px'
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Gross Rental Yield</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                        {property.financials.grossRentalYield}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>5-Yr Capital Gain Est.</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#2563eb' }}>
                        {property.financials.projectedCapitalAppreciation5Yr}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Property Specs */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '6px' }}>
                {property.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                <MapPin size={14} color="#2563eb" />
                {property.location.address}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--accent-primary)'
              }}>
                {property.priceFormatted}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {property.pricePerSqFt}
              </div>
            </div>
          </div>

          {/* Quick Attribute Pills */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Bedrooms</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{property.bhk} BHK Luxury</div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Carpet Area</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{property.carpetAreaSqFt} sq.ft</div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Facing</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{property.facing}</div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Floor Level</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{property.floor}</div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Possession</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{property.possession}</div>
            </div>
          </div>

          {/* Amenities Grid */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>
              Signature Amenities & Lifestyle Privileges
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {property.amenities.map((amenity) => (
                <span
                  key={amenity}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '12px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles size={12} color="#2563eb" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Relationship Manager Contact Bar & CTA */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src={property.relationshipManager.photo}
                alt={property.relationshipManager.name}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent-primary)'
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {property.relationshipManager.name}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    background: '#e0e7ff',
                    color: '#3730a3',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 700
                  }}>
                    ★ {property.relationshipManager.rating}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {property.relationshipManager.role}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleShareWhatsApp}
                className="btn-whatsapp"
                style={{ fontSize: '12px', padding: '9px 16px' }}
              >
                <MessageCircle size={15} />
                WhatsApp Advisor
              </button>

              <button
                id="btn-modal-schedule-callback"
                onClick={() => {
                  onClose();
                  onOpenCallback(property);
                }}
                className="btn-primary"
                style={{ fontSize: '13px', padding: '9px 18px' }}
              >
                <PhoneCall size={15} />
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
