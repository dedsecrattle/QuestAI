import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {Button, Text, Stack, Box} from '@chakra-ui/react';
import Markdown from 'react-markdown'

function GenMaterial() {
  const nagivate = useNavigate();
  const [generatedQuiz, setGeneratedQuiz] = useState(null);

  const navigateToHome = () => {
    nagivate("/");
  };
  const generateQuiz = () => {
    const quiz = location.state?.quiz;
    setGeneratedQuiz(quiz)
  }

    const location = useLocation();
    const data = location.state?.data;

  return (
    <Stack direction={"column"} justifyContent={"center"} spacing={10}>
    <Text as={"b"} fontSize={'3xl'}> Learning Materials</Text>
    <Box textAlign={"left"}>
        {data
            ? <Markdown>{data}</Markdown>
            : ("Error Occurred while Generating Data!")
        }
    </Box>
    <Button onClick={generateQuiz} size='lg'>Quiz</Button>
      {
        generatedQuiz
            ? (
                <Box textAlign={"left"}><Markdown>{generatedQuiz}</Markdown></Box>)
            : <Text> Click on the Quiz Button to See the Quiz</Text>
      }
    <Button onClick={navigateToHome} size='lg'>Back to Home Page</Button>
    </Stack>
  );
}

export default GenMaterial;