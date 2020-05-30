import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';

let socket;

const Chat = (props) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'localhost:5000';

  const { location } = props;

  //watching changes for user, room, and Port
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {});

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  //watching changes for new message coming
  useEffect(() => {
    socket.on('message', (newMessage) => {
      setMessages([...messages, newMessage]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (msg) {
      socket.emit('sendMessage', msg, () => setMsg(''));
    }
  };

  console.log({ msg, messages });

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />

        {/* <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
        /> */}
      </div>
    </div>
  );
};

export default Chat;
