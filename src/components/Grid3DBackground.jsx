import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Grid3DBackground = ({ darkMode, mousePosition }) => {
    // Calculate grid size based on screen width
    const gridSize = useMemo(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return { cols: 4, total: 16 };
            if (window.innerWidth < 768) return { cols: 6, total: 24 };
            if (window.innerWidth < 1024) return { cols: 8, total: 32 };
            return { cols: 10, total: 40 };
        }
        return { cols: 8, total: 32 };
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    perspective: '2000px',
                    transform: `rotateX(${mousePosition.y * 8}deg) rotateY(${mousePosition.x * 8}deg)`,
                    transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <div
                    className={`absolute inset-0 grid gap-4 p-4`}
                    style={{
                        gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
                        transform: 'translateZ(-150px)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {Array.from({ length: gridSize.total }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={`rounded-lg backdrop-blur-sm ${darkMode
                                    ? `bg-gradient-to-br from-blue-500/5 to-purple-500/5`
                                    : `bg-gradient-to-br from-blue-300/10 to-purple-300/10`
                                }`}
                            initial={{ opacity: 0, z: -150 }}
                            animate={{
                                opacity: 1,
                                z: Math.sin((i % gridSize.cols) * 0.5 + (mousePosition.x * 1.2)) * 40,
                                rotateX: Math.cos((i % gridSize.cols) * 0.5 + (mousePosition.y * 1.2)) * 15,
                                rotateY: Math.sin((i % gridSize.cols) * 0.5 + (mousePosition.x * 1.2)) * 15,
                            }}
                            transition={{
                                duration: 5,
                                delay: i * 0.04,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'easeInOut',
                            }}
                            style={{
                                boxShadow: darkMode
                                    ? '0 0 15px rgba(59, 130, 246, 0.1)'
                                    : '0 0 15px rgba(59, 130, 246, 0.15)',
                            }}
                        />
                    ))}
                </div>
            </div>
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
