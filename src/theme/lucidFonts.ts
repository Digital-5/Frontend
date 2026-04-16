// Electric Luminary Design System — Typography Tokens
// Manrope → headlines / display (editorial authority)
// Inter    → interface / body (workhorse legibility)

export const LucidFonts = {
  // ─── Manrope (Display & Headlines) ───────────────────────────────────────
  manropeSemiBold:   'Manrope_600SemiBold',
  manropeBold:       'Manrope_700Bold',
  manropeExtraBold:  'Manrope_800ExtraBold',

  // ─── Inter (Interface & Body) ─────────────────────────────────────────────
  interRegular:   'Inter_400Regular',
  interMedium:    'Inter_500Medium',
  interSemiBold:  'Inter_600SemiBold',
  interBold:      'Inter_700Bold',
};

// ─── Type Scale ───────────────────────────────────────────────────────────────
export const LucidTypeScale = {
  displayLg:   { fontSize: 56, fontFamily: LucidFonts.manropeExtraBold, lineHeight: 64 },
  headlineSm:  { fontSize: 24, fontFamily: LucidFonts.manropeBold,      lineHeight: 32 },
  titleLg:     { fontSize: 22, fontFamily: LucidFonts.interSemiBold,    lineHeight: 28 },
  titleMd:     { fontSize: 18, fontFamily: LucidFonts.interSemiBold,    lineHeight: 24 },
  bodyMd:      { fontSize: 14, fontFamily: LucidFonts.interRegular,     lineHeight: 20 },
  bodyMdMedium:{ fontSize: 14, fontFamily: LucidFonts.interMedium,      lineHeight: 20 },
  labelSm:     { fontSize: 11, fontFamily: LucidFonts.interMedium,      lineHeight: 16 },
  labelXs:     { fontSize: 10, fontFamily: LucidFonts.interSemiBold,    lineHeight: 14 },
};

export default LucidFonts;
