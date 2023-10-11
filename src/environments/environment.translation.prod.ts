// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Config } from 'src/app/configs/index.config';
import {
  ELanguage,
  ESystem,
  Environment,
} from 'src/app/Shared/models/index.model';

export const environment: Environment = new Environment(true);
environment.apiBaseUrl = Config.APIStagingServer;  
environment.authenticate = true;  
environment.debug = true;   
environment.translate = true;   
environment.targetLanguage = ELanguage.FR;   

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
