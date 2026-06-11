import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

const getGridSize = (width) => {
  if (width < 640) return { cols: 5, rows: 4 };
  if (width < 768) return { cols: 7, rows: 4 };
  if (width < 1024) return { cols: 9, rows: 5 };
  return { cols: 11, rows: 5 };
};

const PARALLAX_SPRING = { stiffness: 48, damping: 22, mass: 0.75 };

const GridCell = ({
  cell,
  cols,
  rows,
  mouseX,
  mouseY,
  darkMode,
  cellClass,
  showEntrance,
}) => {
  const distX = (cell.col / Math.max(cols - 1, 1) - 0.5) + mouseX;
  const distY = (cell.row / Math.max(rows - 1, 1) - 0.5) + mouseY;
  const influence = 1 - Math.min(1, Math.hypot(distX, distY));
  const opacity = 0.18 + influence * 0.42;
  const scale = 0.94 + influence * 0.06;
  const glow = darkMode
    ? `0 0 ${10 + influence * 18}px rgba(59, 130, 246, ${0.03 + influence * 0.07})`
    : `0 0 ${10 + influence * 18}px rgba(59, 130, 246, ${0.05 + influence * 0.09})`;

  return (
    <div
      className={`rounded-2xl backdrop-blur-[2px] ${showEntrance ? 'grid-cell-enter' : ''} ${cellClass}`}
      style={{
        '--cell-delay': `${cell.id * 8}ms`,
        ...(showEntrance
          ? {}
          : { opacity, transform: `scale(${scale})`, boxShadow: glow }),
      }}
    />
  );
};

GridCell.propTypes = {
  cell: PropTypes.shape({
    id: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
  }).isRequired,
  cols: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  mouseX: PropTypes.number.isRequired,
  mouseY: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
  cellClass: PropTypes.string.isRequired,
  showEntrance: PropTypes.bool.isRequired,
};

const Grid3DBackground = ({ darkMode, mousePosition }) => {
  const prefersReducedMotion = useReducedMotion();
  const [gridSize, setGridSize] = useState(() => getGridSize(
    typeof window !== 'undefined' ? window.innerWidth : 1024,
  ));
  const [showEntrance, setShowEntrance] = useState(true);

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const springX = useSpring(targetX, PARALLAX_SPRING);
  const springY = useSpring(targetY, PARALLAX_SPRING);

  useEffect(() => {
    targetX.set(mousePosition.x * 16);
    targetY.set(mousePosition.y * 10);
  }, [mousePosition.x, mousePosition.y, targetX, targetY]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const update = () => setGridSize(getGridSize(window.innerWidth));
    update();
    mq.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowEntrance(false);
      return undefined;
    }
    setShowEntrance(true);
    const timer = window.setTimeout(() => setShowEntrance(false), 900);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, gridSize]);

  const cells = useMemo(() => {
    const total = gridSize.cols * gridSize.rows;
    return Array.from({ length: total }, (_, i) => ({
      id: i,
      col: i % gridSize.cols,
      row: Math.floor(i / gridSize.cols),
    }));
  }, [gridSize]);

  const cellClass = darkMode
    ? 'border border-white/[0.07] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
    : 'border border-white/55 bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]';

  const vignette = darkMode
    ? 'radial-gradient(ellipse 85% 75% at 50% 45%, transparent 25%, rgba(15,23,42,0.88) 100%)'
    : 'radial-gradient(ellipse 85% 75% at 50% 45%, transparent 30%, rgba(248,250,252,0.92) 100%)';

  const gridStyle = {
    gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${gridSize.rows}, minmax(0, 1fr))`,
  };

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 grid gap-2.5 p-8 opacity-35" style={gridStyle}>
          {cells.map((cell) => (
            <div key={cell.id} className={`rounded-2xl ${cellClass}`} />
          ))}
        </div>
        <div className="absolute inset-0" style={{ background: vignette }} />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div className="absolute inset-0" style={{ x: springX, y: springY }}>
        <div className="absolute inset-0 grid gap-2.5 p-8" style={gridStyle}>
          {cells.map((cell) => (
            <GridCell
              key={cell.id}
              cell={cell}
              cols={gridSize.cols}
              rows={gridSize.rows}
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
              darkMode={darkMode}
              cellClass={cellClass}
              showEntrance={showEntrance}
            />
          ))}
        </div>
      </motion.div>

      <div className="absolute inset-0" style={{ background: vignette }} />

      <div
        className={`absolute inset-x-0 top-0 h-24 ${
          darkMode
            ? 'bg-gradient-to-b from-slate-950/50 to-transparent'
            : 'bg-gradient-to-b from-slate-50/80 to-transparent'
        }`}
      />
    </div>
  );
};

Grid3DBackground.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  mousePosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(Grid3DBackground);
