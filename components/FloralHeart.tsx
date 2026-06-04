// İnce çizgili (line-art) çiçekli kalp — davetiyedeki motifi yansıtır.
// currentColor kullanır; rengini saran elemandan alır. Dekoratiftir (aria-hidden).

const HEART =
  "M120 192 C 96 168 40 138 40 92 C 40 64 62 44 86 44 C 104 44 116 56 120 70 " +
  "C 124 56 136 44 154 44 C 178 44 200 64 200 92 C 200 138 144 168 120 192 Z";

const LEAF_BODY = "M0 0 C 7 -3 8 -13 0 -19 C -8 -13 -7 -3 0 0 Z";
const LEAF_MIDRIB = "M0 -2 L0 -16";

type Placement = { x: number; y: number; r: number; s?: number };

// Merkez sapın iki yanına simetrik yapraklar
const CENTRAL_LEAVES: Placement[] = [
  { x: 120, y: 174, r: -54, s: 0.85 },
  { x: 120, y: 174, r: 54, s: 0.85 },
  { x: 120, y: 156, r: -48, s: 0.95 },
  { x: 120, y: 156, r: 48, s: 0.95 },
  { x: 120, y: 138, r: -42, s: 0.9 },
  { x: 120, y: 138, r: 42, s: 0.9 },
  { x: 120, y: 122, r: -34, s: 0.8 },
  { x: 120, y: 122, r: 34, s: 0.8 },
];

// Yanlara açılan dalların üzerindeki yapraklar
const BRANCH_LEAVES: Placement[] = [
  { x: 104, y: 164, r: -128, s: 0.8 },
  { x: 92, y: 148, r: -150, s: 0.8 },
  { x: 83, y: 132, r: -168, s: 0.7 },
  { x: 136, y: 164, r: 128, s: 0.8 },
  { x: 148, y: 148, r: 150, s: 0.8 },
  { x: 157, y: 132, r: 168, s: 0.7 },
];

function Leaf({ x, y, r, s = 1 }: Placement) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d={LEAF_BODY} />
      <path d={LEAF_MIDRIB} />
    </g>
  );
}

function Flower({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {petals.map((a) => (
        <ellipse key={a} cx={0} cy={-8} rx={3.6} ry={7.5} transform={`rotate(${a})`} />
      ))}
      <circle r={2.3} />
    </g>
  );
}

export function FloralHeart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 220"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Kalp dış hattı — soluk */}
      <path d={HEART} strokeOpacity={0.45} />

      {/* Merkez sap ve yana açılan dallar */}
      <path d="M120 188 C 119 158 120 132 120 104" strokeOpacity={0.7} />
      <path d="M120 184 C 102 168 88 150 82 128" strokeOpacity={0.6} />
      <path d="M120 184 C 138 168 152 150 158 128" strokeOpacity={0.6} />

      {CENTRAL_LEAVES.map((p, i) => (
        <Leaf key={`c${i}`} {...p} />
      ))}
      {BRANCH_LEAVES.map((p, i) => (
        <Leaf key={`b${i}`} {...p} />
      ))}

      {/* Çiçekler */}
      <Flower x={120} y={92} s={1} />
      <Flower x={94} y={106} s={0.72} />
      <Flower x={146} y={106} s={0.72} />

      {/* Küçük tomurcuklar */}
      <circle cx={82} cy={126} r={2.6} />
      <circle cx={158} cy={126} r={2.6} />
      <circle cx={120} cy={72} r={2.2} />
    </svg>
  );
}
