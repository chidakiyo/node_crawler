const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.use(async (req, res) => {

    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });

    // ページを作成する
    const page = await browser.newPage();

    await page.goto("https://www.yahoo.co.jp");

    var data = await page.$eval("#topicsfb", item => {
        return item.textContent;
    });

    console.log("---")
    console.log(data)

    browser.close();

    res.send(data)
});

const server = app.listen(process.env.PORT || 8080, err => {
    if (err) return console.error(err);
    const port = server.address().port;
    console.info(`App listening on port ${port}`);
});
