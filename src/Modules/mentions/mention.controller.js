import { Mention } from "../../../Database/Models/mention.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { scrapeTwitter } from "../../Middlewares/scrapeTwitter.js";

// GET all mentions
const allMentions = catchError(async(req,res,next)=>{
    let mentions = await Mention.find();
    res.status(200).json({ message: "success", mentions})

})

// GET mentions by ticker
const getMentionsByTicker = catchError(async(req,res,next)=>{
    const ticker = req.params.ticker;
    let mentions = await Mention.find({ ticker: ticker });
    res.status(200).json({ message: "success", mentions})
})

// POST to trigger scraping
const triggerScraping = catchError(async(req,res,next)=>{
    const { account, ticker } = req.body;
     await scrapeTwitter(account, ticker);
    // let mentions = await scrapeTwitter.scrape();
    res.status(200).json({ message: `Scraping initiated for ${account} with ticker ${ticker}.`})
})


export{
    allMentions,
    getMentionsByTicker,
    triggerScraping
}