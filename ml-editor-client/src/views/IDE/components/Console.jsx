import React, { useEffect } from 'react';
import { listen } from '../../../utils/Message';

export default function Console() {
  const handleMessageEvent = (data) => {
    const { source, messages } = data;
    if (source === 'sketch' && Array.isArray(messages)) {
      console.log(messages)
    }
  };

  useEffect(() => {
    const unsubscribe = listen(handleMessageEvent);
    return function cleanup() {
      unsubscribe();
    };
  });

  return (
    <></>
  )
}