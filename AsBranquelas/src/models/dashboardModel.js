var database = require("../database/config");

function buscarKpis(idUsuario) {
    var instrucaoSql = `
        SELECT 
            COUNT(*) AS total_tentativas,
            COALESCE(MAX(acertos), 0) AS melhor_pontuacao,
            COALESCE(ROUND(AVG(acertos), 1), 0) AS media_acertos,
            COALESCE(ROUND(SUM(acertos) / NULLIF(SUM(acertos + erros), 0) * 100, 1), 0) AS aproveitamento,
            (SELECT COUNT(*) FROM questao) AS total_questoes
        FROM tentativa
        WHERE fk_usuario = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idUsuario]);
}

function buscarEvolucao(idUsuario) {
    var instrucaoSql = `
        SELECT * FROM (
            SELECT 
                id,
                acertos,
                erros,
                DATE_FORMAT(momento, '%d/%m %H:%i') AS data_hora
            FROM tentativa
            WHERE fk_usuario = ?
            ORDER BY id DESC
            LIMIT 10
        ) AS ultimas
        ORDER BY id ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idUsuario]);
}

function buscarDesempenhoGeral(idUsuario) {
    var instrucaoSql = `
        SELECT 
            COALESCE(SUM(acertos), 0) AS total_acertos,
            COALESCE(SUM(erros), 0) AS total_erros
        FROM tentativa
        WHERE fk_usuario = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idUsuario]);
}

function buscarQuestoesMaisErradas() {
    var instrucaoSql = `
        SELECT 
            q.id,
            q.enunciado,
            COUNT(*) AS total_erros
        FROM resposta r
        JOIN questao q ON q.id = r.fk_questao
        WHERE r.acertou = 0
        GROUP BY q.id, q.enunciado
        ORDER BY total_erros DESC
        LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKpis,
    buscarEvolucao,
    buscarDesempenhoGeral,
    buscarQuestoesMaisErradas
};
