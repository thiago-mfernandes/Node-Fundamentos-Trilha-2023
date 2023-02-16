import fs from 'node:fs/promises'

//local onde vou guardar meu database
const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  //essa cerquilha torna esta propriedade privada
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8').then(data => {
      this.#database = JSON.parse(data);
    })
    .catch(() => {
      this.#persist()
    })
  }

  //persiste os dados em um arquivo fisico
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    //retorna todos os dados da tabela

    //esta tabela[procura o nome da tabela que vou inserir o dado] se nao tiver retorna um arr vazio
    const data = this.#database[table] ?? []

    return data;
  }

  insert(table, data) {
    //insere dados

    //se este tabela existe na minha database
    if(Array.isArray(this.#database[table])) {
      //adicionar nesta tabela[tablea] meu novo item
      this.#database[table].push(data)
    } else {
      //vou criar um novo array com a minha tabela
      this.#database[table] = [data]
    }

    this.#persist();

    return data;
  }
}