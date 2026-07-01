'use client';

import React, { useState, useEffect } from 'react';
import { PROFISSOES } from '@/lib/profissoes-edital';

export function DevProfileSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [cargo, setCargo] = useState('enfermagem-trabalho');
  const [nivel, setNivel] = useState('Técnico');
  const [plan, setPlan] = useState('premium');
  const [isMockEnabled, setIsMockEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Load initial state on mount
  useEffect(() => {
    const mockData = localStorage.getItem('DEV_MOCK_AUTH');
    if (mockData) {
      setIsMockEnabled(true);
      try {
        const parsed = JSON.parse(mockData);
        if (parsed.cargo) setCargo(parsed.cargo);
        if (parsed.nivel) setNivel(parsed.nivel);
        if (parsed.plan) setPlan(parsed.plan);
      } catch (e) {}
    }
  }, []);

  if (!mounted) return null;

  const handleApply = () => {
    if (isMockEnabled) {
      localStorage.setItem('DEV_MOCK_AUTH', JSON.stringify({ cargo, nivel, plan }));
    } else {
      localStorage.removeItem('DEV_MOCK_AUTH');
    }
    // Reload to apply new context
    window.location.reload();
  };

  const handleToggle = () => {
    const newState = !isMockEnabled;
    setIsMockEnabled(newState);
    if (!newState) {
      localStorage.removeItem('DEV_MOCK_AUTH');
      window.location.reload();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[9999] bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
      >
        🛠 Dev Auth
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col text-left">
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-white font-bold text-sm m-0 p-0">🛠 Dev Profile Switcher</h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm text-slate-300 font-medium">Habilitar Mock Auth</label>
          <input 
            type="checkbox" 
            checked={isMockEnabled} 
            onChange={handleToggle}
            className="w-4 h-4 rounded cursor-pointer"
          />
        </div>

        {isMockEnabled && (
          <div className="space-y-4 mt-2">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">Nível</label>
              <select
                value={nivel}
                onChange={(e) => {
                  const newNivel = e.target.value;
                  setNivel(newNivel);
                  const firstCargo = PROFISSOES.find(p => p.nivel === (newNivel === 'Técnico' ? 'tecnico' : 'superior'))?.id;
                  if (firstCargo) setCargo(firstCargo);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="Técnico">Técnico</option>
                <option value="Superior">Superior</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">Cargo / Profissão</label>
              <select
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              >
                {PROFISSOES.filter(p => p.nivel === (nivel === 'Técnico' ? 'tecnico' : 'superior')).map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">Plano</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="premium">Premium (Apenas a Profissão)</option>
                <option value="elite-total">Elite Total (Todas as Profissões)</option>
              </select>
            </div>
            
          </div>
        )}

        <button
          onClick={handleApply}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded-lg transition-colors mt-2"
        >
          Aplicar e Recarregar
        </button>
      </div>
    </div>
  );
}
