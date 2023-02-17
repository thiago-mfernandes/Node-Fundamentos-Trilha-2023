
/**
 * 1. modulo http possui funcionalidades para construcao de recursos de http - Aplicaçcões API;
 * 2. exportacao CommonJs => require();
 * 3. ESModules => import/export - Por padrao o Node nao suporta ESModules
 */
 
import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-quey-params.js';



/**
 * 1. essa fn recebe dois parametros: request e response
 * 2. REQUEST: sao as informacoes de quem esta chamando nosso servidor e os dados que vem junto
 * 3. RESPONSE: devolve uma resposta pra quem chamou o servidor
 */
const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  

  await json(req, res)

  //quando houver uma requisicao, vou procurar no arquivo de rotas se o metodo e url existem
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })
  //se existir, chamo a funcao da rota especifica
  if(route) {
    //aqui eu procuro quais dados vieram na minha rota
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
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
 * 
 * 
 * FORMAS DE ENVIAR INFORMACOES PARA A API:
 * 
 *                                                key(userId)=value(1)&key(userId)=value(1)
 * query parameters : http://localhost:3333/users?userId=1
 * 
 * route parameters : indentificacao de recurso
 *                    http://localhost:3333/users/1
 * 
 * request body : envio de informacoes por https
 */

