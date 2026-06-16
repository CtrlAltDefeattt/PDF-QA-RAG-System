import React from "react";

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
      "bg-green-500/10 text-green-400 border-green-500/20";
  } else if (percentage >= 70) {
    label = "Medium Confidence";
    styles =
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${styles}`}
    >
      <span>{percentage}%</span>
      <span>{label}</span>
    </div>
  );
};

export default ConfidenceBadge;