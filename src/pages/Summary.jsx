import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {Button, Text, Stack, Box} from '@chakra-ui/react';
import Markdown from "react-markdown";

function Summary() {
  const nagivate = useNavigate();
  const [generatedQuiz, setGeneratedQuiz] = useState('');
  const location = useLocation();
  const text = location.state?.text;

  const navigateToHome = () => {
    nagivate("/");
  };

  const generateQuiz = () => {
    const quiz = `Quiz to test on your understanding`;
    setGeneratedQuiz(quiz)
  }

  return (
    <Stack direction={"column"} justifyContent={"center"} spacing={10}>
    <Text as={"b"} fontSize={'3xl'}>Summary of PDF Uploaded</Text>
      <Box textAlign={"left"}>
      <Markdown>{text}</Markdown>
      </Box>
    <Button onClick={generateQuiz} size='lg'>Quiz</Button>
    <Text>{generatedQuiz}</Text>
    <Button onClick={navigateToHome} size='lg'>Back to Home Page</Button>
    </Stack>
  );
}

export default Summary;