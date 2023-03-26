import api from "../../backup-api/api";

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case "GET": {
      return getAllSubjects(req, res);
    }
  }
}

async function getAllSubjects(_: any, res: any) {
  const allSubjects = await api.subject.all();

  return await res.json(allSubjects);
}
