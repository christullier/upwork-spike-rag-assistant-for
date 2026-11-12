import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "CiteRight — answers from a real estate archive",
  description:
    "A small RAG demo for a real estate agency: cited answers, contract conflict handling and a citation-level evaluation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <span>
              CiteRight demo · authored answers with exact citations · static export,
              no server and no API key
            </span>
            <span className="footer-links">
              <a href="https://pages.cloudflare.com/" target="_blank" rel="noreferrer">
                Cloudflare Pages
              </a>
              <a href="/eval/">Evaluation</a>
              <a href="/how/">Production map</a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
