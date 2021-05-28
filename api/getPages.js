const express = require('express')
import {Client} from '@notionhq/client'
const app = express()
const n = new Client({auth:process.env.NUXT_ENV_NOTION_KEY})


app.get('/',async (req,res)=>{
    const response = await n.databases.query({
      database_id: process.env.NUXT_ENV_NOTION_DB_ID
    })
    return res.status(200).json(response.results)
})


export default app
