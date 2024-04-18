import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {Button, Text, Stack, Box} from '@chakra-ui/react';
import Markdown from 'react-markdown'
import MCQQuestion from "./MCQQuestion.jsx";
const DemoQuizContent = `
<question>What is the main purpose of an autoencoder?</question>
<option>A. To generate new data similar to the training data.</option> <option>B. To classify data into different categories.</option> <option>C. To predict future values based on past data.</option> <option>D. To translate languages.</option> <explanation>Autoencoders are a type of neural network that learns to compress and then reconstruct its input data. This compressed representation can then be used to generate new data that is similar to the training data.</explanation>

<question>What are the two main components of an autoencoder?</question>
<option>A. Encoder and decoder</option> <option>B. Input and output layer</option> <option>C. Convolutional and pooling layers</option> <option>D. Hidden and output layer</option> <explanation>The encoder compresses the input data into a lower-dimensional representation, while the decoder reconstructs the data from this compressed representation.</explanation>

<question>What is the bottleneck layer in an autoencoder?</question>
<option>A. The first layer of the encoder</option> <option>B. The last layer of the decoder</option> <option>C. The layer with the smallest number of neurons</option> <option>D. The layer with the largest number of neurons</option> <explanation>The bottleneck layer is the layer in the autoencoder that has the smallest number of neurons. This forces the autoencoder to learn a more efficient representation of the data.</explanation>

<question>What are the different types of autoencoders?</question>
<option>A. Variational autoencoders (VAEs) and denoising autoencoders</option> <option>B. Convolutional autoencoders (CAEs) and stacked autoencoders</option> <option>C. Sparse autoencoders and contractive autoencoders</option> <option>D. All of the above</option> <explanation>There are many different types of autoencoders, each with its own strengths and weaknesses. Some common types include VAEs, CAEs, stacked autoencoders, sparse autoencoders, and contractive autoencoders.</explanation>

<question>What are some applications of autoencoders?</question>
<option>A. Image denoising and compression</option> <option>B. Anomaly detection and outlier identification</option> <option>C. Feature extraction and dimensionality reduction</option> <option>D. All of the above</option> <explanation>Autoencoders have a wide range of applications, including image denoising and compression, anomaly detection and outlier identification, feature extraction and dimensionality reduction, and many others.</explanation>

<question>What are the limitations of autoencoders?</question>
<option>A. They can be computationally expensive to train.</option> <option>B. They can be sensitive to the choice of hyperparameters.</option> <option>C. They may not always learn a meaningful representation of the data.</option> <option>D. All of the above</option> <explanation>Autoencoders have some limitations, such as being computationally expensive to train, sensitive to the choice of hyperparameters, and not always learning a meaningful representation of the data.</explanation>

<question>How can the performance of an autoencoder be evaluated?</question>
<option>A. By comparing the reconstructed data to the original data.</option> <option>B. By using metrics such as mean squared error (MSE) or peak signal-to-noise ratio (PSNR).</option> <option>C. By evaluating the performance of the autoencoder on downstream tasks.</option> <option>D. All of the above</option> <explanation>The performance of an autoencoder can be evaluated in a number of ways, including by comparing the reconstructed data to the original data, using metrics such as MSE or PSNR, and evaluating the performance of the autoencoder on downstream tasks.</explanation>

<question>How can the bottleneck layer in an autoencoder be used for feature extraction?</question>
<option>A. By training the autoencoder to reconstruct the input data as accurately as possible.</option> <option>B. By training the autoencoder to learn a compressed representation of the data that captures the most important features.</option> <option>C. By using the output of the bottleneck layer as input to another machine learning model.</option> <option>D. All of the above</option> <explanation>The bottleneck layer in an autoencoder can be used for feature extraction by training the autoencoder to learn a compressed representation of the data that captures the most important features. The output of the bottleneck layer can then be used as input to another machine learning model.</explanation>

<question>How can autoencoders be used for anomaly detection?</question>
<option>A. By training the autoencoder to reconstruct normal data as accurately as possible.</option> <option>B. By identifying data points that the autoencoder cannot reconstruct well as anomalies.</option> <option>C. By using the output of the bottleneck layer to train a separate anomaly detection model.</option> <option>D. All of the above</option> <explanation>Autoencoders can be used for anomaly detection by training the autoencoder to reconstruct normal data as accurately as possible. Data points that the autoencoder cannot reconstruct well are then identified as anomalies. Additionally, the output of the bottleneck layer can be used to train a separate anomaly detection model.</explanation>

<question>What are some future research directions for autoencoders?</question>
<option>A. Developing more efficient and scalable autoencoder architectures.</option> <option>B. Exploring new applications for autoencoders in different domains.</option> <option>C. Investigating the theoretical properties of autoencoders and their ability to learn meaningful representations.</option> <option>D. All of the above</option> <explanation>There are many exciting future research directions for autoencoders, including developing more efficient and scalable autoencoder architectures, exploring new applications for autoencoders in different domains, and investigating the theoretical properties of autoencoders and their ability to learn meaningful representations.</explanation>

<answers>A,B,C,D,D,D,D,D,D,D</answers>
  `;
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
    setGeneratedQuiz(DemoQuizContent);
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