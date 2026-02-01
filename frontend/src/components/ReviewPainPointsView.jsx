import { AlertTriangle, Trash2, Calendar, FileText, Activity, Lightbulb, Edit3 } from 'lucide-react';
import ViewLayout from './ViewLayout';
import StarRating from './StarRating';

const ReviewPainPointsView = ({ painPoints, onDelete, onEdit, setView }) => {
    return (
        <ViewLayout
            title="Pain Point Registry"
            description="Tracking system frictions and workflow bottlenecks"
            maxWidthClass="max-w-5xl"
            isEmpty={painPoints.length === 0}
            emptyTitle="No Pain Points Recorded"
            emptyDescription="Start capturing frictions to help improve the system."
            EmptyIcon={AlertTriangle}
            action={
                <button
                    onClick={() => setView('painpoint_form')}
                    className="w-full md:w-auto h-[56px] flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 rounded-2xl font-black hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 whitespace-nowrap"
                >
                    <AlertTriangle size={20} /> New Pain Point
                </button>
            }
        >
            <div className="flex flex-col gap-4">
                {painPoints.map((pp) => (
                    <div key={pp.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-5 group relative hover:border-indigo-100 transition-all">

                        {/* Compact Header Section / Left Column */}
                        <div className="flex-1 min-w-0 flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 mt-1">
                                        <AlertTriangle size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">#{pp.id.toString().slice(-4)}</span>
                                            <span className="text-slate-300">•</span>
                                            <StarRating
                                                value={pp.importance || 0}
                                                readOnly={true}
                                                showLabels={false}
                                                size={12}
                                                label=""
                                                description=""
                                            />
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 leading-tight mb-2">{pp.title}</h3>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-slate-400" />
                                                <span>{new Date(pp.timestamp).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pl-[3.5rem] grid grid-cols-1 gap-3">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                                        <FileText size={12} />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Issue</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700 leading-snug">{pp.description}</p>
                                </div>

                                <div className="bg-rose-50/30 p-3 rounded-xl border border-rose-100/50">
                                    <div className="flex items-center gap-1.5 text-rose-400 mb-1">
                                        <Activity size={12} />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Impact</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700 leading-snug">{pp.impact}</p>
                                </div>

                                {pp.suggestions && (
                                    <div className="bg-emerald-50/30 p-3 rounded-xl border border-emerald-100/50">
                                        <div className="flex items-center gap-1.5 text-emerald-500 mb-1">
                                            <Lightbulb size={12} />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Fix</span>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-700 leading-snug">{pp.suggestions}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions Top Right (Mobile: Bottom row maybe?) - Sticking to top right for desktop, standard row for mobile if needed, but flex-row puts it side-by-side on desktop */}
                        <div className="flex md:flex-col gap-2 shrink-0 md:border-l md:border-slate-100 md:pl-5 md:ml-2 justify-center">
                            <button
                                onClick={() => onEdit(pp)}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all rounded-lg outline-none flex items-center gap-2 md:justify-center"
                                title="Edit Pain Point"
                            >
                                <Edit3 size={16} />
                                <span className="md:hidden text-xs font-bold">Edit</span>
                            </button>
                            <button
                                onClick={() => onDelete(pp.id)}
                                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-lg outline-none flex items-center gap-2 md:justify-center"
                                title="Delete Pain Point"
                            >
                                <Trash2 size={16} />
                                <span className="md:hidden text-xs font-bold">Delete</span>
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </ViewLayout>
    );
};

export default ReviewPainPointsView;
