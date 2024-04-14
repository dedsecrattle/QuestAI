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
    const facts = [
        "The Earth is the only planet in our solar system with liquid water on its surface.",
        "The Mariana Trench is the deepest part of the world's oceans, reaching a maximum depth of approximately 10,994 meters (36,070 feet).",
        "The Great Barrier Reef in Australia is the world's largest coral reef system, stretching over 2,300 kilometers (1,430 miles).",
        "The Sahara Desert in North Africa is the largest hot desert in the world, covering an area of about 3.6 million square miles.",
        "Mount Everest, located on the border of Nepal and Tibet, is the highest mountain in the world, with a peak elevation of 29,032 feet (8,849 meters).",
        "The Amazon rainforest in South America is the largest tropical rainforest in the world, covering an area of about 2.1 million square miles.",
        "The Nile River is the longest river in the world, extending approximately 6,650 kilometers (4,130 miles) from its source in Burundi to the Mediterranean Sea.",
        "The Pacific Ocean is the largest ocean in the world, covering an area of approximately 63 million square miles.",
        "The Mona Lisa, painted by Leonardo da Vinci, is considered one of the most famous works of art in the world.",
        "The Great Wall of China is the longest man-made structure in the world, stretching approximately 13,171 miles (21,196 kilometers) across multiple provinces in China.",
        "The Eiffel Tower in Paris, France is one of the most iconic landmarks in the world, standing at a height of 1,063 feet (324 meters).",
        "The Statue of Liberty in New York Harbor is a symbol of freedom and democracy, standing 151 feet (46 meters) tall.",
        "The Taj Mahal in Agra, India is a UNESCO World Heritage Site and one of the most famous and beautiful buildings in the world.",
        "The Dead Sea, located between Israel and Jordan, is the lowest point on Earth at 430.5 meters (1,412 feet) below sea level.",
        "The Grand Canyon in Arizona, USA is a natural wonder of the world, stretching 277 miles (446 kilometers) long and up to 18 miles (29 kilometers) wide.",
        "The Colosseum in Rome, Italy is one of the most iconic ancient structures in the world, built in the 1st century AD.",
        "The Pyramids of Giza in Egypt are the oldest and largest of the three pyramids in the Giza pyramid complex, built around 2560-2540 BC.",
        "The Great Sphinx of Giza in Egypt is a colossal statue with the head of a human and the body of a lion, believed to have been built around 2500 BC.",
        "The Leaning Tower of Pisa in Italy is a freestanding bell tower that leans at an angle of about 3.99 degrees, built between 1173 and 1372.",
        "The Acropolis of Athens in Greece is an ancient citadel that contains some of the most famous ancient Greek buildings, including the Parthenon, built in the 5th century BC.",
        "The Forbidden City in Beijing, China is a palace complex that was the former imperial palace and home to the Chinese emperors from 1420 to 1912.",
        "The Machu Picchu in Peru is an Inca citadel set high in the Andes Mountains, built in the 15th century and later abandoned.",
        "The Angkor Wat in Cambodia is the largest religious monument in the world, originally built as a Hindu temple in the early 12th century.",
        "The Northern Lights, also known as the Aurora Borealis, are a natural light display in the sky caused by the collision of charged particles from the sun and the Earth's atmosphere.",
        "The Great Barrier Reef in Australia is the largest living organism on Earth, visible from outer space."
      ]
    const isGenerateButtonDisabled = level === 'Select the Level of Proficiency';
    const navigateToSummary = () => {
      nagivate("/pdfSummary");
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (isGenerateButtonDisabled) {
            alert('Please select a level of proficiency.');
            return;
        } 
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

    function getRandomFact() {
        const randomIndex = Math.floor(Math.random() * facts.length);
        return facts[randomIndex];
    }

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
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={10}>
                    <Box>
                        <Spinner size="xl" />
                        <Text as="b" fontSize="3xl" p={10}>
                        Hold ON! While we generate the Information for you!
                        </Text>
                    </Box>
                    <Box>
                        <Text as="b" fontSize="2xl">{getRandomFact()}</Text>
                    </Box>
            </Box>
                </>
            ) : (
        <Box p={4} 
        >
            <Flex mb={4}>
                <Stack direction={"column"} justifyContent={"center"} spacing={15}>
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
                        <Button onClick={handleGenerate} size='lg' isDisabled={isGenerateButtonDisabled}>Generate</Button>
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