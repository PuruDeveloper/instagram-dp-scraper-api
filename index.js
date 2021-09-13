import express, { json } from "express";
import puppeteer from "puppeteer";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());

app.get("/", (req, res) => {
  res.send("Bhak be ");
});

app.get("/instagram/:profileName", (req, res) => {
  let srcText = "";
  const { profileName } = req.params;
  async function image(profile) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://www.instagram.com/${profile}/`);
    const [el] = await page.$x(
      `//*[@id="react-root"]/section/main/div/header/div/div/div/button/img`
    );
    const src = await el.getProperty("src");
    srcText = await src.jsonValue();
    console.log({ srcText });
    res.send({ srcText });
    browser.close();
  }
  console.log({ profileName });
  image(profileName);
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
