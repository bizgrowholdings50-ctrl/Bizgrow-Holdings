import CertificateVerifier from "@/components/CertificateVerifier";

import { createOpenGraph } from "@/lib/openGraphMetadata";

export const metadata = {
  title: "Certificate Verification | BizGrow Holdings Ltd UK",
  description:
    "Instant Certificate Verification for BizGrow Holdings certifications. Validate authenticity, ensure compliance, and build trust.",
  openGraph: createOpenGraph(
    "/certificate-verification-validate-bizgrow-certification/",
    "/site-approvals.jpg",
  ),
};

export default function Page() {
  return <CertificateVerifier />;
}