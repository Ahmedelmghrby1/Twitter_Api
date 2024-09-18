import puppeteer from "puppeteer";
import { Mention } from "../../Database/Models/mention.model.js"; // Ensure the model is correctly defined

async function scrapeTwitter(account, ticker) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = `https://twitter.com/${account}`;

    try {
        await page.goto(url, { waitUntil: 'load', timeout: 0 });
        // await autoScroll(page);

        const tweets = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('article')).map(tweet => tweet.innerText);
        });

        const regex = new RegExp(`\\${ticker}`, 'g');
        const mentions = tweets.filter(tweet => regex.test(tweet)).length;

        const mention = new Mention({
            account: account,
            ticker: ticker,
            mentions: mentions
        });
        await mention.save();
        console.log(`Saved: ${mentions} mentions for ${account}.`);

    } catch (error) {
        console.error(`Error scraping ${account}: `, error);
    } finally {
        await browser.close();
    }
}


export {
    scrapeTwitter
};