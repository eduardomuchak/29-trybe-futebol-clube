export type Team = {
  id: number;
  teamName: string;
};

export interface ITeamService {
  list(): Promise<Team[]>;
}
