//buffer eh uma representacao de dados em um espaco na memoria para transitar ddos de forma rapida
//ele guarda as informacoes de forma binaria(em hexadecimal) na memoria

const buffer = Buffer.from("ok")
console.log(buffer); //resultado => Buffer 6f 6b
console.log(buffer.toJSON()); //resultado => { type: 'Buffer', data: [ 111, 107 ] }