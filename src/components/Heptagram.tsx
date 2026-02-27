interface HeptagramProps {
  size?: number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  variant?: "star" | "lines" | "double";
}

function generateStarPoints(
  cx: number,
  cy: number,
  radius: number,
  points: number,
  skip: number
): string {
  const vertices: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i * 2 * Math.PI) / points - Math.PI / 2;
    vertices.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
  }

  const path: string[] = [];
  const visited = new Set<number>();
  let current = 0;

  path.push(`M ${vertices[0][0]} ${vertices[0][1]}`);
  visited.add(0);

  for (let step = 0; step < points; step++) {
    current = (current + skip) % points;
    path.push(`L ${vertices[current][0]} ${vertices[current][1]}`);
  }
  path.push("Z");

  return path.join(" ");
}

function generateCirclePoints(
  cx: number,
  cy: number,
  radius: number,
  points: number
): [number, number][] {
  const vertices: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i * 2 * Math.PI) / points - Math.PI / 2;
    vertices.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
  }
  return vertices;
}

export default function Heptagram({
  size = 500,
  className = "",
  strokeColor = "#B8860B",
  strokeWidth = 0.5,
  variant = "double",
}: HeptagramProps) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.45;
  const innerR = size * 0.32;
  const tinyR = size * 0.15;

  const starPath1 = generateStarPoints(cx, cy, outerR, 7, 2);
  const starPath2 = generateStarPoints(cx, cy, outerR, 7, 3);
  const innerStar = generateStarPoints(cx, cy, innerR, 7, 3);
  const tinyStar = generateStarPoints(cx, cy, tinyR, 7, 2);

  const outerVertices = generateCirclePoints(cx, cy, outerR, 7);
  const innerVertices = generateCirclePoints(cx, cy, innerR, 7);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="heptagram-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={outerR * 1.2} fill="url(#heptagram-glow)" />

      <circle
        cx={cx}
        cy={cy}
        r={outerR * 1.05}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.6}
        opacity={0.3}
      />

      <circle
        cx={cx}
        cy={cy}
        r={outerR * 1.1}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.3}
        opacity={0.15}
      />

      <path
        d={starPath1}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        opacity={0.6}
      />

      {variant === "double" && (
        <>
          <path
            d={starPath2}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.7}
            opacity={0.35}
          />

          <path
            d={innerStar}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.5}
            opacity={0.25}
          />

          <path
            d={tinyStar}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.8}
            opacity={0.5}
          />
        </>
      )}

      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.4}
        opacity={0.2}
      />

      <circle cx={cx} cy={cy} r={2} fill={strokeColor} opacity={0.5} />

      {outerVertices.map((ov, i) => (
        <line
          key={`connect-${i}`}
          x1={ov[0]}
          y1={ov[1]}
          x2={innerVertices[i][0]}
          y2={innerVertices[i][1]}
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.3}
          opacity={0.15}
        />
      ))}

      {outerVertices.map((v, i) => (
        <circle
          key={`vertex-${i}`}
          cx={v[0]}
          cy={v[1]}
          r={2.5}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.5}
          opacity={0.4}
        />
      ))}
    </svg>
  );
}
