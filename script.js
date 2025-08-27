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

    this.level = { 1: 48, 2: 50, 3: 56, 4: 64, 5: 74 };

    this.last_level = 1;
    this.timer = 0;
    this.seconds = [60, 45, 20, 15];
    this.current_level = document.getElementById("current_level");
    this.current_height_span = document.getElementById("current_height");
    this.ball_height_span = document.getElementById("ball_height");
    this.next_level = document.getElementById("next_level");
    this.p_level = document.getElementById("p_tag_level");

    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;

    this.current_height_span.innerText = this.level[1];
    this.ball_height_span.innerText = this.level[1];

    // Criando Crosses
    this.leftCross = new Cross("left");
    this.rightCross = new Cross("right");
    this.topCross = new Cross("top");
    this.bottomCross = new Cross("bottom");

    this.msg_levels = {
      start: `Tente clicar no botão em até ${this.seconds[0]} segundos!!`,
      win: {
        2: "Bora pro Nível 2!!",
        3: "Você é bom hein, Nível 3 então!!",
        4: "Nível 4 agora, é bom você ter paciência pois não vai ser fácil!",
        5: "Boaa você ganhou!!",
      },
      lost: {
        1: "Acabou o tempo, mas tenta ser mais rápido na próxima beleza!!",
        2: "",
        3: "",
        4: "",
        5: "",
      },
    };

    this.ball = new Ball("ball-button", this);
  }

  startGame() {
    this.jogar_btn.addEventListener("click", () => {
      this.isPlaying = true;
      alert(this.msg_levels.start);
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
        location.reload();
      });
    }
  }

  setCurrentHeightSpan(current_height) {
    this.current_height_span = current_height;
  }

  getCurrentHeightSpan() {
    return this.current_height_span;
  }

  getWindowWidth() {
    return this.window_width;
  }
  getWindowHeight() {
    return this.window_height;
  }

  setCurrentLevel(level) {
    this.current_level.innerText = level;
  }
  getCurrentLevel() {
    return parseInt(this.current_level.innerText);
  }

  getNextLevel() {
    const current = parseInt(this.getCurrentLevel());

    // Se ainda não for o último nível
    if (current < 5) {
      return (this.next_level.innerText = this.level[current + 1]); // pega o próximo nível no objeto level
    }

    // Se for o último nível
    return (this.next_level.innerText = "");
  }

  passLevel() {
    const level = parseInt(this.getCurrentLevel());

    // Reseta cores
    this.leftCross.changeColor("#fff");
    this.rightCross.changeColor("#fff");
    this.topCross.changeColor("#fff");
    this.bottomCross.changeColor("#fff");

    // Ativa a cross correspondente
    switch (level) {
      case 1:
        this.leftCross.changeColor("#44a3d5");
        this.getNextLevel();
        break;
      case 2:
        this.rightCross.changeColor("#44a3d5");
        this.getNextLevel();
        break;
      case 3:
        this.topCross.changeColor("#44a3d5");
        this.getNextLevel();
        break;
      case 4:
        this.bottomCross.changeColor("#44a3d5");
        this.getNextLevel();
        break;
    }

    // Exibe alert do nível
    if (this.msg_levels.win[level]) {
      alert(this.msg_levels.win[level]);
    }

    // Aqui: centraliza a bolinha ao passar de nível
    if (this.ball) {
      this.ball.centerBall();
    }
  }
  startTime() {
    let time = document.getElementById("time");
    time.innerText = this.timer;

    let nivelAnterior = this.getCurrentLevel();

    let loop = setInterval(() => {
      const nivelAtual = this.getCurrentLevel();
      const tempoLimite = this.seconds[nivelAtual - 1];

      if (nivelAtual !== nivelAnterior) {
        this.restartTime(time);
        nivelAnterior = nivelAtual;
      }

      this.timer++;
      time.innerText = this.timer;

      if (this.timer > tempoLimite) {
        this.stopTime(loop);
      }
    }, 1000);
  }

  restartTime(time) {
    this.timer = 0;
    time.innerText = this.timer;
  }
  stopTime(loop) {
    clearInterval(loop);
    alert(this.msg_levels.lost[this.getCurrentLevel()]);
    location.reload();
  }
}

class Cross {
  constructor(name) {
    this.name = name; // "left", "right", "top" ou "bottom"
    this.crossElement = document.getElementById(name);
    this.crossElement.style.position = "absolute";
    this.alignCross();
  }

  alignCross() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const crossWidth = this.crossElement.offsetWidth;
    const crossHeight = this.crossElement.offsetHeight;

    switch (this.name) {
      case "left":
        this.crossElement.style.left = "0px";
        this.crossElement.style.top = (windowHeight - crossHeight) / 2 + "px";
        break;
      case "right":
        this.crossElement.style.right = "0px";
        this.crossElement.style.top = (windowHeight - crossHeight) / 2 + "px";
        break;
      case "top":
        this.crossElement.style.top = "0px";
        this.crossElement.style.left = (windowWidth - crossWidth) / 2 + "px";
        break;
      case "bottom":
        this.crossElement.style.bottom = "0px";
        this.crossElement.style.left = (windowWidth - crossWidth) / 2 + "px";
        break;
      default:
        console.warn("Nome da cross inválido:", this.name);
    }
  }

  changeColor(color) {
    this.crossElement.style.backgroundColor = color;
  }
}

class Ball {
  constructor(id, game) {
    this.game = game;
    this.ballElement = document.getElementById(id);
    this.style = window.getComputedStyle(this.ballElement);
    this.width = parseInt(this.style.width);
    this.height = parseInt(this.style.height);
    this.fontSize = parseInt(this.style.fontSize);
    this.defaultText = "";
    this.hasWon = false;

    // Inicializa tamanho e centraliza
    this.setWidth(3 * 16); // 3rem = 16px * 3
    this.setHeight(3 * 16);
    this.centerBall();

    // Listeners
    this.addClickListener();
    this.addHoverListener();
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

  centerBall() {
    const centerX = (this.game.getWindowWidth() - this.getWidth()) / 2;
    const centerY = (this.game.getWindowHeight() - this.getHeight()) / 2;
    this.ballElement.style.position = "absolute";
    this.ballElement.style.left = centerX + "px";
    this.ballElement.style.top = centerY + "px";
  }

  morePoints() {
    if (this.ballElement.innerText === "+2 Points") return;

    this.ballElement.innerText = "+2 Points";

    if (this.getHeight() >= this.game.level[1]) this.setFontSize(14);
    if (this.getHeight() >= this.game.level[3]) this.setFontSize(17);
    if (this.getHeight() >= this.game.level[4]) {
      this.setFontSize(20);
      this.win();
    }

    setTimeout(() => {
      this.defaultText = this.getHeight(); // Texto padrão se torna a altura da bolinha
      this.ballElement.innerText = this.defaultText; // Texto padrão HTML se torna a altura da bolinha
    }, 1000); // a cada 1 segundo
  }

  getBigger(size) {
    this.setHeight(this.getHeight() + size);
    this.setWidth(this.getWidth() + size);
    this.morePoints();

    // Verifica se passou de nível
    const current = this.game.getCurrentLevel();
    const nextLimit = this.game.level[current + 1];

    if (nextLimit && this.getHeight() >= nextLimit) {
      this.game.setCurrentLevel(current + 1); // atualiza o número visível
      this.game.passLevel(); // muda a cross, centraliza bola etc
      this.game.restartTime(document.getElementById("time")); // reinicia tempo
    }
  }

  win() {
    if (this.hasWon) return;
    this.hasWon = true;
    this.ballElement.innerText = "Parabéns você ganhou!";
    this.setHeight(200);
    this.setWidth(200);
    this.centerBall();
  }

  addHoverListener() {
    this.ballElement.addEventListener("mouseover", () => {
      if (this.hasWon) return; // não se move após ganhar

      const centerX = (this.game.getWindowWidth() - this.getWidth()) / 2;
      const centerY = (this.game.getWindowHeight() - this.getHeight()) / 2;
      const h = this.getHeight();

      this.game.current_height_span.innerText = h;
      this.game.ball_height_span.innerText = h;

      if (h < this.game.level[2]) {
        // Nível 1 - esquerda
        this.ballElement.style.left = Math.random() * centerX + "px";
      } else if (h >= this.game.level[2] && h < this.game.level[3]) {
        // Nível 2 - direita
        this.ballElement.style.left =
          centerX +
          Math.random() *
            (this.game.getWindowWidth() - centerX - this.getWidth()) +
          "px";
      } else if (h >= this.game.level[3] && h < this.game.level[4]) {
        // Nível 3 - para cima
        this.ballElement.style.top = Math.random() * centerY + "px";
      } else if (h >= this.game.level[4] && h < this.game.level[5]) {
        // Nível 4 - para baixo
        this.ballElement.style.top =
          centerY +
          Math.random() *
            (this.game.getWindowHeight() - centerY - this.getHeight()) +
          "px";
      } else {
        // Fim do jogo
        this.centerBall();
      }
    });
  }

  addClickListener() {
    this.ballElement.addEventListener("click", () => this.getBigger(2));
  }
}

const game = new Game();
game.startGame();
game.getNextLevel();
