const shortid = require("shortid");
const myMap = new Map();
// Generate new short url
function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});
    const shortID = shortid();
    myMap.set(shortID,body.url);
    return res.json({ shortID });
}

function getUrl(shortId){
    return myMap.get(shortId);
}

module.exports = {
    handleGenerateNewShortURL,
    getUrl
}