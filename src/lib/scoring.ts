export interface Bet {
  id: number;
  user_id: number;
  race_id: number;
  group_id: number;
  prediction: string[]; // Array of driver names in predicted order
  fastest_lap?: string; // Driver name
  dnf_prediction?: string[]; // Array of driver names predicted to DNF
  score?: number;
  created_at: string;
}

export interface ScoringResult {
  exactPositions: number[];
  oneOff: number[];
  twoOff: number[];
  threeOff: number[];
  inTopTen: number[];
  correctWinner: boolean;
  perfectPodium: boolean;
  perfectTopFive: boolean;
  perfectTopTen: boolean;
  correctFastestLap: boolean;
  correctDNFs: string[];
  missedTopTen: number[];
  totalScore: number;
}

export function calculateScore(prediction: string[], results: string[], fastestLapPrediction?: string, fastestLapResult?: string, dnfPrediction?: string[], dnfResults?: string[]): ScoringResult {
  const exactPositions: number[] = [];
  const oneOff: number[] = [];
  const twoOff: number[] = [];
  const threeOff: number[] = [];
  const inTopTen: number[] = [];
  const missedTopTen: number[] = [];
  let correctWinner = false;
  let perfectPodium = false;
  let perfectTopFive = false;
  let perfectTopTen = false;
  let correctFastestLap = false;
  const correctDNFs: string[] = [];
  
  // Calculate position-based scores
  prediction.forEach((driver, predictedPosition) => {
    const actualPosition = results.indexOf(driver);
    
    if (actualPosition === -1) {
      // Driver not in top results at all
      missedTopTen.push(predictedPosition);
      return;
    }
    
    const positionDifference = Math.abs(predictedPosition - actualPosition);
    
    if (positionDifference === 0) {
      // Exact position match
      exactPositions.push(predictedPosition);
    } else if (positionDifference === 1) {
      // One position off
      oneOff.push(predictedPosition);
    } else if (positionDifference === 2) {
      // Two positions off
      twoOff.push(predictedPosition);
    } else if (positionDifference === 3) {
      // Three positions off
      threeOff.push(predictedPosition);
    } else if (actualPosition < 10) {
      // Driver in top 10 but wrong spot (more than 3 positions off)
      inTopTen.push(predictedPosition);
    }
  });
  
  // Check for correct winner
  if (prediction[0] === results[0]) {
    correctWinner = true;
  }
  
  // Check for perfect podium (top 3)
  if (
    prediction[0] === results[0] &&
    prediction[1] === results[1] &&
    prediction[2] === results[2]
  ) {
    perfectPodium = true;
  }
  
  // Check for perfect top 5
  if (
    prediction[0] === results[0] &&
    prediction[1] === results[1] &&
    prediction[2] === results[2] &&
    prediction[3] === results[3] &&
    prediction[4] === results[4]
  ) {
    perfectTopFive = true;
  }
  
  // Check for perfect top 10
  if (prediction.slice(0, 10).every((driver, index) => driver === results[index])) {
    perfectTopTen = true;
  }
  
  // Check for correct fastest lap
  if (fastestLapPrediction && fastestLapResult && fastestLapPrediction === fastestLapResult) {
    correctFastestLap = true;
  }
  
  // Check for correct DNF predictions
  if (dnfPrediction && dnfResults) {
    dnfPrediction.forEach(driver => {
      if (dnfResults.includes(driver)) {
        correctDNFs.push(driver);
      }
    });
  }
  
  // Calculate total score
  let totalScore = 0;
  
  // Base scoring
  totalScore += exactPositions.length * 25; // Correct position: +25 points
  totalScore += oneOff.length * 15; // One position off: +15 points
  totalScore += twoOff.length * 10; // Two positions off: +10 points
  totalScore += threeOff.length * 5; // Three positions off: +5 points
  totalScore += inTopTen.length * 2; // Driver in top 10 but wrong spot: +2 points
  
  // Bonus points
  if (perfectPodium) totalScore += 30; // Perfect podium: +30 points
  if (perfectTopFive) totalScore += 50; // Perfect top 5: +50 points
  if (perfectTopTen) totalScore += 100; // Perfect top 10: +100 points
  if (correctWinner) totalScore += 20; // Correct winner: +20 points
  if (correctFastestLap) totalScore += 10; // Fastest lap prediction: +10 points
  totalScore += correctDNFs.length * 15; // Correct DNF prediction: +15 points per driver
  
  // Penalty for missed predictions
  totalScore -= missedTopTen.length * 5; // Driver not in top 10 at all: -5 points
  
  return {
    exactPositions,
    oneOff,
    twoOff,
    threeOff,
    inTopTen,
    correctWinner,
    perfectPodium,
    perfectTopFive,
    perfectTopTen,
    correctFastestLap,
    correctDNFs,
    missedTopTen,
    totalScore
  };
}
