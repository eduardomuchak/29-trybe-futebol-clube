import { Match, Place, MatchesResult } from '../interfaces';

export default class MatchesCalculator {
  public countMatchesResult = (teamPlace : Place, matches: Match[]): MatchesResult => {
    const otherTeamPlace = teamPlace === 'home' ? 'away' : 'home';
    let victories = 0;
    let losses = 0;
    let draws = 0;
    matches.forEach((match) => {
      if (match[`${teamPlace}TeamGoals`] > match[`${otherTeamPlace}TeamGoals`]) {
        victories += 1;
      } else if (match[`${teamPlace}TeamGoals`] < match[`${otherTeamPlace}TeamGoals`]) {
        losses += 1;
      } else if (match[`${teamPlace}TeamGoals`] === match[`${otherTeamPlace}TeamGoals`]) {
        draws += 1;
      }
    });
    return { victories, losses, draws };
  };
}
