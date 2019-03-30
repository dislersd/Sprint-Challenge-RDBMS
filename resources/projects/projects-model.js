const db = require("../../data/dbConfig.js");
const mappers = require('../mappers.js');

module.exports = {
  get: function(id) {
    let projectsQuery = db("projects as p");

    if (id) {
      projectsQuery.where({"p.id": id}).first();

      const promises = [projectsQuery, this.getProjectActions(id)];

      return Promise.all(promises).then( results => {
        let [project, actions] = results;
        project.actions = actions;

        return mappers.projectToBody(project);
      });
    }

    return projectsQuery.then(projects => {
      return projects.map(project => mappers.projectToBody(project));
    });
  },
  getProjectActions: function(projectId) {
    return db("actions")
      .where({"project_id": projectId})
      .then(actions => actions.map(action => mappers.actionToBody(action)));
  },
  insert: function(project) {
    return db("projects")
      .insert(project)
      .then(([id]) => this.get(id));
  },
  update: function(id, change) {
    return db("projects")
      .where({"id": id})
      .update(change)
      .then(count => (count > 0 ? this.get(id) : null))
  },
  remove: function(id) {
    return db("projects")
    .where({"id": id})
    .del()
  }
};
