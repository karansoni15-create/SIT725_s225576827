function calculateTotalTime(prepTime, cookTime) {
  if (prepTime < 0 || cookTime < 0) {
    throw new Error("Invalid time values");
  }
  return prepTime + cookTime;
}

module.exports = calculateTotalTime;
