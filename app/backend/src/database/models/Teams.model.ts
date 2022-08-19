import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

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
  tableName: 'teams',
});

export default TeamModel;
