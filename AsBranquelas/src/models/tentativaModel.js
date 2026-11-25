var database = require("../database/config");

function listarQuestoes() {
    var instrucaoSql = `
        SELECT id, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, resposta
        FROM questao
        ORDER BY id ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrarTentativa(fkUsuario, acertos, erros) {
    var instrucaoSql = `
        INSERT INTO tentativa (fk_usuario, acertos, erros)
        VALUES (?, ?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [fkUsuario, acertos, erros]);
}

function registrarResposta(fkTentativa, fkQuestao, alternativaEscolhida, acertou) {
    var instrucaoSql = `
        INSERT INTO resposta (fk_tentativa, fk_questao, alternativa_escolhida, acertou)
        VALUES (?, ?, ?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [fkTentativa, fkQuestao, alternativaEscolhida, acertou]);
}

module.exports = {
    listarQuestoes,
    registrarTentativa,
    registrarResposta
};
