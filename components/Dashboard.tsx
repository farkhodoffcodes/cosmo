import React from 'react';
import { motion } from 'framer-motion';
import { EarthViewer } from './EarthViewer';
import { 
    WeatherWidget, 
    SolarActivity, 
    Projection3D, 
    StatsRight, 
    AnalysisChart, 
    MineralRatio 
} from './Widgets';

interface DashboardProps {
    onGenerateReport: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onGenerateReport }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">
            {/* Left Column - Environment Stats */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="col-span-1 md:col-span-3 flex flex-col gap-6 overflow-y-auto pr-1 scrollbar-none"
            >
                <WeatherWidget />
                <SolarActivity />
                <Projection3D />
            </motion.div>

            {/* Center Column - 3D Visualization */}
            <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="col-span-1 md:col-span-6 flex flex-col relative min-h-[500px] md:min-h-0"
            >
                {/* Center Headers */}
                <div className="flex flex-col items-center justify-center absolute top-8 left-0 right-0 z-10 pointer-events-none">
                        <div className="px-4 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs text-white/70 mb-4">Real-time Uplink</div>
                        <h1 className="text-4xl md:text-5xl font-display font-normal text-center leading-none text-white drop-shadow-2xl">
                        TERRA /<br/>PRIME
                        </h1>
                </div>

                {/* The Earth Canvas */}
                <div className="flex-1 relative">
                    <EarthViewer />
                    {/* Decorative Lines */}
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                </div>
            </motion.div>

            {/* Right Column - Analysis */}
            <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="col-span-1 md:col-span-3 flex flex-col gap-6 overflow-y-auto pl-1 scrollbar-none"
            >
                <StatsRight />
                <AnalysisChart />
                <MineralRatio onGenerate={onGenerateReport} />
            </motion.div>
        </div>
    );
};