export interface Leaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string
}

export interface ILeaderboardService {
  listHomeLeaderboard(): Promise<Leaderboard[]>;
}
