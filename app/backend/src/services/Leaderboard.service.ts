import { ILeaderboardService, Leaderboard, Match, Place } from '../interfaces';
import TeamsService from './Teams.service';
import MatchesService from './Matches.service';
import PointsCalculator from '../helpers/PointsCalculator';
import MatchesCalculator from '../helpers/MatchesCalculator';

export default class LeaderboardService implements ILeaderboardService {
  private teamService = new TeamsService();
  private matchesService = new MatchesService();
  private pointsCalculator = new PointsCalculator();
  private matchesCalculator = new MatchesCalculator();

  public createLeaderboard = (place: Place, matches: Match[]): Leaderboard => {
    const teamPlace = place === 'home' ? 'Home' : 'Away';
    return {
      name: matches[0][`team${teamPlace}`]?.teamName,
      totalPoints: this.pointsCalculator.totalPoints('home', matches),
      totalGames: matches.length,
      totalVictories: this.matchesCalculator.countMatchesResult('home', matches)?.victories,
      totalDraws: this.matchesCalculator.countMatchesResult('home', matches)?.draws,
      totalLosses: this.matchesCalculator.countMatchesResult('home', matches)?.losses,
    };
  };

  public getLeaderboard = async (teamPlace: Place): Promise<Leaderboard[]> => {
    const formatedTeamPlace = teamPlace === 'home' ? 'Home' : 'Away';

    const allTeams = await this.teamService.list();
    const finishedMatches = await this.matchesService.listInProgress(false);

    const result = await Promise.all(
      allTeams.map((team) => {
        const teamMatches = finishedMatches
          .filter((
            match: Match,
          ) => team.teamName === match[`team${formatedTeamPlace}`]?.teamName);
        return this.createLeaderboard(teamPlace, teamMatches);
      }),
    );

    return result;
  };
}
