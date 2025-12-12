const service = require("../services/service");

const getAllBooks = async (req, res) => {
  const data = await service.getAllBooks();
  res.status(200).json({ statusCode: 200, data });
};

const getBookById = async (req, res) => {
  const book = await service.getBookById(req.params.id);
  if (!book) return res.status(404).json({ statusCode: 404, message: "Not found" });
  res.status(200).json({ statusCode: 200, data: book });
};

const checkIntegrity = async (req, res) => {
  const valid = await service.integrityCheck();
  return valid ? res.sendStatus(204) : res.sendStatus(409);
};

module.exports = { getAllBooks, getBookById, checkIntegrity };
