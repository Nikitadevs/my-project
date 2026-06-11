/** Shared light/dark surface tokens for section components */

export const getSectionTheme = (darkMode) => ({
  muted: darkMode ? 'text-slate-400' : 'text-slate-500',
  body: darkMode ? 'text-slate-300' : 'text-slate-700',
  heading: darkMode ? 'text-slate-50' : 'text-slate-900',
  accent: darkMode ? 'text-blue-300' : 'text-blue-600',
  gradient: darkMode
    ? 'from-blue-300 via-purple-300 to-pink-300'
    : 'from-blue-600 via-purple-600 to-pink-600',
  panel: darkMode ? 'liquid-glass-hero-panel-dark' : 'liquid-glass-hero-panel',
  inset: darkMode ? 'liquid-glass-dark' : 'liquid-glass',
  divider: darkMode ? 'border-white/10' : 'border-slate-200',
  topEdge: darkMode
    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)'
    : 'linear-gradient(90deg, transparent, rgba(148,163,184,0.38), transparent)',
  cellBg: darkMode ? 'liquid-glass-cell-dark' : 'liquid-glass-cell',
  cellHover: darkMode ? 'hover:bg-white/[0.06]' : 'hover:brightness-[1.015]',
  bentoGap: darkMode ? 'liquid-glass-bento-dark' : 'liquid-glass-bento',
  gridGap: darkMode ? 'liquid-glass-bento-dark' : 'liquid-glass-bento',
  nested: darkMode ? 'liquid-glass-nested-dark' : 'liquid-glass-nested',
  frame: darkMode ? 'liquid-glass-frame-dark' : 'liquid-glass-frame',
  footerPanel: darkMode ? 'liquid-glass-footer-panel-dark' : 'liquid-glass-footer-panel',
  sectionBg: darkMode
    ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white'
    : 'bg-gradient-to-b from-slate-50 via-white to-blue-50/40 text-slate-900',
  footerWash: darkMode
    ? 'bg-gradient-to-r from-blue-500/[0.04] via-transparent to-purple-500/[0.04]'
    : 'bg-gradient-to-r from-blue-500/[0.06] via-transparent to-purple-500/[0.05]',
  radius: 'rounded-[var(--radius-glass)]',
  radiusLg: 'rounded-[var(--radius-glass-lg)]',
  radiusXl: 'rounded-[var(--radius-glass-xl)]',
  bento: 'rounded-[var(--radius-glass-lg)]',
});

export const getBluePanelWash = (darkMode) => (
  darkMode
    ? 'radial-gradient(ellipse 80% 60% at 15% 0%, rgba(59,130,246,0.16), transparent 52%), radial-gradient(ellipse 60% 50% at 92% 100%, rgba(168,85,247,0.12), transparent 48%), radial-gradient(ellipse 40% 35% at 50% 50%, rgba(6,182,212,0.04), transparent 55%)'
    : 'radial-gradient(ellipse 80% 60% at 15% 0%, rgba(59,130,246,0.2), transparent 52%), radial-gradient(ellipse 60% 50% at 92% 100%, rgba(168,85,247,0.14), transparent 48%), radial-gradient(ellipse 40% 35% at 50% 50%, rgba(59,130,246,0.06), transparent 55%)'
);

export const getVioletPanelWash = (darkMode) => (
  darkMode
    ? 'radial-gradient(ellipse 70% 55% at 20% 0%, rgba(139,92,246,0.12), transparent 50%), radial-gradient(ellipse 55% 45% at 90% 100%, rgba(168,85,247,0.08), transparent 45%)'
    : 'radial-gradient(ellipse 70% 55% at 20% 0%, rgba(139,92,246,0.14), transparent 50%), radial-gradient(ellipse 55% 45% at 90% 100%, rgba(168,85,247,0.1), transparent 45%)'
);

export const getAboutPanelWash = (darkMode) => (
  darkMode
    ? 'radial-gradient(ellipse 70% 55% at 15% 0%, rgba(59,130,246,0.14), transparent 50%), radial-gradient(ellipse 55% 45% at 90% 100%, rgba(168,85,247,0.1), transparent 45%)'
    : 'radial-gradient(ellipse 70% 55% at 15% 0%, rgba(59,130,246,0.16), transparent 50%), radial-gradient(ellipse 55% 45% at 90% 100%, rgba(168,85,247,0.12), transparent 45%)'
);
