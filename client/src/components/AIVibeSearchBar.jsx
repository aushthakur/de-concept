import React, { useState } from 'react';
import { Sparkles, Search, X, Clapperboard } from 'lucide-react';

export default function AIVibeSearchBar({
  isOpen,
  onClose,
  onOpenDetail,
  onWatchReel
}) {
  if (!isOpen) return null;

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const EXAMPLE_PROMPTS = [
    'Sea facing penthouse with private infinity pool in Mumbai under 20 Cr',
    'Golf course greens duplex in Gurgaon Camellias',
    'Portuguese restored heritage villa with pool in Goa',
    'Palm Jumeirah beachfront villa in Dubai with private yacht access'
  ];

  const handleSearch = async (text) => {
    const q = text || prompt;
    if (!q.trim()) return;

    setLoading(true);
    setSearched(true);
    if (text) setPrompt(text);

    try {
      const res = await fetch('/api/ai/vibe-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q })
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '740px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative',
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0b1c3d 0%, #1e3a8a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(11, 28, 61, 0.2)'
            }}>
              <Sparkles size={20} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                AI Vibe & Architectural Matchmaker
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Describe your dream lifestyle, architectural taste, or preferred aesthetic in plain words
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} style={{ marginBottom: '16px' }}>
          <div style={{
            position: 'relative',
            background: 'var(--bg-secondary)',
            border: '1.5px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <Search size={18} color="var(--text-muted)" style={{ marginLeft: '14px', marginRight: '8px' }} />
            <input
              id="ai-prompt-input"
              type="text"
              placeholder="e.g. Find me an oceanfront residence with sunset terrace under 25 Cr..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                padding: '10px 0'
              }}
            />
            <button
              id="btn-ai-search-submit"
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '13px' }}
            >
              {loading ? 'Analyzing...' : 'Search Vibes'}
            </button>
          </div>
        </form>

        {/* Suggested Quick Prompts */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
            Try one of these curated lifestyles:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {EXAMPLE_PROMPTS.map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSearch(ex)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 12px',
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.color = 'var(--accent-primary)';
                  e.currentTarget.style.background = '#eff6ff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'var(--bg-secondary)';
                }}
              >
                ✨ {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        {searched && (
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>AI Matches Found ({results.length})</span>
            </div>

            {results.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                No direct vibe match. Try searching with terms like "penthouse", "sea view", "golf", or "pool".
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {results.map(res => (
                  <div
                    key={res.id}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img
                      src={res.images[0]}
                      alt={res.title}
                      style={{ width: '90px', height: '90px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 700 }}>
                          {res.propertyType}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          • {res.location.locality}, {res.location.city}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: '3px 0' }}>
                        {res.title}
                      </h4>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '17px',
                        fontWeight: 800,
                        color: 'var(--accent-primary)'
                      }}>
                        {res.priceFormatted}
                      </div>

                      {/* AI Vibe Reasons Tags */}
                      {res.matchReasons && res.matchReasons.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                          {res.matchReasons.map((reason, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: '#eff6ff',
                                color: '#1d4ed8',
                                border: '1px solid #bfdbfe',
                                fontSize: '10px',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontWeight: 600
                              }}
                            >
                              ✓ {reason}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {res.reelVideo && (
                        <button
                          onClick={() => {
                            onClose();
                            onWatchReel(res);
                          }}
                          className="btn-secondary"
                          style={{ fontSize: '11px', padding: '6px 10px' }}
                        >
                          <Clapperboard size={13} />
                          Reel
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onClose();
                          onOpenDetail(res);
                        }}
                        className="btn-primary"
                        style={{ fontSize: '11px', padding: '6px 12px' }}
                      >
                        Know More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
