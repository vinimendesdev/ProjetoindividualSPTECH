var express = require("express");
var router = express.Router();

var tentativaController = require("../controllers/tentativaController");

router.get("/questoes", function (req, res) {
    tentativaController.listarQuestoes(req, res);
});

router.post("/salvar", function (req, res) {
    tentativaController.salvar(req, res);
});

module.exports = router;
