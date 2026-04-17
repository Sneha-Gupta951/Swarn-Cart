import React from 'react';

export function ProgressBar({ value, max, colorOverride }) {
  const percentage = Math.min(Math.round((value / max) * 100), 120); // Cap at 120 for overflow visual
  
  const getColor = () => {
    if (colorOverride) return colorOverride;
    if (percentage < 70) return 'var(--emerald, #10B981)';
    if (percentage < 90) return '#F59E0B'; // Amber
    return 'var(--rose, #F43F5E)';
  };

  const barColor = getColor();

  return (
    <div style={{ width: '100%', marginTop: '1rem', position: 'relative' }}>
      {/* Background Track */}
      <div style={{
        height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.05)',
        border: '1px solid var(--border)', overflow: 'hidden', position: 'relative'
      }}>
        {/* Progress Fill */}
        <div style={{
          height: '100%', width: `${Math.min(percentage, 100)}%`,
          background: `linear-gradient(90deg, ${barColor}aa, ${barColor})`,
          transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s',
          borderRadius: 5, position: 'relative',
          boxShadow: percentage > 90 ? `0 0 15px ${barColor}66` : 'none'
        }}>
          {/* Shimmer Effect */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shimmer 2s infinite linear'
          }} />
        </div>
      </div>

      {/* Moving Indicator Dot */}
      <div style={{
        position: 'absolute', top: -4, left: `${Math.min(percentage, 100)}%`,
        width: 18, height: 18, borderRadius: '50%',
        background: '#fff', border: `3px solid ${barColor}`,
        transform: 'translateX(-50%)', transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)', zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: barColor }} />
      </div>

      {/* Markers */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        <span>0%</span>
        <span>70%</span>
        <span>90%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
