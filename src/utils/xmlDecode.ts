const xml2js = require("xml2js");

export const xmlToJson = async (xml) => {
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(xml);
};

export const serializeRowXml = (result) => {
  const newOject = {};
  Object.entries(result["Info"][0]).forEach(([key, value]) => (newOject[key] = value[0]));
  return newOject;
};

