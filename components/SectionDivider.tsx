type From = "hero" | "dark" | "mesh" | "cream" | "varden" | "faq";

type Props = { from: From; className?: string };

// Maps each "from" section type to:
//   bg    — the solid colour of the current section (painted behind the SVG)
//   fill  — the colour the wave pours INTO (the next section's bg)
//   curve — which wave shape to use
const TOKENS: Record<From, { bg: string; fill: string; curve: "down" | "up" }> = {
  hero:   { bg: "#013220", fill: "#FEFAEF", curve: "down" }, // Hero → WhoWeAre
  dark:   { bg: "#013220", fill: "#FEFAEF", curve: "down" }, // evergreen dark → cream
  mesh:   { bg: "#0A2E1D", fill: "#FEFAEF", curve: "down" }, // mesh-bg → cream
  cream:  { bg: "#FEFAEF", fill: "#013220", curve: "up"   }, // floral cream → dark
  varden: { bg: "#FEF0D5", fill: "#0A2E1D", curve: "up"   }, // varden → mesh
  faq:    { bg: "#fafaf7", fill: "#013220", curve: "up"   }, // faq near-white → dark (unused at end but kept for symmetry)
};

const PATH_DOWN = "M0,30 C240,0 480,0 720,30 C960,60 1200,60 1440,30 L1440,0 L0,0 Z";
const PATH_UP   = "M0,0 C240,60 480,60 720,30 C960,0 1200,0 1440,30 L1440,60 L0,60 Z";

export default function SectionDivider({ from, className = "" }: Props) {
  const { bg, fill, curve } = TOKENS[from];
  const path = curve === "down" ? PATH_DOWN : PATH_UP;

  return (
    <div style={{ background: bg, marginBottom: "-1px" }}>
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
