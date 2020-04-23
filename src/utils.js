import {GameStages, GameTurns} from "./constants";

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

export const getCellCoords = (cellNumber, boardSize) => {
  return {
    x: cellNumber % boardSize,
    y: Math.floor(cellNumber / boardSize),
  };
};