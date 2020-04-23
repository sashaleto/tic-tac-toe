import React from 'react';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import './app.css';
import Battlefield from '../../components/battlefield/battlefield.jsx';
import {BOARDSIZE, CellSymbols, GameStages, GameTurns} from "../../constants";
import {getCellCoords, mapToWinStage, toggleGameTurn} from "../../utils";

const App = ({cells, turn, gameStage, onCellClick}) => {
  let statusText = `Let's play!`;
  switch (gameStage) {
    case GameStages.PLAYING:
      statusText = `Waiting for ${turn}...`;
      break;
    case GameStages.NOUGHTS_WINS:
      statusText = `${GameTurns.NOUGHTS} wins! ${String.fromCodePoint(0x1F44F)}`;
      break;
    case GameStages.CROSSES_WINS:
      statusText = `${GameTurns.CROSSES} wins! ${String.fromCodePoint(0x1F44F)}`;
      break;
    case GameStages.DRAW:
      statusText = `It's a draw, so friendship won! ${String.fromCodePoint(0x1F44A)}`;
      break;
    default:
      break;
  }

  return (
    <section className="game-screen">
      <div className="game-screen__status-bar">{statusText}</div>
      <Battlefield cells={cells} turn={turn} onCellClick={onCellClick}/>
    </section>
  );
};

const isVictoryFound = (activeCellCoords, newCells, activeCell) => {
  const filterBy = (checkCoords) => {
    return function (cell, index) {
      const cellCoords = getCellCoords(index, BOARDSIZE);
      return checkCoords(cellCoords.x, cellCoords.y);
    }
  };

  const filterBySymbol = (cell) => {
    return cell.symbol === newCells[activeCell].symbol;
  };

  const currentRow = newCells.filter(filterBy((cellX, cellY) => cellY === activeCellCoords.y));
  const currentColumn = newCells.filter(filterBy((cellX) => cellX === activeCellCoords.x));
  const straightDiagonal = newCells.filter(filterBy((cellX, cellY) => cellX === cellY));
  const reverseDiagonal = newCells.filter(filterBy((cellX, cellY) =>  cellX === BOARDSIZE - cellY - 1));

  switch (true) {
    case currentRow.filter(filterBySymbol).length === BOARDSIZE:
      currentRow.forEach((cell) => cell.isVictorious = true);
      return true;
    case currentColumn.filter(filterBySymbol).length === BOARDSIZE:
      currentColumn.forEach((cell) => cell.isVictorious = true);
      return true;
    case straightDiagonal.filter(filterBySymbol).length === BOARDSIZE:
      straightDiagonal.forEach((cell) => cell.isVictorious = true);
      return true;
    case reverseDiagonal.filter(filterBySymbol).length === BOARDSIZE:
      reverseDiagonal.forEach((cell) => cell.isVictorious = true);
      return true;
    default:
      return false;
  }
};

const mapStateToProps = (state) => ({
  cells: state.cells,
  turn: state.turn,
  gameStage: state.gameStage,
});

const mapDispatchToProps = (dispatch) => ({
  onCellClick(activeCell, currentCells, currentTurn) {
    if (currentCells[activeCell].symbol !== CellSymbols.EMPTY) {
      return;
    }

    const newCells = currentCells.map(cell => ({...cell}));

    if (currentTurn === GameTurns.CROSSES) {
      newCells[activeCell].symbol = CellSymbols.CROSS;
    } else if (currentTurn === GameTurns.NOUGHTS) {
      newCells[activeCell].symbol = CellSymbols.NOUGHT;
    } else {
      return;
    }

    dispatch(ActionCreator.setCells(newCells));

    const activeCellCoords = getCellCoords(activeCell, BOARDSIZE);

    if (isVictoryFound(activeCellCoords, newCells, activeCell)) {
      dispatch(ActionCreator.setGameStage(mapToWinStage(currentTurn)));
      dispatch(ActionCreator.setTurn(GameTurns.NOBODYS));
    } else if (newCells.filter(cell => cell.symbol !== CellSymbols.EMPTY).length === newCells.length) {
      dispatch(ActionCreator.setGameStage(GameStages.DRAW));
      dispatch(ActionCreator.setTurn(GameTurns.NOBODYS));
    } else {
      dispatch(ActionCreator.setTurn(toggleGameTurn(currentTurn)));
    }
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
