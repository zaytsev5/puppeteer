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
    await page.type('[name=username]', 'your_email')
    await page.type('[name=password]', 'your_password')
    await page.click('[type=submit]');
    await page.waitFor(2000)

    await page.goto('https://www.instagram.com/direct/inbox/')
    await page.waitFor(2000);

    await page.evaluate(async () => {
        // open devtools, find className for a tags(friends)
        const friend= document.getElementsByClassName('your_class_name_in_chat_box')[1]
        if (!friend)
            return null;
        return friend.click()


    });


    await page.waitFor(1000)

    //  setInterval(async () => {
    // await page.waitFor(2000);
    const message = await page.waitForSelector("textarea");
    await message.type("your_messsage");
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




