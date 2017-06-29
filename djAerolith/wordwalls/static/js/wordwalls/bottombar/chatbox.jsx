import React from 'react';
import Message from './message';

const ChatBox = (props) => {
  const messageNodes = props.messages.map(message =>
    <Message
      author={message.author}
      key={message.id}
      type={message.type}
    >{message.content}</Message>);
  return (
    <div
      className="panel panel-default"
      style={{ marginBottom: '2px' }}
    >
      <div
        className="panel-body"
        style={{
          height: props.height || 100,
          overflow: 'auto',
        }}
        ref={(domNode) => {
          if (domNode === null) {
            return;
          }
          domNode.scrollTop = domNode.scrollHeight; // eslint-disable-line no-param-reassign
        }}
      >{messageNodes}</div>
    </div>
  );
};

ChatBox.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.shape({
    author: React.PropTypes.string,
    id: React.PropTypes.string,
    content: React.PropTypes.string,
    type: React.PropTypes.string,
  })),
  height: React.PropTypes.number,
};

export default ChatBox;
