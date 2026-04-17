import React from 'react';

export function Footer() {
  return (
    <footer style={{ padding:'2rem 5%', background:'var(--bg2)', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
      <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:'1.2rem', color:'var(--gold)' }}>SWARN-CART</div>
      <div style={{ fontSize:'.75rem', color:'var(--text3)', letterSpacing:'.05em' }}>© 2025 Swarn-Cart Technologies Pvt. Ltd. · Built with ♥ in India</div>
    </footer>
  );
}
