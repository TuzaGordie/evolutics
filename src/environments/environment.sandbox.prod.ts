import { Config } from 'src/app/configs/index.config';
import { Environment } from 'src/app/Shared/models/index.model';

export const environment: Environment = new Environment(true);
environment.apiBaseUrl = Config.APIDevelopmentServer; 
environment.debug = true; 
