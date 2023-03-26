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
  SUBJECT,
  SUBJECT_DETAILS,
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

export default function Recommendation({ user }: any) {
  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [period, setPeriod] = useState("1er cuatrimestre");
  const [subjects, setSubjects] = useState([]);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState({
    name: "",
    code: "",
    departament: "",
  });

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

  const handleSubmit = async () => {
    const newRecommendation = {
      rating,
      text: recommendation,
      period,
      subject: { ...selectedSubject },
      user,
      state: "DRAFT",
    };
    console.log(newRecommendation);
    setRating(0);
    setRecommendation("");
    setPeriod(FIRST_PERIOD);
    setSelectedSubject(subjects[0]);

    try {
      await axios.post("/api/recommendation", newRecommendation);
      toast({
        title: "Recommendation sent",
        description: "Thank you for your recommendation!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Su recomendacion no ha sigo guardada",
        description: "Comuniquese con psico-tools@gmail.com",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="large" mx="auto" my={8} p={6} borderWidth={1} boxShadow="lg">
      <Heading mb={4} textAlign="center">
        {NEW_RECOMMENDATION}
      </Heading>

      <FormControl id="subject" mb={8}>
        <FormLabel>{SUBJECT}</FormLabel>
        {!isLoadingSubjects && (
          <Select
            value={selectedSubject!.code}
            onChange={(event) =>
              setSelectedSubject(
                // @ts-ignore
                subjects!.find((s: any) => s!.code === event.target.value)
              )
            }
          >
            {subjects.map((subject) => (
              // @ts-ignore
              <option key={subject.code} value={subject.code}>
                {
                  // @ts-ignore
                  `(${subject!.code}) ${subject!.name} ${subject!.department}`
                }
              </option>
            ))}
          </Select>
        )}
        <FormHelperText>{SUBJECT_DETAILS}</FormHelperText>
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
