import express from 'express';
import csv from 'csvtojson';
import apiRoutes from './routes/api/index';

const app = express();
const port = 3000;

app.use('/api', apiRoutes);

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


/**
 - example URL api/images?filename=argentina&width=200&height=200
 - should be usable as an img src
 - example folder structure:
    - assets/full
    - assets/thumbs
 */


