const display = document.querySelector('.kioo2');
const buttons = document.querySelectorAll('.btn');

const operators = ['+', '-', '*', '/', '%', '.'];

let justEvaluated = false;
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    if (!isNaN(value)) {
      if (justEvaluated) {
        display.value = '';
        justEvaluated = false;
      }
      display.value += value;
    } else if (operators.includes(value)) {
      if (justEvaluated) {
        justEvaluated = false;
      }
      const lastChar = display.value[display.value.length - 1];
      if (!operators.includes(lastChar) && display.value.length > 0) {
        display.value += value;
      }
    } else if (value === '=') {
      let expression = display.value.replace(/x/g, '*');
      try {
        display.value = eval(expression);
      } catch {
        display.value = 'Error';
      }
      justEvaluated = true;
    } else if (value === 'DEL') {
      display.value = display.value.slice(0, -1);
    }
  });
});
