import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fmt } from '../utils/format';

export default function OrdersPage() {
  const navigate = useNavigate();
  
  // Mock order history
  const orders = [
    {
      id: 'ORD-2026-8942',
      date: 'April 15, 2026',
      status: 'Delivered',
      total: 124999,
      items: [
        { name: 'Premium Electronics Item 1', price: 89000, qty: 1, image: 'https://loremflickr.com/600/600/electronics?lock=1' },
        { name: 'Home Decor Luxury Lamp', price: 15999, qty: 2, image: 'https://loremflickr.com/600/600/homedecor?lock=5' }
      ]
    },
    {
      id: 'ORD-2026-7731',
      date: 'April 02, 2026',
      status: 'Shipped',
      total: 4500,
      items: [
        { name: 'Cotton Minimalist Tee', price: 2250, qty: 2, image: 'https://loremflickr.com/600/600/clothing?lock=10' }
      ]
    }
  ];

  const s = {
    container: {
      padding: '8rem 5% 4rem',
      background: 'var(--bg)',
      minHeight: '100vh',
    },
    header: {
      marginBottom: '3rem',
    },
    title: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: '2.5rem',
      fontWeight: 800,
      marginBottom: '1rem',
    },
    orderCard: {
      background: 'var(--surface)',
      borderRadius: 16,
      border: '1px solid var(--border)',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      transition: 'all 0.3s',
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid var(--border)',
    },
    status: (status) => ({
      padding: '0.4rem 0.8rem',
      borderRadius: 6,
      fontSize: '0.75rem',
      fontWeight: 800,
      textTransform: 'uppercase',
      background: status === 'Delivered' ? 'rgba(16,185,129,0.1)' : 'rgba(212,175,55,0.1)',
      color: status === 'Delivered' ? '#10B981' : 'var(--gold)',
      border: `1px solid ${status === 'Delivered' ? 'rgba(16,185,129,0.2)' : 'rgba(212,175,55,0.2)'}`,
    }),
    itemImg: {
      width: 50,
      height: 50,
      borderRadius: 8,
      objectFit: 'cover',
      border: '1px solid var(--border)',
    }
  };

  return (
    <div style={s.container} className="page-fade-in">
      <header style={s.header}>
        <h1 style={s.title}>My <span style={{ color: 'var(--gold)' }}>Orders</span></h1>
        <p style={{ color: 'var(--text2)' }}>Manage and track your premium acquisitions.</p>
      </header>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
          <h2>No orders yet.</h2>
          <p style={{ color: 'var(--text2)', marginBottom: '2rem' }}>Your future treasures are waiting.</p>
          <button 
            onClick={() => navigate('/products')}
            style={{ padding: '0.8rem 2rem', background: 'var(--gold)', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: '900px' }}>
          {orders.map(order => (
            <div key={order.id} style={s.orderCard} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
              <div style={s.orderHeader}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order ID</div>
                  <div style={{ fontWeight: 800, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{order.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</div>
                  <div style={{ fontWeight: 600 }}>{order.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</div>
                  <div style={s.status(order.status)}>{order.status}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</div>
                  <div style={{ fontWeight: 800, color: 'var(--gold)', fontSize: '1.1rem' }}>{fmt(order.total)}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--bg3)', padding: '0.6rem 1rem', borderRadius: 12, border: '1px solid var(--border)' }}>
                    <img src={item.image} style={s.itemImg} alt="" />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>Qty: {item.qty}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', padding: '0.5rem 1rem', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Invoice</button>
                <button style={{ background: 'var(--bg3)', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '0.5rem 1rem', borderRadius: 6, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>Order Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
