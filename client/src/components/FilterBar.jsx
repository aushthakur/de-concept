import React from 'react';
import { Search, X } from 'lucide-react';

export default function FilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults
}) {
  const BHK_OPTIONS = ['all', '3', '4', '5'];
  const TYPE_OPTIONS = [
    { value: 'all', label: 'All Types' },
    { value: 'penthouse', label: 'Penthouses' },
    { value: 'luxury villa', label: 'Luxury Villas' },
    { value: 'garden estate', label: 'Garden Estates' }
  ];

  const SORT_OPTIONS = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'area', label: 'Largest Carpet Area' }
  ];

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      marginBottom: '28px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Search & Stats Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
        marginBottom: '18px'
      }}>
        {/* Instant Search Bar */}
        <div style={{
          position: 'relative',
          flex: '1',
          minWidth: '260px'
        }}>
          <Search 
            size={18} 
            color="var(--accent-primary)" 
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input
            id="input-catalogue-search"
            type="text"
            placeholder="Search by locality, builder (e.g. Worli, Lodha, Camellias, Pool)..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '12px 18px 12px 42px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange('search', '')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Sort by:</span>
          <select
            id="select-sort"
            value={filters.sort}
            onChange={(e) => onFilterChange('sort', e.target.value)}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-primary)',
              padding: '9px 16px',
              fontSize: '13px',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Reset Filters button */}
          <button
            onClick={onResetFilters}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-secondary)',
              padding: '9px 14px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Reset All Filters"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        paddingTop: '14px',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        {/* BHK Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Bedrooms:</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {BHK_OPTIONS.map(b => (
              <button
                key={b}
                id={`filter-bhk-${b}`}
                onClick={() => onFilterChange('bhk', b)}
                style={{
                  background: filters.bhk === b ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: filters.bhk === b ? '#ffffff' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: filters.bhk === b ? '0 2px 8px rgba(11, 28, 61, 0.3)' : 'none'
                }}
              >
                {b === 'all' ? 'All BHK' : b === '5' ? '5+ BHK' : `${b} BHK`}
              </button>
            ))}
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Type:</span>
          <select
            id="select-type"
            value={filters.propertyType}
            onChange={(e) => onFilterChange('propertyType', e.target.value)}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-primary)',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {TYPE_OPTIONS.map(t => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Max Budget Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '220px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Budget Up To:</span>
          <input
            id="slider-max-price"
            type="range"
            min="50000000"
            max="650000000"
            step="10000000"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            style={{
              accentColor: 'var(--accent-primary)',
              cursor: 'pointer',
              flex: 1
            }}
          />
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-primary)', minWidth: '60px' }}>
            {filters.maxPrice >= 650000000 ? 'Any' : `₹${(filters.maxPrice / 10000000).toFixed(0)} Cr`}
          </span>
        </div>

        {/* Live Inventory Counter Badge */}
        <div style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--text-muted)' }}>
          Showing <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{totalResults}</span> curated luxury estates
        </div>
      </div>
    </div>
  );
}
