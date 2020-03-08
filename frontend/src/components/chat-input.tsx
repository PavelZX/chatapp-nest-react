import React, { FC } from 'react';
import PropTypes from 'prop-types';

type ChatInputProps = {
  sendMessage: (input: string) => void;
  messageInput: string;
  setMessageInput: (input: string) => void;
};

export const ChatInput: FC<ChatInputProps> = ({
  sendMessage,
  messageInput,
  setMessageInput,
}) => {
  return (
    <div>
      <input
        type="text"
        value={messageInput}
        onChange={e => setMessageInput(e.target.value)}
      />
      <button onClick={() => sendMessage(messageInput)}>Send</button>
    </div>
  );
};

ChatInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  messageInput: PropTypes.string.isRequired,
  setMessageInput: PropTypes.func.isRequired,
};
