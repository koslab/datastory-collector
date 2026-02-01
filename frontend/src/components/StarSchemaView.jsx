import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { X } from 'lucide-react';

mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
        primaryColor: '#6366f1',
        primaryTextColor: '#fff',
        primaryBorderColor: '#4f46e5',
        lineColor: '#6366f1',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#fff',
        tertiaryTextColor: '#1e293b',
        fontFamily: 'Inter, system-ui, sans-serif'
    },
    themeCSS: `
        /* Class Diagram Styling */
        .classTitle {
            font-weight: 800 !important;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .classGroup rect {
            stroke-width: 2px !important;
        }
        .classGroup .titleText {
            fill: #ffffff !important;
        }
        /* Style for members/attributes */
        svg [id^="mermaid-"] .classGroup .label text {
            fill: #1e293b !important;
            font-weight: 600 !important;
            font-size: 14px !important;
        }
        /* Hide visibility markers if any */
        .visibility {
            display: none !important;
        }
    `
});

const StarSchemaView = ({ story, onClose }) => {
    const containerRef = useRef(null);

    const fullStoryStatement = story ? (
        <>
            <span>As a </span>
            <span className="text-slate-900 font-bold">{story.userRole}</span>
            <span>, I want to </span>
            <span className="text-indigo-600 font-bold">{story.action}</span>
            <span> showing </span>
            <span className="text-slate-900 font-bold">{story.metrics.join(', ')}</span>
            <span> over </span>
            <span className="text-slate-900 font-bold">{story.dimensions.join(', ')}</span>
            {story.granularity && (
                <>
                    <span> at </span>
                    <span className="text-indigo-600 font-bold">{story.granularity}</span>
                    <span> granularity</span>
                </>
            )}
            {story.filters && story.filters.length > 0 && (
                <>
                    <span>, filterable by </span>
                    <span className="text-slate-900 font-bold">{story.filters.join(', ')}</span>
                </>
            )}
            <span>, updated </span>
            <span className="text-indigo-600 font-bold">{story.frequency}</span>
            <span> so that </span>
            <span className="text-slate-900 font-bold">{story.value}</span>
            <span>.</span>
        </>
    ) : null;

    useEffect(() => {
        let isMounted = true;
        if (containerRef.current && story) {
            const renderDiagram = async () => {
                try {
                    const factName = "Fact_Table";
                    let diagramText = `classDiagram\n`;

                    // Fact Table with Metrics (members in class diagram don't require types)
                    diagramText += `    class ${factName} {\n`;
                    story.metrics.forEach(m => {
                        const safeMetric = m.replace(/[^a-zA-Z0-9]/g, '_');
                        diagramText += `        ${safeMetric}\n`;
                    });
                    diagramText += `    }\n`;

                    // Dimensions
                    story.dimensions.forEach(d => {
                        const safeDim = d.replace(/[^a-zA-Z0-9]/g, '_');
                        diagramText += `    class ${safeDim}\n`;
                        diagramText += `    ${factName} --* ${safeDim}\n`;
                    });

                    // Filters as additional dimensions if they aren't already in dimensions
                    const filterDimensions = story.filters.filter(f => !story.dimensions.includes(f));
                    filterDimensions.forEach(f => {
                        const safeFilter = f.replace(/[^a-zA-Z0-9]/g, '_');
                        diagramText += `    class ${safeFilter}\n`;
                        diagramText += `    ${factName} --* ${safeFilter}\n`;
                    });

                    // Use a very unique ID for each render call to avoid cache/ID conflicts
                    const renderId = `mermaid-svg-${story.id}-${Math.floor(Math.random() * 1000000)}`;
                    const { svg } = await mermaid.render(renderId, diagramText);

                    if (isMounted && containerRef.current) {
                        containerRef.current.innerHTML = svg;
                    }
                } catch (error) {
                    console.error('Mermaid rendering failed', error);
                    if (isMounted && containerRef.current) {
                        containerRef.current.innerHTML = `
                            <div class="text-center p-8 bg-red-50 rounded-3xl border border-red-100 max-w-md">
                                <p class="text-red-500 font-black uppercase tracking-widest text-xs">Rendering Error</p>
                                <p class="text-slate-600 font-medium mt-2">Could not generate the data schema. Please ensure the story details are correctly formatted.</p>
                            </div>
                        `;
                    }
                }
            };

            renderDiagram();
        }
        return () => { isMounted = false; };
    }, [story]);

    if (!story) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Star Schema ERD</h3>
                        <div className="text-slate-500 font-medium mt-1 leading-relaxed">
                            <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest block mb-1">Visualization for story:</span>
                            {fullStoryStatement}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-8 bg-slate-50/50 flex items-center justify-center">
                    <div ref={containerRef} className="w-full flex justify-center">
                        <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-4 py-1 text-center text-slate-400 font-bold uppercase tracking-widest">
                                Generating Schema...
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-white border-t border-slate-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black hover:bg-slate-800 transition-all active:scale-95"
                    >
                        Close Schema
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StarSchemaView;
