import { useState } from "react";

export default function App() {
  const [player, setPlayer] = useState("X");
  const [disableClicks, setDisableClicks] = useState(false);
  const cells = Array(9).fill(null);

  const handleClick = (e) => {
    const cell = e.target;
    if (cell.textContent) return;
    cell.textContent = player;
    setPlayer((prev) => prev === "X" ? "O" : "X");
    checkWinner();
  }

  const handleReset = () => {
    setPlayer("X");
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => { cell.textContent = "", cell.classList.remove("winner") });
    setDisableClicks(false);
  }

  const checkWinner = () => {
    const cells = document.querySelectorAll(".cell");
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
      [0, 4, 8], [2, 4, 6] // diagonal
    ];

    winningCombinations.forEach((combination) => {
      const [a, b, c] = combination;

      if ((cells[a].textContent === cells[b].textContent) && (cells[a].textContent === cells[c].textContent) && (cells[a].textContent !== "")) {
        combination.forEach((index) => cells[index].classList.add("winner"));
        setDisableClicks(true);

        setTimeout(() => {
          if (confirm(`${cells[a].textContent} ganó!, ¿Quieres jugar de nuevo?`)) {
            handleReset();
          }
        }, 100);
      }
    });
  }

  return (
    <main>
      <h1>Tic-Tac-Toe</h1>
      <h2>Turno de {player}</h2>
      <div className="cells-container" style={{ pointerEvents: disableClicks ? "none" : "auto" }}>
        {
          cells.map((cell, index) => (
            <div
              key={index}
              className="cell"
              onClick={handleClick}
            >
              <span>{cell}</span>
            </div>
          ))
        }
      </div>
      <button onClick={handleReset}>Reiniciar</button>
    </main>
  );
}
