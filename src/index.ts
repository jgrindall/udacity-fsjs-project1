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


    How can you set up your server and route so that your project remains scalable?

    Create a separate module for your processing functionality

    You are only required to work with jpg files

    At a minimum, you should have at least one test for your endpoint and at least one test for your image processing

    Add caching to your application so that repeated requests to your endpoint use pre-stored images

    Think of edge-cases. Should they get different error messages based on what's wrong?


    Does stopping and restarting your server cause any issues?
    Does your user get feedback when something goes wrong?
    Is your code easy to follow? Comments?

    Provide all necessary information in your readme file, so your reviewer knows how to test your API.

 */


