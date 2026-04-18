import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fmt } from '../utils/format';
import qrImage from '../assets/qr-code.png';

export default function CheckoutPage({ cart, clearCart }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal > 50000 ? 0 : 199;
  const total = subtotal + tax + shipping;

  useEffect(() => {
    if (cart.length === 0 && step < 4) {
      navigate('/');
    }
  }, [cart, navigate, step]);

  const handleNext = () => {
    if (step === 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(4);
        // In a real app, clearCart() would be called here
      }, 3000);
    } else {
      setStep(step + 1);
    }
  };

  const s = {
    container: {
      padding: '8rem 5% 4rem',
      background: 'var(--bg)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    card: {
      background: 'var(--surface)',
      borderRadius: 24,
      padding: '2.5rem',
      width: '100%',
      maxWidth: '900px',
      border: '1px solid var(--border)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
    },
    stepper: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '3rem',
      position: 'relative'
    },
    step: (active, completed) => ({
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: active || completed ? 'var(--gold)' : 'var(--bg3)',
      color: active || completed ? '#000' : 'var(--text3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 800,
      fontSize: '0.9rem',
      zIndex: 2,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      border: active ? '4px solid rgba(212,175,55,0.3)' : 'none',
      transform: active ? 'scale(1.2)' : 'scale(1)'
    }),
    stepLabel: {
      position: 'absolute',
      top: 50,
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'var(--text2)',
      width: 80,
      textAlign: 'center',
      marginLeft: -20
    },
    input: {
      width: '100%',
      background: 'var(--bg3)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '1rem',
      color: '#fff',
      fontSize: '0.95rem',
      marginBottom: '1.2rem',
      outline: 'none',
      transition: 'all 0.2s'
    },
    label: {
      display: 'block',
      fontSize: '0.8rem',
      fontWeight: 600,
      color: 'var(--text2)',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    btn: {
      padding: '1rem 2.5rem',
      background: 'var(--gold)',
      color: '#000',
      border: 'none',
      borderRadius: 12,
      fontWeight: 800,
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontFamily: "'Bricolage Grotesque', sans-serif"
    },
    secondaryBtn: {
      padding: '1rem 2.5rem',
      background: 'transparent',
      color: 'var(--text2)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      fontWeight: 600,
      fontSize: '1rem',
      cursor: 'pointer',
      marginRight: '1rem'
    }
  };

  return (
    <div style={s.container} className="page-fade-in">
      <div style={s.card}>
        {step < 4 && (
          <div style={s.stepper}>
            <div style={{ position: 'absolute', top: 20, left: 20, right: 20, height: 2, background: 'var(--border)', zIndex: 1 }} />
            <div style={{ position: 'absolute', top: 20, left: 20, width: `${(step - 1) * 50}%`, height: 2, background: 'var(--gold)', zIndex: 1, transition: 'width 0.5s ease' }} />
            
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div style={s.step(step === i, step > i)}>{step > i ? '✓' : i}</div>
                <div style={s.stepLabel}>
                  {i === 1 ? 'Shipping' : i === 2 ? 'Review' : 'Payment'}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="reveal">
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '2rem', marginBottom: '2rem' }}>Shipping Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={s.label}>Full Name</label>
                <input style={s.input} placeholder="John Doe" value={shippingInfo.name} onChange={e => setShippingInfo({...shippingInfo, name: e.target.value})} />
              </div>
              <div>
                <label style={s.label}>Email Address</label>
                <input style={s.input} placeholder="john@example.com" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} />
              </div>
            </div>
            <label style={s.label}>Street Address</label>
            <input style={s.input} placeholder="123 Luxury Lane" value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={s.label}>City</label>
                <input style={s.input} placeholder="New Delhi" value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} />
              </div>
              <div>
                <label style={s.label}>ZIP Code</label>
                <input style={s.input} placeholder="110001" value={shippingInfo.zip} onChange={e => setShippingInfo({...shippingInfo, zip: e.target.value})} />
              </div>
              <div>
                <label style={s.label}>Phone</label>
                <input style={s.input} placeholder="+91 98765 43210" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button style={s.btn} onClick={handleNext}>Review Order →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="reveal">
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '2rem', marginBottom: '2rem' }}>Order Review</h2>
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '2rem', border: '1px solid var(--border)', borderRadius: 16, padding: '1rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <img src={item.image} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} alt="" />
                    <div>
                      <div style={{ fontWeight: 700 }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>Qty: {item.qty}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, color: 'var(--gold)' }}>{fmt(item.price * item.qty)}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--bg3)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text2)' }}>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text2)' }}>Tax (18%)</span>
                <span>{fmt(tax)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text2)' }}>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : fmt(shipping)}</span>
              </div>
              <div style={{ height: 1, background: 'var(--border)', margin: '1rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 800 }}>
                <span>Total</span>
                <span style={{ color: 'var(--gold)' }}>{fmt(total)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button style={s.secondaryBtn} onClick={() => setStep(1)}>Back</button>
              <button style={s.btn} onClick={handleNext}>Proceed to Payment →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="reveal" style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '2rem', marginBottom: '1rem' }}>Secure Payment</h2>
            <p style={{ color: 'var(--text2)', marginBottom: '2.5rem' }}>Scan the QR code below using any UPI app to complete your payment of <span style={{ color: 'var(--gold)', fontWeight: 800 }}>{fmt(total)}</span></p>
            
            <div style={{ 
              background: '#fff', 
              padding: '1.5rem', 
              borderRadius: 24, 
              display: 'inline-block', 
              marginBottom: '2.5rem',
              boxShadow: '0 0 40px rgba(212,175,55,0.2)',
              position: 'relative'
            }}>
              <img src={qrImage} alt="Payment QR" style={{ width: 280, height: 280 }} />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'rgba(0,0,0,0.8)', 
                borderRadius: 24, 
                display: loading ? 'flex' : 'none', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <div className="loader" style={{ width: 40, height: 40, border: '4px solid var(--gold)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
                <div style={{ color: 'var(--gold)', fontWeight: 700 }}>Verifying Payment...</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button style={s.secondaryBtn} onClick={() => setStep(2)}>Back</button>
              <button style={{ ...s.btn, background: '#10B981', color: '#fff' }} onClick={handleNext} disabled={loading}>
                {loading ? 'Processing...' : 'I Have Paid'}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="reveal" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem', animation: 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>🎉</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '2.5rem', marginBottom: '1rem' }}>Order Confirmed!</h2>
            <p style={{ color: 'var(--text2)', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto 3rem' }}>
              Your order for premium artifacts has been placed successfully. You will receive a confirmation email shortly.
            </p>
            <button style={s.btn} onClick={() => {
              clearCart();
              navigate('/');
            }}>Continue Shopping</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes scaleIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
