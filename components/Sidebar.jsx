import React from 'react';
import { Database, Plus, ListFilter, CheckCircle2, History, BookOpen, Download, Grid, User } from 'lucide-react';

const Sidebar = ({ view, setView, stories, step, globalSuggestions, onViewYaml, userProfile, setShowProfileModal }) => {
    return (
        <div className="w-full md:w-80 bg-slate-900 text-white p-10 flex flex-col shrink-0 shadow-2xl z-20 h-screen lg:h-auto lg:min-h-full overflow-y-auto lg:overflow-visible">
            <div className="mb-12">
                <div className="flex items-center gap-3 text-indigo-400 mb-2">
                    <Database size={32} />
                    <span className="font-black tracking-tight text-2xl uppercase">DataStory Collector</span>
                </div>
                <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.3em]">Business Intelligence Engine</p>
            </div>

            <div className="space-y-2 mb-10">
                <button onClick={() => setView('wizard')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${view === 'wizard' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                    <Plus size={18} /> New Story
                </button>
                <button onClick={() => setView('manage')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${view === 'manage' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                    <ListFilter size={18} /> Review Collection ({stories.length})
                </button>
            </div>

            {view === 'wizard' && (
                <nav className="flex-1 space-y-6 pt-8 border-t border-slate-800/50">
                    {['Output', 'Metrics', 'Breakdown', 'Impact', 'Sources'].map((label, idx) => {
                        const stepNum = idx + 1;
                        return (
                            <div key={label} className={`flex items-center gap-4 transition-all ${step === stepNum ? 'text-white' : 'text-slate-50'}`}>
                                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black border-2 transition-all ${step === stepNum ? 'border-indigo-500 bg-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20' : step > stepNum ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-800 bg-slate-800/50 text-slate-500'}`}>
                                    {step > stepNum ? <CheckCircle2 size={16} /> : stepNum}
                                </div>
                                <span className={`text-xs font-black uppercase tracking-widest ${step === stepNum ? 'opacity-100' : 'opacity-40'}`}>
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </nav>
            )}

            <div className="mt-auto pt-10 border-t border-slate-800/50 space-y-4">
                <div className="bg-white/5 p-5 rounded-3xl border border-white/5 space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-indigo-400">
                            <History size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Library Memory</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-400 font-black uppercase tracking-tighter">
                            <div className="flex flex-col"><span className="text-white text-base leading-none">{globalSuggestions.metrics.length}</span> Metrics</div>
                            <div className="flex flex-col"><span className="text-white text-base leading-none">{globalSuggestions.dimensions.length}</span> Dims</div>
                        </div>
                    </div>

                    <button
                        onClick={() => setView('library')}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'library' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-indigo-300 hover:bg-white/20'}`}
                    >
                        <BookOpen size={14} /> Explore Library
                    </button>
                </div>

                <button
                    onClick={() => setView('matrix')}
                    disabled={stories.length === 0}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all disabled:opacity-20 disabled:grayscale hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-900/20"
                >
                    <Grid size={18} /> EDW Bus Matrix
                </button>

                <button
                    onClick={onViewYaml}
                    disabled={stories.length === 0}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all disabled:opacity-20 disabled:grayscale hover:bg-emerald-700 active:scale-95 shadow-lg shadow-emerald-900/20"
                >
                    <Download size={18} /> View YAML
                </button>

                <button
                    onClick={() => setShowProfileModal(true)}
                    className="w-full flex items-center gap-3 bg-white/5 border border-white/5 px-5 py-3 rounded-2xl hover:bg-white/10 transition-all group active:scale-95"
                >
                    <div className="w-8 h-8 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                        {userProfile.fullName ? userProfile.fullName.charAt(0).toUpperCase() : <User size={14} />}
                    </div>
                    <div className="text-left overflow-hidden">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">Profile</div>
                        <div className="text-xs font-bold text-white leading-none whitespace-nowrap overflow-hidden text-ellipsis">{userProfile.fullName || 'Complete Profile'}</div>
                        {userProfile.fullName && (
                            <div className="text-[9px] text-slate-500 mt-1 font-medium leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                                {userProfile.email}
                            </div>
                        )}
                    </div>
                </button>

                <div className="pt-4 flex flex-col items-center gap-1">
                    <a href="https://kagesenshi.org" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold tracking-widest text-slate-600 hover:text-indigo-400 transition-colors">
                        (c) kagesenshi.org
                    </a>
                    <div className="text-[10px] font-bold tracking-widest text-slate-600 flex items-center gap-1">
                        <span>Licensed under</span>
                        <a href="https://www.gnu.org/licenses/agpl-3.0.en.html#license-text" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                            AGPL v3
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
