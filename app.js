const axios = require('axios');

let query = 'http://169.254.170.2/v2/metadata'

async function getUser() {
  try {
    const response = await axios.get(query);
    return response.data
  } 
  catch (error) {
    console.error(error);
  }
}

const fastify = require('fastify')({
  logger: true
})

// Declare a route
async function get() {
  let resp = await getUser()
  return resp
}

fastify.get('/', async (request, reply) => {
  let result = await get()
  reply.send(result.Containers[0].Networks[0].IPv4Addresses[0])
})

fastify.listen(3000, '0.0.0.0', (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
