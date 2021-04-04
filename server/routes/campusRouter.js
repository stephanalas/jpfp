const express = require("express");
const campusRouter = express.Router();
const { Student, Campus } = require("../db/");

campusRouter.get("/", async (req, res, next) => {
  try {
    // if ((await Campus.findAll()).length) {
    //   res.send(await Campus.findAll({ include: [Student] }));
    // } else {
    //   res.send(await Campus.findAll());
    // }
    res.send(
      await Campus.findAll({
        include: [Student],
      })
    );
  } catch (error) {
    next(error);
  }
});

campusRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    res.send(await Campus.findByPk(id, { include: [Student] }));
  } catch (error) {
    next(error);
  }
});

campusRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const campus = await Campus.findByPk(id);
    await campus.destroy();
    console.log("campus deleted");
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

campusRouter.post("/", async (req, res, next) => {
  try {
    const { name, address } = req.body;
    res
      .status(201)
      .send(await Campus.create({ name, address }, { include: [Student] }));
  } catch (err) {
    res.status(400).json(err);
  }
});
campusRouter.put("/:id", async (req, res, next) => {
  try {
    const { name, address, imageUrl, description } = req.body;
    const campus = await Campus.findByPk(req.params.id, { include: [Student] });
    campus.name = name;
    campus.address = address;
    campus.imageUrl = imageUrl;
    campus.description = description;
    await campus.save();
    await campus.reload();
    res.status(202).send(campus);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = {
  campusRouter,
};
