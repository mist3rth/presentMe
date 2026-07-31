import React, { useId } from 'react';

export interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  width: number;
  height: number;
  x?: string | number;
  y?: string | number;
  squares?: [number, number][];
  mediumSquares?: [number, number][];
  brightSquares?: [number, number][];
}

export const GridPattern: React.FC<GridPatternProps> = ({
  width,
  height,
  x,
  y,
  squares,
  mediumSquares,
  brightSquares,
  ...props
}) => {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      
      {/* Low opacity squares (5%) */}
      {squares && (
        <svg x={x} y={y} className="overflow-visible fill-[#F97316]/5 dark:fill-[#F97316]/5">
          {squares.map(([xCoord, yCoord]: [number, number]) => (
            <rect
              strokeWidth="0"
              key={`low-${xCoord}-${yCoord}`}
              width={width + 1}
              height={height + 1}
              x={xCoord * width}
              y={yCoord * height}
            />
          ))}
        </svg>
      )}

      {/* Medium opacity squares (18%) */}
      {mediumSquares && (
        <svg x={x} y={y} className="overflow-visible fill-[#F97316]/18 dark:fill-[#F97316]/18">
          {mediumSquares.map(([xCoord, yCoord]: [number, number]) => (
            <rect
              strokeWidth="0"
              key={`med-${xCoord}-${yCoord}`}
              width={width + 1}
              height={height + 1}
              x={xCoord * width}
              y={yCoord * height}
            />
          ))}
        </svg>
      )}

      {/* High opacity squares (55% fill + border outline) */}
      {brightSquares && (
        <svg x={x} y={y} className="overflow-visible fill-[#F97316]/55 dark:fill-[#F97316]/55 stroke-[#F97316]/70 stroke-[1.5px]">
          {brightSquares.map(([xCoord, yCoord]: [number, number]) => (
            <rect
              key={`bright-${xCoord}-${yCoord}`}
              width={width + 1}
              height={height + 1}
              x={xCoord * width}
              y={yCoord * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
};

export const Grid: React.FC<{
  pattern?: [number, number][];
  size?: number;
  brightSquares?: [number, number][];
  className?: string;
}> = ({
  pattern,
  size,
  brightSquares,
  className,
}) => {
  // Define layers of squares at different opacities for depth
  const pLow = pattern ?? [
    [5, 2], [6, 4], [8, 1], [10, 3], [12, 5], [7, 2]
  ];
  
  const pMedium: [number, number][] = [
    [7, 3], [9, 1], [11, 4], [8, 5], [6, 2]
  ];
  
  const pHigh = brightSquares ?? [
    [8, 2], [10, 4], [9, 5]
  ];
  
  return (
    <div className={`pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)] z-0 ${className || ''}`}>
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#F97316]/15 from-orange-100/10 to-transparent opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={pLow}
          mediumSquares={pMedium}
          brightSquares={pHigh}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:stroke-[#F97316]/20 stroke-orange-500/20"
        />
      </div>
    </div>
  );
};
