const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const historyList = document.getElementById('history-list');
const toggleBtn = document.getElementById('toggle-history');
const historyBox = document.getElementById('history-box');

let input = '';
let history = [];

// Button clicks
buttons.forEach(button => {
  const value = button.dataset.value;

  if (value !== undefined) {
    button.addEventListener('click', () => {
      input += value;
      display.value = input;
    });
  }

  if (button.classList.contains('clear')) {
    button.addEventListener('click', () => {
      input = '';
      display.value = '';
    });
  }

  if (button.classList.contains('equal')) {
    button.addEventListener('click', () => {
      try {
        const result = eval(input);
        if (!isFinite(result)) throw new Error("Invalid");

        display.value = result;

        // Add to history
        history.unshift(`${input} = ${result}`);
        if (history.length > 5) history.pop();
        updateHistory();

        input = result.toString();
      } catch {
        display.value = 'Error';
        input = '';
      }
    });
  }
});

// Show history on button click (only show, no toggle)
toggleBtn.addEventListener('click', () => {
  historyBox.classList.remove('hidden');
  toggleBtn.disabled = true;
});

// Update history list
function updateHistory() {
  historyList.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9' || "+-*/.".includes(e.key)) {
    input += e.key;
    display.value = input;
  } else if (e.key === 'Enter' || e.key === '=') {
    document.querySelector('.equal').click();
  } else if (e.key === 'Backspace') {
    input = input.slice(0, -1);
    display.value = input;
  } else if (e.key === 'Escape') {
    input = '';
    display.value = '';
  }
})
const closeBtn = document.getElementById('close-history');
closeBtn.addEventListener('click', () => {
  historyBox.classList.add('hidden');
  toggleBtn.disabled = false;
});

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
});
