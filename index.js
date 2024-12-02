import app from './server/app.js'
import dotenv from 'dotenv'
import chokidar from 'chokidar'
import express from 'express'
import path from 'path'
import 'express-async-errors'
import webpack from 'webpack'
import middleware from 'webpack-dev-middleware'
import hotmiddleware from 'webpack-hot-middleware'
import webpackConf from './webpack.config.mjs'
import { getGlobals } from 'common-es'
const { __dirname } = getGlobals(import.meta.url)

dotenv.config()

import { PORT, inProduction } from './config/common.js'

app.use('/api', (req, res, next) => require('@root/server')(req, res, next))
/**
 *  Use "hot loading" in backend
*/

const watcher = chokidar.watch('server')
watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(require.cache).forEach((id) => {
      if (id.includes('server')) delete require.cache[id]
    })
  })
})

/*
 * Use "hot loading" in backend
 */

if (!inProduction) {
  console.log('Development')
  const compiler = webpack(webpackConf('development', { mode: 'development' }))

  const devMiddleware = middleware(compiler)
  app.use(devMiddleware)
  app.use(hotmiddleware(compiler))
  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html')
    devMiddleware.waitUntilValid(() => {
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) return next(err)
        res.set('content-type', 'text/html')
        res.send(result)
        return res.end()
      })
    })
  })
} else {
  console.log('Production')
  const DIST_PATH = path.resolve(__dirname, './dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (req, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
