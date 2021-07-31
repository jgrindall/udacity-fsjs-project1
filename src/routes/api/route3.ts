import express from 'express';

const r = express.Router();

r.get('/', (req, res)=>{res.send('r3')});

export default r;