export type Team = {
  id: number;
  teamName: string;
};

export interface ITeamService {
  list(): Promise<Team[]>;
  getById(id: number): Promise<Team | null>;
}
