import React, { FC } from 'react';
import PropTypes from 'prop-types';

type ChatMessageListProps = {
  messageList: string[];
};

export const ChatMessageList: FC<ChatMessageListProps> = ({ messageList }) => {
  return (
    <ul>
      {messageList.map(message => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
};

ChatMessageList.propTypes = {
  messageList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
