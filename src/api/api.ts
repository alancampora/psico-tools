import { SubjectsScrapper } from "./subject-scrapper";

export type Sprint = {
  slug: string;
  sprintKey: string;
  doneLink: string;
  spilloversLink: string;
};

const api = {
  subject: {
    all: async () => {
      const subjectsScrapper = new SubjectsScrapper();
      const result = await subjectsScrapper.scrapeAll(
        "http://academica.psi.uba.ar/Psi/Ope154_.php"
      );

      return result;
    },
    one: async (url: string) => {
      const subjectsScrapper = new SubjectsScrapper();
      return await subjectsScrapper.scrapeOneSubject(url);
    },
  },
};

export default api;
