# verdaccio-mirror

> An amazing verdaccio plugin

---
## install 
```
npm i verdaccio-mirror
```

## setup
```
middlewares:
  mirror:
    agent: http://username:passwd@proxyserver.com
    proxy: 
      [{from: 'path',to: 'target'}]
```
* agent [optional] http proxy server

## development

See the [verdaccio contributing guide](https://github.com/verdaccio/verdaccio/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. 
Once you have completed that, use the following npm tasks.

  - `npm run build`

    Build a distributable archive

  - `npm run test`

    Run unit test

For more information about any of these commands run `npm run ${task} -- --help`.
