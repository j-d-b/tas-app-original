// returns a number
export function remToPx(remVal) {
  return remVal * parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
}
