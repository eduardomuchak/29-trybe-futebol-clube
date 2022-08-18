import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class MatchModel extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoal!: number;
  public awayTeam!: number;
  public awayTeamGoal!: number;
  public inProgress!: number;
}

MatchModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoal: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoal: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

export default MatchModel;