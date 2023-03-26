import connectMongo from "../../data/connectMongo";
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
  console.log({ subjects });

  const result = await res.json(subjects);

  return { data: result };
}
