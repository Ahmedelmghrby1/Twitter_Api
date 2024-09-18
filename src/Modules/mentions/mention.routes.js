import { Router } from "express";
import { allMentions, getMentionsByTicker, triggerScraping } from "./mention.controller.js";


const mentionRouter = Router()

mentionRouter
.route('/')
.get(allMentions)
.post(triggerScraping)

mentionRouter
.route('/:ticker')
.get(getMentionsByTicker)

export default mentionRouter