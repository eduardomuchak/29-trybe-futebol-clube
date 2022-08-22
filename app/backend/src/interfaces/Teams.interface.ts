export type Teams = {
  id: number;
  teamName: string;
};

export interface ITeamService {
  list(): Promise<Teams[]>;
}
