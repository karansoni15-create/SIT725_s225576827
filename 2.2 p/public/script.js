
const a = document.getElementById("vA");
const b = document.getElementById("vB");
const op = document.getElementById("vOp");
const show = document.getElementById("ans");
const warn = document.getElementById("warn");
const go = document.getElementById("goBtn");
const reset = document.getElementById("clearBtn");

/* helper — tries converting to number safely */
function toNum(v) {
  const n = Number(v);
  if (!isFinite(n)) throw "Please enter valid numbers.";
  return n;
}

/* fully custom calculation engine */
function doWork(x, y, operator) {
  switch (operator) {
    case "+": return x + y;
    case "-": return x - y;
    case "*": return x * y;
    case "/":
      if (y === 0) throw "Cannot divide by zero.";
      return x / y;
    case "%":
      if (y === 0) throw "Cannot mod by zero.";
      return x % y;
    default:
      throw "Unknown operation.";
  }
}

/* compute button */
go.addEventListener("click", () => {
  warn.textContent = "";
  show.textContent = "—";

  try {
    const n1 = toNum(a.value.trim());
    const n2 = toNum(b.value.trim());
    const opVal = op.value;

    const raw = doWork(n1, n2, opVal);

    // round only if needed
    const formatted = Number.isInteger(raw) ? raw : +raw.toFixed(8);
    show.textContent = formatted;
  } catch (err) {
    warn.textContent = err;
  }
});

