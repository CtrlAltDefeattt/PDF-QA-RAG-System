interface Props {
  score: number;
}

const ConfidenceBadge = ({ score }: Props) => {
  const percentage = Math.round(score * 100);

  let label = "Low Confidence";
  let styles =
    "bg-red-500/10 text-red-400 border-red-500/20";

  if (percentage >= 90) {
    label = "High Confidence";
    styles =
      "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
  } else if (percentage >= 70) {
    label = "Medium Confidence";
    styles =
      "bg-amber-500/10 text-amber-300 border-amber-500/20";
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${styles}`}
    >
      <span>{percentage}%</span>
      <span>{label}</span>
    </div>
  );
};

export default ConfidenceBadge;
