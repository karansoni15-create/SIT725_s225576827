// script.js — improved with logging, fallback and error handling
console.log('[calc] script loaded');

const form = document.getElementById('calcForm');
const aEl = document.getElementById('a');
const bEl = document.getElementById('b');
const opEl = document.getElementById('op');
const resultValue = document.getElementById('resultValue');
const errorEl = document.getElementById('error');
const clearBtn = document.getElementById('clearBtn');

if (!form || !aEl || !bEl || !opEl || !resultValue || !errorEl) {
  console.error('[calc] missing DOM elements', { form, aEl, bEl, opEl, resultValue, errorEl });
  if (errorEl) errorEl.textContent = 'Page error: required elements not found (open console).';
}

// helpers
function showResult(val, source = 'server') {
  errorEl.textContent = '';
  resultValue.textContent = String(val);
  console.log(`[calc] result (${source}):`, val);
}

function showError(msg) {
  resultValue.textContent = '—';
  errorEl.textContent = msg;
  console.warn('[calc] error:', msg);
}

function localCompute(a, b, op) {
  const numA = Number(a);
  const numB = Number(b);
  if (!isFinite(numA) || !isFinite(numB)) {
    throw new Error('Invalid numbers');
  }
  switch (op) {
    case '+': return numA + numB;
    case '-': return numA - numB;
    case '*':
    case 'x':
    case '×': return numA * numB;
    case '/':
    case '÷':
      if (numB === 0) throw new Error('Division by zero');
      return numA / numB;
    case '%': return numA % numB;
    default: throw new Error('Unsupported operator');
  }
}

async function postCalc(payload) {
  // return fetch Response object; we handle non-ok in caller
  console.log('[calc] posting to /calc', payload);
  return fetch('/calc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store'
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.textContent = '';

  const a = aEl.value;
  const b = bEl.value;
  const op = opEl.value;

  if (a === '' || b === '') {
    showError('Both numbers are required.');
    return;
  }

  // Try server first
  try {
    const resp = await postCalc({ a, b, op });
    let json;
    try {
      json = await resp.json();
    } catch (err) {
      // non-json response
      console.error('[calc] invalid JSON from server', err);
      throw new Error('Invalid response from server');
    }

    if (!resp.ok) {
      // server returned error code and message
      const msg = json && json.error ? json.error : `Server error (${resp.status})`;
      // fall back to local compute if server couldn't compute
      console.warn('[calc] server returned error, falling back to local compute:', msg);
      try {
        const local = localCompute(a, b, op);
        showResult(local, 'local-fallback');
        errorEl.textContent = `Server: ${msg} — used local calculation.`;
      } catch (localErr) {
        showError(`Server: ${msg}`);
      }
      return;
    }

    // success
    if (json && typeof json.result !== 'undefined') {
      showResult(json.result, 'server');
    } else {
      throw new Error('No result in server response');
    }
  } catch (err) {
    console.error('[calc] network/server call failed:', err);

    // fallback to computing locally so user sees something
    try {
      const local = localCompute(a, b, op);
      showResult(local, 'local');
      errorEl.textContent = 'Network/server error — used local calculation.';
    } catch (localErr) {
      showError(localErr.message || 'Calculation failed.');
    }
  }
});

clearBtn.addEventListener('click', () => {
  aEl.value = '';
  bEl.value = '';
  opEl.value = '+';
  resultValue.textContent = '—';
  errorEl.textContent = '';
});
