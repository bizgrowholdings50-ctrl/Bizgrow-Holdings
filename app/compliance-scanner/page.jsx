import ComplianceScanner from "./ComplianceScanner";

export const metadata = {
  title: "Compliance Health Scanner | BizGrow Holdings",
  description: "Assess your organisation's SIA ACS, BS 7858, ISO, health and safety, and cyber security compliance readiness.",
};

export default function ComplianceScannerPage() {
  return (
    <main id="compliance-scanner-page" className="min-h-screen overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 mt-16">
      <div className="mx-auto max-w-7xl">
        {/* <div id="compliance-scanner-heading" className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#997818]">BizGrow Compliance Health Scanner</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Know where your organisation stands</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">A transparent, on-site readiness assessment covering licensing, vetting, operations, quality and cyber security.</p>
        </div> */}
        <ComplianceScanner />
      </div>
    </main>
  );
}