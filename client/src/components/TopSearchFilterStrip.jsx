import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export default function TopSearchFilterStrip({
  searchQuery,
  onSearchChange,
  onOpenFilterModal,
  activeFilterCount = 0
}) {
  const QUICK_CHIPS = ['Worli', 'Bandra', 'DLF Phase 5', 'Palm Jumeirah', 'Penthouses', 'Sea View'];

  return (
    <div className="top-search-filter-strip">
      <div className="top-search-filter-inner">
        {/* Expanded Search Input */}
        <div className="top-search-input-wrap">
          <Search size={16} className="top-search-icon" />
          <input
            id="input-global-expanded-search"
            type="text"
            placeholder="Search area, locality, builder, penthouse, villa..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            className="top-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="top-search-clear-btn"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Quick Search Chips (Desktop Only) */}
        <div className="top-search-desktop-chips hidden-mobile">
          {QUICK_CHIPS.map(chip => {
            const isChipActive = searchQuery?.toLowerCase() === chip.toLowerCase();
            return (
              <button
                key={chip}
                type="button"
                onClick={() => onSearchChange(isChipActive ? '' : chip)}
                className={`top-chip-btn ${isChipActive ? 'active' : ''}`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* Filter Trigger Button */}
        <button
          id="btn-open-filter-modal"
          onClick={onOpenFilterModal}
          className={`top-filter-btn ${activeFilterCount > 0 ? 'has-active-filters' : ''}`}
          title="Open Filters"
        >
          <SlidersHorizontal size={15} />
          <span className="top-filter-text">Filters</span>
          {activeFilterCount > 0 && (
            <span className="top-filter-badge">{activeFilterCount}</span>
          )}
        </button>
      </div>
    </div>
  );
}
