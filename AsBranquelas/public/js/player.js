document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audioThousandMiles");
    const btnPlayPause = document.getElementById("btnPlayPause");
    const barraProgresso = document.getElementById("barraProgresso");
    const tempoAtual = document.getElementById("tempoAtual");
    const tempoTotal = document.getElementById("tempoTotal");
    const controleVolume = document.getElementById("controleVolume");
    const btnMute = document.getElementById("btnMute");
    const discoPlayer = document.getElementById("discoPlayer");

    if (!audio) return;

    audio.volume = Number(controleVolume.value);

    function formatarTempo(segundos) {
        if (isNaN(segundos) || !isFinite(segundos)) return "0:00";
        const min = Math.floor(segundos / 60);
        const seg = Math.floor(segundos % 60);
        return `${min}:${seg < 10 ? "0" : ""}${seg}`;
    }

    audio.addEventListener("loadedmetadata", function () {
        tempoTotal.textContent = formatarTempo(audio.duration);
    });

    btnPlayPause.addEventListener("click", function () {
        if (audio.paused) {
            audio.play()
                .then(function () {
                    btnPlayPause.textContent = "⏸";
                    discoPlayer.classList.add("girando");
                })
                .catch(function (erro) {
                    console.error("Erro ao reproduzir áudio:", erro);
                });
        } else {
            audio.pause();
            btnPlayPause.textContent = "▶";
            discoPlayer.classList.remove("girando");
        }
    });

    audio.addEventListener("timeupdate", function () {
        if (audio.duration) {
            barraProgresso.value = (audio.currentTime / audio.duration) * 100;
            tempoAtual.textContent = formatarTempo(audio.currentTime);
        }
    });

    barraProgresso.addEventListener("input", function () {
        if (audio.duration) {
            audio.currentTime = (barraProgresso.value / 100) * audio.duration;
        }
    });

    controleVolume.addEventListener("input", function () {
        audio.volume = Number(controleVolume.value);
        audio.muted = audio.volume === 0;
        btnMute.textContent = audio.muted ? "🔇" : "🔊";
    });

    btnMute.addEventListener("click", function () {
        audio.muted = !audio.muted;
        btnMute.textContent = audio.muted ? "🔇" : "🔊";
    });

    audio.addEventListener("ended", function () {
        btnPlayPause.textContent = "▶";
        discoPlayer.classList.remove("girando");
        barraProgresso.value = 0;
        tempoAtual.textContent = "0:00";
    });
});
