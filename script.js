class Game {
  constructor() {
    this.levels_height = [50, 56, 64, 74];
    this.last_level = 1;
    this.timer = 0;
    this.seconds = [60, 45, 20, 15];
    this.current_level = document.getElementById("current_level");
    this.next_level = document.getElementById("next_level");

    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;

    this.leftCross = new Cross("left_cross");
    this.rightCross = new Cross("right_cross");
    this.topCross = new Cross("top_cross");
    this.bottomCross = new Cross("bottom_cross");
  }

  getWindowWidth() {
    return this.window_width;
  }
  getWindowHeight() {
    return this.window_height;
  }

  getCurrentLevel() {
    return this.current_level;
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
  startTime() {}
  restartTime() {}
  stopTime() {}
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
ball.addClickListener();
ball.addHoverListener();
