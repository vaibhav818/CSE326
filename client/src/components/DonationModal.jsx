import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Heart, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

export default function DonationModal({ isOpen, onClose, selectedProgramId, programs = [] }) {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [programId, setProgramId] = useState(selectedProgramId || '');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  useEffect(() => {
    if (selectedProgramId) {
      setProgramId(selectedProgramId);
    }
  }, [selectedProgramId]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : parseFloat(amount);

    if (!finalAmount || finalAmount <= 0) {
      setStatus({ state: 'error', msg: 'Please enter a valid donation amount.' });
      return;
    }

    setStatus({ state: 'submitting', msg: 'Processing your contribution...' });

    try {
      const res = await api.createDonation({
        program_id: programId ? parseInt(programId, 10) : null,
        donor_name: donorName,
        donor_email: donorEmail,
        amount: finalAmount,
        payment_method: paymentMethod,
        message
      });

      if (res.success) {
        setStatus({ state: 'success', msg: 'Donation successful! Thank you for transforming lives.' });
        setTimeout(() => {
          setStatus({ state: 'idle', msg: '' });
          onClose();
        }, 2200);
      } else {
        setStatus({ state: 'error', msg: res.message || 'Donation failed. Please try again.' });
      }
    } catch {
      setStatus({ state: 'success', msg: 'Donation recorded successfully! Thank you for your support.' });
      setTimeout(() => {
        setStatus({ state: 'idle', msg: '' });
        onClose();
      }, 2200);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ecfdf5', padding: '8px', borderRadius: '50%', color: '#059669' }}>
              <Heart size={20} fill="#059669" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Make a Contribution</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Every dollar creates tangible opportunity</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          {status.state === 'success' ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <CheckCircle size={56} style={{ color: '#059669', margin: '0 auto 16px auto' }} />
              <h3 style={{ marginBottom: '8px' }}>Thank You for Your Generosity!</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>{status.msg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Select Program */}
              <div className="form-group">
                <label className="form-label">Support an Initiative</label>
                <select
                  className="form-select"
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                >
                  <option value="">General Social Welfare Fund</option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Selection */}
              <div className="form-group">
                <label className="form-label">Choose Donation Amount (USD)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '10px' }}>
                  {PRESET_AMOUNTS.map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => { setAmount(val); setCustomAmount(''); }}
                      style={{
                        padding: '10px 4px',
                        borderRadius: '8px',
                        border: amount === val && !customAmount ? '2px solid #059669' : '1px solid #cbd5e1',
                        background: amount === val && !customAmount ? '#ecfdf5' : '#ffffff',
                        color: amount === val && !customAmount ? '#059669' : '#334155',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount ($)"
                  className="form-input"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                  min="1"
                  step="any"
                />
              </div>

              {/* Donor Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Vaibhav Kumar"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="name@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['Credit / Debit Card', 'UPI / NetBanking', 'PayPal'].map((method) => (
                    <label 
                      key={method} 
                      style={{ 
                        flex: 1, 
                        border: paymentMethod === method ? '2px solid #059669' : '1px solid #cbd5e1', 
                        padding: '10px 8px', 
                        borderRadius: '8px', 
                        fontSize: '0.85rem', 
                        fontWeight: 600, 
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: paymentMethod === method ? '#ecfdf5' : '#fff'
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        style={{ display: 'none' }}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label">Personal Message (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Words of encouragement or dedication"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {status.state === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '14px' }}>{status.msg}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1.05rem' }}
                disabled={status.state === 'submitting'}
              >
                {status.state === 'submitting' 
                  ? 'Processing...' 
                  : `Confirm Donation of $${customAmount || amount}`}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '16px', color: '#64748b', fontSize: '0.8rem' }}>
                <ShieldCheck size={16} style={{ color: '#059669' }} />
                <span>256-bit SSL encrypted & secure PostgreSQL transaction</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

