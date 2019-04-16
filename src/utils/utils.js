// ES6 Fisher–Yates shuffle algorithm

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getAiAnswers(difficulty) {
  const easy = 70;
  const medium = 80;
  const hard = 90;

  const array = [];

  for (let i = 0; i < 3; i++) {
    const num = Math.random() * 100;
    if (difficulty === 'easy') {
      num < easy ? array.push(true) : array.push(false);
    }

    if (difficulty === 'medium') {
      num < medium ? array.push(true) : array.push(false);
    }

    if (difficulty === 'hard') {
      num < hard ? array.push(true) : array.push(false);
    }
  }
  return array;
}

export function getAiCategory(arr) {
  const randomItem = arr[Math.floor(Math.random() * arr.length)];
  return randomItem;
}
