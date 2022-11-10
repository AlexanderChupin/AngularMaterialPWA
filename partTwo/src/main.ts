import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import AWSConfig from './aws-exports';
import { Amplify } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';

Auth.configure(AWSConfig);
Storage.configure(AWSConfig);
Amplify.configure(AWSConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
