export async function json(req, res) {
  const buffers = [];

  for await (const chunck of req) {
    buffers.push(chunck);
  }

  
  //se tiver algo no corpo da req
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null
  }
  //Content-type: qual tipo de conteudo
  //application/json: tipo do conteudo
  res.setHeader('Content-type', 'application/json')
}