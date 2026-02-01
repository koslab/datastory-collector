import React, { useState } from 'react';
import { Copy, Check, ArrowLeft, FileText, Mail, Send, Loader2 } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { submitStory } from '../api';
import yaml from 'js-yaml';

const YamlPreview = ({ content, onClose, userProfile }) => {
    const [copied, setCopied] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(null);
        try {
            const storyData = yaml.load(content);
            await submitStory(storyData);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        } catch (err) {
            setError('Failed to submit. Is the backend running?');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    const handleEmail = () => {
        const subject = encodeURIComponent("DataStory Backlog YAML");
        const userName = userProfile?.fullName || 'User';
        const department = userProfile?.department;
        const company = userProfile?.company;
        const role = userProfile?.role;

        let intro = `I am ${userName}`;
        if (role) intro += `, ${role}`;
        if (department) intro += ` from ${department}`;
        if (company) intro += ` at ${company}`;
        intro += ".";

        const emailBody = `Hi,

${intro} Please find the DataStory backlog YAML below:

${content}`;
        const body = encodeURIComponent(emailBody);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            <div className="flex justify-between items-center border-b pb-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Backlog YAML</h2>
                    <p className="text-slate-500 mt-1 font-medium italic">Raw source for your DataStory backlog.</p>
                </div>
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-800 font-black text-xs uppercase tracking-[0.2em] px-6 py-3 transition-all"
                >
                    <ArrowLeft size={16} /> Return
                </button>
            </div>

            <div className="relative group">
                <div className="absolute right-4 top-4 z-10 flex gap-2">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || submitted}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all ${submitted
                            ? 'bg-emerald-500 text-white'
                            : submitting
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                    >
                        {submitting ? (
                            <><Loader2 className="animate-spin" size={14} /> Submitting</>
                        ) : submitted ? (
                            <><Check size={14} /> Submitted</>
                        ) : (
                            <><Send size={14} /> Submit</>
                        )}
                    </button>
                    <button
                        onClick={handleEmail}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all bg-white text-slate-800 hover:bg-slate-50"
                    >
                        <Mail size={14} /> Email
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all ${copied
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white text-slate-800 hover:bg-slate-50'
                            }`}
                    >
                        {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy YAML</>}
                    </button>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-700" style={{ backgroundColor: '#263238' }}>
                    <SyntaxHighlighter
                        language="yaml"
                        style={materialOceanic}
                        customStyle={{
                            background: 'transparent',
                            padding: '2rem',
                            margin: 0,
                            borderRadius: '1.5rem',
                            fontSize: '0.875rem',
                            maxHeight: '60vh',
                            overflow: 'auto'
                        }}
                        codeTagProps={{
                            style: { background: 'transparent' }
                        }}
                        showLineNumbers={true}
                        wrapLines={true}
                    >
                        {content}
                    </SyntaxHighlighter>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4">
                <div className="text-red-500 text-xs font-bold uppercase tracking-wider animate-pulse">
                    {error}
                </div>
                <p className="text-slate-400 text-xs font-medium italic">
                    Use this YAML content to import into other tools or version control systems.
                </p>
            </div>
        </div>
    );
};

export default YamlPreview;
