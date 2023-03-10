import * as express from 'express';
import { TeamController, UserController, MatchController } from './api/controllers';
import { ErrorHandler } from './api/middlewares';

import 'express-async-errors';
import LeaderboardController from './api/controllers/LeaderboardController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.useRoutes();
    // ErrorHandler must be the last to be called
    this.app.use(ErrorHandler.handleError);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private useRoutes(): void {
    this.app.use('/teams', new TeamController().initRoutes());
    this.app.use('/login', new UserController().initRoutes());
    this.app.use('/matches', new MatchController().initRoutes());
    this.app.use('/leaderboard', new LeaderboardController().initRoutes());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
