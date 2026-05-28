import React from 'react';
import { motion } from 'framer-motion';

export const Icons = {
  Home: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.path
        d="M12 3L5 10V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V10L12 3Z"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1] }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
    </svg>
  ),
  About: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, y: 10 }}
        animate={{ pathLength: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </svg>
  ),
  Skills: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.path
        d="M12 15L8.5 12M12 15L15.5 12M12 15V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.path
        d="M12 3V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1],
          opacity: [0, 1],
          transition: { duration: 0.3, delay: 0.6 }
        }}
      />
    </svg>
  ),
  Experience: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M21 13.2537C18.7505 15.3205 15.9084 16.5 12.8031 16.5C9.69774 16.5 6.85562 15.3205 4.60617 13.2537M12.8031 16.5V20M4.60617 13.2537L3 16.5M4.60617 13.2537L7.80309 11.3769M21 13.2537L22.6061 16.5M21 13.2537L17.8031 11.3769M12.8031 3V7.5M7.80309 11.3769L6.19691 8.13084M7.80309 11.3769L12.8031 7.5M17.8031 11.3769L19.4092 8.13084M17.8031 11.3769L12.8031 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </svg>
  ),
  Education: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M12 14L3 7L12 0L21 7L12 14ZM12 14V21M5 9.5V16.5L12 21L19 16.5V9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, y: -5 }}
        animate={{ pathLength: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </svg>
  ),
  Projects: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V7Z"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M12 10V14M10 12H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </svg>
  ),
  Contact: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </svg>
  ),
  DarkMode: ({ className, isDark }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Sun/Moon Base */}
      <motion.circle
        cx="12"
        cy="12"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        initial={false}
        animate={isDark ? {
          fill: "currentColor",
          scale: [1, 1.2, 0.9, 1],
          filter: "url(#glow)"
        } : {
          fill: "none",
          scale: 1,
          filter: "none"
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />

      {/* Sun Rays */}
      {[...Array(12)].map((_, i) => (
        <motion.line
          key={i}
          x1="12"
          y1="3"
          x2="12"
          y2="5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${i * 30} 12 12)`}
          initial={false}
          animate={isDark ? {
            scale: 0,
            opacity: 0
          } : {
            scale: [1, 1.2, 1],
            opacity: 1
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.04,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "center" }}
        />
      ))}

      {/* Moon Crater Effects */}
      {isDark && (
        <>
          <motion.circle
            cx="9"
            cy="10"
            r="1.5"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.circle
            cx="15"
            cy="11"
            r="1"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.circle
            cx="11"
            cy="14"
            r="1.2"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </>
      )}

      {/* Stars (visible in dark mode) */}
      {isDark && (
        <g>
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${18 + i * 1.5} ${6 + i * 1.2}L${18.5 + i * 1.5} ${5 + i * 1.2}L${19 + i * 1.5} ${6 + i * 1.2}L${18.5 + i * 1.5} ${7 + i * 1.2}Z`}
              fill="currentColor"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 1],
                scale: [0, 1, 0.8, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.3
                }
              }}
            />
          ))}
        </g>
      )}

      {/* Moon Shadow Effect */}
      <motion.path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={false}
        animate={isDark ? {
          opacity: 1,
          pathLength: 1,
          transition: { duration: 0.7, ease: "easeInOut" }
        } : {
          opacity: 0,
          pathLength: 0,
          transition: { duration: 0.3 }
        }}
      />
    </svg>
  ),
};
