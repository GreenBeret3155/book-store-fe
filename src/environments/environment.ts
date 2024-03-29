/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// apiUrl: 'http://localhost:8080/api'
export const environment = {
  production: false,
  apiUrl:  window["env"]["apiUrl"] || "default",
  apiReportUrl: window["env"]["apiWs"] || "default",
  apiWs: window["env"]["apiWs"] || "default",
  captcha_siteKey: '6LfVwjQbAAAAABuPQTMX7_ZRhlu9wRKz3RV8jVgK',
  login_captcha: false
};
