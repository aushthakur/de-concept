import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export default function TopSearchFilterStrip({
  searchQuery,
  onSearchChange,
  onOpenFilterModal,
  activeFilterCount = 0
}) {
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

        {/* Filter Trigger Button */}
        <button
          id="btn-open-filter-modal"
          onClick={onOpenFilterModal}
          className={`top-filter-btn ${activeFilterCount > 0 ? 'has-active-filters' : ''}`}
          title="Open Filters"
        >
          <SlidersHorizontal size={16} />
          <span className="top-filter-text">Filters</span>
          {activeFilterCount > 0 && (
            <span className="top-filter-badge">{activeFilterCount}</span>
          )}
        </button>
      </div>
    </div>
  );
}
