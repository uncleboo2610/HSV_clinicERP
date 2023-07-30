import React, { useContext, useEffect, useState } from 'react'
import { WebsocketContext } from '../contexts/WebSocketContext'
import { IReceivingCard } from './patients/models';

type MessagePayload = {
  content: string;
};

const HomePage = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<IReceivingCard[]>([]);
  const socket = useContext(WebsocketContext)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected!')
    })

    socket.on('onReceiving', (newMessage: IReceivingCard) => {
      console.log('onMessage event received!')
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    })

    return () => {
      socket.off('connect');
      socket.off('onReceiving');
      console.log('unregistering')
    }
  }, [])


  const onSubmit = () => {
    socket.emit('newReceiving', value);
    setValue('');
  };

  return (
    <div>
      <div>
        <h1>Websocket Component</h1>
        <div>
          {messages.length === 0 ? (
            <div>No Messages</div>
          ) : (
            <div>
              {messages.map((msg, i) => (
                <div key={i}>
                  <p>{msg.id}</p>
                  <p>{msg.patientName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage