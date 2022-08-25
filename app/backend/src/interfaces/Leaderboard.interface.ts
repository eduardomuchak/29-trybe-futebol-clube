import { Match } from './Matches.interface';

type Place = 'home' | 'away';

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
  efficiency?: string
}

export interface ILeaderboardService {
  createLeaderboard(place: Place, matches: Match[]): Leaderboard;
  getLeaderboard(place: Place): Promise<Leaderboard[]>;
}
