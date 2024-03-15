import Types from '@/common/dependency-injection/types';
import { Server } from '@/server';
import DIContainer from '@/common/dependency-injection/di-container';
import dotenv from 'dotenv';
dotenv.config();


export class App {
    server?: Server;

	async start(): Promise<void> {
		const port = process.env.PORT ?? '5000';
		const container = new DIContainer().getContainer();
		this.server = new Server(port, container.get(Types.RouterRegister));

		return this.server.listen();
	}

	get httpServer(): Server['httpServer'] | undefined {
		return this.server?.getHTTPServer();
	}

	async stop(): Promise<void> {
		return this.server?.stop();
	}
}
