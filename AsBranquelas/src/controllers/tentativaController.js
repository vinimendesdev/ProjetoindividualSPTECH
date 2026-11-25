var tentativaModel = require("../models/tentativaModel");

function listarQuestoes(req, res) {
    tentativaModel.listarQuestoes()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma questão encontrada!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao listar as questões! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar questões");
        });
}

function salvar(req, res) {
    var idUsuario = req.body.idUsuario;
    var acertos = req.body.acertos;
    var erros = req.body.erros;
    var respostas = req.body.respostas;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else if (acertos == undefined) {
        res.status(400).send("A quantidade de acertos está undefined!");
    } else if (erros == undefined) {
        res.status(400).send("A quantidade de erros está undefined!");
    } else if (!Array.isArray(respostas)) {
        res.status(400).send("A lista de respostas está inválida!");
    } else {
        tentativaModel.registrarTentativa(idUsuario, acertos, erros)
            .then(function (resultadoTentativa) {
                var idTentativa = resultadoTentativa.insertId;

                var promessasRespostas = respostas.map(function (item) {
                    return tentativaModel.registrarResposta(
                        idTentativa,
                        item.fkQuestao,
                        item.alternativaEscolhida,
                        item.acertou
                    );
                });

                return Promise.all(promessasRespostas).then(function () {
                    res.status(201).json({
                        mensagem: "Tentativa registrada com sucesso!",
                        idTentativa: idTentativa
                    });
                });
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao salvar a tentativa! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage || "Erro ao salvar tentativa no banco");
            });
    }
}

module.exports = {
    listarQuestoes,
    salvar
};
