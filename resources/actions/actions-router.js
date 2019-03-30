const router = require("express").Router();

const db = require("./actions-model.js");

router.get("/", async (req, res) => {
  try {
    const actions = await db.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({
      message: "error getting actions"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const action = await db.get(id);
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({ message: "error getting" });
  }
});

router.post("/", async (req, res) => {
  try {
    await db.insert(req.body);
    res.status(201).json({ message: 'successfully posted' });
  } catch (error) {
    res.status(500).json({
      message: "error adding action"
    });
  }
});

module.exports = router;
