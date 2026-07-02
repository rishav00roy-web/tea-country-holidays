type Props = { 
  topColor: string; 
  bottomColor: string; 
  curve?: "down" | "up"; 
  className?: string; 
};

// We extend the path coordinates to y=-10 (top) and y=70 (bottom) to completely seal subpixel gaps.
const PATH_DOWN     = "M0,30 C240,0 480,0 720,30 C960,60 1200,60 1440,30 L1440,-10 L0,-10 Z";
const PATH_DOWN_INV = "M0,30 C240,0 480,0 720,30 C960,60 1200,60 1440,30 L1440,70 L0,70 Z";
const PATH_UP       = "M0,30 C240,60 480,60 720,30 C960,0 1200,0 1440,30 L1440,70 L0,70 Z";
const PATH_UP_INV   = "M0,30 C240,60 480,60 720,30 C960,0 1200,0 1440,30 L1440,-10 L0,-10 Z";

export default function SectionDivider({ topColor, bottomColor, curve = "down", className = "" }: Props) {
  const isMesh = className.includes("mesh-bg");
  const isTransparent = className.includes("bg-transparent") || isMesh;

  let bg = curve === "down" ? bottomColor : topColor;
  let fill = curve === "down" ? topColor : bottomColor;
  let path = curve === "down" ? PATH_DOWN : PATH_UP;

  if (isTransparent) {
    // If we want a transparent background (e.g. for image or mesh transition), we set it to transparent.
    // And we fill the path with the solid color (either topColor or bottomColor) for the non-transparent side.
    bg = "transparent";
    if (curve === "down") {
      fill = bottomColor;
      path = PATH_DOWN_INV;
    } else {
      fill = topColor;
      path = PATH_UP_INV;
    }
  }

  return (
    <div 
      style={{ 
        background: bg, 
        marginTop: "-2px",
        marginBottom: "-2px", 
        position: "relative", 
        zIndex: 10 
      }}
      className={isMesh ? "" : className}
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
