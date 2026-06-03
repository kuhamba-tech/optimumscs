import { createRequire } from 'module'
import { loadEnv } from 'vite'
import { handleAskOptimumRequest, readJsonBody } from './lib/askOptimumServer.js'

const require = createRequire(import.meta.url)
const submitFormHandler = require('./api/submit-form.cjs')
const captchaHandler = require('./api/captcha.cjs')

export function askOptimumApiPlugin() {
  return {
    name: 'optimum-api',
    configureServer(server) {
      const envDir = server.config.envDir || process.cwd()

      server.middlewares.use('/api/ask-optimum', async (req, res, next) => {
        if (req.method === 'GET') {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ status: 'ok', version: 'dev' }))
          return
        }

        if (req.method !== 'POST') {
          next()
          return
        }

        try {
          Object.assign(process.env, loadEnv(server.config.mode, envDir, ''))
          const body = await readJsonBody(req)
          const { status, body: payload } = await handleAskOptimumRequest(body)
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(payload))
        } catch {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'server-error' }))
        }
      })

      server.middlewares.use('/api/submit-form', async (req, res, next) => {
        if (req.method !== 'POST' && req.method !== 'OPTIONS') {
          next()
          return
        }

        try {
          Object.assign(process.env, loadEnv(server.config.mode, envDir, ''))
          await submitFormHandler(req, res)
        } catch {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'server-error' }))
        }
      })

      server.middlewares.use('/api/captcha', async (req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'OPTIONS') {
          next()
          return
        }

        try {
          Object.assign(process.env, loadEnv(server.config.mode, envDir, ''))
          await captchaHandler(req, res)
        } catch {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'server-error' }))
        }
      })
    },
  }
}
