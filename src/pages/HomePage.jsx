import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Box,
    Flex,
    Input,
    Button,
    Text,
    Stack,
    MenuButton,
    Menu,
    MenuItem,
    MenuGroup,
    MenuDivider, MenuList
} from '@chakra-ui/react';
import {generateMaterial, generateQuiz, generateSummary} from "../backend/generate.js";
import { Spinner } from '@chakra-ui/react';
import pdfToText from "react-pdftotext";

function HomePage (){
    const [topic, setTopic] = useState('');
    const [subTopic, setSubTopic] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [file, setFile] = useState(null)
    const nagivate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [level, setlevel] = useState('Select the Level of Proficiency');

    const navigateToSummary = () => {
      nagivate("/pdfSummary");
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await  generateMaterial(topic, subTopic, level);
            const quiz = await generateQuiz(topic,subTopic, level);
            nagivate('/GenMaterial', { state: { data , quiz} });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    function extractText(event) {
        const file = event.target.files[0]
        setFile(file)
        pdfToText(file)
            .then(text => setExtractedText(text))
            .catch(error => console.error("Failed to extract text from pdf"))
    }

    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };

    const handleSubTopicChange = (e) => {
        setSubTopic(e.target.value);
    };


    const handleSelection = (value) => {
        setlevel(value);
    };


    const handlePdfSummarizationClick = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", file)
        console.log(file)
        alert(`File uploaded Successfully: ${file.name}`)
        console.log(extractedText)
        setIsLoading(true)
        let text = ""
        try {
            text = await generateSummary(extractedText);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
        nagivate("/pdfSummary", { state: {text, extractedText}});
    }
    return (
        <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            p={4}
            overflow="auto"
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
                <Stack direction={{ base: "column", md: "row" }} justifyContent={"center"} spacing={10}> 
                <Box
                    mr={2}
                    width={{ base: "100%", md: "500px" }}
                    height={{ base: "auto", md: "450px" }}
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
                        onChange={extractText}
                        />
                        <Button onClick={handlePdfSummarizationClick} size='lg'>Submit PDF</Button>
                    </Stack>
                </Box>
                <Box
                    mr={2}
                    width={["100%", "75%", "65%"]}
                    height="450px" 
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
                        <Menu>
                            <MenuButton as={Button} bg="gray.300" color="black" width="full">
                                {level}
                            </MenuButton>
                            <MenuList rootProps={{ width: "34%" }}>
                                <MenuItem value="HighSchool" onClick={() => handleSelection('Highschool')}>
                                    HighSchool
                                </MenuItem>
                                <MenuItem value="Undergraduate" onClick={() => handleSelection('Undergraduate')}>
                                    Undergraduate
                                </MenuItem>
                                <MenuItem value="Graduate" onClick={() => handleSelection('Graduate')}>
                                    Graduate
                                </MenuItem>
                            </MenuList>
                        </Menu>
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