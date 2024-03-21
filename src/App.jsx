import { useState } from 'react';
import {Box, Flex, Input, Button, Text, Stack} from '@chakra-ui/react';

const App = () => {
    const [topic, setTopic] = useState('');
    const [subTopic, setSubTopic] = useState('');
    const [generatedInfo, setGeneratedInfo] = useState('');

    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };

    const handleSubTopicChange = (e) => {
        setSubTopic(e.target.value);
    };

    const generateInformation = () => {
        // Here, you can implement your logic to generate the information
        // based on the topic and sub-topic inputs
        const info = `Information for ${topic} - ${subTopic}`;
        setGeneratedInfo(info);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            p={4}
        >
        <Box p={4}
        >
            <Flex mb={4}>
                <Stack direction={"column"} justifyContent={"center"} spacing={10}>
                    <Text as={"b"} fontSize={'3xl'}> QuestAI - Your Buddy in Learning New topics using AI</Text>
                <Input
                    placeholder="Enter Topic"
                    value={topic}
                    onChange={handleTopicChange}
                    mr={2}
                />
                <Input
                    placeholder="Enter Sub-Topic"
                    value={subTopic}
                    onChange={handleSubTopicChange}
                    mr={2}
                />
                <Button onClick={generateInformation} size='lg'>Generate</Button>
                </Stack>
            </Flex>
            <Text>{generatedInfo}</Text>
        </Box>
        </Box>
    );
};

export default App;