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

  select(table, search) {
    //retorna todos os dados da tabela

    //esta tabela[procura o nome da tabela que vou inserir o dado] se nao tiver retorna um arr vazio
    let data = this.#database[table] ?? []

    if(search) {
      data = data.filter(row => {
        //metodo entries converte o objeto em array, da seguinte forma:
        //{ name: "Thiago", email: "thiago"}
        //[ ['name', 'Thiago'], ['email': 'thiago'] ]

        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

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

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data};
      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}