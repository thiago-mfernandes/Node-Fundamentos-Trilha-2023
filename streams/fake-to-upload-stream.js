//requisicao ficticia do front enviando um upload pesado pro back-end

import { Readable } from 'node:stream'

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

fetch('http://localhost:3334', {
  //simulando que estou ENVIANDO
  method: 'POST',
  body: new OneToHundredSteam(),
})