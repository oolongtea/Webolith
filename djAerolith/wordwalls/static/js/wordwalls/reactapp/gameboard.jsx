import React from 'react';
import Immutable from 'immutable';

import WordwallsQuestion from './wordwalls_question';
import Solutions from './solutions';

class GameBoard extends React.Component {
  getQuestionStyle() {
    const qStyle = this.props.displayStyle.tc;
    qStyle.showBorders = this.props.displayStyle.bc.showBorders;
    return qStyle;
  }

  render() {
    const questions = [];
    const questionDisplayStyle = this.getQuestionStyle();
    // xSize and ySize are the size that each question object takes
    // up.
    const xSize = this.props.width / this.props.gridWidth;
    const ySize = this.props.height / this.props.gridHeight;
    // curQuestions is an Immutable List of Maps
    this.props.curQuestions.forEach((question, idx) => {
      // Calculate top left X, Y based on dimensions.
      const gridX = (idx % this.props.gridWidth) * xSize;
      const gridY = Math.floor(idx / this.props.gridWidth) * ySize;
      if (idx >= this.props.gridWidth * this.props.gridHeight) {
        return;
      }
      // Only push questions that will fit on the game board.
      questions.push(
        <WordwallsQuestion
          displayStyle={questionDisplayStyle}
          letters={question.get('displayedAs')}
          key={idx}
          qNumber={idx}
          words={question.get('wMap')}
          gridX={gridX}
          gridY={gridY}
          ySize={ySize}
          xSize={xSize}
          onShuffle={this.props.onShuffle}
        />);
    });

    if (this.props.gameGoing || this.props.numberOfRounds === 0) {
      return (
        // Prevent default on mouse down to prevent taking focus in
        // case of misclick.
        <svg
          className="gameboard"
          onMouseDown={(e) => { e.preventDefault(); }}
          width={this.props.width}
          height={this.props.height}
        >
          {questions}
        </svg>
      );
    }

    return (
      <Solutions
        questions={this.props.origQuestions}
        answeredByMe={this.props.answeredByMe}
        totalWords={this.props.totalWords}
        height={this.props.height}
        markMissed={this.props.markMissed}
        showLexiconSymbols={!this.props.displayStyle.bc.hideLexiconSymbols}
      />
    );
  }
}

GameBoard.defaultProps = {
  width: 720,
  height: 390,
  gridWidth: 4,
  gridHeight: 13,
};

GameBoard.propTypes = {
  numberOfRounds: React.PropTypes.number,
  curQuestions: React.PropTypes.instanceOf(Immutable.List),
  origQuestions: React.PropTypes.instanceOf(Immutable.OrderedMap),
  displayStyle: React.PropTypes.shape({
    tc: React.PropTypes.object,
    bc: React.PropTypes.object,
  }),
  totalWords: React.PropTypes.number,
  answeredByMe: React.PropTypes.arrayOf(
    React.PropTypes.instanceOf(Immutable.Map)),
  onShuffle: React.PropTypes.func,
  gameGoing: React.PropTypes.bool,
  markMissed: React.PropTypes.func,

  width: React.PropTypes.number,
  height: React.PropTypes.number,
  gridWidth: React.PropTypes.number,
  gridHeight: React.PropTypes.number,
};

export default GameBoard;
