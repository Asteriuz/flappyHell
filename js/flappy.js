const tubos = document.querySelector(".tubos")
const tubo = document.querySelector(".tubo")
const bird = document.querySelector(".bird")
const flappy = document.querySelector("[wm-flappy]")
const infotext = document.querySelector(".infoPlay")
const score = document.querySelector(".score")
const background = document.querySelector("#animatedBackground")
let cima = document.querySelector(".cima")
let baixo = document.querySelector(".baixo")

const sfxPoint = new Audio("./audio/Everything/sfx_point.wav")
const sfxDie = new Audio("./audio/Everything/sfx_die.wav")
const sfxBackground = new Audio("./audio/background.wav")
const sfxThunder = new Audio("./audio/thunder.mp3")
sfxBackground.loop = true
sfxBackground.volume = 0.2
sfxPoint.volume = 0.2


tubo.children[0].style.height = Math.floor(Math.random() * (415 - 0)) + 0 + "px"

var birdpos = 300
var rising = false
var running = false
var gameover = false
var moverTubo
var moveTubo
var hell = false
var velocidadeTubo = 1
var birdVelMultiplier = 1

const play = () => {
    sfxBackground.play()
    let pos = 0
    let horaDoTubo = 400
    let horaDeSumir = -1200
    let tuboslide = setInterval(() => {
        tubos.style.right = pos + "px"
        pos = pos + velocidadeTubo
        horaDoTubo = horaDoTubo + velocidadeTubo
        horaDeSumir = horaDeSumir + velocidadeTubo
        if (horaDoTubo > 400) {
            horaDoTubo = 0
            addTubo()
        }
        if (horaDeSumir > 400) {
            horaDeSumir = 0
            tubos.children[0].remove()
        }
    }, 1)

    let birdmove = setInterval(() => {
        bird.style.bottom = birdpos + "px"
        birdpos > 0 && rising == false ? birdpos = birdpos - (1.5 * birdVelMultiplier) : null
        birdpos < 645 && rising == true ? birdpos = birdpos + (1.25 * birdVelMultiplier) : null
    }, 1)

    moveTubo = (tubo, y, ytemp, tuborising = false) => {
        moverTubo = setInterval(() => {
            tuborising == false && ytemp < (y + 70) ? ytemp += 1 : tuborising = true
            tuborising == true && ytemp > (y - 70) ? ytemp -= 1 : tuborising = false
            tubo.style.height = ytemp + "px"
        }, 10)
    }

    const fimDeJogo = () => {
        sfxBackground.pause()
        sfxDie.play()
        background.style["animation-play-state"] = "paused"
        clearInterval(tuboslide);
        clearInterval(birdmove);
        for (var i = 1; i < 1000; i++)
            window.clearInterval(i);
        gameover = true
        flappy.style.filter = "grayscale(100%)"
        // infotext.innerHTML = "Aperte espaço para jogar de novo"
    }

    const changeHell = () => {
        document.querySelector(".flashhit").style.animation = "flash ease-out 1s normal"
        sfxThunder.play()
        setTimeout(() => {
            sfxBackground.src = "audio/doomtheme.ogg"
            sfxBackground.volume = 0.6
            sfxPoint.volume = 0.2
            sfxBackground.play()
            let tubosToHell = document.querySelectorAll(".tubo")
            document.querySelector("h1").style.color = "white"
            document.querySelector("h1").innerHTML = "Flappy HELL"
            document.querySelector(".bird").src = "imgs/birdmonster.png"
            Array.from(tubosToHell).map((tubin) => Array.from(tubin.children).map(x => x.style.background = "linear-gradient(90deg, #3f0d12 0%, #a71d31 74%)"))
            document.body.style.backgroundColor = "black"
            background.style.backgroundImage = "url('imgs/hell.jpg')"
            hell = true
            velocidadeTubo = 1.25
            birdVelMultiplier = 1.3
        }, 200)
    }

    let collision = setInterval(() => {
        if (cima) var {
            x,
            y,
            width,
            height
        } = cima.getBoundingClientRect()
        if (baixo) var {
            x: x2,
            y: y2,
            width: width2,
            height: height2
        } = baixo.getBoundingClientRect()

        x -= 5
        width += 15
        height += 30

        x2 -= 5
        width2 += 15
        y2 -= 30

        if ((bird.x < x + width &&
                bird.x + bird.width > x &&
                bird.y < y + height &&
                bird.y + bird.height > y)) {
            fimDeJogo()
        }
        if ((bird.x < x2 + width2 &&
                bird.x + bird.width > x2 &&
                bird.y < y2 + height2 &&
                bird.y + bird.height > y2)) {
            fimDeJogo()
        }

        if (bird.x > x + width) {
            sfxPoint.play()
            cima.classList.remove("activeup")
            baixo.classList.remove("activedown")
            cima = document.querySelector(".activeup")
            baixo = document.querySelector(".activedown")
            score.innerHTML = Number(score.innerHTML) + 1
            hell == false && Number(score.innerHTML) >= 1 ? changeHell() : null
        }
    }, 10)
}

let tuboposition = -400
const addTubo = () => {
    let tubo2 = tubo.cloneNode(true)

    tubo2.children[0].classList.contains("movingtubo") ? null : tubo2.children[0].classList.add("movingtubo")
    tubo2.children[0].classList.contains("activeup") ? null : tubo2.children[0].classList.add("activeup")
    tubo2.children[4].classList.contains("activedown") ? null : tubo2.children[4].classList.add("activedown")

    hell == true ? Array.from(tubo2.children).map(x => x.style.background = "linear-gradient(90deg, #3f0d12 0%, #a71d31 74%)") : null

    let random = Math.floor(Math.random() * (415 - 0)) + 0
    tubo2.children[0].style.height = random + "px"

    Number(score.innerHTML) >= 3 && Number(score.innerHTML) < 8 && Math.random() > 0.8 ? tubo2.children[0].classList.contains("movingtubo") ? moveTubo(tubo2.children[0], random, random) : null : null
    Number(score.innerHTML) >= 8 && Number(score.innerHTML) < 20 && Math.random() > 0.65 ? tubo2.children[0].classList.contains("movingtubo") ? moveTubo(tubo2.children[0], random, random) : null : null
    Number(score.innerHTML) >= 20 && Number(score.innerHTML) < 30 && Math.random() > 0.5 ? tubo2.children[0].classList.contains("movingtubo") ? moveTubo(tubo2.children[0], random, random) : null : null
    Number(score.innerHTML) >= 30 && Math.random() > 0.35 ? tubo2.children[0].classList.contains("movingtubo") ? moveTubo(tubo2.children[0], random, random) : null : null

    tubo2.style.right = tuboposition + "px"
    tuboposition -= 400
    tubos.appendChild(tubo2)
}

document.addEventListener("keydown", (event) => {
    if (rising == false) {
        var name = event.key
        if (name == " ") {
            running == false ? (running = true, play(), infotext.innerHTML = "") : null
            gameover == true ? location.reload() : null
            rising = true
            bird.style.transform = "rotate(-10deg)"
        }
    }
})


document.addEventListener("keyup", (event) => {
    var name = event.key
    if (name == " ") {
        rising = false
        bird.style.transform = "rotate(10deg)"
    }
})