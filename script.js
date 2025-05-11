document.getElementById("button").addEventListener("mouseover", hoverButton);

function hoverButton(id) {
  const button = document.getElementById(id);
  button.style.position = "relative";
  button.style.right = Math.random() * 30 + "rem";
  const style = getComputedStyle(button);

  const CurrentWidth = parseInt(style.width);
  const CurrentHeight = parseInt(style.height);

  if (CurrentWidth >= 40 && CurrentHeight >= 40) {
    button.style.right = 0;
    button.style.left = Math.random() * 30 + "rem";
    passLevel(id);
  }
  if (CurrentWidth >= 44 && CurrentHeight >= 44) {
    button.style.left = 0;
    button.style.bottom = Math.random() * 16 + "rem";
    passLevel(id);
  }
  if (CurrentWidth >= 48 && CurrentHeight >= 48) {
    button.style.bottom = 0;
    button.style.top = Math.random() * 16 + "rem";
    passLevel(id);
  }
  if (CurrentWidth >= 52 && CurrentHeight >= 52) {
    passLevel(id);
    button.style.top = 0;
    button.style.width = "200px";
    button.style.height = "200px";
    button.innerHTML = "Parabéns você ganhou!";
  }
}

function clique(id) {
  const button = document.getElementById(id);
  const timer = document.getElementById("timerBtn");

  if (button.innerHTML === "Parabéns!") {
    return;
  }
  button.innerHTML = "Parabéns!";
  aumentarBtn(id);

  // timerBtn.innerHTML = "";
  // timer();

  setTimeout(() => {
    button.innerHTML = "Clique em mim";
  }, 3000);
}

function aumentarBtn(id) {
  const button = document.getElementById(id);
  const style = getComputedStyle(button);

  const CurrentWidth = parseInt(style.width);
  const CurrentHeight = parseInt(style.height);

  const newWidth = CurrentWidth + 2;
  const newHeight = CurrentHeight + 2;

  button.style.width = `${newWidth}px`;
  button.style.height = `${newHeight}px`;
}

function passLevel(id) {
  const level = document.getElementById("level");

  const button = document.getElementById(id);
  const style = getComputedStyle(button);

  const CurrentWidth = parseInt(style.width);
  const CurrentHeight = parseInt(style.height);

  if (CurrentWidth >= 40 && CurrentHeight >= 40) {
    level.innerHTML = "Level 2";
  }
  if (CurrentWidth >= 44 && CurrentHeight >= 44) {
    level.innerHTML = "Level 3";
  }
  if (CurrentWidth >= 48 && CurrentHeight >= 48) {
    level.innerHTML = "Level 4";
  }
  if (CurrentWidth >= 52 && CurrentHeight >= 52) {
    level.innerHTML = "Você ganhou!";
  }
}

function timer() {
  const timer = document.getElementById("timerBtn");
  let count = 3;
  const interval = setInterval(() => {
    timer.innerHTML = count;
    count--;

    if (count < 1) {
      clearInterval(interval);
      timer.innerHTML = "";
    }
  }, 1000);
}

// Arrumar o timer() para aparecer embaixo do "Parabéns"
// Colocar o width, height embaixo do level para o jogador saber
// Colocar cor de fundo na div do level
// Arrumar a quantidade de width e height necessárias para mudar as posições
