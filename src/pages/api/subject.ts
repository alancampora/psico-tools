import connectMongo from "../../data/connect-mongo";
import Subject from "../../data/models/subject";

export default async function handler(req: any, res: any) {
  await connectMongo();

  switch (req.method) {
    case "GET": {
      return getSubjects(req, res);
    }

    case "POST": {
      return "createSubject(req, res)";
    }

    case "PUT": {
      return "updateSubject(req, res)";
    }

    case "DELETE": {
      return "deleteSubject(req, res)";
    }
  }
}

async function getSubjects(_: any, res: any) {
  const subjects = await Subject.find({});

  const result = await res.json(subjects);

  return { data: result };
}
