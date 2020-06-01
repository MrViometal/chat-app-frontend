import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = (props) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const ENDPOINT = 'localhost:5000';

  const { location } = props;

  //watching changes for user, room, and Port

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  //watching changes for new message coming
  useEffect(() => {
    socket.on('message', (newMessage) => {
      setMessages((messages) => [...messages, newMessage]);
    });
    socket.on('roomData', ({ users }) => {
      console.log({ users });

      setUsers((user) => [...users, user]);
    });
  }, []);

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

        <Messages messages={messages} name={name} />

        <Input msg={msg} setMsg={setMsg} sendMessage={sendMessage} />
      </div>
      {/* <TextContainer users={users} /> */}
    </div>
  );
};

export default Chat;
