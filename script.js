document.getElementById("button").addEventListener("mouseover", hoverButton);
document.getElementById("left_cross").style.backgroundColor = "#44a3d5";
let width_point = document.getElementById("width_point");
let height_point = document.getElementById("height_point");
let lastAlertedLevel = 0;
alert("Olá! Tente clicar o mais rápido possível no botão!!");

function passToLevel(number) {
  let current_level_el = document.getElementById("current_level");
  let current_level = parseInt(current_level_el.innerText);

  if (number > current_level) {
    // Se o número(level) que será passado for maior que o level atual ->
    current_level_el.innerText = number; // level atual vira o próximo
    getCurrentLevel(); // manda o alerta do próximo nível
  }
  if (current_level_el.innerText == 2) {
    document.getElementById("left_cross").style.backgroundColor = "#fff";
    document.getElementById("right_cross").style.backgroundColor = "#44a3d5";
  } else if (current_level_el.innerText == 3) {
    document.getElementById("right_cross").style.backgroundColor = "#fff";
    document.getElementById("top_cross").style.backgroundColor = "#44a3d5";
  } else if (current_level_el.innerText == 4) {
    document.getElementById("top_cross").style.backgroundColor = "#fff";
    document.getElementById("bottom_cross").style.backgroundColor = "#44a3d5";
  }
}

function nextLevel(number) {
  let next_level = document.getElementById("next_level");
  next_levels = [40, 46, 54];
  if (number == 2) {
    next_level.innerText = next_levels[0];
  }
  if (number == 3) {
    next_level.innerText = next_levels[1];
  }
  if (number == 4) {
    next_level.innerText = next_levels[2];
  }
}

function hoverButton(id) {
  const button = document.getElementById(id);
  button.style.marginTop = "3.1rem";
  button.style.position = "relative";
  button.style.bottom = 1.65 + "rem";
  button.style.right = Math.random() * 30 + "rem";
  const style = getComputedStyle(button);

  const CurrentWidth = parseInt(style.width);
  const CurrentHeight = parseInt(style.height);

  width_point.innerHTML = `width: ${CurrentWidth}`;
  height_point.innerHTML = `height: ${CurrentHeight}`;

  next_level = parseInt(document.getElementById("next_level").innerText);

  if (CurrentHeight >= 34) {
    button.style.right = 0;
    button.style.left = Math.random() * 30 + "rem";
    passToLevel(2);
    nextLevel(2);
  }
  if (CurrentHeight >= 40) {
    button.style.left = 0;
    button.style.bottom = Math.random() * 15 + "rem";
    passToLevel(3);
    nextLevel(3);
  }
  if (CurrentHeight >= 46) {
    button.style.bottom = 0;
    button.style.top = Math.random() * 15 + "rem";
    passToLevel(4);
    nextLevel(4);
  }
  if (CurrentHeight >= 54) {
    passToLevel(5);
    button.style.top = 0;
    button.style.bottom = "4rem";
    button.style.width = "200px";
    button.style.height = "200px";
    button.innerHTML = "Parabéns você ganhou!";
  }
}

function clique(id) {
  const button = document.getElementById(id);
  const timer = document.getElementById("timerBtn");

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
      alert("Boa, bora pro nível 2!!");
    }
    if (current_level == 3) {
      alert("Caraca, você é bom hein, nível 3 então!!");
    }
    if (current_level == 4) {
      alert("Nível 4 agora, é bom você ter paciência pois não vai ser facil!");
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

  // if (button.innerHTML == "Parabéns você ganhou!") {
  //   newWidth = CurrentWidth - 2;
  //   newHeight = CurrentHeight - 2;
  //   button.style.width = `${newWidth}px`;
  //   button.style.height = `${newHeight}px`;
  // } Arrumar esta condição
}

function diminuirBtn() {
  const button = document.getElementById(id);
  const style = getComputedStyle(button);

  const CurrentWidth = parseInt(style.width);
  const CurrentHeight = parseInt(style.height);

  button.style.width = `${newWidth - 2}px`;
  button.style.height = `${newHeight - 2}px`;
}
// Fazer com que a cor das cross pisquem por um 0.5s após subir de nível
// Colocar um tempo para cada nível, e caso o jogador não consiga a tempo, o jogo reinicia (colocar um alerta dizendo)
// Pensar em colocar uma div aparecendo ao invés de vários alertas
// Mexer no style do jogo (pra ficar mais legal)
// Criar uma tela que separe o jogo por fases, e cada fase é um arquivo separado com um game diferente tmb
