const PALETTE = [
  { bg: "#1E3A8A", text: "#F8FAFC" },
  { bg: "#B45309", text: "#FFFBEB" },
  { bg: "#166534", text: "#F0FDF4" },
  { bg: "#7C2D12", text: "#FFF7ED" },
  { bg: "#4C1D95", text: "#F5F3FF" },
  { bg: "#9D174D", text: "#FDF2F8" },
  { bg: "#0F766E", text: "#F0FDFA" },
  { bg: "#3730A3", text: "#EEF2FF" },
  { bg: "#A16207", text: "#FEFCE8" },
  { bg: "#155E75", text: "#ECFEFF" },
  { bg: "#831843", text: "#FDF2F8" },
  { bg: "#3F6212", text: "#F7FEE7" },
] as const;

// FNV-1a: better bucket distribution than a shift-based hash for short strings.
function hashString(value: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function getCoverStyle(title: string) {
  return PALETTE[hashString(title) % PALETTE.length];
}
