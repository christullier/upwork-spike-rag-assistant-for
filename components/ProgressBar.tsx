export default function ProgressBar({
  value,
  label,
}: {
  value: number;
  label?: string;
}) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div>
      {label ? (
        <div className="job-row">
          <span>{label}</span>
          <span>{Math.round(safe)}%</span>
        </div>
      ) : null}
      <div
        className="progress"
        role="progressbar"
        aria-valuenow={Math.round(safe)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
      >
        <span style={{ width: `${safe}%` }} />
      </div>
    </div>
  );
}
