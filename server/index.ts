import express from 'express';
import artistsRouter from './routes/artists';

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/artists', artistsRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server running on port ${port}`)
});