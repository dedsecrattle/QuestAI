import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Box, Flex, Input, Button, Text, Stack} from '@chakra-ui/react';
import {generateMaterial} from "../backend/generate.js";

function HomePage (){
    const [topic, setTopic] = useState('');
    const [subTopic, setSubTopic] = useState('');
    // const [generatedInfo, setGeneratedInfo] = useState('');
    // const [generatedSummary, setGeneratedSummary] = useState('');
    const [file, setFile] = useState('')
    const nagivate = useNavigate();

    const navigateToSummary = () => {
      nagivate("/pdfSummary");
    };

    const handleGenerate = async (e) => {
        e.preventDefault();

        try {
            const data = await  generateMaterial(topic, subTopic);
            nagivate('/GenMaterial', { state: { data } });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };

    const handleSubTopicChange = (e) => {
        setSubTopic(e.target.value);
    };

    // const generateInformation = () => {
    //     // Here, you can implement your logic to generate the information
    //     // based on the topic and sub-topic inputs
    //     const info = `Information for ${topic} - ${subTopic}`;
    //     setGeneratedInfo(info);
    // };

    // const generateSummary = () => {
    //     const summary = `Detailed summary of the PDF uploaded:`
    //     setGeneratedSummary(summary);
    // };



    const handlePdfSummarizationClick = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", file)
        console.log(file) 
        //when no error in uploading and appending the file to form data, alert generated
        alert(`File uploaded Successfully: ${file.name}`) 
        // generateSummary()
        navigateToSummary()
    }
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
            {/* <Text>{generatedInfo}</Text>
            <Text>{generatedSummary}</Text> */}
        </Box>
        </Box>
    );
}

export default HomePage;