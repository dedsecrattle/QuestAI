import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {Box, Flex, Input, Button, Text, Stack} from '@chakra-ui/react';

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
    //quiz content
    setGeneratedQuiz(quiz)
  }


  return (
    <Stack direction={"column"} justifyContent={"center"} spacing={10}>
    <Text as={"b"} fontSize={'3xl'}>Summary of PDF Uploaded</Text>
    <Text>{text}</Text>
    {/* Generated Content should be here */}
    <Button onClick={generateQuiz} size='lg'>Quiz</Button>
    <Text>{generatedQuiz}</Text>
    <Button onClick={navigateToHome} size='lg'>Back to Home Page</Button>
    </Stack>
  );
}

export default Summary;