import Recommendation from "@data/models/recommendation";
import connectMongo from "@data/connect-mongo";

async function getRecommendations() {
  await connectMongo();
  return await Recommendation.find({});
}

const api = {
  all: getRecommendations,
};

export default api;
