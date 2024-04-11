import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Button, Text } from '@chakra-ui/react';
import { getResponse } from '../backend/generate';

function ChatInterface ({context}) {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Welcome ! You can ask any question regarding the uploaded PDF' },
      ]);
  const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     // Fetch chat messages from the API
//     const fetchMessages = async () => {
//       try {
//         const response = await getResponse(context, );
//         const data = await response.json();
//         setMessages(data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };
//     fetchMessages();
//   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      const userMessage = { id: Date.now(), text: newMessage, sender: 'user' };
      setMessages((currentMessages) => [...currentMessages, userMessage]);
      setNewMessage('');

      try {
        // Send the new message to the API
        const response = await getResponse(context, newMessage)
        console.log(response)
        const responseObject = { id: Date.now(), text: response, sender: 'system' }; 
        setMessages((currentMessages) => [...currentMessages, responseObject]);
        // setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <Flex
      direction="column"
      h="100vh"
      // w="100vw"
      bg="gray.100"
      p={6}
      boxSizing="border-box"
    >
      <Box flexGrow={1} overflowY="auto">
        {messages.map((message) => (
          <Flex
          key={message.id}
          justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
          mb={4}
          >
            <Box
              bg={message.sender === 'user' ? 'blue.400' : 'white'}
              color={message.sender === 'user' ? 'white' : 'black'}
              p={4}
              borderRadius="md"
              shadow="md"
              maxWidth="70%"
            >
              <Text textAlign={message.sender === 'user' ? 'right' : 'left'}>{message.text}</Text>
            </Box>
          </Flex>
        ))}
      </Box>
      <form onSubmit={handleSubmit}>
        <Flex mt={4}>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            mr={2}
          />
          <Button colorScheme="blue" type="submit">
            Send
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};


export default ChatInterface;