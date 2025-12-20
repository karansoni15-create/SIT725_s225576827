const express = require("express");
const app = express();

app.use(express.json());

// REST API endpoint
app.post("/api/recipe", (req, res) => {
  const { title, cookTime } = req.body;

  if (!title || cookTime <= 0) {
    return res.status(400).json({ message: "Invalid recipe data" });
  }

  res.status(201).json({
    message: "Recipe created successfully",
    recipe: { title, cookTime }
  });
});

// Export app for testing
module.exports = app;

// Start server only when run directly
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}
