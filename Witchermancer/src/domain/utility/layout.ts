const smallScreenThreshold = 768

export const smallScreen = () =>
  window.innerWidth <= smallScreenThreshold ||
  window.innerHeight <= smallScreenThreshold
