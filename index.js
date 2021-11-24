import express, { json } from "express";
import puppeteer from "puppeteer";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.get("/instagram/", (req, res) => {
  // window.open("https://www.instagram.com/purustayshere/");
  res.send(
    "You are just a step behind. Now add the username in the above link after a "
  );
});

app.get("/instagram/:profileName", (req, res) => {
  let srcText = "";

  const { profileName } = req.params;
  // res.send(`It may take a while to extract src of ${profileName}'s profile...`);
  async function image(profile) {
    const browser = await puppeteer.launch({ headless: false });
    try {
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
    } catch (err) {
      browser.close();
      res.send(err.message);
    }
  }
  console.log({ profileName });
  image(profileName);
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
