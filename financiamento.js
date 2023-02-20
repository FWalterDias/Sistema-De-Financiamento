
import { Parcela } from "./parcela.js";// mesmo diretorio

// USANDO COMPOSIÇÃO //

export class Financiamento {
    #taxaJuros; //juros mensais
    #prazo; // em meses
    #parcelas = [];
    constructor(valor, entrada, taxaJuros, prazo) {
        this.#taxaJuros = taxaJuros;
        this.#prazo = prazo;

        //serao instanciados novas parcelas a partir da classe PARCELA, e serão automaticamente adicionadas no atributo Parcelas
        this.#parcelas.push(new Parcela(0, 0, 0, 0, valor - entrada)); // para a PRIMEIRA PARCELA será mostrado apenas o valor devedor
    }

    //método estatico para calcular juros
    static calcJuros(valor, taxaJuros) {
        return valor * (taxaJuros / 100);
    }



    //metodo para calcular as parcelas mensais (precisa do saldo que esta na classe PARCELA)
    calcParcelasMensais() {
        // Sera pego sempre o ultimo valor do OBJETO parcela, que herda seu métodos e atributos, por isso é possivel utlizar o metodo GetSaldo()
        let saldo = this.#parcelas[this.#parcelas.length - 1].getSaldo();

        //no primeiro momemnto, isso sera ignorado, porque o calculo do prazo (12) menos o tamanho do vetor (1-1), sera os meses que faltam. Ao passo que os meses (o tamanho do array) aumenta, o prazo vai diminuindo.
        let prazo = this.#prazo - (this.#parcelas.length - 1);

        //valor abatido mês a mês (parcela)
        let amortizacao = saldo / prazo;

        for (let i = 0; i < prazo; i++) {
            // qual o numero da parcela (tamanho do vetor das parcelas);
            const numero = this.#parcelas.length;

            //utilizando o metodo estatico da propria classe
            const juros = Financiamento.calcJuros(saldo, this.#taxaJuros);

            //vvalor daquela parcela
            const valor = juros + amortizacao;

            // se o saldo for negativo devido o fm das parcelas, o valor será 0
            saldo -= amortizacao;
            if (saldo < 0) { saldo = 0; }

            //criando a PROXIMA PARCELA
            this.#parcelas.push(new Parcela(numero, valor, juros, amortizacao, saldo));
        }
    }

    exibeParcelas() {
        // será copiado o arrai para a variável, A PARTIR da posição 1, passado pelo método slice.
        const parcelas = this.#parcelas.slice(1);

        for (let parcela of parcelas) {
            //pegando o elemento body da tabela, e adicionando uma linha no final dela
            const linha = corpoTabela.insertRow(-1);

            //a vaiavel PARCELA derivada do objeto PARCELAS, tem acesso ao metodo getDadosFormatados pq ela herdou da classe PARCELA do outro arquivo Parcela.js
            for (let dado of parcela.getDadosFormatdos()) {//o objeto parcela aqui terá varios valores retornados do metodo getDadosFormatados

                // aqui estamos criando uma variavel CELULA e ela sera inserida no final da linha que acabamos de criar acima.
                const celula = linha.insertCell(-1);

                // dentro dessa celula será inserido a variável dado
                celula.textContent = dado;
            }
        }
    }

    getParcelas(){
        return this.#parcelas;
    }
}