const express = require("express");
const controller = require("../controller/index");

const router = express.Router();

router.get("/", controller.getAllBooks);
router.get("/integrity-check", controller.checkIntegrity);

router.get("/:id", controller.getBookById);

router.post("/", controller.createBook);
router.put("/:id", controller.updateBook);

module.exports = router;
