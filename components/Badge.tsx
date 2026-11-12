import type { ReactNode } from "react";

export default function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "danger" | "amber" | "outline";
  className?: string;
}) {
  return <span className={`badge badge-${tone} ${className}`.trim()}>{children}</span>;
}
