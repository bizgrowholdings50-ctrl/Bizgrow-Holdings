"use client";

import React, { useState } from "react";

export default function ComplianceScanner() {
  // Current step tracking (1: Questions, 2: Lead Info, 3: Result)
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State initialized with default safe values
  const [formData, setFormData] = useState({
    staffSize: "1-10",
    hasSiaAcs: false,
    hasIso9001: false,
    hasIso14001: false,
    auditRoutine: "never",
    businessEmail: "",
    companyName: "",
  });

  const [result, setResult] = useState(null);

  // The Core Algorithm Logic (Weighted Points System)
  const calculateComplianceScore = (data) => {
    let score = 0;
    let recommendations = [];

    // Certifications Weightage (Max 60 Points)
    if (data.hasSiaAcs) score += 30;
    else recommendations.push("SIA ACS critical framework or documentation is missing.");

    if (data.hasIso9001) score += 15;
    else recommendations.push("ISO 9001 Quality Management standard is not implemented.");

    if (data.hasIso14001) score += 15;
    else recommendations.push("ISO 14001 Environmental policy gap identified for commercial filtering.");

    // Staff Size Risk Penalty (Max 20 Points)
    if (data.staffSize === "1-10") {
      score += 20;
    } else if (data.staffSize === "11-50") {
      score += 15;
      recommendations.push("Vetting 11-50 guards manually increases BS 7858 compliance leakage risk.");
    } else if (data.staffSize === "51+") {
      score += 5; 
      recommendations.push("Large workforce (51+) requires strict automated or outsourced BS 7858 vetting to stay audit-safe.");
    }

    // Internal Audit Routine (Max 20 Points)
    if (data.auditRoutine === "monthly" || data.auditRoutine === "quarterly") {
      score += 20;
    } else if (data.auditRoutine === "yearly") {
      score += 10;
      recommendations.push("Yearly internal reviews are too slow for fast-changing UK security standards.");
    } else {
      score += 0;
      recommendations.push("No active internal audit system. High probability of failing upcoming official inspections.");
    }

    // Status mapping based on calculated score
    let status = "Healthy";
    if (score < 50) status = "Critical At Risk";
    else if (score >= 50 && score < 80) status = "Needs Attention";

    return { finalScore: score, status, recommendations };
  };

  // Form handling functions
  const handleCheckboxChange = (name) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const processResults = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate 1.5 seconds calculation/loading animation
    setTimeout(() => {
      const output = calculateComplianceScore(formData);
      setResult(output);
      setLoading(false);
      setStep(3);
      
      console.log("Lead captured for BizGrow Sales Team:", formData);
    }, 1500);
  };

  return (
    <div className="min-h-screen mt-20 text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/20">
            UK Security Compliance Tool
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-3 text-white">
            Compliance Health Scanner
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Analyze your firm’s SIA ACS, BS 7858, and ISO status in under 2 minutes.
          </p>
        </div>

        {/* STEP 1: Assessment Questions */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Total Guard Workforce Size</label>
              <select
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                value={formData.staffSize}
                onChange={(e) => handleSelectChange("staffSize", e.target.value)}
              >
                <option value="1-10">1 - 10 Guards (Micro Firm)</option>
                <option value="11-50">11 - 50 Guards (Mid Size)</option>
                <option value="51+">51+ Guards (Enterprise Level)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Active Accreditations & Standards</label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 bg-slate-900 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-indigo-500 rounded"
                    checked={formData.hasSiaAcs}
                    onChange={() => handleCheckboxChange("hasSiaAcs")}
                  />
                  <span className="text-sm text-slate-300">We have an active SIA ACS framework</span>
                </label>
                <label className="flex items-center space-x-3 bg-slate-900 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-indigo-500 rounded"
                    checked={formData.hasIso9001}
                    onChange={() => handleCheckboxChange("hasIso9001")}
                  />
                  <span className="text-sm text-slate-300">ISO 9001 (Quality Management) Certified</span>
                </label>
                <label className="flex items-center space-x-3 bg-slate-900 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-indigo-500 rounded"
                    checked={formData.hasIso14001}
                    onChange={() => handleCheckboxChange("hasIso14001")}
                  />
                  <span className="text-sm text-slate-300">ISO 14001 (Environmental) Certified</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">How often do you run Internal Audits?</label>
              <select
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                value={formData.auditRoutine}
                onChange={(e) => handleSelectChange("auditRoutine", e.target.value)}
              >
                <option value="monthly">Monthly / Quarterly (Proactive)</option>
                <option value="yearly">Once a Year (Standard)</option>
                <option value="never">Never / Only before official audit</option>
              </select>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition mt-4 text-sm"
            >
              Continue to Analysis
            </button>
          </div>
        )}

        {/* STEP 2: Lead Capture Gate */}
        {step === 2 && (
          <form onSubmit={processResults} className="space-y-5">
            <div className="bg-slate-900/50 border border-indigo-500/20 p-4 rounded-xl text-center text-sm text-indigo-300 mb-4">
              🔒 Enter business parameters to securely calculate and unlock your compliance health score.
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Company Registered Name</label>
              <input
                type="text"
                name="companyName"
                required
                placeholder="e.g., London Shield Security Ltd"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                value={formData.companyName}
                onChange={handleTextChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Corporate Email Address</label>
              <input
                type="email"
                name="businessEmail"
                required
                placeholder="director@yourcompany.co.uk"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                value={formData.businessEmail}
                onChange={handleTextChange}
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-lg transition text-sm"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-medium py-3 rounded-lg transition text-sm flex items-center justify-center"
              >
                {loading ? "Analyzing Audit Data..." : "Generate Health Report"}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Results Dashboard */}
        {step === 3 && result && (
          <div className="space-y-6">
            <div className="text-center p-6 bg-slate-900 rounded-xl border border-slate-700">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Your Security Compliance Score</p>
              
              <div className={`text-5xl font-black mt-3 ${
                result.status === 'Healthy' ? 'text-emerald-400' : 
                result.status === 'Needs Attention' ? 'text-amber-400' : 'text-rose-500'
              }`}>
                {result.finalScore}%
              </div>
              
              <div className={`mt-2 text-sm font-semibold px-3 py-1 inline-block rounded-full ${
                result.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400' : 
                result.status === 'Needs Attention' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                Status: {result.status}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-3">Identified Vulnerabilities & Gaps:</h3>
              {result.recommendations.length > 0 ? (
                <ul className="space-y-2.5">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-xs text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-l-4 border-slate-700 border-l-rose-500 flex items-start">
                      <span className="mr-2 text-rose-500">🛑</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-emerald-400 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/20">
                  ✓ Your basic compliance layout looks airtight for upcoming audits! Maintain strict logging routines.
                </p>
              )}
            </div>

            <hr className="border-slate-700 my-4" />

            <div className="bg-indigo-600/10 border border-indigo-500/30 p-5 rounded-xl text-center">
              <h4 className="text-sm font-bold text-white">Want to fix these gaps before the official audit?</h4>
              <p className="text-xs text-slate-300 mt-1.5 max-w-md mx-auto">
                Schedule a complimentary 10-minute documentation verification session with BizGrow's lead UK compliance auditor.
              </p>
              <button 
                type="button"
                onClick={() => window.open("https://calendly.com", "_blank")}
                className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-6 py-2.5 rounded-lg transition shadow-md"
              >
                Book 10-Min Free Gap-Fix Call
              </button>
            </div>

            <button
              onClick={() => { setStep(1); setResult(null); }}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-400 transition pt-2"
            >
              ← Restart Scanner Component
            </button>
          </div>
        )}

      </div>
    </div>
  );
}