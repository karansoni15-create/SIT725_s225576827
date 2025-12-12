const express = require("express");
const controller = require("../controller/index");

const router = express.Router();

router.get("/", controller.getAllBooks);
router.get("/:id", controller.getBookById);
router.get("/integrity/check", controller.checkIntegrity);

module.exports = router;
