import { Sequelize } from 'sequelize';
import * as config from '../config/database';
export { default as TeamModel } from './TeamModel';

const sequelize = new Sequelize(config)

export default sequelize;
