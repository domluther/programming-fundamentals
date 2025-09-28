interface QuizStatsProps {
  score: number;
  streak: number;
  recordStreak: number;
  accuracy: number;
}

export function QuizStats({ score, streak, recordStreak, accuracy }: QuizStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="text-center text-white">
        <div className="text-3xl font-bold">{score}</div>
        <div className="text-sm">Points</div>
      </div>
      <div className="text-center text-white">
        <div className="text-3xl font-bold">{streak}</div>
        <div className="text-sm">Current Streak</div>
      </div>
      <div className="text-center text-white">
        <div className="text-3xl font-bold">{recordStreak}</div>
        <div className="text-sm">Record Streak</div>
      </div>
      <div className="text-center text-white">
        <div className="text-3xl font-bold">{accuracy}%</div>
        <div className="text-sm">Accuracy</div>
      </div>
    </div>
  );
}