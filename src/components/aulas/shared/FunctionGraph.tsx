"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export interface FunctionPlot {
  id: string;
  label: string;
  color: string;
  fn: (x: number) => number | null;
  strokeWidth?: number;
}

interface FunctionGraphProps {
  title: string;
  functions: FunctionPlot[];
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  xLabel?: string;
  yLabel?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  height?: number;
  points?: number;
}

export function FunctionGraph({
  title,
  functions,
  xMin = -10,
  xMax = 10,
  yMin = -10,
  yMax = 10,
  xLabel = "x",
  yLabel = "y",
  showGrid = true,
  showLegend = true,
  height = 400,
  points = 200,
}: FunctionGraphProps) {
  // Generate data points for all functions
  const generateData = () => {
    const data = [];
    const step = (xMax - xMin) / points;

    for (let x = xMin; x <= xMax; x += step) {
      const dataPoint: Record<string, number | null> = { x: parseFloat(x.toFixed(3)) };

      for (const func of functions) {
        const y = func.fn(x);
        // Only include finite values to avoid breaking the chart
        dataPoint[func.id] = y !== null && isFinite(y) ? parseFloat(y.toFixed(4)) : null;
      }

      data.push(dataPoint);
    }

    return data;
  };

  const data = generateData();

  return (
    <div className="w-full bg-card rounded-xl border border-border p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Domínio: [{xMin}, {xMax}] | Contradomínio: [{yMin}, {yMax}]
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            dataKey="x"
            label={{ value: xLabel, position: "insideBottomRight", offset: -5 }}
            type="number"
            domain={[xMin, xMax]}
            tickCount={Math.min(11, points / 20)}
          />
          <YAxis
            label={{ value: yLabel, angle: -90, position: "insideLeft" }}
            domain={[yMin, yMax]}
          />
          <Tooltip
            formatter={(value) =>
              value === null ? "undefined" : (value as number).toFixed(3)
            }
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "6px",
              padding: "8px",
            }}
            cursor={{ stroke: "rgba(255, 255, 255, 0.3)" }}
          />
          {showLegend && <Legend />}

          {/* Reference axes */}
          <ReferenceLine x={0} stroke="rgba(100, 100, 100, 0.3)" strokeWidth={1} />
          <ReferenceLine y={0} stroke="rgba(100, 100, 100, 0.3)" strokeWidth={1} />

          {/* Plot each function */}
          {functions.map((func) => (
            <Line
              key={func.id}
              type="monotone"
              dataKey={func.id}
              stroke={func.color}
              strokeWidth={func.strokeWidth || 2}
              dot={false}
              isAnimationActive={false}
              name={func.label}
              connectNulls={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
        <p>
          <strong>Dica:</strong> Use o mouse para explorar os valores. Passe por
          cima dos pontos para ver coordenadas exatas.
        </p>
      </div>
    </div>
  );
}
