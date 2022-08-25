import { Match, Place } from '../interfaces';

export default class PointsCalculator {
  public totalPoints = (teamPlace : Place, matches: Match[]): number => {
    const otherTeamPlace = teamPlace === 'home' ? 'away' : 'home';
    let points = 0;
    matches.forEach((match) => {
      if (match[`${teamPlace}TeamGoals`] > match[`${otherTeamPlace}TeamGoals`]) {
        points += 3;
      } else if (match[`${teamPlace}TeamGoals`] < match[`${otherTeamPlace}TeamGoals`]) {
        points += 0;
      } else if (match[`${teamPlace}TeamGoals`] === match[`${otherTeamPlace}TeamGoals`]) {
        points += 1;
      }
    });
    return points;
  };
}
