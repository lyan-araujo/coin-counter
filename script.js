let g_ckModoNoturno = document.getElementById('lblModoNoturno');

// FUNÇÃO DO MODO NOTURNO
g_ckModoNoturno.addEventListener('change',(e) => {
    // PEGA O ELEMENTO QUE CONTEM O PSEUDO-ATRIBUTO 'data-theme-color' E MUDA O VALOR DO MESMO ATRIBUTO COM BASE NO ESTADO DO g_ckModoNoturno
    document.querySelector('[data-theme-color]').setAttribute('data-theme-color', (g_ckModoNoturno.checked ? 'light' : 'dark'));
});

// CARREGA QUANDO A PÁGINA É CARREGADA
window.addEventListener('load', (event) =>{
    CriarModelos();
});

// CRIA AS CÉCULAS DE MODELO DAS MOEDAS COM BASE NOS DADOS OBTIDOS PELA FUNÇÃO '_Dineiro.getModelos()'
function CriarModelos() {
    let _container = document.querySelector('#container');
    let _modelos = _Dinheiro.getModelos();
    if(_modelos){
        for (const _modelo of _modelos) {
            let _htmlContainer =`
            <div class="container_dinheiro">
                <label for="${_modelo.id}" class="labelImg"><img src="${_modelo.img}" onclick="(${_modelo.id}.value++), AtualizaValor(${_modelo.id})"></label>
                <label for="${_modelo.id}" class="labelValue">${ConvertToBRL(_modelo.valor)}</label>
                <input type="number" min="0" value="0" max="10000000000000000" id="${_modelo.id}" class="inputValue">
                <input type="text" class="spanTotal" value="Total: R$ 0,00" data-span-for="${_modelo.id}" readonly/>
                <button class="btnLimparUm" onclick="ApagarUm(${_modelo.id})"><img src="img/trash_placeholder.png"/></button>
                <span class="spanAtalho">${_modelo.atalho}</span>
            </div>
            ` 
            _container.insertAdjacentHTML("beforeend", _htmlContainer);
        }
        ChangeInput();
    }
}

function ChangeInput() {
    let _inptValues = document.querySelectorAll('.inputValue');

    _inptValues.forEach(_inputAtual =>{
        _inputAtual.addEventListener('input', ()=> AtualizaValor(_inputAtual));
    });
}

function AtualizaValor(DOMInput){
    if((DOMInput.value == "")||(!DOMInput.value)){
        DOMInput.value = parseInt(DOMInput.getAttribute('min'), 10);
    }

    if(DOMInput.value > parseInt(DOMInput.max)){
        DOMInput.value = Math.min(parseInt(DOMInput.max), parseInt(DOMInput.value) || 0);
    }

    _Dinheiro.setModelos();
}

function ApagarTodos() {
    let _inptValues = document.querySelectorAll('.inputValue');
    for (const _inptValue of _inptValues) {
            _inptValue.value = 0;
    }
    _Dinheiro.setModelos();
}

function ApagarParte(ModeloAtual) {
    let _inptValues = document.querySelectorAll('.inputValue');
    let _modelos = _Dinheiro.getModelos();

    if(ModeloAtual) {
        for (const _inputValue of _inptValues) {
            for (const _modelo of _modelos) {
                if (_modelo.id == _inputValue.id) {
                    if(ModeloAtual == "moedas") {
                        _inputValue.value = (_modelo.valor <= 1 ? 0 : _inputValue.value);
                    }
                    if(ModeloAtual == "cedulas") {
                        _inputValue.value = (_modelo.valor > 1 ? 0 : _inputValue.value);            
                    }
                    
                }
            }
        }

    }

    _Dinheiro.setModelos();
}

function ApagarUm(DOMInput) {
    if(DOMInput){
        DOMInput.value = 0;
    }

    _Dinheiro.setModelos();
}


// RECEBE UM VALOR E RETORNA CONVERTIDO PARA O FORMATO DA MOEDA BRASILEIRA
function ConvertToBRL(INT_VALUE) {
    let _intValue = INT_VALUE.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    return _intValue;
}

let _Dinheiro = {
    _DadosDinheiro : [
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "umCent",
            img : 'img/1_centavo.png',
            valor : 0.01,
            total : 0,
            atalho : "Q"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cincoCent",
            img : 'img/5_centavos.png',
            valor : 0.05,
            total : 0,
            atalho : "W"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "dezCent",
            img : 'img/10_centavos.png',
            valor : 0.10,
            total : 0,
            atalho : "E"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "vinCinCent",
            img : 'img/25_centavos.png',
            valor : 0.25,
            total : 0,
            atalho : "R"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cinquentaCent",
            img : 'img/50_centavos.png',
            valor : 0.50,
            total : 0,
            atalho : "T"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "umReal",
            img : 'img/1_real.png',
            valor : 1,
            total : 0,
            atalho : "Y"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "doisReais",
            img : 'img/02_reais.png',
            valor : 2,
            total : 0,
            atalho : "A"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cincoReais",
            img : 'img/05_reais.png',
            valor : 5,
            total : 0,
            atalho : "S"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "dezReais",
            img : 'img/10_reais.png',
            valor : 10,
            total : 0,
            atalho : "D"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "vinteReais",
            img : 'img/20_reais.png',
            valor : 20,
            total : 0,
            atalho : "F"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cinquentaReais",
            img : 'img/50_reais.png',
            valor : 50,
            total : 0,
            atalho : "G"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cemReais",
            img : 'img/100_reais.png',
            valor : 100,
            total : 0,
            atalho : "H"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "duzentosReais",
            img : 'img/200_reais.png',
            valor : 200,
            total : 0,
            atalho : "J"
        }
    ],
    _ValorTotal : {
        totalDinheiro : 0,
        totalCedulas : 0,
        totalMoedas: 0
    },
    getModelos : ()=>{
        return _Dinheiro._DadosDinheiro;
    },
    setModelos : ()=>{
        let _inptValues = document.querySelectorAll('.inputValue');
        let _modelos = _Dinheiro.getModelos();
        let [_ttlCedula, _ttlMoeda] = [0,0];
        let _valoresTotais = _Dinheiro._ValorTotal;
        
        //ATRIBUI O VALOR TOTAL DOS MODELOS RELATIVO A MULTIPLICAÇÃO DO VALOR DO INPULT COM O VALOR DA MOEDA (3 MOEDAS DE 25 = 3 x 0.25)
        for (const _inptValue of _inptValues) {
            for (const _modelo of _modelos) {
                if (_inptValue.id == _modelo.id) {
                    _modelo.total = (_inptValue.value * _modelo.valor);
                    
                    if(_modelo.valor <=1){
                        _ttlMoeda += _modelo.total;
                    } else {
                        _ttlCedula += _modelo.total;
                    }
                }
            }            
        }

        _valoresTotais.totalDinheiro = (_ttlCedula + _ttlMoeda);
        _valoresTotais.totalCedulas = _ttlCedula;
        _valoresTotais.totalMoedas = _ttlMoeda;

        _Dinheiro.atualizaModelos();
    },
    atualizaModelos : () =>{
        let [_Modelos, _DisplayModelosTotais] = [_Dinheiro.getModelos(), document.querySelectorAll('.spanTotal')];
        let [_DisplayTotalDinheiro, _DisplayTotalCedula, _DisplayTotalMoeda] = [
            document.querySelector('#idTotalDinheiro'),
            document.querySelector('#idTotalCedulas'),
            document.querySelector('#idTotalMoedas')
        ];
        // ATUALIZAR DISPLAY DE VALORES TOTAIS 
        _DisplayTotalDinheiro.value  = ConvertToBRL(_Dinheiro._ValorTotal.totalDinheiro);
        _DisplayTotalCedula.value = ConvertToBRL(_Dinheiro._ValorTotal.totalCedulas);
        _DisplayTotalMoeda.value = ConvertToBRL(_Dinheiro._ValorTotal.totalMoedas);

        //ATUALIZA VALORES INDIVIDUAIS
        for (const modelo of _Modelos) {
            for (const display of _DisplayModelosTotais) {
                if(modelo.id == display.getAttribute('data-span-for')){
                    display.value = `Total: ${ConvertToBRL(modelo.total)}`;
                }
            }
        }
    }
};