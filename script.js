let teclas = document.querySelector('.calculadora')
let visor = document.querySelector('#visor')

teclas.addEventListener('click', (event) => {
    if (!event.target.closest('button')){
        return
    }

    let valor_visor = visor.textContent
    let tecla = event.target
    let valor_tecla = tecla.textContent
    let tipoTecla = tecla.dataset.tipoTecla
    let tipoTeclaAnterior = teclas.dataset.tipoTeclaAnterior

    if (tipoTecla == 'numero'){
        if ((valor_visor == '')  || (tipoTeclaAnterior == 'operacao')){
            visor.textContent = valor_tecla
        }
        else {
            visor.textContent = visor.textContent + valor_tecla        
        }
    }
    else if (tipoTecla == 'operacao'){
        let operadores = teclas.querySelectorAll('[data-tipo-tecla="operacao"]')

        operadores.forEach ((operador) => {
            operador.dataset.estado = ''            
        })

        tecla.dataset.estado = 'selecionado'
        teclas.dataset.primeiroNumero = valor_visor
        teclas.dataset.operador = tecla.dataset.tecla
    }
    else if (tipoTecla == 'igual'){
        let primeiroNumero  = parseFloat(teclas.dataset.primeiroNumero)
        let operador = teclas.dataset.operador
        let segundoNumero = parseFloat(valor_visor)
        let resultado = ''

        if (operador == 'soma'){
            resultado = primeiroNumero + segundoNumero
        }
        if (operador == 'sub'){
            resultado = primeiroNumero - segundoNumero
        }
        if (operador == 'mult'){
            resultado = primeiroNumero * segundoNumero
        }
        if (operador == 'div'){
            resultado = primeiroNumero / segundoNumero
        }

        if (resultado % 1 > 10){
            visor.textContent = resultado.toFixed(10)
        }
        else {
            visor.textContent = resultado
        }

    }
    else if (tipoTecla == 'clear'){
        visor.textContent = ''
    }
    else if (tipoTecla == 'ponto'){
        visor.textContent = '0' + '.'
    }

    teclas.dataset.tipoTeclaAnterior = tipoTecla
})