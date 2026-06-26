type Props = { from: "dark" | "cream"; className?: string };

export default function SectionDivider({ from, className = "" }: Props) {
  const fill = from === "dark" ? "#FEFAEF" : "#0A2E1D";
  const path = from === "dark"
    ? "M0,30 C240,0 480,0 720,30 C960,60 1200,60 1440,30 L1440,0 L0,0 Z"
    : "M0,0 C240,60 480,60 720,30 C960,0 1200,0 1440,30 L1440,60 L0,60 Z";
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none"
      className={`w-full h-[60px] block ${className}`}
      style={{ display: "block", marginBottom: "-1px" }}>
      <path d={path} fill={fill} />
    </svg>
  );
}
