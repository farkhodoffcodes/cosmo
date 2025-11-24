import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Cpu, Battery, Wifi, Activity, ShieldCheck } from 'lucide-react';

const SettingRow = ({ label, value, type = 'slider' }: { label: string; value: number | boolean; type?: 'slider' | 'toggle' }) => {
    const [localValue, setLocalValue] = useState(value);

    return (
        <div className="flex items-center justify-between py-4 border-b border-white/5 group hover:bg-white/5 px-4 transition-colors rounded-lg">
            <div className="flex flex-col">
                <span className="text-sm text-neutral-300 font-medium group-hover:text-white transition-colors">{label}</span>
                <span className="text-xs text-neutral-500 font-mono">AUTO-CALIBRATED</span>
            </div>
            
            <div className="w-48">
                {type === 'slider' ? (
                    <div className="relative h-8 flex items-center">
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={localValue as number} 
                            onChange={(e) => setLocalValue(Number(e.target.value))}
                            className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg hover:[&::-webkit-slider-thumb]:scale-125 hover:[&::-webkit-slider-thumb]:bg-white transition-all"
                        />
                        <span className="absolute -top-2 right-0 text-xs font-mono text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            {localValue}%
                        </span>
                    </div>
                ) : (
                    <button 
                        onClick={() => setLocalValue(!localValue)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${localValue ? 'bg-green-500' : 'bg-neutral-700'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform ${localValue ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                )}
            </div>
        </div>
    );
};

export const MachineSettings: React.FC = () => {
    return (
        <div className="h-full flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 space-y-4">
                <div className="glass-panel p-6 rounded-3xl">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-white font-display font-bold">System Status</h3>
                            <p className="text-green-400 text-xs font-mono">OPERATIONAL</p>
                        </div>
                     </div>
                     
                     <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs text-neutral-400 mb-1">
                                <span>CPU Load</span>
                                <span>42%</span>
                            </div>
                            <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-[42%]"></div>
                            </div>
                        </div>
                         <div>
                            <div className="flex justify-between text-xs text-neutral-400 mb-1">
                                <span>Memory</span>
                                <span>68%</span>
                            </div>
                            <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-[68%]"></div>
                            </div>
                        </div>
                     </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Battery className="text-neutral-400 w-5 h-5" />
                        <span className="text-sm text-white">Battery Level</span>
                    </div>
                    <span className="text-xl font-display font-bold text-green-400">94%</span>
                </div>
            </div>

            {/* Main Settings Area */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 glass-panel rounded-3xl p-8 overflow-y-auto scrollbar-none"
            >
                <h2 className="text-2xl font-display text-white mb-6 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-neutral-500" />
                    Configuration
                </h2>

                <div className="space-y-8">
                    <section>
                        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Rover Mobility</h3>
                        <div className="space-y-1">
                            <SettingRow label="Max Velocity Limit" value={75} />
                            <SettingRow label="Suspension Stiffness" value={40} />
                            <SettingRow label="Traction Control" value={true} type="toggle" />
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Sensor Array</h3>
                        <div className="space-y-1">
                            <SettingRow label="LIDAR Range" value={90} />
                            <SettingRow label="Spectrometer Gain" value={65} />
                            <SettingRow label="Thermal Imaging" value={true} type="toggle" />
                            <SettingRow label="Seismic Sensitivity" value={30} />
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Communication</h3>
                        <div className="space-y-1">
                            <SettingRow label="Uplink Bandwidth" value={85} />
                            <SettingRow label="Encryption Level" value={true} type="toggle" />
                        </div>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};