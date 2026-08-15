import { useState, useMemo, useEffect } from "react";
import { ACTIVE_STATES, ALL_STATE_IDS } from "@/lib/map-data";
import { BRAZIL_PATHS } from "@/lib/brazil-paths";
import { STATE_CENTROIDS } from "@/lib/map-centroids";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

import { Reveal } from "./Reveal";

interface BrazilMapProps {
  onHoverState?: (id: string | null) => void;
  activeId?: string | null;
}

export function BrazilMap({ onHoverState, activeId }: BrazilMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);


  const activeStatesSet = useMemo(() => new Set(ACTIVE_STATES.map((s) => s.id)), []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (id: string) => {
    if (activeStatesSet.has(id)) {
      setHoveredState(id);
      onHoverState?.(id);
    }
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
    onHoverState?.(null);
  };

  const handleStateClick = (id: string) => {
    if (isTouch && activeStatesSet.has(id)) {
      if (hoveredState === id) {
        setHoveredState(null);
        onHoverState?.(null);
      } else {
        setHoveredState(id);
        onHoverState?.(id);
      }
    }
  };

  const currentHoveredInfo = useMemo(
    () => ACTIVE_STATES.find((s) => s.id === (hoveredState || activeId)),
    [hoveredState, activeId]
  );


  return (
    <div className="group relative w-full" onMouseMove={handleMouseMove}>
      {/* Glow effect behind map */}
      <div className="absolute inset-0 bg-purple/5 blur-[100px] rounded-full" />

      <svg
        viewBox="0 0 800 800"
        className="relative w-full h-auto drop-shadow-2xl"
        style={{ filter: "drop-shadow(0 10px 20px rgba(95, 85, 135, 0.1))" }}
      >
        {ALL_STATE_IDS.map((id) => {
          const isActive = activeStatesSet.has(id);
          const isHighlighted = hoveredState === id || activeId === id;
          const path = BRAZIL_PATHS[id];

          if (!path) return null;

          return (
            <g key={id} className="cursor-default">
              <path
                d={path}
                className={cn(
                  "transition-all duration-300 ease-out stroke-[0.5] stroke-white/50",
                  isActive
                    ? "fill-purple hover:fill-purple-deep cursor-pointer"
                    : "fill-lavender/40 hover:fill-lavender/60",
                  isHighlighted && "fill-purple-deep -translate-y-[2px] drop-shadow-lg scale-[1.01]"
                )}
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleStateClick(id)}
                tabIndex={isActive ? 0 : -1}
                role="button"
                aria-label={isActive ? `${id} - estado onde a Cáliber já atuou` : id}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleMouseEnter(id);
                  }
                }}
                onBlur={handleMouseLeave}

                style={{
                  transformOrigin: "center center",
                  transformBox: "fill-box",
                }}
              />
              {/* State Labels for active ones */}
              {isActive && STATE_CENTROIDS[id] && (
                <text
                  x={STATE_CENTROIDS[id].x}
                  y={STATE_CENTROIDS[id].y}
                  className={cn(
                    "pointer-events-none fill-white text-[11px] font-black transition-all duration-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]",
                    isHighlighted ? "opacity-100 scale-110" : "opacity-80"
                  )}
                  dominantBaseline="middle"
                  textAnchor="middle"
                  style={{
                    transformOrigin: `${STATE_CENTROIDS[id].x}px ${STATE_CENTROIDS[id].y}px`,
                  }}
                >
                  {id}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {currentHoveredInfo && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePos.x + 15,
            top: mousePos.y + 15,
          }}
        >
          <div className="animate-in fade-in slide-in-from-top-1 duration-200 rounded-xl border border-purple/10 bg-white p-4 shadow-xl ring-1 ring-black/5 min-w-[200px]">
            <h4 className="text-sm font-bold text-purple">
              {currentHoveredInfo.name} ({currentHoveredInfo.id})
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              {currentHoveredInfo.description}
            </p>
            <div className="mt-3 flex items-center gap-2 border-t border-slate-50 pt-3">
              <div className="flex size-6 items-center justify-center rounded-full bg-purple/10">
                <Users className="size-3 text-purple" />
              </div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Clientes atendidos
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
