import { SUBJECT_RECOMMENDATIONS } from "@/strings";
import { Flex, Heading, Text, Avatar, Box, Badge } from "@chakra-ui/react";
import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

const Recommendations = () => {
  const { data: recommendationsData, error } = useSWR(
    "/api/recommendation",
    fetcher
  );

  if (error) {
    return <Text>Error loading recommendations...</Text>;
  }

  return (
    <Flex direction="column" alignItems="center">
      <Heading as="h1" size="xl" my={8}>
        {SUBJECT_RECOMMENDATIONS}
      </Heading>
      {!recommendationsData ? (
        <Text>Loading recommendations...</Text>
      ) : (
        recommendationsData.map((recommendation:any) => (
          <Box
            key={recommendation.id}
            w="100%"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            my={4}
            p={4}
          >
            <Flex alignItems="center" mb={4}>
              <Avatar
                src={recommendation.user.picture}
                name={recommendation.user.name}
                mr={4}
              />
              <Text fontWeight="bold">{recommendation.user.name}</Text>
              <Badge colorScheme="green" ml={4} fontSize="1em">
                {recommendation.rating} stars
              </Badge>
            </Flex>
            <Box mb={4}>
              <Heading as="h2" size="md" mb={2}>
                {`(${recommendation.subject.code}) ${recommendation.subject.name} ${recommendation.subject.department}`}
              </Heading>
              <Text fontWeight="bold" mb={2}>
                {recommendation.period}
              </Text>
              <Text>{recommendation.text}</Text>
            </Box>
          </Box>
        ))
      )}
    </Flex>
  );
};

export default Recommendations;
