import { json, urlencoded } from 'body-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';
import errorHandler from 'errorhandler';
import { inject } from 'inversify';
import { RouterRegister } from '@/common/infraestructure/router/routerRegister';
import Types from '@/common/dependency-injection/types';
import path from 'path';

export class Server {
    private app: express.Application;
    private port: string;
	private httpServer?: http.Server;
    
    constructor(port: string, 
		@inject(Types.RouterRegister) RouterRegister: RouterRegister) {
        this.app = express();
        this.port = port;
		this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(errorHandler());
		this.app.use(cors({
			origin: process.env.CORS_ORIGIN,
			credentials: true,
		}));
		this.app = RouterRegister.registerRoutes(this.app);
    }

    
    async listen(): Promise<void> {
		return new Promise(resolve => {
			const env = this.app.get('env') as string;
			this.httpServer = this.app.listen(this.port, () => {
				console.log(
					`  App is running at http://localhost:${this.port} in ${env} mode`,
				);
				console.log('  Press CTRL-C to stop\n');
				resolve();
			});
		});
	}

	getHTTPServer(): Server['httpServer'] {
		return this.httpServer;
	}

	async stop(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.httpServer) {
				this.httpServer.close(error => {
					if (error) {
						reject(error);
						return;
					}
					resolve();
				});
			}
			resolve();
		});
	}
}
