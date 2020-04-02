import { Logger, IPluginMiddleware, IBasicAuth, IStorageManager, PluginOptions } from '@verdaccio/types';
import { Router, Request, Response, NextFunction, Application } from 'express';
import { CustomConfig } from '../types/index';

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});
const HttpsProxyAgent = require('https-proxy-agent');
let agent;

export default class VerdaccioMiddlewarePlugin implements IPluginMiddleware<CustomConfig> {
  public logger: Logger;
  public mirrorConfig;
  public config;
  public constructor(config: CustomConfig, options: PluginOptions<CustomConfig>) {
    this.mirrorConfig = config.middlewares.mirror !== undefined ? config.middlewares.mirror : true;
    this.config = config;
    this.logger = options.logger;
  }

  public register_middlewares(
    app: Application,
    auth: IBasicAuth<CustomConfig>,
    /* eslint @typescript-eslint/no-unused-vars: off */
    _storage: IStorageManager<CustomConfig>
  ): void {
    console.log(this.mirrorConfig);
    if (this.mirrorConfig.agent) {
      agent = new HttpsProxyAgent(this.mirrorConfig.agent);
    }

    this.mirrorConfig.proxy && this.mirrorConfig.proxy.map((item) => {
      app.use(item.from, function (req, res, next) {
        proxy.web(req, res, {
          target: item.to,
          changeOrigin: true,
          followRedirects: true,
          agent: agent,

        }, (err) => {
          console.error(err);
        });
      })
    });



  }
}
