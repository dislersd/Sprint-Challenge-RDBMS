const db = require("../../data/dbConfig.js");
const mappers = require("../mappers.js");

module.exports = {
  get: function(id) {

    if (id) {
      return db("actions")
        .where({"id": id})
        .first()
        .then(action => mappers.actionToBody(action));
    }

    return db("actions").then(actions => {
      return actions.map(action => mappers.actionToBody(action));
    });
  },
  insert: function(action) {
    return db("actions")
      .insert(action)
      .then(([id]) => this.get(id));
  }
};
