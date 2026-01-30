import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import MultiInput from './MultiInput';

const Wizard = ({
    step,
    currentStory,
    setCurrentStory,
    tempInputs,
    setTempInputs,
    addItem,
    removeItem,
    globalSuggestions,
    config,
    saveStory,
    editingId
}) => {
    switch (step) {
        case 1:
            return (
                <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="border-b pb-4">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Step 1: I want to...</h2>
                        <p className="text-slate-500 font-medium italic">Choose how you will consume this data.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {config.actions.map((opt) => (
                            <button key={opt} onClick={() => setCurrentStory({ ...currentStory, action: opt })} className={`text-left p-5 rounded-2xl border-2 transition-all shadow-sm ${currentStory.action === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-black' : 'border-slate-100 hover:border-indigo-200 bg-white text-slate-600 font-bold'}`}>
                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            );
        case 2:
            return (
                <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="border-b pb-4">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Step 2: ... showing ...</h2>
                        <p className="text-slate-500 font-medium italic">What is the specific thing you want to see or measure?</p>
                    </div>
                    <MultiInput
                        label="Primary Metrics"
                        field="metrics"
                        placeholder="e.g., Total Revenue, Number of New Customers, Churn Rate"
                        description="The numerical values you want to track. Think 'What number am I looking for?'"
                        tempInputs={tempInputs}
                        setTempInputs={setTempInputs}
                        addItem={addItem}
                        removeItem={removeItem}
                        currentItems={currentStory.metrics}
                        suggestions={globalSuggestions.metrics}
                    />
                </div>
            );
        case 3:
            return (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="border-b pb-4">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Step 3: ... over ... filterable by ... </h2>
                        <p className="text-slate-500 font-medium italic">How do you want to break down or filter this information?</p>
                    </div>
                    <div className="space-y-6">
                        <MultiInput
                            label="Breakdown Dimensions"
                            field="dimensions"
                            placeholder="e.g., Region, Product Category, Sales Rep"
                            description="How you want to group your data. Think 'I want to see metrics BY...' (e.g., BY Region)."
                            tempInputs={tempInputs}
                            setTempInputs={setTempInputs}
                            addItem={addItem}
                            removeItem={removeItem}
                            currentItems={currentStory.dimensions}
                            suggestions={globalSuggestions.dimensions}
                        />
                        <MultiInput
                            label="Dynamic Filters"
                            field="filters"
                            placeholder="e.g., Date Range, VIP Status, Active vs. Inactive"
                            description="The toggle options you need to narrow down the view. Think 'I want to be able to FILTER out everything EXCEPT...'"
                            tempInputs={tempInputs}
                            setTempInputs={setTempInputs}
                            addItem={addItem}
                            removeItem={removeItem}
                            currentItems={currentStory.filters}
                            suggestions={globalSuggestions.dimensions}
                        />
                    </div>
                </div>
            );
        case 4:
            return (
                <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="border-b pb-4">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Step 4: ... updated ... so that ... </h2>
                        <p className="text-slate-500 font-medium italic">Specify the data freshness and business justification.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Granularity</label>
                            <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">The level of detail required for each data point (e.g., daily totals vs. individual transaction records).</p>
                            <select className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold" value={currentStory.granularity} onChange={(e) => setCurrentStory({ ...currentStory, granularity: e.target.value })}>
                                <option value="">(Unspecified)</option>
                                <option>Individual records</option><option>Hourly</option><option>Daily</option><option>Weekly</option><option>Monthly</option><option>Quarterly</option><option>Yearly</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Refresh Frequency</label>
                            <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">How often the data should be updated in the system (e.g., in real-time or just once a day).</p>
                            <select className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold" value={currentStory.frequency} onChange={(e) => setCurrentStory({ ...currentStory, frequency: e.target.value })}>
                                <option>Real-time</option><option>Hourly</option><option>Daily</option><option>Weekly</option><option>Monthly</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Purpose / Business Value</label>
                            <p className="text-[10px] text-slate-400 font-medium italic">Describe how this data helps you make better decisions or solve a problem.</p>
                            <textarea className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 h-32 font-medium leading-relaxed" placeholder="Briefly explain: I can use this to [action] which will result in [benefit]..." value={currentStory.value} onChange={(e) => setCurrentStory({ ...currentStory, value: e.target.value })} />
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Operational Dependency</label>
                                <p className="text-[10px] text-slate-400 font-medium italic">How critical is this data to your daily work?</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() => setCurrentStory({ ...currentStory, importance: rating })}
                                            onMouseEnter={() => setCurrentStory(prev => ({ ...prev, _tempImportance: rating }))}
                                            onMouseLeave={() => setCurrentStory(prev => {
                                                const { _tempImportance, ...rest } = prev;
                                                return rest;
                                            })}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={32}
                                                className={`transition-colors ${(currentStory._tempImportance || currentStory.importance) >= rating
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'fill-slate-100 text-slate-200'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <div className="text-sm font-bold text-slate-600 h-5">
                                    {(currentStory._tempImportance || currentStory.importance) === 1 && "Minimal - Informational only"}
                                    {(currentStory._tempImportance || currentStory.importance) === 2 && "Low - Convenient but optional"}
                                    {(currentStory._tempImportance || currentStory.importance) === 3 && "Medium - Improves efficiency"}
                                    {(currentStory._tempImportance || currentStory.importance) === 4 && "High - Key performance driver"}
                                    {(currentStory._tempImportance || currentStory.importance) === 5 && "Critical - Essential for operations"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 5:
            return (
                <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="border-b pb-4">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Step 5: Where is this data?</h2>
                        <p className="text-slate-500 font-medium italic">If you know where this information lives today, let us know.</p>
                    </div>
                    <MultiInput
                        label="Source Systems"
                        field="sources"
                        placeholder="e.g., Salesforce, Google Analytics, Excel Spreadsheet, legacy DB"
                        description="The applications or databases where this data originates."
                        tempInputs={tempInputs}
                        setTempInputs={setTempInputs}
                        addItem={addItem}
                        removeItem={removeItem}
                        currentItems={currentStory.sources}
                        suggestions={globalSuggestions.sources}
                    />
                    <div className="pt-6">
                        <button onClick={saveStory} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2 active:scale-95">
                            <CheckCircle2 size={24} />
                            {editingId ? 'Refine Collector Entry' : 'Add to Collection'}
                        </button>
                    </div>
                </div>
            );
        default: return null;
    }
};

export default Wizard;
