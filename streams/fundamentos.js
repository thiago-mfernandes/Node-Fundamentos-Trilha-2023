// Netflix & Spotify

//Conseguir obter,ler pequenas partes de alguma coisa e ja conseguir trabalhar com os dados mesmo sem ler o arquivo por completo

// Importacao de clientes via CSV(Excel)
// O arquivo teria 1gb
// POST/upload import.csv

//se a internet tiver 10mb/s
//vai demorar 100s -> pra subir o arquivo, pra depois ele comecar a fazer as insercoes no banco

//entao no Stream
//a cada 1s eu leio 10.000 linhas
// e ja consigo ir salvando no meu banco de dados ao mesmo tempo que ainda esta sendo carregado o csv

// process.stdin
//   .pipe(process.stdout)

import { Readable, Writable, Transform, Duplex } from 'node:stream'

class OneToHundredSteam extends Readable {
  index = 1;

  //toda stream readble tem um metodo obrigatorio
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if(i > 100) {
        //aqui o metodo push fornece informacoes pra quem estiver consumindo ela
        //se i for maior que 100 retorna nada
        this.push(null)
      } else {
        //meu dado precisa estar um tipo Buffer
        const buff = Buffer.from(String(i))
        //se i for menor(se ainda estiver lendo o arquivo), retorna i
        this.push(buff);
      }
      //agora eu posso imprimir na tela enquanto esta lendo o arquivo, os dados!
    }, 500);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunck, encoding, callback) {
    //pego cada numero(chunck)
    const transformedData = Number(chunck.toString()) * -1;
    //primeiro parametro caso tenha dado erro, e o dado transformado
    callback(null, Buffer.from(String(transformedData)))
  }
}

class MultiplyByTenStream extends Writable {
  /**
   * chunck: pedaco que vai ser lido
   * encoding: como que a minha informacao esta codificada
   * callback eh uma funcao que eh chamada qdo a informacao acabou de ser lida
   */
  _write(chunck, encoding, callback) {
    //esse chunck eh o buff que estou recebendo pelo Readable
    console.log(Number(chunck.toString()) * 10)
    callback()
  }
}

//minha classe vai ler um arquivo
new OneToHundredSteam()
  .pipe(new InverseNumberStream())
  //e exibir no terminal a saida enquanto esta lendo, dado por dado.
  //MultiplyByTenStream é uma stream que processa dados, escreve dados
  .pipe(new MultiplyByTenStream());



//a stream duplex pode ler, escrever, mas nao pode modificar, como se fosse um arquivo fisico imutavel
