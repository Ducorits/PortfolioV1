export function rotateAroundPivot(
  pivot: { x: number; y: number },
  point: { x: number; y: number },
  angle: number
): { x: number; y: number } {
  const dx = point.x - pivot.x;
  const dy = point.y - pivot.y;

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: pivot.x + dx * cos - dy * sin,
    y: pivot.y + dx * sin + dy * cos,
  };
}
