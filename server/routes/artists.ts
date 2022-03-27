import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import randomArtistsJson from '../randomArtists.json';

dotenv.config();
const artistSearch = process.env.API_ARTIST_SEARCH as string;
const apiKey = process.env.API_KEY as string;
const apiUrl = process.env.API_URL as string;

interface ReturnResult {
    error?: boolean;
    message?: string;
    data?: Object;
}

const artistsRouter = express.Router();

artistsRouter.get('/:maxResults/:searchTerm?', (req, res) => {
    callApi(parseInt(req.params.maxResults), req.params.searchTerm || '', (result) => {
        res.json(result);
    });
});

function callApi(maxResults: number, searchTerm: string, callback: (result: ReturnResult) => void) {
    try {
        axios.get(getApiUrl(maxResults, searchTerm))
            .then(result => {
                if (result.data.error) {
                    const returnValue: ReturnResult = {
                        error: true,
                        message: `${result.data.error}: ${result.data.message}`
                    };

                    callback(returnValue);
                } else if (Object.keys(result.data).length == 0) {
                    callApi(maxResults, getRandomArtist(), (result: ReturnResult) => {
                        const returnValue: ReturnResult = {
                            message: 'No results could be found. Try again or check out these artists:',
                            data: result.data
                        };
                        callback(returnValue);
                    });
                } else {
                    const returnValue: ReturnResult = {
                        data: result.data
                    };

                    callback(returnValue);
                }
            }).catch(ex => { });
    } catch (ex) {

    }
}

function getApiUrl(maxResults: number, searchTerm: string) {
    let parameter = artistSearch;
    parameter = parameter?.replace('{maxResults}', maxResults.toString());
    parameter = parameter?.replace('{artist}', searchTerm);
    parameter = parameter?.replace('{apiKey}', apiKey);

    return `${apiUrl}${parameter}`;
}

function getRandomArtist(): string {
    return randomArtistsJson.randomArtists[Math.floor(Math.random() * randomArtistsJson.randomArtists.length)];
}

export default artistsRouter;