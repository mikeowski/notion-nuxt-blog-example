const express = require('express')
import {Client} from '@notionhq/client'
const app = express()
const n = new Client({auth:process.env.NUXT_ENV_NOTION_KEY})

app.get('/',async (req,res)=>{
  const {pageId} = req.query
  const response = await n.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  })
  return res.status(200).json(response.results)


})


export default app
