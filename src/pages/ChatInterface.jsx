import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Button, Text,Spinner } from '@chakra-ui/react';
import { getResponse } from '../backend/generate';
import Markdown from 'react-markdown';

function ChatInterface({ context }) {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome ! You can ask any question regarding the uploaded PDF' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      const userMessage = { id: Date.now(), text: newMessage, sender: 'user' };
      setMessages((currentMessages) => [...currentMessages, userMessage]);
      setNewMessage('');
      setIsLoading(true);

      try {
        const response = await getResponse(context, newMessage);
        const responseObject = { id: Date.now(), text: response, sender: 'system' };
        setMessages((currentMessages) => [...currentMessages, responseObject]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error sending message:', error);
        setIsLoading(false);
      }
    }
  };

  return (
    <Flex direction="column" h="100vh" bg="gray.100" p={6} boxSizing="border-box">
      <Box flexGrow={1} overflowY="auto">
        {messages.map((message) => (
          <Flex key={message.id} justify={message.sender === 'user' ? 'flex-end' : 'flex-start'} mb={4}>
            <Box bg={message.sender === 'user' ? 'blue.400' : 'white'} color={message.sender === 'user' ? 'white' : 'black'} p={4} pl={6} borderRadius="md" shadow="md" maxWidth="70%"
             textAlign={message.sender === 'user' ? 'right' : 'left'}>
              <Markdown>{message.text}</Markdown>
            </Box>
          </Flex>
        ))}
        {isLoading && (
          <Flex justify="center" mt={4}>
            <>
            <Spinner size="xl" marginRight={10} />
            <Text size="xl">Generating Response...</Text>
            </>

          </Flex>
        )}
      </Box>
      <form onSubmit={handleSubmit}>
        <Flex mt={4}>
          <Input placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} mr={2} />
          <Button colorScheme="blue" type="submit" disabled={isLoading}>
            Send
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default ChatInterface;