import React from 'react';
import Immutable from 'immutable';

import GameInactiveArea from './game_inactive_area';
import Styling from './style';
import SVGBoard from './svg_board';
import BuildBoard from './build_board';

const GameArea = (props) => {
  if (props.gameGoing) {
    if (props.isBuild) {
      return (
        <BuildBoard
          onShuffle={props.onShuffle}
          answerers={props.answerers}
          displayStyle={props.displayStyle}
          width={props.width}
          questions={props.curQuestions}
          origQuestions={props.origQuestions}
        />
      );
    }
    return (
      <SVGBoard
        onShuffle={props.onShuffle}
        displayStyle={props.displayStyle}
        width={props.width}
        height={props.height}
        gridWidth={props.gridWidth}
        gridHeight={props.gridHeight}
        questions={props.curQuestions}
      />
    );
  }

  return (
    <GameInactiveArea
      questions={props.origQuestions}
      numCorrect={props.numCorrect}
      totalWords={props.totalWords}
      height={props.height}
      markMissed={props.markMissed}
      showLexiconSymbols={!props.displayStyle.hideLexiconSymbols}
      isChallenge={props.isChallenge}
      challengeData={props.challengeData}
      numberOfRounds={props.numberOfRounds}
      resetTableCreator={props.resetTableCreator}
      tableCreatorModalSelector={props.tableCreatorModalSelector}
      listName={props.listName}
    />
  );
};

GameArea.propTypes = {
  numberOfRounds: React.PropTypes.number,
  curQuestions: React.PropTypes.instanceOf(Immutable.List),
  origQuestions: React.PropTypes.instanceOf(Immutable.OrderedMap),
  displayStyle: React.PropTypes.instanceOf(Styling),
  totalWords: React.PropTypes.number,
  numCorrect: React.PropTypes.number,
  onShuffle: React.PropTypes.func,
  gameGoing: React.PropTypes.bool,
  markMissed: React.PropTypes.func,
  answerers: React.PropTypes.instanceOf(Immutable.Map),

  challengeData: React.PropTypes.shape({
    entries: React.PropTypes.array,
    maxScore: React.PropTypes.number,
  }),
  isChallenge: React.PropTypes.bool,
  isBuild: React.PropTypes.bool,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  gridWidth: React.PropTypes.number,
  gridHeight: React.PropTypes.number,
  resetTableCreator: React.PropTypes.func,
  tableCreatorModalSelector: React.PropTypes.string,
  listName: React.PropTypes.string,
};

export default GameArea;
