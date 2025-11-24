import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Database, Tag } from 'lucide-react';
import { RockViewer } from './RockViewer';

interface Specimen {
    id: string;
    name: string;
    type: string;
    date: string;
    rarity: 'Common' | 'Rare' | 'Exotic';
    color: string;
    distort: number;
}

const specimens: Specimen[] = [
    { id: 'S-101', name: 'Xenolith Alpha', type: 'Igneous', date: '2045-04-12', rarity: 'Rare', color: '#b45309', distort: 0.4 },
    { id: 'S-102', name: 'Lunar Basalt', type: 'Volcanic', date: '2045-04-10', rarity: 'Common', color: '#52525b', distort: 0.2 },
    { id: 'S-103', name: 'Cryo Crystal', type: 'Metamorphic', date: '2045-04-08', rarity: 'Exotic', color: '#3b82f6', distort: 0.8 },
    { id: 'S-104', name: 'Martian Clay', type: 'Sedimentary', date: '2045-03-22', rarity: 'Common', color: '#ef4444', distort: 0.3 },
    { id: 'S-105', name: 'Void Shard', type: 'Unknown', date: '2045-03-15', rarity: 'Exotic', color: '#7e22ce', distort: 1.2 },
    { id: 'S-106', name: 'Iron Nodule', type: 'Metallic', date: '2045-03-01', rarity: 'Common', color: '#71717a', distort: 0.1 },
    { id: 'S-107', name: 'Sulfur Geode', type: 'Chemical', date: '2045-02-28', rarity: 'Rare', color: '#eab308', distort: 0.5 },
    { id: 'S-108', name: 'Obsidian Glass', type: 'Volcanic', date: '2045-02-20', rarity: 'Rare', color: '#171717', distort: 0.1 },
];

export const FossilsMap: React.FC = () => {
    const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(null);

    return (
        <div className="h-full flex flex-col md:flex-row gap-6 overflow-hidden">
            {/* Left: List / Filter */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4 h-full">
                <div className="glass-panel p-4 rounded-2xl flex items-center gap-2">
                    <Search className="w-5 h-5 text-neutral-400" />
                    <input 
                        type="text" 
                        placeholder="Search database..." 
                        className="bg-transparent border-none outline-none text-white w-full placeholder:text-neutral-600"
                    />
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-none pb-20">
                    {specimens.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setSelectedSpecimen(item)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 group ${
                                selectedSpecimen?.id === item.id 
                                ? 'bg-white/10 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]' 
                                : 'bg-neutral-900/40 border-white/5 hover:border-white/20 hover:bg-white/5'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-mono text-xs text-neutral-500">{item.id}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                                    item.rarity === 'Exotic' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                                    item.rarity === 'Rare' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                                    'bg-neutral-500/20 text-neutral-300 border-neutral-500/30'
                                }`}>
                                    {item.rarity}
                                </span>
                            </div>
                            <h3 className="text-white font-display font-medium text-lg group-hover:text-orange-400 transition-colors">{item.name}</h3>
                            <div className="flex items-center gap-2 mt-2 text-xs text-neutral-400">
                                <Database className="w-3 h-3" />
                                <span>{item.type}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right: 3D Viewer */}
            <div className="flex-1 glass-panel rounded-3xl border border-white/10 relative overflow-hidden flex flex-col">
                {selectedSpecimen ? (
                     <>
                        <div className="absolute top-6 left-6 z-10">
                            <h2 className="text-4xl font-display text-white mb-1">{selectedSpecimen.name}</h2>
                            <div className="flex items-center gap-4">
                                <span className="text-orange-500 font-mono">{selectedSpecimen.id}</span>
                                <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                                <span className="text-neutral-400 text-sm">Recovered: {selectedSpecimen.date}</span>
                            </div>
                        </div>

                        <div className="flex-1 min-h-[400px]">
                            <RockViewer color={selectedSpecimen.color} distort={selectedSpecimen.distort} />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="flex gap-8">
                                <div>
                                    <div className="text-xs text-neutral-500 uppercase mb-1">Composition</div>
                                    <div className="text-white font-mono">98.2% Silicate</div>
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500 uppercase mb-1">Radioactivity</div>
                                    <div className="text-white font-mono">0.04 mSv</div>
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500 uppercase mb-1">Weight</div>
                                    <div className="text-white font-mono">2.4 kg</div>
                                </div>
                            </div>
                        </div>
                     </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/30">
                        <Database className="w-16 h-16 mb-4 opacity-50" />
                        <p className="font-display text-xl">Select a specimen to analyze</p>
                    </div>
                )}
            </div>
        </div>
    );
};