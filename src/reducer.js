import {CellSymbols, GameTurns, GameStages} from "./constants";

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const initialState = {
  cells: Array(9).fill(null).map(() => ({symbol: CellSymbols.EMPTY, isVictorious: false})),
  turn: GameTurns.CROSSES,
  gameStage: GameStages.PLAYING,
};

const ActionType = {
  SET_CELLS: `SET_CELLS`,
  SET_TURN: `SET_TURN`,
  SET_GAME_STAGE: `SET_GAME_STAGE`,
};

const ActionCreator = {
  setCells: (cells) => ({
    type: ActionType.SET_CELLS,
    payload: cells,
  }),
  setTurn: (turn) => ({
    type: ActionType.SET_TURN,
    payload: turn,
  }),
  setGameStage: (stage) => ({
    type: ActionType.SET_GAME_STAGE,
    payload: stage,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CELLS:
      return extend(state, {
        cells: action.payload,
      });

    case ActionType.SET_TURN:
      return extend(state, {
        turn: action.payload,
      });

    case ActionType.SET_GAME_STAGE:
      return extend(state, {
        gameStage: action.payload,
      });
    default:
      return state;
  }
};


export {reducer, ActionType, ActionCreator};
