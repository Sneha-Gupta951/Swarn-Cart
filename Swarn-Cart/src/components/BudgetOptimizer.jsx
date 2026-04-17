import React, { useState, useMemo, useEffect } from 'react';
import { fmt } from '../utils/format';
import { ProgressBar } from './ProgressBar';

export function BudgetOptimizer({ cart, products }) {
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('swarn_budget');
    return saved ? parseInt(saved) : 5000;
  });
  
  const [showSelector, setShowSelector] = useState(false);
  const [sortBy, setSortBy] = useState('none');

  useEffect(() => {
    localStorage.setItem('swarn_budget', budget.toString());
  }, [budget]);

  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
  , [cart]);

  const percentage = budget > 0 ? (cartTotal / budget) * 100 : 0;
  const remaining = budget - cartTotal;
  const isOver = remaining < 0;

  // Smart Suggestions Logic - ONLY IF OVER BUDGET
  const suggestions = useMemo(() => {
    if (cart.length === 0 || !isOver) return [];
    
    // Find categories of items in cart
    const cartCategories = [...new Set(cart.map(item => item.category))];
    
    return products
      .filter(p => 
        cartCategories.includes(p.category) && 
        !cart.some(ci => ci.id === p.id) && 
        p.price < budget * 0.15 
      )
      .sort((a, b) => a.price - b.price)
      .slice(0, 3);
  }, [cart, products, budget, isOver]);

  const expensiveItems = useMemo(() => 
    isOver ? cart.filter(item => item.price > budget * 0.3) : []
  , [cart, budget, isOver]);

  return (
    <div className="reveal" style={{
      margin: '0 5% 4rem', padding: '2rem',
      background: 'var(--bg2)', borderRadius: 24,
      border: `1px solid ${isOver ? 'rgba(244,63,94,0.3)' : 'var(--border)'}`,
      boxShadow: isOver ? '0 10px 40px rgba(244,63,94,0.1)' : '0 10px 40px rgba(0,0,0,0.2)',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Left: Stats & Controls */}
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '.72rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '.3rem' }}>Spending Tracker</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1.8rem', fontWeight: 800 }}>
                Budget <span style={{ color: 'var(--gold)' }}>Optimizer</span>
              </h2>
            </div>
            
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowSelector(!showSelector)}
                style={{
                  padding: '.6rem 1.2rem', borderRadius: 12, border: '1px solid var(--border)',
                  background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer',
                  fontSize: '.88rem', fontWeight: 600, transition: 'all 0.3s'
                }}
              >
                Set Budget: {fmt(budget)}
              </button>
              
              {showSelector && (
                <div style={{
                  position: 'absolute', top: '110%', right: 0, zIndex: 100,
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '.8rem', minWidth: 200,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', gap: '.5rem'
                }}>
                  {[1000, 5000, 10000, 25000, 50000].map(val => (
                    <button 
                      key={val}
                      onClick={() => { setBudget(val); setShowSelector(false); }}
                      style={{
                        padding: '.5rem', border: 'none', borderRadius: 8, textAlign: 'left',
                        background: budget === val ? 'rgba(212,175,55,0.15)' : 'transparent',
                        color: budget === val ? 'var(--gold)' : 'var(--text)', cursor: 'pointer',
                        fontSize: '.85rem', transition: '0.2s'
                      }}
                    >
                      {fmt(val)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1.2rem', background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '.65rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '.4rem' }}>Cart Total</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold)' }}>{fmt(cartTotal)}</div>
            </div>
            <div style={{ padding: '1.2rem', background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '.65rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '.4rem' }}>{isOver ? 'Over' : 'Remaining'}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isOver ? 'var(--rose)' : 'var(--emerald)' }}>{fmt(Math.abs(remaining))}</div>
            </div>
            <div style={{ padding: '1.2rem', background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '.65rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '.4rem' }}>Used (%)</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{Math.round(percentage)}%</div>
            </div>
          </div>

          <ProgressBar value={cartTotal} max={budget} />

          {isOver && (
            <div style={{
              marginTop: '1.5rem', padding: '1rem', borderRadius: 12,
              background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.3)',
              color: 'var(--rose)', fontSize: '.85rem', display: 'flex', alignItems: 'center', gap: '.6rem'
            }}>
              <span>⚠️</span>
              <strong>Budget Warning:</strong> You have exceeded your budget by {fmt(Math.abs(remaining))}.
            </div>
          )}
        </div>

        {/* Right: Smart Suggestions - ONLY IF OVER BUDGET */}
        {isOver && (
          <div style={{ flex: '1 1 300px', background: 'rgba(255,255,255,0.02)', borderRadius: 20, padding: '1.5rem', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '1.2rem' }}>💡</span>
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}>Smart Suggestions</h3>
            </div>

            {suggestions.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '.8rem', color: 'var(--text2)', marginBottom: '.2rem' }}>Consider these cheaper alternatives:</div>
                {suggestions.map(s => (
                  <div key={s.id} style={{
                    display: 'flex', gap: '.8rem', alignItems: 'center',
                    padding: '.8rem', background: 'var(--surface)', borderRadius: 12,
                    border: '1px solid var(--border)'
                  }}>
                    <img src={s.image} alt={s.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '.82rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                      <div style={{ fontSize: '.82rem', color: 'var(--gold)', fontWeight: 700 }}>{fmt(s.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text3)', fontSize: '.88rem' }}>
                Your cart is optimized!
              </div>
            )}

            {expensiveItems.length > 0 && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--rose)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.8rem' }}>Expensive Items</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                  {expensiveItems.map(item => (
                    <div key={item.id} style={{
                      padding: '.4rem .8rem', borderRadius: 8, background: 'rgba(244,63,94,0.1)',
                      border: '1px solid rgba(244,63,94,0.2)', fontSize: '.72rem', color: 'var(--rose)'
                    }}>
                      {item.name} ({fmt(item.price)})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
