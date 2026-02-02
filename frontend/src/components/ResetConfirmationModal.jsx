import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

const ResetConfirmationModal = ({ onConfirm, onCancel, isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-red-100">
                <div className="px-8 pt-8 pb-4 text-center bg-gradient-to-br from-red-50 to-white border-b border-red-50">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-red-600 text-white shadow-xl shadow-red-100 mb-6 group transition-transform hover:scale-105">
                        <AlertTriangle size={32} className="group-hover:animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">Reset Everything?</h2>
                    <p className="text-slate-500 text-sm font-medium italic px-4 leading-relaxed">
                        This action will <span className="text-red-600 font-bold">permanently delete</span> all your local data, including your profile, stories, and pain points.
                    </p>
                </div>

                <div className="p-8 space-y-4">
                    <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100/50">
                        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest text-center">
                            This cannot be undone
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onConfirm}
                            className="w-full py-4 bg-red-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-all hover:bg-slate-900 active:scale-95 shadow-xl shadow-red-200"
                        >
                            <Trash2 size={18} /> Reset Everything
                        </button>

                        <button
                            onClick={onCancel}
                            className="w-full py-4 bg-slate-50 text-slate-500 rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all hover:bg-slate-100 active:scale-95"
                        >
                            <X size={16} /> Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetConfirmationModal;
