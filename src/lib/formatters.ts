export function formatCompactNumber(num: number): string {
  if (isNaN(num) || num === 0) return '0';
  if (num >= 1000000) {
    const val = (num / 1000000).toFixed(1);
    return `${val.endsWith('.0') ? val.slice(0, -2) : val}M`;
  }
  if (num >= 1000) {
    const val = (num / 1000).toFixed(1);
    return `${val.endsWith('.0') ? val.slice(0, -2) : val}K`;
  }
  return num.toLocaleString('en-US');
}
