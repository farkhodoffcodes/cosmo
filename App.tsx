import React, { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Background } from './components/Background';
import { Dashboard } from './components/Dashboard';
import { FossilsMap } from './components/FossilsMap';
import { MachineSettings } from './components/MachineSettings';
import { generateMissionReport } from './services/geminiService';

type Page = 'Overview' | 'Fossils Map' | 'Machine Settings';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState<Page>('Overview');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [report, setReport] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateReport = async () => {
        setIsGenerating(true);
        setReport(null);
        // Realistic API interaction
        const result = await generateMissionReport(
            "TERRA PRIME / SECTOR 7", 
            { wind: 12, temp: 24, rad: 0.01 },
            ["Nitrogen", "Oxygen", "Water"]
        );
        setReport(result);
        setIsGenerating(false);
    };

    const navItems: Page[] = ['Overview', 'Fossils Map', 'Machine Settings'];

    return (
        <div className="min-h-screen w-full text-white font-sans selection:bg-orange-500/30 overflow-hidden flex flex-col">
            <Background />
            
            {/* Navbar */}
            <nav className="h-20 flex items-center justify-between px-6 z-50 bg-gradient-to-b from-black/90 to-transparent pointer-events-none sticky top-0">
                <div className="flex items-center gap-3 pointer-events-auto cursor-pointer" onClick={() => setActivePage('Overview')}>
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-bold text-lg shadow-[0_0_15px_rgba(255,255,255,0.3)]">C</div>
                    <span className="font-display font-bold text-xl tracking-tight">COSMO™</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1 pointer-events-auto bg-black/40 backdrop-blur-xl rounded-full px-2 py-1 border border-white/10">
                    {navItems.map((item) => (
                        <button
                            key={item} 
                            onClick={() => setActivePage(item)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                                activePage === item ? 'text-black' : 'text-white/60 hover:text-white'
                            }`}
                        >
                            {activePage === item && (
                                <motion.div 
                                    layoutId="nav-pill" 
                                    className="absolute inset-0 bg-white rounded-full" 
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{item}</span>
                        </button>
                    ))}
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-4 pointer-events-auto">
                    <span className="text-xs text-white/40 hidden lg:block font-mono">UPD: LIVE</span>
                    <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md border border-white/5">
                        <Bell className="w-4 h-4 text-white" />
                    </button>
                    
                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden p-2 bg-white/10 rounded-full text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                     <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 border border-white/20 overflow-hidden relative hidden sm:block shadow-lg">
                         <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" alt="User" className="w-full h-full object-cover opacity-90" />
                     </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10 p-4 md:hidden flex flex-col gap-2"
                    >
                         {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => { setActivePage(item); setMobileMenuOpen(false); }}
                                className={`p-4 text-left rounded-xl text-lg font-display ${
                                    activePage === item ? 'bg-white text-black' : 'text-white/70'
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 px-4 md:px-8 pb-8 pt-4 max-w-[1920px] mx-auto w-full min-h-0 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="h-full w-full"
                    >
                        {activePage === 'Overview' && <Dashboard onGenerateReport={handleGenerateReport} />}
                        {activePage === 'Fossils Map' && <FossilsMap />}
                        {activePage === 'Machine Settings' && <MachineSettings />}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* AI Report Modal Overlay */}
            <AnimatePresence>
                {(report || isGenerating) && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                        onClick={() => !isGenerating && setReport(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-neutral-950 border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                             {/* Decorative header */}
                             <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-purple-600"></div>
                             
                             <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className={`w-3 h-3 rounded-full ${isGenerating ? 'bg-orange-500' : 'bg-green-500'} z-10 relative`} />
                                            <div className={`absolute inset-0 w-3 h-3 rounded-full ${isGenerating ? 'bg-orange-500 animate-ping' : 'bg-green-500 opacity-20'}`} />
                                        </div>
                                        <h2 className="text-xl font-display text-white tracking-wide">
                                            {isGenerating ? 'ESTABLISHING UPLINK...' : 'INCOMING TRANSMISSION'}
                                        </h2>
                                    </div>
                                    <button 
                                        onClick={() => setReport(null)}
                                        className="text-neutral-500 hover:text-white transition-colors"
                                        disabled={isGenerating}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="min-h-[150px] text-neutral-300 font-mono text-sm leading-relaxed border border-white/5 bg-white/5 rounded-lg p-6 relative overflow-hidden">
                                    {isGenerating && (
                                       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan pointer-events-none h-[200%]" />
                                    )}
                                    
                                    {isGenerating ? (
                                        <div className="space-y-3">
                                            <div className="h-2 bg-white/10 rounded w-3/4 animate-pulse"></div>
                                            <div className="h-2 bg-white/10 rounded w-full animate-pulse delay-75"></div>
                                            <div className="h-2 bg-white/10 rounded w-5/6 animate-pulse delay-150"></div>
                                            <div className="h-2 bg-white/10 rounded w-2/3 animate-pulse delay-200"></div>
                                        </div>
                                    ) : (
                                        <div className="whitespace-pre-line">{report}</div>
                                    )}
                                </div>

                                {!isGenerating && (
                                    <div className="mt-8 flex justify-end gap-3">
                                        <button 
                                            className="px-6 py-2.5 border border-white/10 hover:bg-white/5 text-neutral-300 text-xs font-bold tracking-widest uppercase rounded-lg transition-colors"
                                            onClick={() => setReport(null)}
                                        >
                                            Save to Log
                                        </button>
                                        <button 
                                            className="px-6 py-2.5 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                            onClick={() => setReport(null)}
                                        >
                                            Acknowledge
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;