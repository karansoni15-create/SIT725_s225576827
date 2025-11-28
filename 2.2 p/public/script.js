
const xBox = document.getElementById("xInput");
const yBox = document.getElementById("yInput");
const opBox = document.getElementById("action");
const out = document.getElementById("numOut");
const warn = document.getElementById("note");

document.getElementById("runBtn").addEventListener("click", () => {
  warn.textContent = "";
  out.textContent = "--";

  try {
    const a = parseNum(xBox.value);
    const b = parseNum(yBox.value);
    const operator = opBox.value;

    const result = computeCore(a, b, operator);

    // neat rounding for floats
    out.textContent = Number.isInteger(result)
      ? result
      : Number(result.toFixed(6));
  } catch (err) {
    warn.textContent = err;
  }
});

document.getElementById("wipeBtn").addEventListener("click", () => {
  xBox.value = "";
  yBox.value = "";
  opBox.value = "+";
  out.textContent = "--";
  warn.textContent = "";
});

/* Converts input to number or throws */
function parseNum(v) {
  if (!v.trim()) throw "Missing a number.";
  const n = Number(v);
  if (!isFinite(n)) throw "Value is not a valid number.";
  return n;
}

/* Custom math handler — original switch logic */
function computeCore(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/":
      if (b === 0) throw "Can't divide by zero.";
      return a / b;
    case "%":
      if (b === 0) throw "Can't mod by zero.";
      return a % b;
    default:
      throw "Unknown operation.";
  }
}
