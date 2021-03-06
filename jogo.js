let frames = 0
const som_HIT = new Audio()
som_HIT.src = "./efeitos/hit.wav"

const sprites = new Image()
sprites.src = "sprites.png"

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

const telaInicio = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura
        )
    }
}
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
        contexto.fillStyle = "#70c5ce"
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura
        )
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            (this.x + this.largura), this.y,
            this.largura, this.altura
        )
    }
}

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha(){
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura
        )
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            (this.x + this.largura), this.y,
            this.largura, this.altura
        )
    }
}

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
        flappyBird.y = flappyBird.y + flappyBird.velocidade
    },
    desenha() {
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura
        )
    }
}

let telaAtiva = {}
function mudarParaTela(novaTela){
    telaAtiva = novaTela
}
const Telas = {
    INICIO: {
        desenha() {
            planoDeFundo.desenha()
            chao.desenha()
            flappyBird.desenha()
            telaInicio.desenha()
        },
        click() {
            mudarParaTela(Telas.JOGO)
        },
        atualiza() {

        }
    }
}

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha()
        chao.desenha()
        flappyBird.desenha()
    },
    atualiza() {
        flappyBird.atualiza() 
    }
}
function loop() {
    telaAtiva.desenha()
    telaAtiva.atualiza()
    requestAnimationFrame(loop)
}

window.addEventListener("click", () => {
    if(telaAtiva.click){
        telaAtiva.click()
    }
})
mudarParaTela(Telas.INICIO)
loop()