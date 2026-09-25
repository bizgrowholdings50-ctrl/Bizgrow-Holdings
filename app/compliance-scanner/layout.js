import { createOpenGraph } from "@/lib/openGraphMetadata";

export const metadata = {
  openGraph: createOpenGraph(
    "/compliance-scanner/",
    "/compliance-hero-bg.jpg",
  ),
};

export default function ComplianceScannerLayout({ children }) {
  return children;
}
