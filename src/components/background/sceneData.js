const distantProfiles = [
  { width: 7, height: 42, roof: 'antenna' },
  { width: 6, height: 56, roof: 'flat' },
  { width: 8, height: 38, roof: 'stepped' },
  { width: 6, height: 62, roof: 'spire' },
  { width: 7, height: 47, roof: 'flat' },
  { width: 6, height: 58, roof: 'antenna' },
  { width: 8, height: 44, roof: 'crown' },
  { width: 6, height: 65, roof: 'spire' },
  { width: 7, height: 51, roof: 'sloped' },
];

const stackOrder = [4, 1, 3, 5, 2];

export const distantBuildings = Array.from({ length: 36 }, (_, index) => ({
  id: `distant-${index + 1}`,
  left: index * 3 - 3,
  ...distantProfiles[index % distantProfiles.length],
  stack: stackOrder[index % stackOrder.length],
}));

export const foregroundBuildings = [
  { id: 'ace-chemicals', left: -3, width: 12, height: 38, roof: 'stepped', light: 'warm', stack: 4 },
  { id: 'gotham-gazette', left: 3.5, width: 11, height: 51, roof: 'antenna', light: 'cool', stack: 1 },
  { id: 'monarch-theatre', left: 10, width: 13, height: 32, roof: 'flat', light: 'warm', stack: 3 },
  { id: 'wayne-tower', left: 16.5, width: 11, height: 62, roof: 'spire', light: 'warm', stack: 5 },
  { id: 'gotham-central', left: 23, width: 13, height: 43, roof: 'stepped', light: 'cool', stack: 2 },
  { id: 'old-gotham-bank', left: 29.5, width: 12, height: 55, roof: 'crown', light: 'warm', stack: 4 },
  { id: 'diamond-exchange', left: 36, width: 13, height: 37, roof: 'antenna', light: 'cool', stack: 1 },
  { id: 'gotham-harbour', left: 42.5, width: 12, height: 48, roof: 'sloped', light: 'warm', stack: 3 },
  { id: 'gotham-city-hall', left: 49, width: 13, height: 34, roof: 'stepped', light: 'warm', stack: 5 },
  { id: 'gotham-clock-tower', left: 55.5, width: 11, height: 58, roof: 'spire', light: 'cool', stack: 2 },
  { id: 'gotham-transit', left: 62, width: 13, height: 39, roof: 'flat', light: 'warm', stack: 4 },
  { id: 'trigate-financial', left: 68.5, width: 12, height: 52, roof: 'crown', light: 'cool', stack: 1 },
  { id: 'robinson-terminal', left: 75, width: 13, height: 44, roof: 'sloped', light: 'warm', stack: 3 },
  { id: 'gotham-electric', left: 81.5, width: 11, height: 57, roof: 'antenna', light: 'cool', stack: 5 },
  { id: 'grand-hotel', left: 88, width: 13, height: 35, roof: 'stepped', light: 'warm', stack: 2 },
  { id: 'gotham-telecom', left: 94.5, width: 12, height: 49, roof: 'spire', light: 'cool', stack: 4 },
  { id: 'robinson-bridge-tower', left: 101, width: 13, height: 41, roof: 'flat', light: 'warm', stack: 1 },
];
