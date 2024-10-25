import express from "express";
import ip from "ip";
import dotenv from "dotenv";

dotenv.config();

const calculateAvg = (valueList) =>
  valueList.reduce((prev, curr) => prev + curr, 0) / valueList.length;

const randomCalculationToConsumeCPU = () => {
  const isOddList = [];
  let counter = 0;
  const maxCount = process.env.MAX_COUNT || 50000;
  while (counter < maxCount) {
    const randomNumber =
      Math.floor(Math.random() * counter++ * 1500000) / 26000;
    const isOdd = randomNumber % 2 === 1;
    if (isOdd) isOddList.push(randomNumber);
  }
  console.log("is odd avg", calculateAvg(isOddList));
};

const getRemoteIp = (req) => {
  return (req.headers["x-forwarded-for"] || req.ip)
    .match(/((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}/g)
    .pop();
};

const api = express();
api.get("/", (req, res) => {
  randomCalculationToConsumeCPU();
  const responseBody = `
    <strong>SOURCE IP</strong><span>${getRemoteIp(req)}</span>
    <br>
    <strong>SERVER IP</strong><span>${ip.address()}</span>
  `;
  res.send(responseBody);
});

api.listen(80, () => console.log("api started on 80 tcp"));
