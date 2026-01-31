import React, { useState } from 'react';
import { AlertTriangle, Send, X } from 'lucide-react';

const PainPointForm = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        impact: '',
        suggestions: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim()) {
            onSave({
                ...formData,
                id: Date.now(),
                timestamp: new Date().toISOString()
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-100 text-indigo-600 mb-6 shadow-xl shadow-indigo-100/50">
                    <AlertTriangle size={32} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Capture Pain Point</h2>
                <p className="text-slate-500 font-medium italic">Describe the friction in your current workflow</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Pain Point Title</label>
                        <input
                            type="text"
                            required
                            placeholder="Briefly name the issue..."
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Existing Approach / System</label>
                        <textarea
                            required
                            placeholder="What are you using / doing now?"
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none min-h-[100px]"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Impact & Friction</label>
                        <textarea
                            required
                            placeholder="How does this slow you down or cause problems?"
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none min-h-[100px]"
                            value={formData.impact}
                            onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Suggested Improvements</label>
                        <textarea
                            placeholder="What would make this better?"
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none min-h-[100px]"
                            value={formData.suggestions}
                            onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 flex items-center justify-center gap-3 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
                    >
                        <X size={18} /> Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-[2] flex items-center justify-center gap-3 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/30"
                    >
                        <Send size={18} /> Save Pain Point
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PainPointForm;
