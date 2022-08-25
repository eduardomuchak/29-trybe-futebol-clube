import { Match } from './Matches.interface';

export type Place = 'home' | 'away';

export type MatchesResult = {
  victories: number;
  losses: number;
  draws: number;
};

export type GoalsResult = {
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
};

export interface Leaderboard {
  name?: string,
  totalPoints?: number,
  totalGames?: number,
  totalVictories?: number,
  totalDraws?: number,
  totalLosses?: number,
  goalsFavor?: number,
  goalsOwn?: number,
  goalsBalance?: number,
  efficiency?: number
}

export interface ILeaderboardService {
  createLeaderboard(place: Place, matches: Match[]): Leaderboard;
  getLeaderboard(place: Place): Promise<Leaderboard[]>;
}
