import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EmailGenerator.css';

const EmailGenerator = ({ customers, deals }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedDealId, setSelectedDealId] = useState('');
  const [templateType, setTemplateType] = useState('followup');
  const [emailTemplate, setEmailTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const templateTypes = [
    { value: 'followup', label: 'Follow-up' },
    { value: 'closeout', label: 'Close-out' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'introduction', label: 'Introduction' },
    { value: 'proposal', label: 'Proposal' },
  ];

  const generateEmail = async () => {
    if (!selectedCustomerId) {
      setError('Please select a customer');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/ai/email-template', {
        customerId: selectedCustomerId,
        dealId: selectedDealId || null,
        templateType,
      });
      setEmailTemplate(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate email');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const text = `Subject: ${emailTemplate.subject}\n\n${emailTemplate.body}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const customerDeals = deals && deals.filter((d) => d.customerId === parseInt(selectedCustomerId));

  return (
    <div className="email-generator-container">
      <div className="generator-header">
        <h2>📧 AI Email Template Generator</h2>
        <p>Generate professional sales emails customized for your customers</p>
      </div>

      <div className="generator-form">
        <div className="form-group">
          <label>Customer</label>
          <select
            value={selectedCustomerId}
            onChange={(e) => {
              setSelectedCustomerId(e.target.value);
              setSelectedDealId('');
            }}
            className="form-select"
          >
            <option value="">-- Select a Customer --</option>
            {customers && customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCustomerId && customerDeals && customerDeals.length > 0 && (
          <div className="form-group">
            <label>Deal (Optional)</label>
            <select
              value={selectedDealId}
              onChange={(e) => setSelectedDealId(e.target.value)}
              className="form-select"
            >
              <option value="">-- Select a Deal --</option>
              {customerDeals.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} (${d.value})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Email Type</label>
          <select
            value={templateType}
            onChange={(e) => setTemplateType(e.target.value)}
            className="form-select"
          >
            {templateTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <button onClick={generateEmail} disabled={loading} className="generate-btn">
          {loading ? 'Generating...' : 'Generate Email'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {emailTemplate && (
        <div className="email-preview">
          <div className="email-header">
            <h3>Generated Email</h3>
            <button onClick={copyToClipboard} className="copy-btn">
              {copied ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
          </div>

          <div className="email-content">
            <div className="email-subject">
              <strong>Subject:</strong> {emailTemplate.subject}
            </div>
            <div className="email-body">
              {emailTemplate.body.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailGenerator;
