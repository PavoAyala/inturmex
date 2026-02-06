import { Hono } from 'hono'
import { getRequestListener } from '@hono/node-server'
import { onRequest } from 'firebase-functions/v2/https'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello World!')
})

export const api = onRequest(getRequestListener(app.fetch))
