document.getElementById("button").addEventListener("mouseover", hoverButton);
document.getElementById("left_cross").style.backgroundColor = "#44a3d5";
let width_point = document.getElementById("width_point");
let height_point = document.getElementById("height_point");
const levels = [50, 56, 64, 74];
let lastAlertedLevel = 0;
let nivel_anterior = 0;
let timer = 0;
let seconds = [60, 45, 20, 15];
startGame();

function devMode(level) {
  // Arrumar esta função
  if (level != 5) {
    const button = document.getElementById("button");
    button.innerHTML = "Clique em mim";
    if (level == 2) {
      button.style.width = `${levels[0]}px`;
      button.style.height = `${levels[0]}px`;
    } else if (level == 3) {
      button.style.width = `${levels[1]}px`;
      button.style.height = `${levels[1]}px`;
    } else if (level == 4) {
      button.style.width = `${levels[2]}px`;
      button.style.height = `${levels[2]}px`;
    }
  } else {
    button.innerHTML = "Parabéns você ganhou!";
    button.style.width = `${levels[3]}px`;
    button.style.height = `${levels[3]}px`;
  }

  document.getElementById("current_level").innerText = level;
  passToLevel(level);
  nextLevel(level);
}

function passToLevel(number) {
  let current_level_el = document.getElementById("current_level");
  let current_level = getLevelAtual();

  if (number > current_level) {
    // Se o número(level) que será passado for maior que o level atual ->
    current_level_el.innerText = number; // level atual vira o próximo
    getCurrentLevel(); // manda o alerta do próximo nível
  }
  if (current_level_el.innerText == 2) {
    document.getElementById("left_cross").style.backgroundColor = "#fff";
    document.getElementById("top_cross").style.backgroundColor = "#fff";
    document.getElementById("bottom_cross").style.backgroundColor = "#fff";
    document.getElementById("right_cross").style.backgroundColor = "#44a3d5";
  } else if (current_level_el.innerText == 3) {
    document.getElementById("left_cross").style.backgroundColor = "#fff";
    document.getElementById("right_cross").style.backgroundColor = "#fff";
    document.getElementById("bottom_cross").style.backgroundColor = "#fff";
    document.getElementById("top_cross").style.backgroundColor = "#44a3d5";
  } else if (current_level_el.innerText == 4) {
    document.getElementById("left_cross").style.backgroundColor = "#fff";
    document.getElementById("top_cross").style.backgroundColor = "#fff";
    document.getElementById("right_cross").style.backgroundColor = "#fff";
    document.getElementById("bottom_cross").style.backgroundColor = "#44a3d5";
  } else if (current_level_el.innerText == 5) {
    document.getElementById("bottom_cross").style.backgroundColor = "#44a3d5";
    document.getElementById("top_cross").style.backgroundColor = "#44a3d5";
    document.getElementById("left_cross").style.backgroundColor = "#44a3d5";
    document.getElementById("right_cross").style.backgroundColor = "#44a3d5";
  }
}

function nextLevel(number) {
  let next_level = document.getElementById("next_level");
  next_levels = [56, 64, 74];
  if (number == 2) {
    next_level.innerText = next_levels[0];
  }
  if (number == 3) {
    next_level.innerText = next_levels[1];
  }
  if (number == 4) {
    next_level.innerText = next_levels[2];
  }
  if (number == 5) {
    next_level.innerText = "Atual";
  }
}

function hoverButton(id) {
  const button = document.getElementById(id);
  button.style.marginTop = "3.1rem";
  button.style.position = "relative";
  button.style.bottom = 1.65 + "rem";
  button.style.right = Math.random() * 30 + "rem";
  const style = getComputedStyle(button);

  const CurrentWidth = getWidthBtn("button");
  const CurrentHeight = getHeightBtn("button");

  width_point.innerHTML = CurrentWidth;
  height_point.innerHTML = CurrentHeight;

  next_level = parseInt(document.getElementById("next_level").innerText);

  if (CurrentHeight >= 50) {
    button.style.fontSize = "11px";
    button.style.right = 0;
    button.style.bottom = 1.65 + "rem";
    button.style.left = Math.random() * 30 + "rem";
    passToLevel(2);
    nextLevel(2);
  }
  if (CurrentHeight >= 56) {
    button.style.left = 0;
    button.style.right = 0;
    button.style.bottom = Math.random() * 15 + "rem";
    passToLevel(3);
    nextLevel(3);
  }
  if (CurrentHeight >= 64) {
    button.style.fontSize = "12px";
    button.style.left = 0;
    button.style.right = 0;
    button.style.bottom = 0;
    button.style.top = Math.random() * 15 + "rem";
    passToLevel(4);
    nextLevel(4);
  }
  if (CurrentHeight >= 74) {
    button.style.fontSize = "20px";
    passToLevel(5);
    nextLevel(5);
    button.style.top = 0;
    button.style.left = 0;
    button.style.right = 0;
    button.style.bottom = 1.65 + "rem";
    button.style.width = "200px";
    button.style.height = "200px";
    button.innerHTML = "Parabéns você ganhou!";
  }
}

function clique(id) {
  const button = document.getElementById(id);

  if (button.innerHTML === "+2 Points") {
    return;
  }
  button.innerHTML = "+2 Points";
  aumentarBtn(id);

  setTimeout(() => {
    button.innerHTML = "Clique em mim";
  }, 1000);
}

function getCurrentLevel() {
  let current_level = parseInt(
    document.getElementById("current_level").innerText
  );
  if (current_level > lastAlertedLevel) {
    if (current_level == 2) {
      alert("Bora pro Nível 2!!");
    }
    if (current_level == 3) {
      alert("Você é bom hein, Nível 3 então!!");
    }
    if (current_level == 4) {
      alert("Nível 4 agora, é bom você ter paciência pois não vai ser fácil!");
    }
    if (current_level == 5) {
      alert("Boaa você ganhou!!");
    }
  }
  lastAlertedLevel = current_level;
}
function aumentarBtn(id) {
  const button = document.getElementById(id);
  const style = getComputedStyle(button);

  const CurrentWidth = parseInt(style.width);
  const CurrentHeight = parseInt(style.height);

  let newWidth = CurrentWidth + 2;
  let newHeight = CurrentHeight + 2;

  button.style.width = `${newWidth}px`;
  button.style.height = `${newHeight}px`;
}

function getLevelAtual() {
  return parseInt(document.getElementById("current_level").innerText);
}

function startGame() {
  alert(`Tente clicar no botão em até ${seconds[0]} segundos!!`);
  let time = document.getElementById("time");
  time.innerText = timer;
  let loop = setInterval(() => {
    const nivelAtual = getLevelAtual();
    const tempoLimite = seconds[nivelAtual - 1];

    if (nivelAtual !== nivel_anterior) {
      // Se o nível atual for diferente do nível anterior (se vc passou de fase) ->
      restartTime(); // Reinicia o tempo
      nivel_anterior = nivelAtual; // Nível anterior = nível atual
      nextLevel([nivelAtual]); // Próximo "nível"(height necessária para passar) igual o nível atual
    }

    timer++; // Aumenta o tempo
    time.innerText = timer; // Atualiza o texto do tempo

    if (timer > seconds[nivelAtual - 1]) {
      // Se o tempo for maior que o tempo limite ->
      stopGame(loop); // O jogo acaba e reinicia
    }
  }, 1000); // Cada um segundo..
}
function stopGame(loop) {
  clearInterval(loop);
  alert("Acabou o tempo, mas tenta ser mais rápido na próxima beleza!!");
  location.reload();
}
function restartTime() {
  timer = 0;
  document.getElementById("time").innerText = timer;
}
function getWidthBtn(id) {
  const button = document.getElementById(id);
  const style = getComputedStyle(button);
  return parseInt(style.width);
}
function getHeightBtn(id) {
  const button = document.getElementById(id);
  const style = getComputedStyle(button);
  return parseInt(style.height);
}

// function diminuirBtn(id) { Arrumar essa função

//   const button = document.getElementById(id);
//   const style = getComputedStyle(button);

//   const CurrentWidth = getWidthBtn("button");
//   const CurrentHeight = getHeightBtn("button");

//   button.style.width = `${newWidth - 2}px`;
//   button.style.height = `${newHeight - 2}px`;
// }

// Colocar um tempo para cada nível, e caso o jogador não consiga a tempo, o jogo reinicia (colocar um alerta dizendo)
// Mexer no style do jogo (pra ficar mais legal)
// Criar uma tela que separe o jogo por fases, e cada fase é um arquivo separado com um game diferente tmb
