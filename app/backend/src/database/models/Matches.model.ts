import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import TeamModel from './Teams.model';

class MatchModel extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
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
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
  tableName: 'matches',
});

TeamModel.hasMany(MatchModel, { foreignKey: 'id', as: 'matches' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'homeTeam' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default MatchModel;
