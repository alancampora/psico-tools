import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  Select,
  Badge,
  Button,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { FaBookmark } from "react-icons/fa";

const FeedbackPage = ({recommendations}:any) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("All");
  const [filteredFeedback, setFilteredFeedback] = useState([]);

  useEffect(() => {
    // Filter feedback based on search term and selected rating
    //
    const filtered = recommendations.filter((item:any) => {
      const matchesSearchTerm = item.subject.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSelectedRating =
        selectedRating === "All" || item.rating.toString() === selectedRating;
      return matchesSearchTerm && matchesSelectedRating;
    });

    setFilteredFeedback(filtered);
  }, [searchTerm, selectedRating, recommendations]);

  const handleCreateReview = () => {
    router.push({
      pathname: "/recomendaciones/nueva",
    });
  };

  const handleSaveForLater = (id:string) => {
    // Logic for saving review for later
    console.log(`Saving review ${id} for later`);
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={4}>
        <Button
          colorScheme="purple"
          variant="ghost"
          aria-label={"nueva recomendacion"}
          leftIcon={<EditIcon />}
          onClick={handleCreateReview}
        >
          Nueva recomendacion
        </Button>
      </Flex>
      <Box mb={4}>
        <Input
          placeholder="Search by subject"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Flex mb={4}>
        <Select
          w="auto"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <option value="All">All ratings</option>
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </Select>
      </Flex>
      {filteredFeedback.map((item:any) => (
        <Box key={item.id} p={4} bg="gray.100" mb={4} alignItems="center">
          <Flex align="center" justify="space-between" mb={2} columnGap="10px">
            <Text fontSize="xl" fontWeight="bold">
              {item.subject.name}
            </Text>
            <Flex align="center">
              <Badge colorScheme="green" ml={4} fontSize="1em">
                {item.rating} stars
              </Badge>
              <FaBookmark
                onClick={() => handleSaveForLater(item.id)}
                cursor="pointer"
              />
            </Flex>
          </Flex>
          <Text>{item.text}</Text>
          <Text fontStyle="italic" textAlign="right">
            {item.user.name}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export async function getStaticProps() {
  const data = await fetch(`${process.env.VERCEL_URL}/api/recommendation`);
  const recommendations = await data.json();

  console.log({ recommendations });

  return {
    props: {
      recommendations,
    },
  };
}

export default FeedbackPage;
