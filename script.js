const html = document.querySelector('html')
const btnFoco = document.querySelector('.app__card-button--foco')
const btnDescansoCurto = document.querySelector('.app__card-button--curto')
const btnDescansoLongo = document.querySelector('.app__card-button--longo')
const img = document.querySelector('.app__image')
const texto = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const btnStartPause = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const btnIniciarOuPausar = document.querySelector('#start-pause span')
const imgIcon = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const somDePlay = new Audio('/sons/play.wav')
const somDePause = new Audio('/sons/pause.mp3')
const somDeNotificacao = new Audio('/sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

btnFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    btnFoco.classList.add('active')
})

btnDescansoCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    btnDescansoCurto.classList.add('active')
})

btnDescansoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    btnDescansoLongo.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    img.setAttribute('src', `/image/${contexto}.png`)
    switch (contexto) {
        case "foco":
            texto.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `

            break;
        case "descanso-curto":
            texto.innerHTML = `
            Que tal dar uma respirada?
                <strong class="app__title-strong">Faça uma pausa curta</strong>
            `

            break;
        case "descanso-longo":
            texto.innerHTML = `Hora de voltar à superfície.
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somDeNotificacao.play()
        alert('Temporizador finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

btnStartPause.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        somDePause.play()
        zerar()
        return
    }
    somDePlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    btnIniciarOuPausar.textContent = "Pausar"
    imgIcon.setAttribute('src', `/image/pause.png`)
}

function zerar() {
    clearInterval(intervaloId)
    btnIniciarOuPausar.textContent = "Começar"
    imgIcon.setAttribute('src', `/image/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()



