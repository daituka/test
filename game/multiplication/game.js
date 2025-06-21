function setupMultiplication(maxNumber = 9) {
  let a, b;
  let score = 0;

  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('answerInput');
  const scoreEl = document.getElementById('score');
  const resultEl = document.getElementById('result');

  function generateQuestion() {
    a = Math.floor(Math.random() * maxNumber) + 1;
    b = Math.floor(Math.random() * maxNumber) + 1;
    questionEl.textContent = `${a} × ${b} = ?`;
    answerEl.value = '';
  }

  function checkAnswer() {
    const input = parseInt(answerEl.value);
    if (!isNaN(input)) {
      if (input === a * b) {
        score++;
        scoreEl.textContent = `スコア: ${score}`;
        resultEl.textContent = '正解！';
        resultEl.className = 'correct';
        addFlower(score);
        if (score % 10 === 0) animateHeat();
        if (score % 7 === 0) animateBackground();
      } else {
        resultEl.textContent = `不正解！正解は ${a * b}`;
        resultEl.className = 'incorrect';
      }
      generateQuestion();
    }
  }

  function addFlower(currentScore) {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.style.left = Math.random() * 95 + 'vw';
    flower.style.top = Math.random() * 90 + 'vh';
    flower.style.background = `radial-gradient(circle, hsl(${Math.random() * 360}, 100%, 85%), transparent)`;
    flower.style.width = '50px';
    flower.style.height = '50px';
    if (currentScore % 5 === 0) {
      flower.classList.add('heat');
    }
    document.getElementById('flowers').appendChild(flower);
  }

  function animateHeat() {
    const heatElements = document.querySelectorAll('.flower');
    heatElements.forEach(el => {
      const dx = (Math.random() - 0.5) * 200 + 'px';
      const dy = (Math.random() - 0.5) * 200 + 'px';
      el.style.setProperty('--dx', dx);
      el.style.setProperty('--dy', dy);
      el.classList.add('move');
      if (Math.random() < 0.3) {
        el.style.width = '70px';
        el.style.height = '70px';
        el.style.boxShadow = '0 0 80px rgba(255, 100, 0, 1)';
      }
    });
  }

  function animateBackground() {
    document.body.style.backgroundColor = '#ffe6e6';
    setTimeout(() => {
      document.body.style.backgroundColor = '#cceeff';
    }, 500);
  }

  function appendDigit(digit) {
    answerEl.value += digit;
  }

  function clearInput() {
    answerEl.value = '';
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  });

  generateQuestion();

  window.checkAnswer = checkAnswer;
  window.appendDigit = appendDigit;
  window.clearInput = clearInput;

  return {
    setMaxNumber: num => {
      maxNumber = num;
    }
  };
}

window.setupMultiplication = setupMultiplication;
