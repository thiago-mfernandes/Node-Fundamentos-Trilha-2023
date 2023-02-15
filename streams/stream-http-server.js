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
const server = http.createServer((req, res) => {
  return req
    //direcionando para o Inverse
    .pipe(new InverseNumberStream())
    //direcionado para a resposta
    .pipe(res)
})

server.listen(3334)