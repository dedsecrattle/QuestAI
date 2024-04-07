import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {Button, Text, Stack} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown'

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
  const AlignedHeading = ({ node, ...props }) => (
      <h2 style={{ textAlign: 'center' }} {...props} />
  );

  const Table = ({ node, ...props }) => (
      <li style={{ textAlign: 'left' }} {...props} />
  );
  const AlignedParagraph = ({ node, ...props }) => (
      <p style={{ textAlign: 'left' }} {...props} />
  );

  return (
    <Stack direction={"column"} justifyContent={"center"} spacing={10}>
    <Text as={"b"} fontSize={'3xl'}> Learning Materials</Text>
    <Text>
        {data
            ? <ReactMarkdown  components={{
              h2: AlignedHeading,
              p: AlignedParagraph,
              li : Table
            }}>{data}</ReactMarkdown>
            : ("Error Occurred while Generating Data!")
        }
    </Text>
    <Button onClick={generateQuiz} size='lg'>Quiz</Button>
    <Text>{generatedQuiz}</Text>
    <Button onClick={navigateToHome} size='lg'>Back to Home Page</Button>
    </Stack>
  );
}

export default GenMaterial;