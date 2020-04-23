import {GameStages, GameTurns} from "./constants";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const mapToWinStage = (gameTurn) => {
  switch (gameTurn) {
    case GameTurns.CROSSES:
      return GameStages.CROSSES_WINS;
    case GameTurns.NOUGHTS:
      return GameStages.NOUGHTS_WINS;
    default:
      throw new Error(`Invalid turn type: ${gameTurn}`);
  }
};

export const toggleGameTurn = (currentTurn) => {
  switch (currentTurn) {
    case GameTurns.CROSSES:
      return GameTurns.NOUGHTS;
    case GameTurns.NOUGHTS:
      return GameTurns.CROSSES;
    case GameTurns.NOBODYS:
      return GameTurns.NOBODYS;
    default:
      throw new Error(`Unsupported turn type: ${currentTurn}`);
  }
};

/**
 * Восстановление координат ячейки по ее номеру в массиве
 * @param cellNumber - порядковый номер ячейки в массиве
 * @param boardSize - размер игрового поля
 * @returns {{x: number, y: number}} - координаты ячейки
 */
export const getCellCoords = (cellNumber, boardSize) => {
  return {
    x: cellNumber % boardSize,
    y: Math.floor(cellNumber / boardSize),
  };
};
