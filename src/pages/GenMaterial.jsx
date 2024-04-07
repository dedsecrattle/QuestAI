import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {Button, Text, Stack} from '@chakra-ui/react';

function GenMaterial() {
  const nagivate = useNavigate();
  const [generatedQuiz, setGeneratedQuiz] = useState('');

  const navigateToHome = () => {
    nagivate("/");
  };

  const generateQuiz = () => {
    const quiz = `Quiz to test on your understanding`;
    setGeneratedQuiz(quiz)
  }

    const location = useLocation();
    const data = location.state?.data;


  return (
    <Stack direction={"column"} justifyContent={"center"} spacing={10}>
    <Text as={"b"} fontSize={'3xl'}> Learning Materials</Text>
    <Text>
        {data}
    </Text>
    <Button onClick={generateQuiz} size='lg'>Quiz</Button>
    <Text>{generatedQuiz}</Text>
    <Button onClick={navigateToHome} size='lg'>Back to Home Page</Button>
    </Stack>
  );
}

export default GenMaterial;