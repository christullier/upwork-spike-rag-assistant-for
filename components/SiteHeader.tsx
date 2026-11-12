"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Chat", short: "Chat" },
  { href: "/documents", label: "Documents", short: "Docs" },
  { href: "/eval", label: "Evaluation", short: "Eval" },
  { href: "/how", label: "How it maps", short: "Map" },
];

function isActive(pathname: string, href: string): boolean {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return href === "/" ? clean === "/" : clean === href;
}

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="CiteRight home">
          <span className="brand-mark" aria-hidden="true">
            C
          </span>
          <span>
            <span className="brand-name">CiteRight</span>
            <span className="brand-sub">Document assistant</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${isActive(pathname, link.href) ? " active" : ""}`}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
            >
              <span className="nav-full">{link.label}</span>
              <span className="nav-short">{link.short}</span>
            </Link>
          ))}
        </nav>

        <span className="header-mode">
          <span className="live-dot" aria-hidden="true" />
          Demo mode
        </span>
      </div>
    </header>
  );
}
