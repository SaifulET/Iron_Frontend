"use client";

import React from "react";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";

const termsSections: LegalSection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    paragraphs: [
      "Welcome to Vesioh. By accessing or using our platform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, you must not access or use our services.",
      "These terms constitute a legally binding agreement between you (\"Client\", \"User\") and Vesioh (\"Company\", \"We\", \"Us\"). Our services are designed for enterprise-level operations, and as such, specific compliance and performance standards apply as outlined in this document."
    ],
  },
  {
    id: "account-terms",
    title: "2. Account Terms",
    paragraphs: [
      "These terms constitute a legally binding agreement between you (\"Client\", \"User\") and Vesioh (\"Company\", \"We\", \"Us\"). Our services are designed for enterprise-level operations, and as such, specific compliance and performance standards apply as outlined in this document.",
      "Vesioh cannot and will not be liable for any loss or damage from your failure to comply with this security obligation. You are responsible for all content posted and activity that occurs under your account."
    ],
  },
  {
    id: "privacy-policy",
    title: "3. Privacy Policy",
    paragraphs: [
      "Your privacy is critically important to us. Our Privacy Policy explains how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that Vesioh can use such data in accordance with our privacy policies."
    ],
  },
  {
    id: "prohibited-uses",
    title: "4. Prohibited Uses",
    paragraphs: [
      "In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: to solicit others to perform or participate in any unlawful acts, to violate any international or domestic regulations, or to infringe upon our intellectual property rights."
    ],
  },
  {
    id: "termination",
    title: "5. Termination",
    paragraphs: [
      "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
    ],
  },
  {
    id: "governing-law",
    title: "6. Governing Law",
    paragraphs: [
      "These Terms shall be governed and construed in accordance with the laws of the jurisdiction, without regard to its conflict of law provisions."
    ],
  }
];

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      pageTitle="Terms of Services"
      pageSubtitle="Please read these enterprise service terms carefully before using the Vesioh platform. These terms govern your access to and use of our enterprise infrastructure and services."
      lastUpdated="Last updated: Oct 2023"
      sections={termsSections}
    />
  );
}
