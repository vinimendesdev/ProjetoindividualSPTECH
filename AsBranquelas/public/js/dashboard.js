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
                        borderColor: "#ff4da6",
                        backgroundColor: "rgba(255, 77, 166, 0.2)",
                        borderWidth: 3,
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: "#f5c542",
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: "#cbd5e1", stepSize: 1 },
                            grid: { color: "rgba(255,255,255,0.08)" }
                        },
                        x: {
                            ticks: { color: "#cbd5e1" },
                            grid: { display: false }
                        }
                    },
                    plugins: {
                        legend: { labels: { color: "#f8fafc" } }
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
                        backgroundColor: ["#ff4da6", "#4a1d3a"],
                        borderColor: ["#ff80bf", "#7a2e5f"],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: { color: "#f8fafc", padding: 16 }
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
                        label: "Quantidade de Erros",
                        data: valores,
                        backgroundColor: "#f5c542",
                        borderRadius: 6
                    }]
                },
                options: {
                    indexAxis: "y",
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: { color: "#cbd5e1", stepSize: 1 },
                            grid: { color: "rgba(255,255,255,0.08)" }
                        },
                        y: {
                            ticks: { color: "#cbd5e1" },
                            grid: { display: false }
                        }
                    },
                    plugins: {
                        legend: { labels: { color: "#f8fafc" } }
                    }
                }
            });
        })
        .catch(function (erro) {
            console.error("Erro ao carregar questões mais erradas:", erro);
        });
}
