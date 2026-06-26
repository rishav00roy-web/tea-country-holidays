type Props = { 
  topColor: string; 
  bottomColor: string; 
  curve?: "down" | "up"; 
  className?: string; 
};

const PATH_DOWN = "M0,30 C240,0 480,0 720,30 C960,60 1200,60 1440,30 L1440,0 L0,0 Z";
const PATH_UP   = "M0,0 C240,60 480,60 720,30 C960,0 1200,0 1440,30 L1440,60 L0,60 Z";

export default function SectionDivider({ topColor, bottomColor, curve = "down", className = "" }: Props) {
  // PATH_DOWN fills the TOP area. Top edge = fill, Bottom edge = wrapper bg.
  // PATH_UP fills the BOTTOM area. Top edge = wrapper bg, Bottom edge = fill.
  const bg = curve === "down" ? bottomColor : topColor;
  const fill = curve === "down" ? topColor : bottomColor;
  const path = curve === "down" ? PATH_DOWN : PATH_UP;

  return (
    <div 
      style={{ 
        background: bg, 
        marginTop: "-1px",
        marginBottom: "-1px", 
        position: "relative", 
        zIndex: 10 
      }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className={`w-full h-[60px] block ${className}`}
        style={{ display: "block" }}
      >
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}
