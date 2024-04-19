import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {Button, Text, Stack, Box} from '@chakra-ui/react';
import Markdown from 'react-markdown'
import MCQQuestion from "./MCQQuestion.jsx";

function GenMaterial() {
  const nagivate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
 const WarningMessage = `**Warning: Potential Harmful Content Detected**

  This system is designed to prevent the generation of harmful, unethical, or illegal content. We've detected that the content you are attempting to create may fall into one of these categories. The creation and distribution of harmful content is strictly prohibited. This includes (but is not limited to) content that:
  
  - Promotes violence, hatred, or discrimination against individuals or groups
  - Encourages self-harm or suicide
  - Contains explicit sexual or violent imagery without proper warning/context
  - Infringes on copyrights or violates other intellectual property rights
  - Spreads disinformation, conspiracy theories, or other falsehoods
  - Reveals sensitive personal information without consent
  
  If you believe this detection is in error, please contact the system administrator. Otherwise, we ask that you refrain from generating this type of content, as it goes against our ethical standards and community guidelines.
  
  Thank you for your understanding.`

  const navigateToHome = () => {
    nagivate("/");
  };
  const generateQuiz = () => {
    const quiz = location.state?.quiz;
    setGeneratedQuiz(quiz);
    setShowQuiz(true);
  }

    const location = useLocation();
    const data = location.state?.data;

  return (
    <Stack direction={"column"} justifyContent={"center"} spacing={10}>
    <Text as={"b"} fontSize={'3xl'}> Learning Materials</Text>
    <Box textAlign={"left"}>
        {data
            ? <Markdown>{data}</Markdown>
            : <Markdown>{"**Warning: Potential Harmful Content Detected**This system prohibits the creation and distribution of harmful content, including material that promotes violence, hatred, self-harm, copyright infringement, disinformation, or the unconsented release of sensitive information. If you believe the detection is in error, contact the administrator. Otherwise, please refrain from generating this type of content, as it violates our ethical standards."}</Markdown>
        }
    </Box>
    <Button onClick={generateQuiz} size='lg'>Quiz</Button>
      {showQuiz && <MCQQuestion quizContent={generatedQuiz} />}
    <Button onClick={navigateToHome} size='lg'>Back to Home Page</Button>
    </Stack>
  );
}

export default GenMaterial;