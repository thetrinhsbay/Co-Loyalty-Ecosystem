
import React from 'react';
import { Bottleneck } from '../types';

interface BottleneckRadarProps {
  category: 'FINANCIAL' | 'TECH' | 'OPERATIONAL' | 'UX' | 'LEGAL';
  bottlenecks: Bottleneck[];
}

const BottleneckRadar: React.FC<BottleneckRadarProps> = ({ category, bottlenecks }) => {
  const relevant = bottlenecks.filter(b => b.category === category && b.status !== 'RESOLVED');
  const clogged = relevant.filter(b => b.status === 'CLOGGED');
  const isClogged = clogged.length > 0;

  if (relevant.length === 0) return null;

  return (
    <div className="relative inline-block group">
      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white animate-ping ${isClogged ? 'bg-red-500' : 'bg-yellow-400'}`}></div>
      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${isClogged ? 'bg-red-500' : 'bg-yellow-400'}`}></div>
      
      {/* Tooltip on hover */}
      <div className="absolute top-8 right-0 w-72 p-6 bg-gray-900 text-white rounded-[2rem] shadow-2xl opacity-0 group-hover:opacity-100 transition-all z-[200] pointer-events-none border border-white/10 translate-y-2 group-hover:translate-y-0">
        <div className="flex items-center justify-between mb-4">
           <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Self-Healing Active</p>
           <span className="text-[9px] font-bold bg-white/10 px-2 py-0.5 rounded-md">Status: Monitoring</span>
        </div>
        <div className="space-y-4">
          {relevant.map(b => (
            <div key={b.id} className="pb-3 border-b border-white/5 last:border-0">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-black">{b.title}</p>
                <span className={`text-[8px] font-black uppercase ${b.status === 'CLOGGED' ? 'text-red-400' : 'text-orange-400'}`}>
                   {b.status} {b.score}%
                </span>
              </div>
              <p className="text-[9px] text-gray-400 font-medium leading-tight">Bot detect: {b.autoDetectLogic}</p>
              <div className="mt-2 flex items-center text-[9px] text-indigo-300 font-black">
                <i className="fas fa-wand-magic-sparkles mr-1"></i> FIX: {b.autoFixLogic}
              </div>
            </div>
          ))}
          {relevant.length > 3 && (
            <p className="text-[8px] text-gray-500 text-center font-bold italic">... và {relevant.length - 3} điểm nghẽn khác đang được xử lý</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottleneckRadar;
