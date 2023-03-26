import {
  FIRST_PERIOD,
  NEW_RECOMMENDATION,
  PERIOD,
  PERIOD_DETAILS,
  RATING,
  RATING_DETAILS,
  RATING_DETAILS_INPUT,
  SECOND_PERIOD,
  SEND,
  SUMMER,
  WINTER,
} from "../../../strings";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

export default function Recommendation() {
  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [period, setPeriod] = useState("1er cuatrimestre");
  const [subjects, setSubjects] = useState([]);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("");

  const toast = useToast();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/api/subject");
        console.log({ response });
        setSubjects(response.data);
        setIsLoadingSubjects(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = () => {
    const newRecommendation = {
      rating,
      recommendation,
      period,
      subject: selectedSubject,
    };
    console.log(newRecommendation);
    setRating(0);
    setRecommendation("");
    setPeriod("1er cuatrimestre");
    setSelectedSubject("");
    toast({
      title: "Recommendation sent",
      description: "Thank you for your recommendation!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="large" mx="auto" my={8} p={6} borderWidth={1} boxShadow="lg">
      <Heading mb={4} textAlign="center">
        {NEW_RECOMMENDATION}
      </Heading>

      <FormControl id="subject" mb={4}>
        <FormLabel>Subject</FormLabel>
        {!isLoadingSubjects && (
          <Select
            value={selectedSubject}
            onChange={(event) => setSelectedSubject(event.target.value)}
          >
            {subjects.map((subject) => (
              <option key={subject.code} value={subject.code}>
                {`(${subject.code}) ${subject.name} ${subject.department}`}
              </option>
            ))}
          </Select>
        )}
        <FormHelperText>
          Select the subject you want to recommend
        </FormHelperText>
      </FormControl>

      <FormControl id="rating" mb={8}>
        <FormLabel>{RATING}</FormLabel>

        <Box display="flex">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <Button
                key={ratingValue}
                margin="8px"
                colorScheme={ratingValue <= rating ? "purple" : "gray"}
                onClick={() => setRating(ratingValue)}
                _hover={{ color: "yellow.400" }}
              >
                <Box as={FaStar} size="24px" />
              </Button>
            );
          })}
        </Box>

        <FormHelperText>{RATING_DETAILS}</FormHelperText>
      </FormControl>

      <FormControl id="period" mb={8}>
        <FormLabel>{PERIOD}</FormLabel>
        <Select
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
        >
          <option value={FIRST_PERIOD}>{FIRST_PERIOD}</option>
          <option value={SECOND_PERIOD}>{SECOND_PERIOD}</option>
          <option value={WINTER}>{WINTER}</option>
          <option value={SUMMER}>{SUMMER}</option>
        </Select>
        <FormHelperText>{PERIOD_DETAILS}</FormHelperText>
      </FormControl>

      <FormControl id="recommendation" mb={8}>
        <FormLabel>{RATING_DETAILS_INPUT}</FormLabel>
        <Textarea
          value={recommendation}
          onChange={(event) => setRecommendation(event.target.value)}
        />
      </FormControl>

      <Button colorScheme="green" onClick={handleSubmit}>
        {SEND}
      </Button>
    </Box>
  );
}

export const getServerSideProps = withPageAuthRequired();
