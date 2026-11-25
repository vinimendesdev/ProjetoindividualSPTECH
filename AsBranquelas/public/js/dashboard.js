var chartEvolucao = null;
var chartDesempenho = null;
var chartErradas = null;

function carregarDashboard() {
    var idUsuario = sessionStorage.ID_USUARIO;

    if (!idUsuario) {
        return;
    }

    carregarKpis(idUsuario);
    carregarGraficoEvolucao(idUsuario);
    carregarGraficoDesempenho(idUsuario);
    carregarGraficoQuestoesErradas();
}

function carregarKpis(idUsuario) {
    fetch(`/dashboard/kpis/${idUsuario}`)
        .then(function (res) { return res.json(); })
        .then(function (dados) {
            var totalQuestoes = dados.total_questoes || 3;
            document.getElementById("kpi_tentativas").innerText = dados.total_tentativas;
            document.getElementById("kpi_recorde").innerText = `${dados.melhor_pontuacao} / ${totalQuestoes}`;
            document.getElementById("kpi_media").innerText = dados.media_acertos;
            document.getElementById("kpi_aproveitamento").innerText = `${dados.aproveitamento}%`;
        })
        .catch(function (erro) {
            console.error("Erro ao carregar KPIs:", erro);
        });
}

function carregarGraficoEvolucao(idUsuario) {
    fetch(`/dashboard/evolucao/${idUsuario}`)
        .then(function (res) { return res.json(); })
        .then(function (dados) {
            var labels = dados.map(function (item, idx) {
                return `Tentativa ${idx + 1} (${item.data_hora})`;
            });
            var valores = dados.map(function (item) {
                return item.acertos;
            });

            var ctx = document.getElementById("graficoEvolucao").getContext("2d");
            if (chartEvolucao) chartEvolucao.destroy();

            chartEvolucao = new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Acertos",
                        data: valores,
                        borderColor: "#E91E63",
                        backgroundColor: "rgba(233, 30, 99, 0.14)",
                        borderWidth: 2,
                        tension: 0.25,
                        fill: true,
                        pointBackgroundColor: "#0762C8",
                        pointRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: "#455a64", stepSize: 1 },
                            grid: { color: "#eceff1" }
                        },
                        x: {
                            ticks: { color: "#455a64" },
                            grid: { display: false }
                        }
                    },
                    plugins: {
                        legend: { labels: { color: "#263238" } }
                    }
                }
            });
        })
        .catch(function (erro) {
            console.error("Erro ao carregar evolução:", erro);
        });
}

function carregarGraficoDesempenho(idUsuario) {
    fetch(`/dashboard/desempenho/${idUsuario}`)
        .then(function (res) { return res.json(); })
        .then(function (dados) {
            var acertos = Number(dados.total_acertos) || 0;
            var erros = Number(dados.total_erros) || 0;

            var ctx = document.getElementById("graficoDesempenho").getContext("2d");
            if (chartDesempenho) chartDesempenho.destroy();

            chartDesempenho = new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: ["Acertos", "Erros"],
                    datasets: [{
                        data: [acertos, erros],
                        backgroundColor: ["#0762C8", "#E91E63"],
                        borderWidth: 2,
                        borderColor: "#ffffff"
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: { color: "#263238", padding: 14 }
                        }
                    }
                }
            });
        })
        .catch(function (erro) {
            console.error("Erro ao carregar desempenho:", erro);
        });
}

function carregarGraficoQuestoesErradas() {
    fetch("/dashboard/questoes-erradas")
        .then(function (res) { return res.json(); })
        .then(function (dados) {
            var labels = dados.map(function (item) {
                return item.enunciado;
            });
            var valores = dados.map(function (item) {
                return item.total_erros;
            });

            var ctx = document.getElementById("graficoQuestoesErradas").getContext("2d");
            if (chartErradas) chartErradas.destroy();

            chartErradas = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Erros",
                        data: valores,
                        backgroundColor: "#E91E63",
                        borderRadius: 4
                    }]
                },
                options: {
                    indexAxis: "y",
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: { color: "#455a64", stepSize: 1 },
                            grid: { color: "#eceff1" }
                        },
                        y: {
                            ticks: { color: "#263238" },
                            grid: { display: false }
                        }
                    },
                    plugins: {
                        legend: { labels: { color: "#263238" } }
                    }
                }
            });
        })
        .catch(function (erro) {
            console.error("Erro ao carregar questões mais erradas:", erro);
        });
}
