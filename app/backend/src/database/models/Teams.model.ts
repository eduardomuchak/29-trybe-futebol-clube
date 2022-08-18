import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import MatchModel from './Matches.model';

class TeamModel extends Model {
  public id!: number;
  public teamName!: string;
}

TeamModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

TeamModel.belongsTo(MatchModel, { foreignKey: "homeTeam", as: "teamName" });
TeamModel.belongsTo(MatchModel, { foreignKey: "awayTeam", as: "teamName" });

export default TeamModel;