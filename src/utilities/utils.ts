import express from 'express';
import csv from 'csvtojson';

const app = express();
const port = 3000;

async function process(file:string){
    const json = await csv().fromFile(file);
    json.forEach(item=>{
        item.phone = item.phone || 'missing data';
    });
    console.log(json);
    return JSON.stringify(json);
}

app.get('/users', async (req, res)=>{
    console.log(__dirname);
    const out = await process(__dirname + '/../users.csv');
    res.send(out);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});