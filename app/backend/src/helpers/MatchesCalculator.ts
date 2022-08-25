import { Match, Place, MatchesResult } from '../interfaces';

export default class MatchesCalculator {
  public countMatchesResult = (teamPlace : Place, matches: Match[]): MatchesResult => {
    const otherTeamPlace = teamPlace === 'home' ? 'away' : 'home';

    const matchesResult = {
      victories: 0,
      losses: 0,
      draws: 0,
    };

    matches.forEach((match) => {
      if (match[`${teamPlace}TeamGoals`] > match[`${otherTeamPlace}TeamGoals`]) {
        matchesResult.victories += 1;
      } else if (match[`${teamPlace}TeamGoals`] < match[`${otherTeamPlace}TeamGoals`]) {
        matchesResult.losses += 1;
      } else if (match[`${teamPlace}TeamGoals`] === match[`${otherTeamPlace}TeamGoals`]) {
        matchesResult.draws += 1;
      }
    });
    return matchesResult;
  };
}
