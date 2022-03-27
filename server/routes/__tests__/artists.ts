import request from 'supertest';
import express from 'express';
import artistsRouter from '../artists';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const app = express();
app.use('/artists', artistsRouter);

it('result contains message if no data is returned', async () => {
    const url = '/artists/30/';
    const mock = new MockAdapter(axios);
    const message = 'No results could be found. Try again or check out these artists:';
    mock.onAny().replyOnce(200, {}).onAny().replyOnce(200, { results: {} });

    const res = await request(app).get(url);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toEqual(message);
});

const url = '/artists/30/Cher';
it('result contains message if no data is returned', async () => {
    const mock = new MockAdapter(axios);
    const message = 'No results could be found. Try again or check out these artists:';
    mock.onAny().replyOnce(200, {}).onAny().replyOnce(200, { results: {} });

    const res = await request(app).get(url);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toEqual(message);
});

it('result contains message and error == true if error is returned', async () => {
    const mock = new MockAdapter(axios);
    const error = 2;
    const message = 'ErrorMessage';
    mock.onAny().reply(200, { error, message });

    const res = await request(app).get(url);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toEqual(`${error}: ${message}`);
});