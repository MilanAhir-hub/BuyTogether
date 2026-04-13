import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDeal } from '../../services/dealService';
import { PlusCircle, Clock, Users, Tag } from 'lucide-react';

const CreateDeal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    originalPrice: '',
    groupPrice: '',
    minBuyers: 2,
    maxBuyers: '',
    expiryDurationHours: 24
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Clean up number formats
      const payload = {
        ...formData,
        originalPrice: parseFloat(formData.originalPrice),
        groupPrice: parseFloat(formData.groupPrice),
        minBuyers: parseInt(formData.minBuyers, 10),
        maxBuyers: formData.maxBuyers ? parseInt(formData.maxBuyers, 10) : null,
        expiryDurationHours: parseInt(formData.expiryDurationHours, 10)
      };
      
      const res = await createDeal(payload);
      if (res.success) {
        navigate('/deals');
      } else {
        setError(res.message || 'Failed to create deal.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_34%,#fff7f2_100%)] text-secondary font-sans py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-secondary">
            Create a <span className="font-medium text-primary">Together Deal</span>
          </h1>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            Configure a new group buying offering. Set the price drop threshold and the expiration window to incentivize sharing.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-none mb-8 backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-none p-8 border border-slate-200 shadow-xl space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Target Product</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. MacBook Pro M3 Max"
              className="w-full bg-slate-50 border border-slate-200 rounded-none px-4 py-3 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Product Image URL (Optional)</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-slate-50 border border-slate-200 rounded-none px-4 py-3 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Pitch / Description</label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-none px-4 py-3 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Tag size={16} className="text-slate-400"/> Retail Price ($)
              </label>
              <input
                type="number"
                name="originalPrice"
                required
                min="0"
                step="0.01"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-none px-4 py-3 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-emerald-600 flex items-center gap-2">
                <Tag size={16} /> Group Deal Price ($)
              </label>
              <input
                type="number"
                name="groupPrice"
                required
                min="0"
                step="0.01"
                value={formData.groupPrice}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-none px-4 py-3 text-emerald-600 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary flex items-center gap-2">
                <Users size={16} /> Min. Buyers Required
              </label>
              <input
                type="number"
                name="minBuyers"
                required
                min="2"
                value={formData.minBuyers}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-none px-4 py-3 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Users size={16} className="text-slate-400"/> Max Buyers (Cap)
              </label>
              <input
                type="number"
                name="maxBuyers"
                min="2"
                value={formData.maxBuyers}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full bg-slate-50 border border-slate-200 rounded-none px-4 py-3 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-orange-500 flex items-center gap-2">
                <Clock size={16} /> Expiration Window (Hours)
              </label>
              <input
                type="number"
                name="expiryDurationHours"
                required
                min="1"
                value={formData.expiryDurationHours}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-none px-4 py-3 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <p className="text-xs text-slate-400 mt-1">If the minimum buyers are not reached within this time, the group cancels.</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white font-bold rounded-none hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
            >
              {loading ? 'Creating Deal...' : (
                <>
                  <PlusCircle size={20} />
                  Publish Deal
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateDeal;
