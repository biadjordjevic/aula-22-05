// const { Pool } = require("pg");

async function connect() {  
    const { Pool } = require("pg");

    if(global.connection)
        return global.connection.connect();

    const pool = new Pool({
      user: process.env.USER_NAME,
      host: process.env.HOST_NAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT,
      port: process.env.PORT_NUMBER
    });
    
    const client = await pool.connect();
    console.log("O Pool de conexão foi criado com sucesso!")
    client.release();

    global.connection = pool;
    
    return pool.connect();
  }

  connect();


  async function selectCustomer(id) {
    // Estabelece a conexão com o banco de dados
    const client = await connect();
    // Executa a query SQL usando declaração preparada para evitar SQL Injection
    const res = await client.query("SELECT * FROM client WHERE cpf=$1", [id]);
    // Retorna as linhas (dados do cliente)
    return res.rows;
    }
  async function insertCustomer(customer) {
    const client = await connect();
    const sql = "INSERT INTO client (cpf, nome, email, idade, profissao) VALUES ($1, $2, $3, $4, $5);";
    const values = [customer.cpf, customer.nome, customer.email, customer.idade, customer.profissao];
  
    await client.query(sql, values);
  }

  // Função para excluir cliente
async function deleteCustomer(id) {
  // Estabelecer conexão
  const client = await connect();
  // parâmetros que devem ser injetados
  const sql = "DELETE FROM client WHERE cpf=$1";
  const values = [id];
  
  await client.query(sql, values)
  }

  module.exports = {

    insertCustomer,
    selectCustomer,
    deleteCustomer
  }
