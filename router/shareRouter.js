const express = require("express");
const axios = require("axios");
// const parseString = require("xml2js").parseString;
const XLSX = require("xlsx");

const router = express.Router();

const shareController = require("../controller/shareController");

router.get("/code", async (req, res, err) => {
  let workbook = XLSX.readFile("./assets/code.xls");
  let sheet = workbook.Sheets.Sheet1;

  let result = XLSX.utils.sheet_to_json(sheet).map((v) => ({
    code: v["종목코드"],
    name: v["종목명"],
  }));

  res.send(result);
});

router.get("/current", async (req, res, err) => {
  let url = "https://api.finance.naver.com/service/itemSummary.nhn?itemcode=";
  const body = await axios.get(url + req.query.code);

  res.send(body.data);

  /* body descriptions
   ** type: json
   ** example:
   ** {
   **   "marketSum":221817,  >>> 시가총액(백만)
   **   "risefall":2,        >>> 1: 상한, 2: 상승, 3: 보합, 4: 하한, 5: 하락
   **   "diff":3200,         >>> 전일대비 가격차
   **   "rate":9.51,         >>> 상승율
   **   "high":38900,        >>> 고가
   **   "low":34150,         >>> 저가
   **   "quant":329660,      >>> 거래량
   **   "amount":12156468,   >>> 거래대금
   **   "per":24.31,         >>> PER
   **   "eps":1516.0,        >>> EPS
   **   "pbr":4.25,          >>> PBR
   **   "now":36850          >>> 현재가(원)
   **  }
   */
});

router.post("/class", async (req, res, err) => {
  const className = req.body.class;
  const result = await shareController.insertStockClass(className);
  console.log(result);
  res.send("ok");
});

// router.get("/", async (req, res, err) => {
//   const data = await axios.get(
//     `http://asp1.krx.co.kr/servlet/krx.asp.XMLSiseEng?code=${req.query.code}`
//   );
//   parseString(data.data, (err, result) => {
//     let body = result.stockprice.TBL_StockInfo[0].$;

//     console.log(result.stockprice.TBL_StockInfo);
//     res.send(body);
//   });
// });

module.exports = router;
