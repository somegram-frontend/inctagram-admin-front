export function getInitials(name?: string) {
  if (!name) return "";

  const words = name.trim().split(" ").filter(Boolean);

  if (words.length === 0) return "";

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}
