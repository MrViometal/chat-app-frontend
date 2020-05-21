import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = (props) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';

  const { location } = props;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    console.log(socket);

    return () => {
      console.log('hi');
    };
  }, [ENDPOINT, location.search]);
  return <div>Chat</div>;
};

export default Chat;
