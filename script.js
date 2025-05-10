document.getElementById("button").addEventListener("mouseover", hoverButton);

function hoverButton(id) {
  const button = document.getElementById(id);
  button.style.position = "relative";
  button.style.right = Math.random() * 40 + "rem";
}

function clique(id) {
  const button = document.getElementById(id);
  button.innerHTML = "Parabéns!";
  parabens(id);
}

function parabens(id) {
  if (document.getElementById(id).innerHTML == "Parabéns!") {
    setInterval(() => {
      document.getElementById(id).innerHTML = "Clique em mim";
    }, 3000);
  }
}
