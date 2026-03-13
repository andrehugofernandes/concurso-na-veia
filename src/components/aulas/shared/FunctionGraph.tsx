"use client";

import { useState, useEffect, useMemo } from "react";

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
  interactive?: boolean;
}

// Helper to safely parse basic math expressions
const parseMathExpression = (expr: string) => {
  if (!expr || expr.trim() === "") return null;

  // Basic sanitization
  let sanitized = expr
    .toLowerCase()
    .replace(/[^a-z0-9+\-*/^().,=\s]/g, "") // Allow basic math chars
    .replace(/,/g, "."); // Replace commas with dots

  // Handle equations (e.g., 2x^2 + 2x - 3 = 5 -> 2x^2 + 2x - 3 - (5))
  if (sanitized.includes("=")) {
    const parts = sanitized.split("=");
    if (parts.length === 2) {
      sanitized = `(${parts[0]}) - (${parts[1]})`;
    }
  }

  // Convert expressions like 2x to 2*x
  sanitized = sanitized.replace(/(\d)(x)/g, "$1*$2");

  // Convert power (x^2 or x**2) to Math.pow(x, 2) inside the function evaluator
  sanitized = sanitized.replace(/\^/g, "**");

  try {
    // We create a safe evaluator function using new Function
    // This expects 'x' as an argument
    const evaluator = new Function(
      "x",
      `
      try {
        const result = ${sanitized};
        return isNaN(result) ? null : result;
      } catch(e) {
        return null;
      }
    `,
    );

    // Test if it works with x=1
    evaluator(1);

    return evaluator as (x: number) => number | null;
  } catch (e) {
    return null;
  }
};

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
  interactive = false,
}: FunctionGraphProps) {
  const [customEquation, setCustomEquation] = useState("");
  const [customFn, setCustomFn] = useState<
    ((x: number) => number | null) | null
  >(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Update custom function when input changes
  useEffect(() => {
    if (!customEquation.trim()) {
      setCustomFn(null);
      setErrorMsg("");
      return;
    }

    const parsed = parseMathExpression(customEquation);
    if (parsed) {
      setCustomFn(() => parsed);
      setErrorMsg("");
    } else {
      setErrorMsg("Equação inválida. Tente algo como 'x^2 - 4' ou '2x = 5'");
    }
  }, [customEquation]);

  // Formats ^2 to ², ^3 to ³, etc for better visual display
  const formatEquationForDisplay = (eq: string) => {
    const superscripts: Record<string, string> = {
      "0": "⁰",
      "1": "¹",
      "2": "²",
      "3": "³",
      "4": "⁴",
      "5": "⁵",
      "6": "⁶",
      "7": "⁷",
      "8": "⁸",
      "9": "⁹",
    };
    return eq.replace(/\^(\d+)/g, (_, digits) => {
      return digits
        .split("")
        .map((d: string) => superscripts[d] || d)
        .join("");
    });
  };

  // Combine default functions with custom active function
  const activeFunctions = useMemo(() => {
    if (customFn && customEquation.trim() !== "") {
      return [
        {
          id: "custom-func",
          label: "Sua Equação: " + formatEquationForDisplay(customEquation),
          color: "#a855f7", // Vivid purple for the user function
          fn: customFn,
          strokeWidth: 3,
        },
      ];
    }
    return [...functions];
  }, [functions, customFn, customEquation]);

  // Generate data points for all functions
  const data = useMemo(() => {
    const dataPoints = [];
    const step = (xMax - xMin) / points;

    for (let x = xMin; x <= xMax; x += step) {
      const dataPoint: Record<string, number | null> = {
        x: parseFloat(x.toFixed(3)),
      };

      for (const func of activeFunctions) {
        try {
          const y = func.fn(x);
          // Only include finite values to avoid breaking the chart
          dataPoint[func.id] =
            y !== null && isFinite(y) ? parseFloat(y.toFixed(4)) : null;
        } catch {
          dataPoint[func.id] = null;
        }
      }

      dataPoints.push(dataPoint);
    }

    return dataPoints;
  }, [activeFunctions, xMin, xMax, points]);

  return (
    <div className="w-full bg-card rounded-xl border border-border p-6 space-y-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Domínio: [{xMin}, {xMax}] | Contradomínio: [{yMin}, {yMax}]
          </p>
        </div>

        {interactive && (
          <div className="bg-muted/30 p-4 rounded-lg border border-border/50 space-y-3">
            <label className="text-sm font-medium text-foreground flex items-center justify-between">
              Experimente sua Própria Equação
              {errorMsg && (
                <span className="text-xs text-red-500 font-normal">
                  {errorMsg}
                </span>
              )}
            </label>
            <div className="flex gap-2 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground font-mono text-sm">
                f(x) =
              </div>
              <input
                type="text"
                value={customEquation}
                onChange={(e) => setCustomEquation(e.target.value)}
                placeholder="Ex: 2x^2 - 4x + 1 ou 3x = 12"
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm pl-12 focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono transition-colors"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              A curva roxa mostrará o resultado. Use <code>x^2</code> para
              potências. Raízes cruzam a linha horizontal <code>y=0</code>.
            </p>
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
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
          <ReferenceLine
            x={0}
            stroke="rgba(100, 100, 100, 0.3)"
            strokeWidth={1}
          />
          <ReferenceLine
            y={0}
            stroke="rgba(100, 100, 100, 0.3)"
            strokeWidth={1}
          />

          {/* Plot each function */}
          {activeFunctions.map((func) => (
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
