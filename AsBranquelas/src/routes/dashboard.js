var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/kpis/:idUsuario", function (req, res) {
    dashboardController.kpis(req, res);
});

router.get("/evolucao/:idUsuario", function (req, res) {
    dashboardController.evolucao(req, res);
});

router.get("/desempenho/:idUsuario", function (req, res) {
    dashboardController.desempenho(req, res);
});

router.get("/questoes-erradas", function (req, res) {
    dashboardController.questoesErradas(req, res);
});

module.exports = router;
