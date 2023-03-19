import axios from "axios";
import cheerio from "cheerio";
import { decode } from "iso-8859-2";

function toNormalForm(str: string) {
  return str || str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function isTheoryKey(str: string) {
  return str.includes("I") || str.includes("V") || str.includes("X");
}

async function getData(url) {
  const response = await axios.request({
    method: "GET",
    url,
    responseType: "arraybuffer",
    responseEncoding: "binary",
  });
  return decode(response.data.toString("binary"));
}

const COURSE_TYPE = {
  PRACTICAL: "practical",
  THEORY: "theory",
  SEMINAR: "seminar",
};

const MAIN_URL = "http://academica.psi.uba.ar/Psi/";

export class SubjectsScrapper {
  async scrapeAll(url: string) {
    const html = await getData(url);

    const $ = cheerio.load(html);

    const subjects = $("#PS table tbody tr");
    const [_, ...subjectsData] = subjects;

    const formattedSubjects = $(subjectsData)
      .toArray()
      .map((item) => ({
        link: MAIN_URL + $(item).find("a").attr("href"),
        code: toNormalForm($(item).find("td:nth-child(1)").text()).replace(
          /\s/g,
          ""
        ),
        name: toNormalForm($(item).find("td:nth-child(2)").text()),
        department: toNormalForm($(item).find("td:nth-child(3)").text()),
      }));

    return formattedSubjects;
  }

  async _elementExist(url: string, query: string) {
    const html = await getData(url);
    const $ = cheerio.load(html);
    const element = $(query);
    return !!element.length;
  }

  async _formatOneSubjectData(
    $: any,
    url: string,
    query: string,
    courseType: string
  ) {
    const element = $(query);
    const alternativesSchedule = element.find("tbody tr");
    const [_, ...alternativesScheduleData] = alternativesSchedule;

    const formattedData = $(alternativesScheduleData)
      .toArray()
      .reduce((acum: any, item: any) => {
        let theoryKey;
        let seminarKey;

        if (courseType === COURSE_TYPE.PRACTICAL) {
          const keysTheorySeminar = toNormalForm(
            $(item).find("td:nth-child(8)").text()
          ).replace(/\s/g, "");
          const firstKey = keysTheorySeminar.split("-")[0];
          const secondKey = keysTheorySeminar.split("-")[1];

          if (isTheoryKey(firstKey)) {
            theoryKey = firstKey;
            seminarKey = secondKey;
          } else {
            theoryKey = secondKey;
            seminarKey = firstKey;
          }
        }

        return {
          ...acum,
          [toNormalForm($(item).find("td:nth-child(1)").text()).replace(
            /\s/g,
            ""
          )]: {
            key: toNormalForm($(item).find("td:nth-child(1)").text()).replace(
              /\s/g,
              ""
            ),
            day: toNormalForm($(item).find("td:nth-child(2)").text()),
            start: toNormalForm($(item).find("td:nth-child(3)").text()).trim(),
            end: toNormalForm($(item).find("td:nth-child(4)").text()).trim(),
            type: toNormalForm($(item).find("td:nth-child(5)").text()),
            teacher: toNormalForm($(item).find("td:nth-child(6)").text()),
            slots: toNormalForm($(item).find("td:nth-child(7)").text()).trim(),
            theoryKey,
            seminarKey,
            classroom: toNormalForm($(item).find("td:nth-child(9)").text()),
            notes: toNormalForm($(item).find("td:nth-child(10)").text()),
          },
        };
      }, {});

    console.log({ formattedData });

    return formattedData;
  }

  async scrapeOneSubject(url: string) {
    const html = await getData(url);
    const $ = cheerio.load(html);

    const description = $(".option1").text();

    const hasOnlyTwoSpaces = !(await this._elementExist(
      url,
      ".table_tabs:nth-child(5)"
    ));

    const theoryData = await this._formatOneSubjectData(
      $,
      url,
      ".table_tabs:nth-child(1)",
      COURSE_TYPE.THEORY
    );

    if (hasOnlyTwoSpaces) {
      const practicalData = await this._formatOneSubjectData(
        $,
        url,
        ".table_tabs:nth-child(3)",
        COURSE_TYPE.PRACTICAL
      );

      return {
        description,
        theory: theoryData,
        seminar: {},
        practical: practicalData,
      };
    }

    const seminarData = await this._formatOneSubjectData(
      $,
      url,
      ".table_tabs:nth-child(3)",
      COURSE_TYPE.SEMINAR
    );
    const practicalData = await this._formatOneSubjectData(
      $,
      url,
      ".table_tabs:nth-child(5)",
      COURSE_TYPE.PRACTICAL
    );

    const data = {
      description,
      theory: theoryData,
      seminar: seminarData,
      practical: practicalData,
    };

    return data;
  }
}
