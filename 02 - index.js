import { FinanciamentoCarencia } from "./05 - financiamentoCarencia.js";
import { Financiamento } from "./03 - financiamento.js";// mesmo diretorio

const comCarencia = document.querySelector('#comCarencia');
const listaSuspensa = document.querySelector('#listaSuspensa');
const corpoTabela = document.querySelector('#corpoTabela');
const botaoCalcular = document.querySelector('#botaoCalcular');
const textoValor = document.querySelector('#textoValor');
const textoEntrada = document.querySelector('#textoEntrada');
const textoTaxaJuros = document.querySelector('#textoTaxaJuros');
const textoPrazo = document.querySelector('#textoPrazo');

comCarencia.addEventListener('change', function () { // sempre que o elemento mudar (o checkbox)
    // se este elemento estiver com a propriedade CHECKED  ira remover o atributo selecionado abaixo
    if (this.checked) {
        listaSuspensa.removeAttribute('hidden');
    } else { //se nao, quando estiver sem o aributo CHECKED, o atributo HIDDEN sera adicionado novamente.
        listaSuspensa.setAttribute('hidden', 'hidden');
    }
});
function limpaCorpoDaTabela (){
    // enquanto ele tiver filho, remove o filho;
    while(corpoTabela.firstChild){
        // vai remover um filho, o filho removido será o passado no parametro
        corpoTabela.removeChild(corpoTabela.firstChild);
    }
}

botaoCalcular.addEventListener('click', function () {
    limpaCorpoDaTabela();
    const valor = parseFloat(textoValor.value);
    const entrada = parseFloat(textoEntrada.value);
    const taxaJuros = parseFloat(textoTaxaJuros.value);
    const prazo = parseFloat(textoPrazo.value);

    let simulacao;

    if (comCarencia.checked) {
        // pegando o valor da lista supensa e convertendo pra numero
        const carencia = parseInt(listaSuspensa.value);
        simulacao = new FinanciamentoCarencia(valor, entrada, taxaJuros, prazo, carencia);
        
    }else{
         simulacao = new Financiamento(valor, entrada, taxaJuros, prazo);
    }
    simulacao.calcParcelasMensais();
    simulacao.exibeParcelas();
});