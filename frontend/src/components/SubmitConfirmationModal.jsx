import React from 'react';
import { Database, Send, X } from 'lucide-react';

const SubmitConfirmationModal = ({ onConfirm, onCancel, isOpen, isSubmitting }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-indigo-100">
                <div className="px-8 pt-8 pb-4 text-center bg-gradient-to-br from-indigo-50 to-white border-b border-indigo-50">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-indigo-600 text-white shadow-xl shadow-indigo-100 mb-6 group transition-transform hover:scale-105">
                        <Database size={32} className="group-hover:animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">Confirm Submission</h2>
                    <p className="text-slate-500 text-sm font-medium italic px-4 leading-relaxed">
                        This information will now be <span className="text-indigo-600 font-bold">captured inside our database</span>. Are you sure you want to proceed?
                    </p>
                </div>

                <div className="p-8 space-y-4">
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onConfirm}
                            disabled={isSubmitting}
                            className="w-full py-4 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-all hover:bg-slate-900 active:scale-95 shadow-xl shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} /> Confirm Submission
                        </button>

                        <button
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="w-full py-4 bg-slate-50 text-slate-500 rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all hover:bg-slate-100 active:scale-95 disabled:opacity-50"
                        >
                            <X size={16} /> Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitConfirmationModal;
