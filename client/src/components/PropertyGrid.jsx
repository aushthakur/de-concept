import React from 'react';
import PropertyCard from './PropertyCard';
import FilterBar from './FilterBar';
import { Building2 } from 'lucide-react';

export default function PropertyGrid({
  properties,
  filters,
  onFilterChange,
  onResetFilters,
  wishlist,
  onToggleWishlist,
  onOpenDetail,
  onOpenCallback,
  onWatchReel,
  comparedIds,
  onToggleCompare
}) {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(12px, 4vw, 24px) clamp(12px, 4vw, 20px) 100px' }}>
      {/* Title & Introduction Banner */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(20px, 5vw, 32px)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '4px'
        }}>
          Curated Luxury Inventory & Residences
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(12px, 3vw, 14px)', lineHeight: 1.4 }}>
          Explore prime penthouses, beachfront estates, and signature residences.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalResults={properties.length}
      />

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '48px 20px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <Building2 size={42} color="var(--accent-primary)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px' }}>No properties match your filters</h3>
          <p style={{ fontSize: '13px', marginBottom: '20px' }}>Try widening your budget or clearing the search.</p>
          <button onClick={onResetFilters} className="btn-primary">
            Clear All Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(14px, 3vw, 24px)'
        }}>
          {properties.map(prop => (
            <PropertyCard
              key={prop.id}
              property={prop}
              isWishlisted={wishlist.some(item => item.id === prop.id)}
              onToggleWishlist={onToggleWishlist}
              onOpenDetail={onOpenDetail}
              onOpenCallback={onOpenCallback}
              onWatchReel={onWatchReel}
              isCompared={comparedIds.includes(prop.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
}
