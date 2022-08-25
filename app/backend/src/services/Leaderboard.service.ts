import { ILeaderboardService, Leaderboard, Match } from '../interfaces';
import TeamsService from './Teams.service';
import MatchesService from './Matches.service';
import Calculator from '../helpers/Calculator';

type Place = 'home' | 'away';

export default class LeaderboardService implements ILeaderboardService {
  private teamService = new TeamsService();
  private matchesService = new MatchesService();
  private calculator = new Calculator();

  public createLeaderboard = (place: Place, matches: Match[]): Leaderboard => {
    const teamPlace = place === 'home' ? 'Home' : 'Away';
    return {
      name: matches[0][`team${teamPlace}`]?.teamName,
      totalPoints: this.calculator.totalPoints('home', matches),
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
