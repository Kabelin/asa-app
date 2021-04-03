import Sequelize, {Model} from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      subjects: Sequelize.JSON
    },
    {
      sequelize
    });
  }
}

export default Student;