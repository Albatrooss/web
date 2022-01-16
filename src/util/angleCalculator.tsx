export const angleCalculator = (pos: number, cards: number) => {
  switch(cards) {
    case 1 :
      return 0;
    case 2:
      return (pos * 20) - 10;
    case 3:
      return (pos * 15) - 15;
    case 4:
      return (pos * 12) - 18;
    default:
      return (pos * 10) - 20;
  }
}

export const scoreAngleCalculator = (score: number): {angle: number; pos: string} => {
  if (score >= 10)
    return {
      angle: 5,
      pos: '100% 750%'
    }
  switch(score % 5) {
    case 1:
      return {
        angle: 25,
        pos: '35% 80%'
      }
    case 2:
      return {
        angle: 90,
        pos: '35% 60%'
      }
    case 3:
      return {
        angle: 90,
        pos: '15% 75%'
      }
    case 4:
      return {
        angle: 25,
        pos: '25% 175%'
      }
    default:
      return {
        angle: 5,
        pos: '80% 50%'
      }
  }
}
