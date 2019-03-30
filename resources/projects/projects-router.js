const router = require("express").Router();

const db = require("./projects-model.js");

router.get("/", async (req, res) => {
  try {
    const projects = await db.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "error getting projects" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await db.get(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "error retrieving project" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await db.insert(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "error posting" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const change = await db.update(id, req.body)
    res.status(200).json(change)
  } catch (error) {
    res.status(500).json({ message: 'error updating' })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await db.remove(id);
    res.status(200).json({ message: 'successfully deleted' })
  } catch (error) {
    res.status(500).json({ message: 'error deleting' })
  }
})

module.exports = router;
