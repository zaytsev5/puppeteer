const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const port = 1336 || process.env.PORT

const auto_send_message = async () => {
    console.log("scraping....")
    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/')


    await page.waitFor(1000);
    await page.type('[name=username]', 'shinminah357159@gmail.com')
    await page.type('[name=password]', 'zaytsev@0')
    await page.click('[type=submit]');
    await page.waitFor(2000)

    await page.goto('https://www.instagram.com/direct/inbox/')
    await page.waitFor(2000);

    await page.evaluate(async () => {
        const dung_xi_chat = document.getElementsByClassName('-qQT3 rOtsg')[1]
        if (!dung_xi_chat)
            return null;
        return dung_xi_chat.click()


    });


    await page.waitFor(1000)

    //  setInterval(async () => {
    // await page.waitFor(2000);
    const message = await page.waitForSelector("textarea");
    await message.type("Sorry about that..");
    await page.waitFor(500)
    // await page.keyboard.press('Enter');

    //  }, 3000)


    await page.waitFor(1000);

}
app.get('/ins', async (rep, res) => {
    await auto_send_message();
    res.send('Action completed...!')
})

app.listen(port, () => {
    console.log('Server listening on port ' + port);
})




