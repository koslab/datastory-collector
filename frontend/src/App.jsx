import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    Edit3,
    User,
    Menu,
    X,
} from 'lucide-react';

// Import modular components
import MultiInput from './components/MultiInput';
import LibraryView from './components/LibraryView';
import Wizard from './components/Wizard';
import ManagementView from './components/ManagementView';
import Sidebar from './components/Sidebar';
import LiveLogicPreview from './components/LiveLogicPreview';
import UserProfileModal from './components/UserProfileModal';
import YamlPreview from './components/YamlPreview';
import EDWBusMatrix from './components/EDWBusMatrix';
import PainPointForm from './components/PainPointForm';
import config from './config.json';
import { fetchConfig } from './api';

const App = () => {
    const [view, setView] = useState('manage');
    const [configData, setConfigData] = useState(config);
    const [isConfigLoading, setIsConfigLoading] = useState(true);
    const [step, setStep] = useState(1);
    const [stories, setStories] = useState(() => {
        const saved = localStorage.getItem('datastory_stories');
        return saved ? JSON.parse(saved) : [];
    });
    const [editingId, setEditingId] = useState(null);
    const [editingPainPointId, setEditingPainPointId] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [yamlSource, setYamlSource] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [painPoints, setPainPoints] = useState(() => {
        const saved = localStorage.getItem('datastory_pain_points');
        return saved ? JSON.parse(saved) : [];
    });

    const [globalSuggestions, setGlobalSuggestions] = useState(() => {
        const saved = localStorage.getItem('datastory_suggestions');
        return saved ? JSON.parse(saved) : config;
    });

    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('datastory_user_profile');
        const profile = saved ? JSON.parse(saved) : { fullName: '', email: '', phone: '', role: '', department: '', company: '' };

        // Ensure sessionId exists
        if (!profile.sessionId) {
            profile.sessionId = crypto.randomUUID ? crypto.randomUUID() : `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        }
        return profile;
    });
    const [currentStory, setCurrentStory] = useState({
        action: 'view an interactive dashboard',
        metrics: [],
        dimensions: [],
        filters: [],
        frequency: 'Daily',
        granularity: '',
        value: '',
        importance: 0,
        sources: [],
        modules: []
    });

    const [tempInputs, setTempInputs] = useState({ metric: '', dimension: '', filter: '', source: '', module: '' });

    // Persistence Effects
    useEffect(() => {
        localStorage.setItem('datastory_stories', JSON.stringify(stories));
    }, [stories]);

    useEffect(() => {
        localStorage.setItem('datastory_suggestions', JSON.stringify(globalSuggestions));
    }, [globalSuggestions]);

    useEffect(() => {
        localStorage.setItem('datastory_user_profile', JSON.stringify(userProfile));
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem('datastory_pain_points', JSON.stringify(painPoints));
    }, [painPoints]);

    useEffect(() => {
        if (stories.length === 0 && painPoints.length === 0) {
            setYamlSource('');
            return;
        }

        const escape = (str) => {
            if (!str) return '""';
            const s = str.toString();
            if (s.includes('\n') || s.includes('"') || s.includes(':')) {
                return `"${s.replace(/"/g, '\\"')}"`;
            }
            return s;
        };

        const listItems = (arr, indent = '  ') => {
            if (!arr || arr.length === 0) return ' []';
            return '\n' + arr.map(item => `${indent}- ${escape(item)}`).join('\n');
        };

        const getIsoTimestamp = (str) => {
            if (!str) return '';
            try {
                let date = new Date(str);
                if (!isNaN(date.getTime())) return date.toISOString();
                const ddmmyyyy = str.match(/^(\d{2})\/(\d{2})\/(\d{4}),\s*(\d{2}):(\d{2}):(\d{2})$/);
                if (ddmmyyyy) {
                    const [_, day, month, year, hour, minute, second] = ddmmyyyy;
                    date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
                    if (!isNaN(date.getTime())) return date.toISOString();
                }
                return str;
            } catch (e) {
                return str;
            }
        };

        let yamlContent = `sessionId: ${escape(userProfile.sessionId)}
userName: ${escape(userProfile.fullName)}
userEmail: ${escape(userProfile.email)}
userRole: ${escape(userProfile.role)}
userDepartment: ${escape(userProfile.department)}`;

        if (stories.length > 0) {
            yamlContent += `
userStories:
${stories.map(s => {
                const isoTime = getIsoTimestamp(s.timestamp);
                const finalTime = isoTime !== s.timestamp || (isoTime.includes('T') && isoTime.endsWith('Z')) ? isoTime : escape(isoTime);

                return `  - id: ${s.id}
    action: ${escape(s.action)}
    systemModules:${listItems(s.modules, '    ')}
    metrics:${listItems(s.metrics, '    ')}
    dimensions:${listItems(s.dimensions, '    ')}
    filters:${listItems(s.filters, '    ')}
    frequency: ${escape(s.frequency)}
${s.granularity ? `    granularity: ${escape(s.granularity)}` : ''}
    businessValue: ${escape(s.value)}
    importance: ${escape(s.importance)}
    sourceSystems:${listItems(s.sources, '    ')}
    timestamp: ${finalTime}`;
            }).join('\n')}`;
        }

        if (painPoints.length > 0) {
            yamlContent += `
userPainPoints:
${painPoints.map(pp => {
                return `  - id: ${pp.id}
    title: ${escape(pp.title)}
    description: ${escape(pp.description)}
    impact: ${escape(pp.impact)}
    suggestions: ${escape(pp.suggestions)}
    importance: ${escape(pp.importance)}
    timestamp: ${getIsoTimestamp(pp.timestamp)}`;
            }).join('\n')}`;
        }

        setYamlSource(yamlContent);
    }, [stories, painPoints, userProfile, view]);

    useEffect(() => {
        const isComplete = userProfile.fullName && userProfile.email && userProfile.role;
        if (!isComplete) {
            setShowProfileModal(true);
        }
    }, []);

    // Fetch config from backend
    useEffect(() => {
        const loadConfig = async () => {
            try {
                const data = await fetchConfig();
                setConfigData(data);

                // Update global suggestions if they haven't been customized by user yet
                const saved = localStorage.getItem('datastory_suggestions');
                if (!saved) {
                    setGlobalSuggestions(data);
                }
            } catch (error) {
                console.error('Failed to load config:', error);
            } finally {
                setIsConfigLoading(false);
            }
        };

        loadConfig();
    }, []);

    const handleProfileChange = (e) => setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const addItem = (field, value) => {
        if (!value || !value.trim()) return;
        const cleanValue = value.trim();
        setCurrentStory(prev => ({
            ...prev,
            [field]: [...new Set([...prev[field], cleanValue])]
        }));
        setTempInputs(prev => ({ ...prev, [field.slice(0, -1)]: '' }));
    };

    const removeItem = (field, index) => {
        setCurrentStory(prev => {
            const newList = [...prev[field]];
            newList.splice(index, 1);
            return { ...prev, [field]: newList };
        });
    };

    const updateGlobalMemory = (story) => {
        setGlobalSuggestions(prev => {
            const updated = { ...prev };

            // Metrics
            updated.metrics = Array.from(new Set([...prev.metrics, ...(story.metrics || [])])).sort();

            // Dimensions (merging both dimensions and filters into the dimensions pool)
            updated.dimensions = Array.from(new Set([
                ...prev.dimensions,
                ...(story.dimensions || []),
                ...(story.filters || [])
            ])).sort();

            // Sources
            updated.sources = Array.from(new Set([...prev.sources, ...(story.sources || [])])).sort();

            return updated;
        });
    };

    const saveStory = () => {
        if (editingId) {
            setStories(stories.map(s => s.id === editingId ? {
                ...currentStory,
                id: editingId,
                sessionId: userProfile.sessionId,
                submittedBy: userProfile.fullName,
                userRole: userProfile.role,
                userEmail: userProfile.email,
                userDepartment: userProfile.department,
                timestamp: new Date().toISOString()
            } : s));
            setEditingId(null);
        } else {
            setStories([...stories, {
                ...currentStory,
                id: Date.now(),
                sessionId: userProfile.sessionId,
                submittedBy: userProfile.fullName,
                userRole: userProfile.role,
                userEmail: userProfile.email,
                userDepartment: userProfile.department,
                timestamp: new Date().toISOString()
            }]);
        }
        updateGlobalMemory(currentStory);
        setCurrentStory({ action: 'view an interactive dashboard', metrics: [], dimensions: [], filters: [], frequency: 'Daily', granularity: '', value: '', importance: 0, sources: [], modules: [] });
        setStep(1);
        setView('manage');
    };

    const startEditStory = (story) => {
        setCurrentStory(story);
        setEditingId(story.id);
        setStep(1);
        setView('wizard');
    };

    const startEditPainPoint = (painPoint) => {
        setEditingPainPointId(painPoint.id);
        setView('painpoint_form');
    };

    const savePainPoint = (painPoint) => {
        if (editingPainPointId) {
            setPainPoints(painPoints.map(pp => pp.id === editingPainPointId ? {
                ...painPoint,
                id: editingPainPointId,
                sessionId: userProfile.sessionId,
                submittedBy: userProfile.fullName,
                userRole: userProfile.role,
                userEmail: userProfile.email,
                userDepartment: userProfile.department,
                timestamp: new Date().toISOString()
            } : pp));
            setEditingPainPointId(null);
        } else {
            setPainPoints([...painPoints, {
                ...painPoint,
                sessionId: userProfile.sessionId,
                submittedBy: userProfile.fullName,
                userRole: userProfile.role,
                userEmail: userProfile.email,
                userDepartment: userProfile.department
            }]);
        }
        setView('painpoint_review');
    };

    const deletePainPoint = (id) => {
        setPainPoints(painPoints.filter(pp => pp.id !== id));
    };


    const canProgress = () => {
        if (step === 2) return currentStory.metrics.length > 0;
        if (step === 3) return currentStory.dimensions.length > 0;
        if (step === 4) return currentStory.value.length > 5;
        return true;
    };

    const handleSetView = (newView) => {
        setView(newView);
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 relative">

            {/* Mobile Sidebar Toggle Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-3 bg-slate-900 text-white rounded-full shadow-xl hover:bg-slate-800 transition-all active:scale-95"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out lg:shadow-none
                ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
                lg:relative lg:translate-x-0 lg:transform-none lg:flex lg:flex-col
            `}>
                <Sidebar
                    view={view}
                    setView={handleSetView}
                    stories={stories}
                    painPoints={painPoints}
                    step={step}
                    globalSuggestions={globalSuggestions}
                    onViewYaml={() => { setView('yaml'); setIsSidebarOpen(false); }}
                    userProfile={userProfile}
                    setShowProfileModal={setShowProfileModal}
                />
            </div>

            <div className="flex-1 flex flex-col xl:flex-row">
                <div className="flex-1 flex flex-col p-4 md:p-16 relative">

                    <div className="max-w-5xl mx-auto w-full">
                        {/* Branding Logo */}
                        {configData.branding?.logo && (
                            <div className="mb-12 flex justify-start">
                                <img
                                    src={configData.branding.logo}
                                    alt="Branding Logo"
                                    className="max-h-12 object-contain"
                                />
                            </div>
                        )}

                        {view === 'wizard' ? (
                            <div className="max-w-2xl mx-auto">
                                {editingId && (
                                    <div className="mb-8 flex items-center justify-between p-6 bg-amber-50 border border-amber-100 rounded-[2rem] shadow-sm">
                                        <div className="flex items-center gap-3 text-amber-900 font-black text-sm uppercase tracking-tight">
                                            <Edit3 size={18} /> Refining DataStory #{editingId.toString().slice(-4)}
                                        </div>
                                        <button onClick={() => { setEditingId(null); setView('manage'); }} className="text-amber-700 hover:text-amber-900 text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-amber-200 transition-all shadow-sm">Exit Editing</button>
                                    </div>
                                )}
                                <Wizard
                                    step={step}
                                    currentStory={currentStory}
                                    setCurrentStory={setCurrentStory}
                                    tempInputs={tempInputs}
                                    setTempInputs={setTempInputs}
                                    addItem={addItem}
                                    removeItem={removeItem}
                                    globalSuggestions={globalSuggestions}
                                    config={configData}
                                    saveStory={saveStory}
                                    editingId={editingId}
                                />
                                <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-10">
                                    {step > 1 && <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 hover:text-slate-800 font-black text-xs uppercase tracking-[0.2em] px-6 py-3 transition-all"><ChevronLeft size={20} /> Previous</button>}
                                    <div className="flex-1"></div>
                                    {step < 5 && <button onClick={nextStep} disabled={!canProgress()} className={`flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all ${!canProgress() ? 'opacity-20 cursor-not-allowed' : 'hover:bg-black active:scale-95'}`}>Next<ChevronRight size={20} /></button>}
                                </div>
                            </div>
                        ) : view === 'library' ? (
                            <LibraryView globalSuggestions={globalSuggestions} setView={setView} />
                        ) : view === 'yaml' ? (
                            <YamlPreview content={yamlSource} userProfile={userProfile} onClose={() => setView('manage')} />
                        ) : view === 'matrix' ? (
                            <EDWBusMatrix stories={stories} setView={setView} />
                        ) : view === 'painpoint_form' ? (
                            <PainPointForm
                                onSave={savePainPoint}
                                onCancel={() => { setEditingPainPointId(null); setView('painpoint_review'); }}
                                initialData={editingPainPointId ? painPoints.find(pp => pp.id === editingPainPointId) : null}
                            />
                        ) : view === 'painpoint_review' ? (
                            <ReviewPainPointsView
                                painPoints={painPoints}
                                onDelete={deletePainPoint}
                                onEdit={startEditPainPoint}
                                setView={setView}
                            />
                        ) : (
                            <ManagementView
                                stories={stories}
                                setView={setView}
                                setEditingId={setEditingId}
                                setStep={setStep}
                                startEditStory={startEditStory}
                                setStories={setStories}
                            />
                        )}
                    </div>
                </div>

                {view === 'wizard' && (
                    <LiveLogicPreview
                        userProfile={userProfile}
                        currentStory={currentStory}
                    />
                )}
            </div>

            <UserProfileModal
                profile={userProfile}
                onChange={handleProfileChange}
                onSave={() => { setShowProfileModal(false); setView('manage'); }}
                isOpen={showProfileModal}
            />
            {isConfigLoading && (
                <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100] flex items-center justify-center">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="font-black text-xs uppercase tracking-widest text-slate-400">Loading Configuration...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;