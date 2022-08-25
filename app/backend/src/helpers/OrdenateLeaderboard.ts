// Sugestão de forma de ordenação indicada pelo colega Bryan Edward Fernandes
// Referencia: https://stackoverflow.com/questions/4576714/sort-by-two-values-prioritizing-on-one-of-them

import { Leaderboard } from '../interfaces';

export default class OrdenateLeaderboard {
  public sort = (boardUnsorted: Leaderboard[]): Leaderboard[] => {
    const result = boardUnsorted.sort(
      (a: Leaderboard, b: Leaderboard) =>
        b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn,
    );

    return result;
  };
}
