import { useState } from 'react';
import {Box, Button, Flex, Heading,  Spacer, Text, VStack} from '@chakra-ui/react';

const extractQuestionsAndAnswers = (quizContent) => {
    // Split the quiz content into individual documents
    // Initialize the lists for questions and answers
    var index_tracker = 0;
    const questions = [];
    const options = [];
    const explanations = [];

    // Iterate through the documents and extract the questions and answers
    for(let i = 0; i <10; i++){
        // Extract the question
        const questionStart = quizContent.indexOf('<question>',index_tracker) + 10;
        const questionEnd = quizContent.indexOf('</question>',index_tracker);
        const question = quizContent.substring(questionStart, questionEnd);
        //quizContent = quizContent.substring(questionEnd + 10);
        index_tracker = questionEnd + 11 ;
        questions.push(question);

        // Extract the answer
        const options_mcq = []
        for (let j = 0; j < 4; j++){
            const answerStart = quizContent.indexOf('<option>',index_tracker) + 8;
            const answerEnd = quizContent.indexOf('</option>',index_tracker);
            const option = quizContent.substring(answerStart, answerEnd);
            //quizContent = quizContent.substring(questionEnd);
            index_tracker = answerEnd + 9 ;
            options_mcq.push(option)
        }
        options.push(options_mcq);

        const explanationStart = quizContent.indexOf('<explanation>',index_tracker) + 13;
        const explanationEnd = quizContent.indexOf('</explanation>',index_tracker);
        const explanation = quizContent.substring(explanationStart, explanationEnd);
        index_tracker = explanationEnd + 14;
        explanations.push(explanation);

    }
    const answersStart = quizContent.indexOf('<answers>',index_tracker) + 9;
    const answersEnd = quizContent.indexOf('</answers>',index_tracker);
    const answer_str = quizContent.substring(answersStart, answersEnd);
    const answers = answer_str.split(",");


    return { questions, options, explanations, answers };
};
const MCQQuestion = ({quizContent}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [explanation, setExplanation] = useState('');

    const {questions,options,explanations, answers} = extractQuestionsAndAnswers(quizContent);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setExplanation('');
    };
    const handleAnswerSelect = (option) => {
        setSelectedAnswer(option);
        const correctAnswer = answers[currentQuestionIndex];
        setIsCorrect(option[0] === correctAnswer);
        setExplanation(explanations[currentQuestionIndex]); // Explanation is the second item in the inner list
    };

    return (
        <Box p={10} borderWidth={1} borderRadius={8} boxShadow="lg">
            <VStack spacing={6} align="start">
                <Heading size="xl">Quiz</Heading>
                <Box>
                    <Heading size="md" mb={4}>{questions[currentQuestionIndex]}</Heading>
                    <VStack spacing={4} align="start">
                        {options[currentQuestionIndex].map((option, index) => (
                            <Button
                                key={index}
                                variant={selectedAnswer === option ? (isCorrect ? 'solid' : 'outline') : 'ghost'}
                                colorScheme={selectedAnswer === option ? (isCorrect ? 'green' : 'red') : 'gray'}
                                onClick={() => handleAnswerSelect(option)}
                            >
                                 {option}
                            </Button>
                        ))}
                    </VStack>
                </Box>
                {isCorrect !== null && (
                    <Box>
                        <Flex align="center">
                            <Text fontSize="lg" fontWeight="bold" color={isCorrect ? 'green.500' : 'red.500'}>
                                {isCorrect ? 'Correct!' : 'Incorrect.'}
                            </Text>
                            <Spacer/>
                            <Text fontSize="md">{explanation}</Text>
                        </Flex>
                    </Box>
                )}
                {currentQuestionIndex < questions.length - 1 && (
                    <Button colorScheme="blue" onClick={handleNextQuestion}>
                        Next Question
                    </Button>
                )}
            </VStack>
        </Box>
    );
}

export default MCQQuestion;