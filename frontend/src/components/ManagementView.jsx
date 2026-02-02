import React, { useState } from 'react';
import { Plus, FileText, Trash2, Edit3, Database, Calendar } from 'lucide-react';
import StarSchemaView from './StarSchemaView';
import ViewLayout from './ViewLayout';
import StarRating from './StarRating';

const ManagementView = ({ stories, setView, setEditingId, setStep, startEditStory, setStories }) => {
    const [selectedStoryForSchema, setSelectedStoryForSchema] = useState(null);

    return (
        <ViewLayout
            title="Collected DataStories"
            description="Consolidated requirements for the Data Warehouse backlog."
            isEmpty={stories.length === 0}
            emptyTitle="Backlog is currently empty"
            emptyDescription=""
            EmptyIcon={FileText}
            action={
                <button
                    onClick={() => { setEditingId(null); setView('wizard'); setStep(1); }}
                    className="w-full md:w-auto h-[56px] flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 rounded-2xl font-black hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 whitespace-nowrap"
                >
                    <Plus size={20} /> Capture New Story
                </button>
            }
        >
            <div className="grid grid-cols-1 gap-6">
                {stories.map((s) => (
                    <div key={s.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group relative flex flex-col md:flex-row items-start gap-5">
                        {/* Icon and Main Content Wrapper */}
                        <div className="flex items-start gap-5 w-full flex-1">
                            {/* Icon */}
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                                <FileText size={18} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">#{s.id.toString().slice(-4)}</span>
                                    <span className="text-slate-300">•</span>
                                    <StarRating
                                        value={s.importance || 0}
                                        readOnly={true}
                                        showLabels={false}
                                        size={12}
                                        label=""
                                        description=""
                                    />
                                </div>
                                <div className="text-base leading-snug font-medium text-slate-500 font-sans">
                                    <span>As a </span>
                                    <span className="text-slate-900 font-bold">{s.userRole}</span>
                                    <span>, I want to </span>
                                    <span className="text-indigo-600 font-bold">{s.action}</span>
                                    <span> showing </span>
                                    <span className="text-slate-900 font-bold">{s.metrics.join(', ')}</span>
                                    <span> over </span>
                                    <span className="text-slate-900 font-bold">{s.dimensions.join(', ')}</span>
                                    {s.granularity && (
                                        <>
                                            <span> at </span>
                                            <span className="text-indigo-600 font-bold">{s.granularity}</span>
                                            <span> granularity</span>
                                        </>
                                    )}
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
                        </div>

                        {/* Actions */}
                        <div className="w-full md:w-auto flex flex-row gap-3 md:gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0 mt-4 pt-4 border-t border-slate-100 md:mt-0 md:pt-0 md:border-none">
                            <button onClick={() => setSelectedStoryForSchema(s)} className="flex-1 md:flex-none flex items-center justify-center gap-2 p-3 md:p-1.5 text-slate-600 md:text-slate-400 hover:text-indigo-600 bg-slate-50 md:bg-transparent hover:bg-indigo-50 rounded-xl md:rounded-lg transition-colors border border-slate-200 md:border-transparent hover:border-indigo-100" title="View Star Schema">
                                <Database size={16} />
                                <span className="md:hidden text-xs font-black uppercase tracking-wider">Schema</span>
                            </button>
                            <button onClick={() => startEditStory(s)} className="flex-1 md:flex-none flex items-center justify-center gap-2 p-3 md:p-1.5 text-slate-600 md:text-slate-400 hover:text-indigo-600 bg-slate-50 md:bg-transparent hover:bg-indigo-50 rounded-xl md:rounded-lg transition-colors border border-slate-200 md:border-transparent hover:border-indigo-100" title="Edit Story">
                                <Edit3 size={16} />
                                <span className="md:hidden text-xs font-black uppercase tracking-wider">Edit</span>
                            </button>
                            <button onClick={() => setStories(stories.filter(i => i.id !== s.id))} className="flex-1 md:flex-none flex items-center justify-center gap-2 p-3 md:p-1.5 text-slate-600 md:text-slate-400 hover:text-red-600 bg-slate-50 md:bg-transparent hover:bg-red-50 rounded-xl md:rounded-lg transition-colors border border-slate-200 md:border-transparent hover:border-red-100" title="Delete Story">
                                <Trash2 size={16} />
                                <span className="md:hidden text-xs font-black uppercase tracking-wider">Delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedStoryForSchema && (
                <StarSchemaView
                    story={selectedStoryForSchema}
                    onClose={() => setSelectedStoryForSchema(null)}
                />
            )}
        </ViewLayout>
    );
};

export default ManagementView;
