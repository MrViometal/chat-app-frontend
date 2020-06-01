import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className='textContainer'>
    {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <div className='activeContainer'>
          <h2>
            {/* {users.map(
              (user) => console.log({ user }),
              // (
              //   <div key={name} className='activeItem'>
              //     {name}
              //     <img alt='Online Icon' src={onlineIcon} />
              //   </div>
              // )
            )} */}
          </h2>
        </div>
      </div>
    ) : (
      'no users'
    )}
  </div>
);

export default TextContainer;
