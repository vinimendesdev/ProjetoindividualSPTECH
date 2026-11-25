var mysql = require("mysql2");

// CONEXÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

// instrucao: o comando SQL, com ? no lugar de cada valor
// valores: lista com os valores, na ordem dos ? (o mysql2 trata os valores com segurança)
function executar(instrucao, valores) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU .env.dev OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);

        conexao.connect(function (erroConexao) {
            if (erroConexao) {
                reject(erroConexao);
                return;
            }

            conexao.query(instrucao, valores, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    reject(erro);
                    return;
                }
                console.log(resultados);
                resolve(resultados);
            });
        });
    });
}

module.exports = {
    executar
};
