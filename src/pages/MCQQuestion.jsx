import { useState } from 'react';
import { Box, Heading, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';

const MCQQuestion = ({ question, options, correctAnswer }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowAnswer(true);
    };

    return (
        <Box>
            <Heading size="md" mb={4}>
                {question}
            </Heading>
            <RadioGroup onChange={handleOptionClick} value={selectedOption}>
                <Stack spacing={3}>
                    {options.map((option, index) => (
                        <Radio
                            key={index}
                            value={option}
                            colorScheme={showAnswer && option === correctAnswer ? 'green' : 'gray'}
                            fontWeight={showAnswer && option === selectedOption ? 'bold' : 'normal'}
                        >
                            {option}
                        </Radio>
                    ))}
                </Stack>
            </RadioGroup>
            {showAnswer && (
                <Text mt={4} color="green.500">
                    Correct Answer: {correctAnswer}
                </Text>
            )}
        </Box>
    );
};

export default MCQQuestion;