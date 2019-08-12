let Sequelize = require('sequelize');
let db = syzoj.db;
let User = syzoj.model('user');
let Problem = syzoj.model('problem');

let model = db.define('favorite', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER },
    problem_id: { type: Sequelize.INTEGER }
}, {
        timestamps: false,
        tableName: 'favorite',
        indexes: [
            {
                fields: ['user_id']
            },
            {
                fields: ['problem_id']
            }
        ]
    });

let Model = require('./common');
class Favorite extends Model {
    static async create(val) {
        return Favorite.fromRecord(Favorite.model.build(Object.assign({
            user_id: 0,
            problem_id: 0
        }, val)));
    }

    async loadRelationships() {
        this.user = await User.fromID(this.user_id);
        this.problem = await Problem.fromID(this.problem_id);
    }

    getModel() { return model; }
}

Favorite.model = model;
Favorite.model.hasOne(Problem, { foreignKey: 'problem_id' });

module.exports = Favorite;
