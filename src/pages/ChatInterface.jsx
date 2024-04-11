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
      try {
        // Send the new message to the API
        const response = await getResponse(context, newMessage)
        console.log(response)
        setMessages([...messages, response]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <Flex
      direction="column"
      h="100vh"
      w="100vw"
      bg="gray.100"
      p={6}
      boxSizing="border-box"
    >
      <Box flexGrow={1} overflowY="auto">
        {messages.map((message, index) => (
          <Box
            key={index}
            bg="white"
            p={4}
            borderRadius="md"
            shadow="md"
            mb={4}
          >
            <Text>{message.text}</Text>
          </Box>
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