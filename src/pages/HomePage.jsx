import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Box, Flex, Input, Button, Text, Stack} from '@chakra-ui/react';
import {generateMaterial, generateQuiz, generateSummary} from "../backend/generate.js";
import { Spinner } from '@chakra-ui/react';
import pdfToText from 'react-pdftotext'

function HomePage (){
    const [topic, setTopic] = useState('');
    const [subTopic, setSubTopic] = useState('');
    // const [generatedInfo, setGeneratedInfo] = useState('');
    // const [generatedSummary, setGeneratedSummary] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [file, setFile] = useState('')
    const nagivate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const navigateToSummary = () => {
      nagivate("/pdfSummary");
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await  generateMaterial(topic, subTopic);
            const quiz = await generateQuiz(topic,subTopic);
            nagivate('/GenMaterial', { state: { data , quiz} });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };

    const handleSubTopicChange = (e) => {
        setSubTopic(e.target.value);
    };

    const handlePdfSummarizationClick = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", file)
        console.log(file)
        alert(`File uploaded Successfully: ${file.name}`)
        pdfToText(file)
        .then(text => setExtractedText(text))
        .catch(error => console.error("Failed to extract text from pdf"))
        setIsLoading(true)

        try {
            const text = await  generateSummary(extractedText);
            nagivate("/pdfSummary", { state: {text} });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            p={4}
        >
            {isLoading ? (
                <>
                <Spinner size="xl" />
                <Text as={"b"} fontSize={'3xl'} padding={10}> Hold ON! While we generate the Information for you!</Text>
                </>
            ) : (
        <Box p={4}
        >
            <Flex mb={4}>
                <Stack direction={"column"} justifyContent={"center"} spacing={10}>
                    <Text as={"b"} fontSize={'3xl'}> QuestAI - Your Buddy in Learning New topics using AI</Text>
                <Stack direction={"row"} justifyContent={"center"} spacing={10}> 
                <Box
                    mr={2}
                    width="500px"
                    height="350px"
                    border="1px solid grey" 
                    borderRadius="10px"
                    padding="20px"
                >
                    <Stack direction={"column"} justifyContent={"center"} spacing={30}>
                        <Text as={"b"} fontSize={'2xl'}>PDF Summarization </Text>
                        <Input
                        type="file"
                        accept="application/pdf"
                        required
                        onChange={(e) => setFile(e.target.files[0])} //accept only the first file
                        />
                        <Button onClick={handlePdfSummarizationClick} size='lg'>Submit PDF</Button>
                    </Stack>
                </Box>
                <Box
                    mr={2}
                    width="65%" 
                    height="350px" 
                    border="1px solid grey" 
                    borderRadius="10px"
                    padding="20px"
                >
                    <Stack direction={"column"} justifyContent={"center"} spacing={10}>
                        <Text as={"b"} fontSize={'2xl'}>Learning material generation</Text>
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
                        <Button onClick={handleGenerate} size='lg'>Generate</Button>
                    </Stack>
                </Box>
                </Stack>
                </Stack>
            </Flex>
            {/* <Text>{extractedText}</Text> */}
            {/* <Text>{generatedSummary}</Text> */}
        </Box>
                )}
        </Box>
    );
}

export default HomePage;