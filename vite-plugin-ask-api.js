import { loadEnv } from 'vite'
import { handleAskOptimumRequest, readJsonBody } from './lib/askOptimumServer.js'

export function askOptimumApiPlugin() {
  return {
    name: 'ask-optimum-api',
    configureServer(server) {
      const envDir = server.config.envDir || process.cwd()
      server.middlewares.use('/api/ask-optimum', async (req, res, next) => {
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
    },
  }
}
