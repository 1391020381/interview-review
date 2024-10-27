
* process.type === 'renderer'
  - window.addEventListener("error",(e)=>{})
  - window.addEventListener("unhandledRejection",(e)=>{})
* 主进程
  - process.on("uncaughtException",(error)=>{})
  -  process.on("unhandledRejection", (error) => {}) 
- try catch

* [sentry-cli: electron crash 监控的最后一步](https://github.com/Zaynex/Blog/issues/4)

```
import * as Sentry from '@sentry/electron';
const { crashReporter } = require('electron');
crashReporter.start({
    companyName: 'xxx',
    productName: 'xxx',
    ignoreSystemCrashHandler: true,
    submitURL: 'https://sentry.io/api/9/minidump/?sentry_key=xxxx',
  });


// main process

import * as Sentry from "@sentry/electron/main";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
});

import * as Sentry from "@sentry/electron/renderer";

Sentry.init({
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

Sentry.captureException(error);

```