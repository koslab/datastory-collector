import { AlertTriangle, Trash2, Calendar, FileText, Activity, Lightbulb } from 'lucide-react';
import ViewLayout from './ViewLayout';

const ReviewPainPointsView = ({ painPoints, onDelete, setView }) => {
    return (
        <ViewLayout
            title="Pain Point Registry"
            description="Tracking system frictions and workflow bottlenecks"
            maxWidthClass="max-w-5xl"
            action={
                <button
                    onClick={() => setView('painpoint_form')}
                    className="w-full md:w-auto h-[56px] flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 rounded-2xl font-black hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 whitespace-nowrap"
                >
                    <AlertTriangle size={20} /> New Pain Point
                </button>
            }
        >

            {painPoints.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-6">
                        <AlertTriangle size={40} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 uppercase mb-2">No Pain Points Recorded</h3>
                    <p className="text-slate-500 mb-8">Start capturing frictions to help improve the system.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {painPoints.map((pp) => (
                        <div key={pp.id} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col relative group">
                            <button
                                onClick={() => onDelete(pp.id)}
                                className="absolute top-6 right-6 p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-xl outline-none"
                                title="Delete Pain Point"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="flex items-center gap-3 text-indigo-600 mb-6">
                                <AlertTriangle size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Pain Point #{pp.id.toString().slice(-4)}</span>
                            </div>

                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6 pr-10">{pp.title}</h3>

                            <div className="space-y-6 flex-1">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <FileText size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Existing Approach</span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{pp.description}</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-rose-400">
                                        <Activity size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Impact</span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-600 leading-relaxed bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50">{pp.impact}</p>
                                </div>

                                {pp.suggestions && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-emerald-500">
                                            <Lightbulb size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Suggested Fix</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-600 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">{pp.suggestions}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        {new Date(pp.timestamp).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ViewLayout>
    );
};

export default ReviewPainPointsView;
