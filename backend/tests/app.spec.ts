import 'reflect-metadata';
import { App } from '../src/app';
import { Server } from '../src/server';

describe('App', () => {
    let app: App;

    beforeAll(async () => {
        app = new App();
        await app.start();
    });

    afterAll(async () => {
        await app.stop();
    });

    it('should start the server', async () => {
        expect(app.server).toBeInstanceOf(Server);
    });
});
