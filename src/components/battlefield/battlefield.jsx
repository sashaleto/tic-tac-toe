import React from "react";
import {CellSymbols} from "../../constants";
import PropTypes from "prop-types";

const makeCellTemplate = (cellName, isVictorious, id, onCellClick) => {
  return (
    <div
      key={id}
      onClick={onCellClick}
      className={`battlefield__cell battlefield__cell--${cellName} ${isVictorious ? `battlefield__cell--victory` : ``}`}>
      <svg width="50" height="50">
        <use xlinkHref={`#${cellName}`}/>
      </svg>
    </div>
  );
};

const Battlefield = ({cells, turn, onCellClick}) => {

  return (
      <div className="game-screen__battlefield battlefield">
        {
          cells.map((cell, i) => {
            const newCellClick = () => {onCellClick(i, cells, turn)};
            switch (cell.symbol) {
              case CellSymbols.CROSS:
                return makeCellTemplate(`cross`, cell.isVictorious, i, newCellClick);
              case CellSymbols.NOUGHT:
                return makeCellTemplate(`nought`, cell.isVictorious, i, newCellClick);
              case CellSymbols.EMPTY:
              default:
                return <div key={i} onClick={newCellClick} className="battlefield__cell"/>;
            }
          })
        }
      </div>
  );
};

Battlefield.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      isVictorious: PropTypes.bool.isRequired
    })),
  turn: PropTypes.string.isRequired,
  onCellClick: PropTypes.func.isRequired,
};

export default Battlefield;
