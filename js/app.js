/**
 * @author ujklm23
 * @description Flow  = main() -> swap() -> isWinner()
 * @copyright 2021 ~ All Rights Reserved
 */

//TODO: 'Build AI player '

const X_CLASS = 'x';
const CIRCLE_CLASS = 'o';
const SIGN_CLASS = 'sign';

const sect = document.querySelector('#board');

const X_Score = document.querySelector('.x-score');
const O_Score = document.querySelector('.o-score');

// const aiScore = document.querySelector('.ai-score');
// const playerScore = document.querySelector('.player-score');

const cells = sect.children;

// let aiScoreCounter = localStorage.getItem('aiScore') || 0;
// let playerScoreCounter = localStorage.getItem('playerScore') || 0;

if (localStorage.getItem('X_Score') == null) {
  localStorage.setItem('X_Score', '0');
}

if (localStorage.getItem('O_Score') == null) {
  localStorage.setItem('O_Score', '0');
}

let X_ScoreCounter = localStorage.getItem('X_Score');
let O_ScoreCounter = localStorage.getItem('O_Score');

// playerScore.innerHTML = playerScoreCounter;
// aiScore.innerHTML = aiScoreCounter;

X_Score.innerHTML = X_ScoreCounter;
O_Score.innerHTML = O_ScoreCounter;

function swapSign(totalSign) {
  if (totalSign.length % 2 === 0) {
    return X_CLASS;
  } else {
    return CIRCLE_CLASS;
  }
}

function isWinner(cells) {
  checkLine(cells, [0, 1, 2]);
  checkLine(cells, [0, 3, 6]);
  checkLine(cells, [3, 4, 5]);
  checkLine(cells, [6, 7, 8]);
  checkLine(cells, [1, 4, 7]);
  checkLine(cells, [2, 5, 8]);
  checkLine(cells, [0, 4, 8]);
  checkLine(cells, [2, 4, 6]); //! disinia
}

function check(cells, X_or_CIRCLE, [a, b, c]) {
  return (
    cells[a].classList.contains(X_or_CIRCLE) &&
    cells[b].classList.contains(X_or_CIRCLE) &&
    cells[c].classList.contains(X_or_CIRCLE)
  );
}

function checkLine(cells, [a, b, c]) {
  const X_WIN = check(cells, X_CLASS, [a, b, c]);
  const CIRCLE_WIN = check(cells, CIRCLE_CLASS, [a, b, c]);

  if (X_WIN) {
    let x = parseInt(X_ScoreCounter);
    x += 1;
    localStorage.setItem('X_Score', x.toString());
    alert('X WIN');
    document.location = '';
    return;
  }
  if (CIRCLE_WIN) {
    let o = parseInt(O_ScoreCounter);
    o += 1;
    localStorage.setItem('O_Score', o.toString());
    alert('O WIN');
    document.location = '';
    return;
  }
}

function AIChoice() {
  const canAISign = [...cells].filter(
    aiSign =>
      !aiSign.classList.contains(SIGN_CLASS) &&
      !aiSign.classList.contains(CIRCLE_CLASS) &&
      !aiSign.classList.contains(X_CLASS)
  );

  let ai = canAISign[Math.floor(Math.random() * canAISign.length)];
  if ([0, 1, 2, 4, 6, 7, 8].includes(ai)) {
    console.log('Milih lagee');
    AIChoice();
  }
  ai.classList.add(CIRCLE_CLASS);
  ai.classList.add(SIGN_CLASS);
}

function main() {
  sect.addEventListener('click', e => {
    const isSign = document.querySelectorAll(`.${SIGN_CLASS}`);
    if (isSign.length == 9) {
      alert('Draw');
      location.href = '';
    }
    // determine it's turn X or Circle
    const X_or_CIRCLE = swapSign(isSign);
    const canAssign =
      !e.target.classList.contains(X_CLASS) &&
      !e.target.classList.contains(CIRCLE_CLASS);

    // when cell is clicked
    if (e.target.attributes['data-cell'] && canAssign) {
      e.target.classList.add(X_or_CIRCLE); // add X or O
      e.target.classList.add(SIGN_CLASS); // marker if it's already sign

      isWinner(cells);
      // setTimeout(() => {
      //   AIChoice();
      //   isWinner(cells);
      // }, 500);
    }
  });
}

main();
