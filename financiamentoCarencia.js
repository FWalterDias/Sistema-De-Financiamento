import { Financiamento } from "./financiamento.js";
import { Parcela } from "./parcela.js";

export class FinanciamentoCarencia extends Financiamento {
    #carencia;
    #taxaJuros;
    #parcelas = [];
    constructor(valor, entrada, taxaJuros, prazo, carencia) {
        super(valor, entrada, taxaJuros, prazo);// passando os dados para serem calculados pela superclasse
        this.#taxaJuros = taxaJuros;
        this.#parcelas = super.getParcelas(); // pegando as parcelas da superclasse -- recebe a referencia do array de parcelas
        this.#carencia = carencia;
    }

    calcParcelasMensais() {
        // Sera pego sempre o ultimo valor do OBJETO parcela, que herda seu métodos e atributos, por isso é possivel utlizar o metodo GetSaldo()
        let saldo = this.#parcelas[0].getSaldo();

        //calculando as parcelas com carencia
        for (let i = 0; i < this.#carencia; i++) {
            // qual o numero da parcela (tamanho do vetor das parcelas);
            const numero = this.#parcelas.length;

            saldo += Financiamento.calcJuros(saldo, this.#taxaJuros);

            this.#parcelas.push(new Parcela(numero, 0, 0, 0, saldo));
        }

        // após calcular os meses com carencia, chamamos o calculo das parcelas normais
        super.calcParcelasMensais();
    }
}