import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunck, encoding, callback) {
    //pego cada numero(chunck)
    const transformedData = Number(chunck.toString()) * -1;
    //primeiro parametro caso tenha dado erro, e o dado transformado


    console.log(transformedData);
    callback(null, Buffer.from(String(transformedData)))
  }
}

// req => Readable Stream: estou usando req pra fazer uma stream de leitura
// res => Writable Stream: usando res pra fazer uma stream de escrita
const server = http.createServer(async(req, res) => {
  //os buffers sao pedacos do meu arquivo
  const buffers = [];

  //aguardo cada pedaco da minha requisicao ser carregado. O await nao permite que nada no array seja executado antes que toda a stream termine de ser carregada
  for await (const chunck of req) {
    //insiro um a um no meu array de buffers e posso trabalhar quando o arquivo estiver totalmente carregado se for o caso
    buffers.push(chunck);
  }

  //concateno todos os pedacos pequenos em um unico
  const fullStreamContent = Buffer.concat(buffers).toString();
  console.log(fullStreamContent);
  return res.end(fullStreamContent);

  return req
    //direcionando para o Inverse
    .pipe(new InverseNumberStream())
    //direcionado para a resposta
    .pipe(res)
})

server.listen(3334)