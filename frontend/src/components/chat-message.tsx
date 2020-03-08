import React, { FC } from 'react';
import PropTypes from 'prop-types';

type ChatMessageProps = {
  message: string;
};

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  return <div>{message}</div>;
};

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
