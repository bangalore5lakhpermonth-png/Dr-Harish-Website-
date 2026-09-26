import React, { useState, useEffect } from 'react';
import { 
  Database, 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  Server, 
  ShieldCheck, 
  Terminal,
  Activity,
  Layers,
  ChevronRight,
  FileCode
} from 'lucide-react';
import { api } from '../services/api';

interface SupabaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseGuideModal: React.FC<SupabaseGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [loading, setLoading] = useState(false);
  const [schemaText, setSchemaText] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'instructions'>('overview');
  const [backendStatus, setBackendStatus] = useState<{
    provider: 'supabase' | 'local_persistence';
    supabaseConfigured: boolean;
    supabaseConnected: boolean;
    maskedUrl: string | null;
    message: string;
    appointmentsCount: number;
    recordsCount: number;
    usersCount: number;
  }>({
    provider: 'local_persistence',
    supabaseConfigured: false,
    supabaseConnected: false,
    maskedUrl: null,
    message: 'Loading status...',
    appointmentsCount: 0,
    recordsCount: 0,
    usersCount: 0,
  });

  const loadStatus = async () => {
    setLoading(true);
    try {
      const [status, schema] = await Promise.all([
        api.getBackendStatus(),
        api.getSupabaseSchema().catch(() => '-- Schema available in /supabase/schema.sql'),
      ]);
      setBackendStatus(status);
      setSchemaText(schema);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadStatus();
    }
  }, [isOpen]);

  const handleCopySchema = () => {
    if (!schemaText) return;
    navigator.clipboard.writeText(schemaText);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shadow-inner">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-syne font-bold text-base sm:text-lg leading-tight">
                  Supabase Backend Hub
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  PostgreSQL
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                Clinical appointments, medical records vault & patient data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadStatus}
              title="Refresh backend status"
              disabled={loading}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Status Pill Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-slate-500 font-medium">Engine Mode:</span>
            {backendStatus.provider === 'supabase' && backendStatus.supabaseConnected ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px] border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
                Connected to Supabase Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-[11px] border border-amber-200">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                Local Persistent Storage (Supabase Ready)
              </span>
            )}
          </div>

          {backendStatus.maskedUrl && (
            <div className="font-mono text-[11px] text-slate-600 truncate max-w-[220px]">
              Host: <span className="font-semibold text-slate-900">{backendStatus.maskedUrl}</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Status & Diagnostics
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'schema'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            SQL Database Schema
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'instructions'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Setup Guide (3 Steps)
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[62vh] overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Metric Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Appointments</span>
                  </div>
                  <div className="font-syne font-bold text-xl text-slate-900 mt-1">
                    {backendStatus.appointmentsCount}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">Synced records</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Medical Vault</span>
                  </div>
                  <div className="font-syne font-bold text-xl text-slate-900 mt-1">
                    {backendStatus.recordsCount}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">Clinical files</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                    <Server className="w-3.5 h-3.5 text-blue-600" />
                    <span>Users & Staff</span>
                  </div>
                  <div className="font-syne font-bold text-xl text-slate-900 mt-1">
                    {backendStatus.usersCount}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">Active profiles</div>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                backendStatus.supabaseConnected 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {backendStatus.supabaseConnected ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Layers className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold font-syne text-slate-900">
                      {backendStatus.supabaseConnected 
                        ? 'Supabase Backend Connected & Syncing' 
                        : 'Local Persistence Engine Active'}
                    </div>
                    <p className="text-slate-600">
                      {backendStatus.message}
                    </p>
                    {!backendStatus.supabaseConnected && (
                      <p className="text-[11px] text-slate-500 mt-1">
                        All appointments and medical records are saved in persistent storage. To point to your own cloud Supabase instance, see the <strong>Setup Guide</strong> tab.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Capabilities List */}
              <div className="space-y-2">
                <h4 className="font-syne text-xs font-bold uppercase tracking-wider text-slate-500">
                  Integrated Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PostgreSQL Table Schema</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Row Level Security (RLS) Policies</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Failover Local Storage Cache</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Real-Time Appointment Sync</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-syne text-xs font-bold uppercase tracking-wider text-slate-700">
                    PostgreSQL Schema DDL
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Copy and run this in your Supabase SQL Editor
                  </p>
                </div>

                <button
                  onClick={handleCopySchema}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-syne text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedSchema ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white" />
                      <span>Copy SQL Schema</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-[11px] text-emerald-300 max-h-80 overflow-y-auto overflow-x-auto leading-relaxed select-all">
                <pre>{schemaText || '-- Loading schema...'}</pre>
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-slate-900 font-syne">Run Database Schema</div>
                    <p className="text-slate-600 leading-relaxed">
                      Go to your project dashboard on{' '}
                      <a
                        href="https://supabase.com/dashboard"
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 hover:underline font-semibold inline-flex items-center gap-0.5"
                      >
                        supabase.com <ExternalLink className="w-3 h-3" />
                      </a>
                      . Click <strong>SQL Editor</strong> &gt; <strong>New Query</strong>, paste the schema from the SQL Schema tab, and click <strong>Run</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-200/80">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-slate-900 font-syne">Copy API Credentials</div>
                    <p className="text-slate-600 leading-relaxed">
                      In your Supabase project settings, go to <strong>Project Settings &gt; API</strong> and copy your <strong>Project URL</strong> and <strong>anon key</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-200/80">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-slate-900 font-syne">Set Environment Variables</div>
                    <p className="text-slate-600 leading-relaxed">
                      Provide <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px] font-mono">SUPABASE_URL</code> and <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px] font-mono">SUPABASE_ANON_KEY</code> in your environment or secrets configuration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <span className="font-medium">
                  Automatic zero-downtime failover ensures bookings are saved even during network drops.
                </span>
                <button
                  onClick={handleCopySchema}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-syne font-bold text-[11px] shrink-0 ml-2 cursor-pointer"
                >
                  Copy Schema Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            <span>PostgreSQL 15+ compatible</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold font-syne transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
