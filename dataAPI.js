const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(express.json({strict:false}))
app.use(cors())

app.get('/', (req,res)=> {
  console.log('되는거니')
  res.sendFile(__dirname + '/index.html')
})


/*
export function getDiscussion(filterBy={}){

    //const url=`http://localhost:4000/`
    const discussion=`http://localhost:4000/discussions`

    return fetch(discussion)
      //  const agoraDiscussions = discussion
      .then(res=>res.json())
      .then(result => agoraStatesDiscussions = result)
}

//console.log(agoraDiscussions)
*/