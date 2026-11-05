import ScorecardEmbed from "@/components/Scorecard";

export default function ScorecardPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Business Growth Scorecard</h1>
        <ScorecardEmbed />
      </div>
    </main>
  );
}