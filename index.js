const express = require("express");
const cors = require("cors");
const axios = require("axios");
const parseString = require("xml2js").parseString;
const XLSX = require("xlsx");

const PORT = process.env.NODE_PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res, err) => {
  const data = await axios.get(
    `http://asp1.krx.co.kr/servlet/krx.asp.XMLSiseEng?code=${req.query.code}`
  );
  parseString(data.data, (err, result) => {
    let body = result.stockprice.TBL_StockInfo[0].$;
    res.send(body);
  });
});

app.get("/code", async (req, res, err) => {
  let workbook = XLSX.readFile("./assets/code.xls");
  let sheet = workbook.Sheets.Sheet1;

  let result = XLSX.utils.sheet_to_json(sheet).map((v) => ({
    code: v["종목코드"],
    name: v["종목명"],
  }));

  console.log(result);

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
