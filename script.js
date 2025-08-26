class Game {
  constructor() {
    this.menu_div = document.getElementById("menu");
    this.game_div = document.getElementById("game");

    this.isPlaying = false;
    this.jogar_btn = document.getElementById("jogar");
    this.config_btn = document.getElementById("config");
    this.sair_menu_btn = document.getElementById("sair_menu");
    this.sair_game_btn = document.getElementById("sair_game");
    this.sair_game_btn.style.display = "none";
    this.menu_div.style.display = "flex";
    this.game_div.style.display = "none";
    this.config_btn.addEventListener("click", () => {
      alert("Função em produção..");
    });
    this.sair_menu_btn.addEventListener("click", () => {
      alert("Função em produção..");
    });

    this.levels_height = [50, 56, 64, 74];
    this.last_level = 1;
    this.timer = 0;
    this.seconds = [60, 45, 20, 15];
    this.current_level = document.getElementById("current_level");
    this.next_level = document.getElementById("next_level");
    this.p_level = document.getElementById("p_tag_level");

    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;

    this.leftCross = new Cross("left_cross");
    this.rightCross = new Cross("right_cross");
    this.topCross = new Cross("top_cross");
    this.bottomCross = new Cross("bottom_cross");
    this.msg_levels = [
      (won) => [
        (one) => `Tente clicar no botão em até ${seconds[0]} segundos!!`,
        (two) => "Bora pro Nível 2!!",
        (three) => "Você é bom hein, Nível 3 então!!",
        (four) =>
          "Nível 4 agora, é bom você ter paciência pois não vai ser fácil!",
        (five) => "Boaa você ganhou!!",
      ],
      (lost) => [
        (zero) =>
          "Acabou o tempo, mas tenta ser mais rápido na próxima beleza!!",
        (one) => "",
        (two) => "",
        (three) => "",
        (four) => "",
        (five) => "",
      ],
    ];
  }

  startGame() {
    this.jogar_btn.addEventListener("click", () => {
      this.isPlaying = true;
      this.startTime();
      this.game_div.style.display = "flex";
      this.menu_div.style.display = "none";
      this.sair_game_btn.style.display = "block";
      this.quitGame();
    });
  }

  quitGame() {
    if (this.isPlaying == true) {
      this.sair_game_btn.addEventListener("click", () => {
        this.isPlaying = false;
        this.menu_div.style.display = "flex";
        this.game_div.style.display = "none";
        this.sair_game_btn.style.display = "none";
      });
    }
  }

  getWindowWidth() {
    return this.window_width;
  }
  getWindowHeight() {
    return this.window_height;
  }

  getCurrentLevel() {
    return this.current_level.innerText;
  }
  sendMessage() {
    if (this.getCurrentLevel() == 1) {
      return alert(this.msg_levels[win[one]]);
    }
    if (this.getCurrentLevel() == 2) {
      return alert(this.msg_levels[win[two]]);
    }
    if (this.getCurrentLevel() == 3) {
      return alert(this.msg_levels[win[three]]);
    }
    if (this.getCurrentLevel() == 4) {
      return alert(this.msg_levels[win[four]]);
    }
    if (this.getCurrentLevel() == 5) {
      return alert(this.msg_levels[win[five]]);
    }
  }

  getNextLevel() {
    if (this.getCurrentLevel() == 1) {
      return (this.next_level = this.levels_height[0]);
    }
    if (this.getCurrentLevel() == 2) {
      return (this.next_level = this.levels_height[1]);
    }
    if (this.getCurrentLevel() == 3) {
      return (this.next_level = this.levels_height[2]);
    }
    if (this.getCurrentLevel() == 4) {
      return (this.next_level = this.levels_height[3]);
    }
    if (this.getCurrentLevel() == 5) {
      return (this.next_level = "") && (this.p_level = "");
    }
  }

  passLevel() {
    if (this.getCurrentLevel() == 1) {
      this.leftCross.changeColor("#44a3d5");
    }
    if (this.getCurrentLevel() == 2) {
      this.leftCross.changeColor("#fff");
      this.rightCross.changeColor("#44a3d5");
    }
    if (this.getCurrentLevel() == 3) {
      this.rightCross.changeColor("#fff");
      this.topCross.changeColor("#44a3d5");
    }
    if (this.getCurrentLevel() == 4) {
      this.topCross.changeColor("#fff");
      this.bottomCross.changeColor("#44a3d5");
    }
  }
  startTime() {
    let time = document.getElementById("time");
    time.innerText = this.timer;
    let loop = setInterval(() => {
      const nivelAtual = getLevelAtual();
      const tempoLimite = seconds[nivelAtual - 1];

      if (nivelAtual !== nivel_anterior) {
        // Se o nível atual for diferente do nível anterior (se vc passou de fase) ->
        restartTime(); // Reinicia o tempo
        nivel_anterior = nivelAtual; // Nível anterior = nível atual
        nextLevel([nivelAtual]); // Próximo "nível"(height necessária para passar) igual o nível atual
      }

      this.timer++; // Aumenta o tempo
      time.innerText = this.timer; // Atualiza o texto do tempo

      if (this.timer > tempoLimite) {
        // Se o tempo for maior que o tempo limite ->
        stopTime(loop); // O jogo acaba e reinicia
      }
    }, 1000); // Cada um segundo..
  }
  restartTime() {
    this.timer = 0;
    document.getElementById("time").innerText = this.timer;
  }
  stopTime(loop) {
    clearInterval(loop);
    alert(this.msg_levels[lost[zero]]);
    location.reload();
  }
}

class Cross {
  constructor(id) {
    this.crossElement = document.getElementById(id);
    this.backColor = window.getComputedStyle(this.crossElement).backgroundColor;
  }

  changeColor(BackgroundColor) {
    this.backColor = BackgroundColor;
    this.crossElement.style.backgroundColor = BackgroundColor;
  }
}

class Ball {
  constructor(id, game) {
    this.game = game;
    this.ballElement = document.getElementById(id);
    this.style = window.getComputedStyle(this.ballElement);
    this.width = parseInt(this.style.width);
    this.height = parseInt(this.style.height);
    this.fontSize = this.style.fontSize;
    this.defaultText = "Clique em mim";
    this.hasWon = false;
    this.ballElement.style.width = 3 + "rem";
    this.ballElement.style.height = 3 + "rem";
  }
  setFontSize(size) {
    this.fontSize = size;
    this.ballElement.style.fontSize = size + "px";
  }
  setWidth(width) {
    this.width = width;
    this.ballElement.style.width = width + "px";
  }
  setHeight(height) {
    this.height = height;
    this.ballElement.style.height = height + "px";
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }

  morePoints() {
    if (this.ballElement.innerHTML === "+2 Points") {
      return;
    }

    this.ballElement.innerHTML = "+2 Points";
    if (Math.round(this.getHeight()) >= this.game.levels_height[0]) {
      this.setFontSize(11);
    }
    if (Math.round(this.getHeight()) >= this.game.levels_height[2]) {
      this.setFontSize(12);
    }
    if (Math.round(this.getHeight()) >= this.game.levels_height[3]) {
      this.setFontSize(20);
      this.win();
      return;
    }

    setTimeout(() => {
      this.ballElement.innerHTML = this.defaultText;
    }, 1000);
  }

  getBigger(size) {
    this.setHeight(this.getHeight() + size);
    this.setWidth(this.getWidth() + size);
    this.morePoints();
  }

  win() {
    if (this.hasWon) return;
    this.hasWon = true;

    this.ballElement.innerHTML = "Parabéns você ganhou!";
    this.setHeight(200);
    this.setWidth(200);
  }

  centerBall() {
    const centerX = (this.game.getWindowWidth() - this.getWidth()) / 2;
    const centerY = (this.game.getWindowHeight() - this.getHeight()) / 2;

    this.ballElement.style.position = "absolute";
    this.ballElement.style.left = centerX + "px";
    this.ballElement.style.top = centerY + "px";
  }

  addHoverListener() {
    this.ballElement.addEventListener("mouseover", () => {
      const centerX = (this.game.getWindowWidth() - this.getWidth()) / 2; // Pega a posição horizontal central
      const centerY = (this.game.getWindowHeight() - this.getHeight()) / 2; // Pega a posição vertical central

      const randomX =
        Math.random() * (this.game.getWindowWidth() - this.getWidth()); // Pega uma posição aleatoria da tela horizontalmente
      const randomY =
        Math.random() * (this.game.getWindowHeight() - this.getHeight()); // Pega uma posição aleatoria da tela verticalmente

      this.centerBall();
      if (this.height < this.game.levels_height[0]) {
        // Nível 1

        this.ballElement.style.left = Math.random() * centerX + "px"; // bola se mexe do centro a esquerda aleatoriamente
      } else if (
        this.height >= this.game.levels_height[0] &&
        this.height < this.game.levels_height[1]
      ) {
        // Nível 2

        this.ballElement.style.left =
          centerX +
          Math.random() *
            (this.game.getWindowWidth() - centerX - this.getWidth()) +
          "px"; // bola se mexe do centro a direita aleatoriamente
      } else if (
        this.height >= this.game.levels_height[1] &&
        this.height < this.game.levels_height[2]
      ) {
        // Nível 3

        this.ballElement.style.top = Math.random() * centerY + "px"; // bola se mexe do centro para cima aleatoriamente
      } else if (
        this.height >= this.game.levels_height[2] &&
        this.height < this.game.levels_height[3]
      ) {
        // Nível 4

        this.ballElement.style.top =
          centerY +
          Math.random() *
            (this.game.getWindowHeight() - centerY - this.getHeight()) +
          "px"; // bola se mexe do centro para baixo aleatoriamente
      } else {
        // Fim do jogo
        this.centerBall();
      }
    });
  }

  addClickListener() {
    this.ballElement.addEventListener("click", () => {
      this.getBigger(2);
    });
  }
}

const game = new Game();
const ball = new Ball("ball-button", game);
game.startGame();
game.getNextLevel();
ball.addClickListener();
ball.addHoverListener();
