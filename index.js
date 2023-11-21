const express = require('express');
const app = express();
const port = 8001;
const urlRoute = require("./routes/url");
const { getUrl } = require("./controllers/url");
const { conntectToMongoDB } = require("./connect");
const path = require('path');
const publicPath = path.join(__dirname,'public');

conntectToMongoDB("mongodb://127.0.0.1/short-url")
.then(()=>{
    console.log("MongoDB connected");
})

app.use(express.urlencoded({ 
    extended: true,
}));

app.use(express.json());
app.use("/url",urlRoute);

// Load static webpage
app.use(express.static(publicPath));

app.get('/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = getUrl(shortId);
    res.redirect(entry);
});

app.listen(port,()=>{
    console.log(`Server started at port: ${port}`);
})
 