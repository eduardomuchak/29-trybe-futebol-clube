type TeamHome = {
  teamName: string;
};

type TeamAway = {
  teamName: string;
};

export interface Match {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: TeamHome;
  teamAway?: TeamAway;
}

export interface IMatchesService {
  list(): Promise<Match[]>;
}
