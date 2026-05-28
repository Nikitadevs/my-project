import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const FloatingElements = ({ darkMode }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
                key={i}
                className={`absolute w-${Math.floor(Math.random() * 4 + 2)} h-${Math.floor(Math.random() * 4 + 2)} rounded-full
          ${darkMode ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                        : 'bg-gradient-to-r from-blue-300/10 to-purple-300/10'}`}
                initial={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: 0,
                }}
                animate={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 0.8, 0],
                    rotate: [0, 180],
                }}
                transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        ))}
    </div>
);

FloatingElements.propTypes = {
    darkMode: PropTypes.bool.isRequired,
};

export default React.memo(FloatingElements);
