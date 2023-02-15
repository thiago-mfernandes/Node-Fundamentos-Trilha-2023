
/**
 * 1. modulo http possui funcionalidades para construcao de recursos de http - Aplicaçcões API;
 * 2. exportacao CommonJs => require();
 * 3. ESModules => import/export - Por padrao o Node nao suporta ESModules
 */
 
import http from 'node:http';

const users = [];

/**
 * 1. essa fn recebe dois parametros: request e response
 * 2. REQUEST: sao as informacoes de quem esta chamando nosso servidor e os dados que vem junto
 * 3. RESPONSE: devolve uma resposta pra quem chamou o servidor
 */
const server = http.createServer((req, res) => {
  const { method, url } = req;

   if( method === 'GET' && url === '/users') {
    
    return res
    //Content-type: qual tipo de conteudo
    //application/json: tipo do conteudo
    .setHeader('Content-type', 'application/json')
    //json stringfy transforma meu array em um json(string)
    .end(JSON.stringify(users))
   }

   if( method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      name: 'johndoe@example.com',
    })
    return res.writeHead(201).end()
   }
  
  return res.writeHead(404).end()
})

server.listen(3333); //localhost:3333

/**
 * 
 * O QUE SAO ROTAS?
 * 
 * Sao caminhos de entrada pra dentro da API.
 * A aplicacao sao meios de entrada e formas do front ou outros, executar operacoes:
 * 1. rota para criacao de usuarios
 * 2. rota para edicao de usuarios
 * 3. rota para exclusao de usuarios
 * 4. rota para leitura de usuarios
 * 
 * 
 * COMO FUNCIONA UMA REQUISICAO HTTP?
 * 
 * Composta de dois principais recursos: o metodo http e a url
 * obtenho de dentro da minha req o metodo e a url
 * const { method, url } = req;
 * 
 * 
 * METODOS HTTP
 * 
 * GET => buscar uma informacao do back-end, uma lista de usuarios
 * POST => criar uma informacao no back-end, um usuario
 * PUT => editar ou atualizar um recurso no back-end
 * PATCH => atualizar uma unica informacao unica e especifica de um recurso no back-end
 * DELETE => excluir uma informacao do meu back-end
 * 
 * a soma entre metodo e url é o que diferencia minhas rotas:
 * 
 * metodo + url
 *   get  / users => buscando usuarios no back-end
 *   post / users => criando um usuario no back-end
 * 
 * Como que o front-end sabe que o backend devolveu uma resposta no formato de JSON?
 * CABECALHOS
 * 
 * TAnto da requisicao como da resposta, sao os metadados da requisicao, informacoes adicionais que nao tem haver com o dado em si, mas sim, como estes dados podem ser interpretados da melhor forma
 * 
 * HTTP STatus Code
 * 
 * A minha req e minha res sao streams onde eu posso enviar dados aos poucos
 */
