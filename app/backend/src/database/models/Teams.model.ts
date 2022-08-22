import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  public id!: number;
  public teamName!: string;
}

TeamModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'team',
  underscored: true,
  timestamps: false,
  tableName: 'teams',
});

export default TeamModel;
