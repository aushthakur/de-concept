import React, { useState } from 'react';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function FilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const BHK_OPTIONS = ['all', '3', '4', '5'];
  const TYPE_OPTIONS = [
    { value: 'all', label: 'All Types' },
    { value: 'penthouse', label: 'Penthouses' },
    { value: 'luxury villa', label: 'Luxury Villas' },
    { value: 'garden estate', label: 'Garden Estates' }
  ];

  const SORT_OPTIONS = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price_desc', label: 'Price: High → Low' },
    { value: 'price_asc', label: 'Price: Low → High' },
    { value: 'area', label: 'Largest Area' }
  ];

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-lg)',
      padding: 'clamp(12px, 4vw, 20px)',
      marginBottom: '20px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Search Row */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
          <Search
            size={16}
            color="var(--accent-primary)"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', flexShrink: 0 }}
          />
          <input
            id="input-catalogue-search"
            type="text"
            placeholder="Search locality, builder, type…"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '10px 36px 10px 36px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange('search', '')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                padding: 0
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <select
          id="select-sort"
          value={filters.sort}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--text-primary)',
            padding: '10px 10px',
            fontSize: '12px',
            fontWeight: 600,
            outline: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            maxWidth: '130px'
          }}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Filters Toggle Button (mobile-friendly) */}
        <button
          onClick={() => setFiltersOpen(o => !o)}
          style={{
            background: filtersOpen ? 'var(--accent-primary)' : 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            color: filtersOpen ? '#ffffff' : 'var(--text-secondary)',
            padding: '10px 12px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexShrink: 0,
            transition: 'all 0.2s ease'
          }}
          title="Toggle Filters"
        >
          <SlidersHorizontal size={14} />
          <span style={{ display: 'none' }} className="filter-label-desktop">Filters</span>
          <ChevronDown size={12} style={{ transform: filtersOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
      </div>

      {/* Expandable Advanced Filters */}
      {filtersOpen && (
        <div style={{
          paddingTop: '12px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {/* BHK Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', flexShrink: 0 }}>Bedrooms:</span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
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
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: filters.bhk === b ? '0 2px 8px rgba(11, 28, 61, 0.3)' : 'none'
                  }}
                >
                  {b === 'all' ? 'All' : b === '5' ? '5+ BHK' : `${b} BHK`}
                </button>
              ))}
            </div>
          </div>

          {/* Type + Budget Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            {/* Property Type */}
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
                  padding: '6px 10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {TYPE_OPTIONS.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Budget Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '180px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', flexShrink: 0 }}>Budget:</span>
              <input
                id="slider-max-price"
                type="range"
                min="50000000"
                max="650000000"
                step="10000000"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer', flex: 1 }}
              />
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-primary)', minWidth: '52px', flexShrink: 0 }}>
                {filters.maxPrice >= 650000000 ? 'Any' : `₹${(filters.maxPrice / 10000000).toFixed(0)} Cr`}
              </span>
            </div>
          </div>

          {/* Results + Reset Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Showing <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{totalResults}</span> curated estates
            </span>
            <button
              onClick={onResetFilters}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-secondary)',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Always visible result count when filters closed */}
      {!filtersOpen && (
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{totalResults}</span> curated luxury estates
        </div>
      )}
    </div>
  );
}
