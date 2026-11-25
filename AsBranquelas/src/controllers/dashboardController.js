var dashboardModel = require("../models/dashboardModel");

function kpis(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.buscarKpis(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar os KPIs! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar KPIs");
        });
}

function evolucao(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.buscarEvolucao(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar a evolução! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar evolução");
        });
}

function desempenho(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.buscarDesempenhoGeral(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o desempenho! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar desempenho");
        });
}

function questoesErradas(req, res) {
    dashboardModel.buscarQuestoesMaisErradas()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar questões mais erradas! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar questões erradas");
        });
}

module.exports = {
    kpis,
    evolucao,
    desempenho,
    questoesErradas
};
