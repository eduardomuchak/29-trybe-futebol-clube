import { Match, Place, GoalsResult } from '../interfaces';

export default class GoalsCalculator {
  public goalsFavor: number;
  public goalsOwn: number;

  public counter = (teamPlace : Place, matches: Match[]): GoalsResult => {
    const otherTeam = teamPlace === 'home' ? 'away' : 'home';

    const goalsFavor = matches.reduce((acc, match) => acc + match[`${teamPlace}TeamGoals`], 0);
    const goalsOwn = matches.reduce((acc, match) => acc + match[`${otherTeam}TeamGoals`], 0);
    const goalsBalance = goalsFavor - goalsOwn;

    const goalsResult = {
      goalsFavor,
      goalsOwn,
      goalsBalance,
    };

    return goalsResult;
  };
}
