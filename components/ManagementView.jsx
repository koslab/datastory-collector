import React from 'react';
import { Plus, FileText, Trash2, Edit3 } from 'lucide-react';

const ManagementView = ({ stories, setView, setEditingId, setStep, startEditStory, setStories }) => {
    return (
        <div className="animate-in fade-in duration-500 space-y-8">
            <div className="flex justify-between items-center border-b pb-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Collected DataStories</h2>
                    <p className="text-slate-500 mt-1 font-medium italic">Consolidated requirements for the Data Warehouse backlog.</p>
                </div>
                <button onClick={() => { setEditingId(null); setView('wizard'); setStep(1); }} className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
                    <Plus size={20} /> Capture New Story
                </button>
            </div>

            {stories.length === 0 ? (
                <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                    <FileText className="mx-auto text-slate-200 mb-6" size={64} />
                    <p className="text-slate-400 font-black text-xl tracking-tight uppercase">Backlog is currently empty</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {stories.map((s) => (
                        <div key={s.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group relative flex items-start gap-5">
                            {/* Icon */}
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                                <FileText size={18} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="text-base leading-snug font-medium text-slate-500 font-sans">
                                    <span>As a </span>
                                    <span className="text-slate-900 font-bold">{s.userRole}</span>
                                    <span>, I want to </span>
                                    <span className="text-indigo-600 font-bold">{s.action}</span>
                                    <span> showing </span>
                                    <span className="text-slate-900 font-bold">{s.metrics.join(', ')}</span>
                                    <span> over </span>
                                    <span className="text-slate-900 font-bold">{s.dimensions.join(', ')}</span>
                                    {s.filters && s.filters.length > 0 && (
                                        <>
                                            <span>, filterable by </span>
                                            <span className="text-slate-900 font-bold">{s.filters.join(', ')}</span>
                                        </>
                                    )}
                                    <span>, updated </span>
                                    <span className="text-indigo-600 font-bold">{s.frequency}</span>
                                    <span> so that </span>
                                    <span className="text-slate-900 font-bold">{s.value}</span>
                                    <span>.</span>
                                </div>

                                {/* Sources Pill List */}
                                <div className="mt-3 flex flex-wrap gap-2 items-center">
                                    {s.sources && s.sources.length > 0 && s.sources.map((src, i) => (
                                        <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black border border-indigo-100 uppercase tracking-widest">
                                            {src}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <button onClick={() => startEditStory(s)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100" title="Edit Story">
                                    <Edit3 size={14} />
                                </button>
                                <button onClick={() => setStories(stories.filter(i => i.id !== s.id))} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Delete Story">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManagementView;
