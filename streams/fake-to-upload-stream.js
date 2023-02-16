//requisicao ficticia do front enviando um upload pesado pro back-end

import { Readable } from 'node:stream'

class OneToHundredSteam extends Readable {
  index = 1;

  //toda stream readble tem um metodo obrigatorio
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if(i > 5) {
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
  //aqui eu pego do corpo da resposta os dados da stream
  .then(response => {
    response.text().then(data => {
      console.log(data)
    })
  })

/**
 * QUANDO EU USO UM STREAM POR COMPLETO?
 * 
 * se eu recebo na stream um json assim:
 * 
 * { name: "user", email: "user@gmail.com" }
 * 
 * serve pra alguma coisa eu usar somente o name? metade da informacao  nesse caso serve pra eu utiizar pra alguma coisa? Se nao serve, aguardar a stream completar
 */