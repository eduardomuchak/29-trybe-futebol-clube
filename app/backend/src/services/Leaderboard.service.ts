import { ILeaderboardService, Leaderboard, Match, Place } from '../interfaces';
import TeamsService from './Teams.service';
import MatchesService from './Matches.service';
import PointsCalculator from '../helpers/PointsCalculator';
import MatchesCalculator from '../helpers/MatchesCalculator';
import GoalsCalculator from '../helpers/GoalsCalculator';

export default class LeaderboardService implements ILeaderboardService {
  private teamService = new TeamsService();
  private matchesService = new MatchesService();
  private pointsCalculator = new PointsCalculator();
  private matchesCalculator = new MatchesCalculator();
  private goalsCalculator = new GoalsCalculator();

  public createLeaderboard = (place: Place, matches: Match[]): Leaderboard => {
    const teamPlace = place === 'home' ? 'Home' : 'Away';
    const efficiency = this.matchesCalculator.efficiency(
      this.pointsCalculator.totalPoints(place, matches),
      matches.length,
    );
    return {
      name: matches[0][`team${teamPlace}`]?.teamName,
      totalPoints: this.pointsCalculator.totalPoints(place, matches),
      totalGames: matches.length,
      totalVictories: this.matchesCalculator.countMatchesResult(place, matches)?.victories,
      totalDraws: this.matchesCalculator.countMatchesResult(place, matches)?.draws,
      totalLosses: this.matchesCalculator.countMatchesResult(place, matches)?.losses,
      goalsFavor: this.goalsCalculator.counter(place, matches)?.goalsFavor,
      goalsOwn: this.goalsCalculator.counter(place, matches)?.goalsOwn,
      goalsBalance: this.goalsCalculator.counter(place, matches)?.goalsBalance,
      efficiency,
    };
  };

  public getLeaderboard = async (teamPlace: Place): Promise<Leaderboard[]> => {
    const formatedTeamPlace = teamPlace === 'home' ? 'Home' : 'Away';

    const allTeams = await this.teamService.list();
    const finishedMatches = await this.matchesService.listInProgress(false);

    const result = allTeams.map((team) => {
      const teamMatches = finishedMatches
        .filter((
          match: Match,
        ) => team.teamName === match[`team${formatedTeamPlace}`]?.teamName);

      return this.createLeaderboard(teamPlace, teamMatches);
    });

    return result;
  };
}
