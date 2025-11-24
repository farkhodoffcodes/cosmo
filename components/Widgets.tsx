import React, { useEffect, useState } from 'react';
import { Wind, Thermometer, Radiation, Activity, Droplets, AlertTriangle, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

// --- Styles for glassmorphism ---
const CARD_STYLE = "bg-neutral-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col relative overflow-hidden hover:border-white/20 transition-all duration-500 group";
const TITLE_STYLE = "text-neutral-400 text-sm font-medium tracking-wide mb-1";

// --- Components ---

export const WeatherWidget = () => (
  <div className={`${CARD_STYLE} flex-row justify-between items-center h-[140px]`}>
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="text-4xl font-display font-light text-white">36 <span className="text-sm text-neutral-500 font-mono font-bold">KM/H</span></div>
        <div className={TITLE_STYLE}>Wind Speed</div>
      </div>
      <Wind className="text-neutral-600 w-5 h-5" />
    </div>
    <div className="h-full w-[1px] bg-white/10 mx-4"></div>
    <div className="flex flex-col justify-between h-full text-right">
      <div>
        <div className="text-4xl font-display font-light text-white">-81 <span className="text-sm text-neutral-500 font-mono font-bold">°F</span></div>
        <div className={TITLE_STYLE}>Day Temperature</div>
      </div>
      <Thermometer className="text-neutral-600 w-5 h-5 ml-auto" />
    </div>
  </div>
);

export const SolarActivity = () => {
  return (
    <div className={`${CARD_STYLE} aspect-square`}>
        <div className="flex justify-between items-start w-full mb-4">
            <div>
                <h3 className="text-lg text-white font-display">Solar activity</h3>
                <p className="text-xs text-rose-400 font-mono mt-1">CME - Class M</p>
            </div>
            <AlertTriangle className="text-white/80 w-4 h-4" />
        </div>

        <div className="flex-1 flex items-center justify-center relative">
            {/* Custom glowing ring chart */}
            <div className="w-48 h-48 rounded-full border border-white/5 relative flex items-center justify-center">
                {/* Dashed outer ring */}
                <svg className="absolute inset-0 w-full h-full rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
                
                {/* Gradient Ring */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-orange-600/80 to-rose-600/80 blur-md opacity-50 absolute"></div>
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 relative z-10 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                     <span className="text-3xl font-bold text-white font-display">56%</span>
                     <span className="text-[10px] text-white/80 uppercase tracking-widest">flashes</span>
                </div>

                {/* Orbital markers */}
                <div className="absolute top-6 right-8 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white border border-white/20">High</div>
                <div className="absolute bottom-8 left-6 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white border border-white/20">+0.7 µSv</div>
            </div>
        </div>
    </div>
  );
}

export const Projection3D = () => {
    return (
        <div className={`${CARD_STYLE} h-64`}>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-white text-lg font-display">3D Projection</h3>
                <MoreHorizontal className="text-neutral-500 w-5 h-5" />
            </div>
            
            <div className="flex-1 relative w-full h-full overflow-hidden rounded-xl border border-white/5 bg-black/20 mt-2">
                {/* Simulated Wireframe Terrain */}
                 <svg className="w-full h-full absolute inset-0 opacity-50" preserveAspectRatio="none">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                 </svg>

                 {/* Terrain Lines */}
                 <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end px-4 pb-4 space-x-1">
                     {Array.from({length: 20}).map((_, i) => (
                         <div 
                            key={i} 
                            className="flex-1 bg-neutral-600/20 hover:bg-orange-500/50 transition-colors duration-300 rounded-t-sm"
                            style={{ height: `${30 + Math.random() * 60}%` }}
                         ></div>
                     ))}
                 </div>

                 {/* Markers */}
                 <div className="absolute top-1/3 left-1/4 px-2 py-1 bg-neutral-800/80 rounded text-[10px] text-neutral-300 border border-neutral-600">Basalt</div>
                 <div className="absolute bottom-1/4 right-1/3 px-2 py-1 bg-neutral-800/80 rounded text-[10px] text-neutral-300 border border-neutral-600">Sand</div>
                 <div className="absolute top-1/2 right-4 px-2 py-1 bg-neutral-800/80 rounded text-[10px] text-neutral-300 border border-neutral-600">Uranium</div>
            </div>
        </div>
    )
}

export const StatsRight = () => (
  <div className={`${CARD_STYLE} flex-row justify-between items-center h-[140px]`}>
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="text-4xl font-display font-light text-white">0.7 <span className="text-sm text-neutral-500 font-mono font-bold">µSv</span></div>
        <div className={TITLE_STYLE}>Radiation</div>
      </div>
      <Radiation className="text-orange-500 w-5 h-5" />
    </div>
    <div className="h-full w-[1px] bg-white/10 mx-4"></div>
    <div className="flex flex-col justify-between h-full text-right">
      <div>
        <div className="text-4xl font-display font-light text-white">78 <span className="text-sm text-neutral-500 font-mono font-bold">%</span></div>
        <div className={TITLE_STYLE}>Purity</div>
      </div>
      <Droplets className="text-blue-400 w-5 h-5 ml-auto" />
    </div>
  </div>
);

const data = [
  { name: 'A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'G', uv: 3490, pv: 4300, amt: 2100 },
];

export const AnalysisChart = () => {
    const [mode, setMode] = useState<'structure' | 'composition'>('structure');

    return (
        <div className={`${CARD_STYLE} flex-1 min-h-[280px]`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg text-white font-display">View</h3>
                <MoreHorizontal className="text-neutral-500 w-5 h-5 cursor-pointer" />
            </div>

            <div className="bg-black/40 p-1 rounded-full flex mb-6 w-full">
                <button 
                    onClick={() => setMode('structure')}
                    className={`flex-1 py-1.5 rounded-full text-xs font-medium transition-all ${mode === 'structure' ? 'bg-neutral-800 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                    Structure
                </button>
                <button 
                    onClick={() => setMode('composition')}
                    className={`flex-1 py-1.5 rounded-full text-xs font-medium transition-all ${mode === 'composition' ? 'bg-neutral-800 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                    Composition
                </button>
            </div>

            <div className="h-32 w-full -ml-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <YAxis hide domain={[0, 4000]} />
                        <Area 
                            type="monotone" 
                            dataKey="uv" 
                            stroke="#ffffff" 
                            strokeWidth={1}
                            fillOpacity={1} 
                            fill="url(#colorUv)" 
                            isAnimationActive={true}
                        />
                        {/* Animated scan line */}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            {/* Simple fake cursor points */}
            <div className="absolute top-1/2 left-10 w-2 h-2 bg-white rounded-full border-2 border-black z-10"></div>
            <div className="absolute top-1/2 right-10 w-2 h-2 bg-white rounded-full border-2 border-black z-10"></div>


            <div className="flex justify-between mt-4 px-2">
                <div>
                    <div className="text-[10px] text-neutral-500 uppercase">Min</div>
                    <div className="text-white text-sm font-mono">1.2 g/cm³</div>
                </div>
                 <div>
                    <div className="text-[10px] text-neutral-500 uppercase">Current</div>
                    <div className="text-white text-sm font-mono">3.4 g/cm³</div>
                </div>
                 <div>
                    <div className="text-[10px] text-neutral-500 uppercase">Max</div>
                    <div className="text-white text-sm font-mono">7.9 g/cm³</div>
                </div>
            </div>
        </div>
    )
}

export const MineralRatio = ({ onGenerate }: { onGenerate: () => void }) => {
    return (
        <div className={`${CARD_STYLE} h-auto`}>
            <h3 className="text-lg text-white font-display mb-4">Mineral Ratio</h3>
            
            <div className="relative h-32 w-full flex items-center justify-center">
                {/* Half Gauge */}
                <div className="w-40 h-20 overflow-hidden relative">
                    <div className="w-40 h-40 rounded-full border-[12px] border-neutral-800 box-border absolute top-0 left-0"></div>
                    <div className="w-40 h-40 rounded-full border-[12px] border-transparent border-t-orange-500 border-r-transparent border-b-transparent border-l-orange-500 box-border absolute top-0 left-0 rotate-[-45deg]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'}}></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1 mt-4 text-center">
                    <div className="text-2xl font-bold text-white">78%</div>
                </div>
            </div>
            
            <div className="flex justify-center gap-4 text-xs mt-2 mb-6">
                 <div className="flex items-center gap-1.5 text-neutral-400">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    Fe₂O₃
                 </div>
                 <div className="flex items-center gap-1.5 text-neutral-400">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    MgCO₃
                 </div>
            </div>

            <button 
                onClick={onGenerate}
                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white text-sm font-medium rounded-xl transition-all duration-200 active:scale-95"
            >
                Generate Report
            </button>
        </div>
    )
}