const express = require("express");
const controller = require("../controller/index");

const router = express.Router();

router.get("/", controller.getAllBooks);
router.get("/:id", controller.getBookById);

router.post("/", controller.createBook);
router.put("/:id", controller.updateBook);

router.get("/integrity-check42", controller.checkIntegrity);

module.exports = router;
