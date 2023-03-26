import connectMongo from "../../data/connectMongo";
import Recommendation from "../../data/models/recommendation";

export default async function handler(req: any, res: any) {
  await connectMongo();

  switch (req.method) {
    case "GET": {
      return getRecommendations(req, res);
    }

    case "POST": {
      return createRecommendation(req, res);
    }

    case "PUT": {
      return updateRecommendation(req, res);
    }

    case "DELETE": {
      return deleteRecommendation(req, res);
    }
  }
}

export async function updateRecommendation(req: any, res: any) {
  const { _id } = req.body;

  let doc = await Recommendation.findOneAndUpdate({ _id: _id }, req.body);

  return res.json(doc);
}

export async function deleteRecommendation(req: any, res: any) {
  const { id } = req.body;

  // @ts-ignore
  const recommendations = await Recommendation.find({ _id: id })
    .exec();

  return res.json(recommendations);
}

export async function getRecommendations(_: any, res: any) {
  const recommendations = await Recommendation.find({});

  return res.json(recommendations);
}

export async function createRecommendation(req: any, res: any) {
  try {

    const recommendation = new Recommendation(req.body);

    console.log({recommendation});

    await recommendation.save();

    return res.json({
      message: "Recommendation added successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error,
      success: false,
    });
  }
}
