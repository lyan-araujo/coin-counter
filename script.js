let g_ckModoNoturno = document.querySelector('#lblModoNoturno');
let g_ckTeclasDeAtalho = document.querySelector('#lblAtalhosTeclado');

// EXECUTA QUANDO A PÁGINA É CARREGADA
window.addEventListener('load', (e) => {
    CriarModelos();
});

// EXIBE OU OCULTA OS INDICATIVOS DAS TECLAS DE ATALHO DE ACORDO COM O ESTADO DO 'g_ckTeclasDeAtalho'
// _elemento.style.visibility = (g_ckTeclasDeAtalho.checked ? 'visible' : 'hidden');
g_ckTeclasDeAtalho.addEventListener('change', (e) => {
    let _elementos = document.querySelectorAll('.spanAtalho');
    for (const _elemento of _elementos) {
        _elemento.style.visibility = (g_ckTeclasDeAtalho.checked ? 'visible' : 'hidden');
    }
})

// ATALHOS DE TECLADO
// FUNCIONA APENAS SE 'g_ckTeclasDeAtalho.checked == true'
// PEGA O 'event.code' E COMPARA COM TODOS OS MODELOS E, SE TRUE, EXECUTA UM EVENTO '.click()'
// SE TRUE, CHAMA 'AtualiazaValor()' COM O ELEMENTO CLICADO
document.addEventListener('keypress', (e) =>{
    if(g_ckTeclasDeAtalho.checked){
        let _modelos = _Dinheiro.getModelos();
        for (const _modelo of _modelos) {
            if(_modelo.atalho.code == e.code){
                let _element = document.getElementById(_modelo.id);
                _element.value++;
                AtualizaValor(_element);
            }
        }
    }
});

// FUNÇÃO DO MODO NOTURNO
// EXECUTA SEMPRE QUE 'g_ckModoNoturno' MUDA SEU ESTADO
// PEGA O ELEMENTO QUE CONTEM O PSEUDO-ATRIBUTO 'data-theme-color' E MUDA O VALOR DO MESMO ATRIBUTO COM BASE NO ESTADO DO 'g_ckModoNoturno'
g_ckModoNoturno.addEventListener('change',(e) => {
    document.querySelector('[data-theme-color]').setAttribute('data-theme-color', (g_ckModoNoturno.checked ? 'light' : 'dark'));
});

// FUNÇÃO QUE CRIA AS CELULAS DO GRID
// CRIA AS CÉCULAS DE MODELO DAS MOEDAS E CEDULAS COM BASE NOS DADOS OBTIDOS PELA FUNÇÃO '_Dineiro.getModelos()'
// CHAMA A FUNÇÃO 'ChangeInput()'
function CriarModelos() {
    let _container = document.querySelector('#container');
    let _modelos = _Dinheiro.getModelos();
    if(_modelos){
        for (const _modelo of _modelos) {
            let _htmlContainer =`
            <div class="container_dinheiro">
                <label for="${_modelo.id}" class="labelImg"><img src="${_modelo.img}" onclick="(${_modelo.id}.value++), AtualizaValor(${_modelo.id})"></label>
                <label for="${_modelo.id}" class="labelValue">${ConvertToBRL(_modelo.valor)}</label>
                <input type="number" min="0" value="0" max="10000000000000000" id="${_modelo.id}" class="inputValue" oninput='AtualizaValor(this)'>
                <input type="text" class="spanTotal" value="Total: R$ 0,00" data-span-for="${_modelo.id}" readonly/>
                <button class="btnLimparUm" onclick="ApagarUm(${_modelo.id})"><img src="img/trash.png"/></button>
                <span class="spanAtalho">${_modelo.atalho.char}</span>
            </div>
            ` 
            _container.insertAdjacentHTML("beforeend", _htmlContainer);
        }
        ChangeInput();
    }
}

// FUNÇÃO PARA ATUALIZAR OS VALORES
// NECESSARIAMENTE RECEBE UM ELEMENTO
// CASO O VALOR DO INPUT ESTEJA VAZIO, ABAIXO DE 0 OU INDEFINIDO, O VALOR É ATUALIZADO PARA 0
// CASO O VALOR DO INPUT ESTEJA ACIMA DO VALOR MAXIMO, O VALOR DO INPUT É SUBSTITUIDO PELO VALOR MAXIMO
// CHAMA A FUNÇÃO '_Dinheiro.setModelos()'
function AtualizaValor(DOMInput){
    if((DOMInput.value == "")||(DOMInput.value < 0)||(!DOMInput.value)){
        DOMInput.value = parseInt(DOMInput.getAttribute('min'), 10);
    }

    if(DOMInput.value > parseInt(DOMInput.max)){
        DOMInput.value = Math.min(parseInt(DOMInput.max), parseInt(DOMInput.value) || 0);
    }

    _Dinheiro.setModelos();
}

// FUNÇÃO PARA ZERAR TODOS OS CONTADORES
// RESUMIDAMENTE, ALTERA TODOS OS VALORES REGISTRADOS PARA 0
// CHAMA A FUNÇÃO '_Dinheiro.setModelos()'
function ApagarTodos() {
    let _inptValues = document.querySelectorAll('.inputValue');
    for (const _inptValue of _inptValues) {
            _inptValue.value = 0;
    }
    _Dinheiro.setModelos();
}

// FUNÇÃO PARA APAGAR APENAS UMA CLASSE DE DINHEIRO (MOEDAS | CEDULAS)
// RECEBE UMA STRING INDICANDO QUAL CLASSE DEVE TER OS VALORES RESETADOS
// PEGA TODOS OS ELEMENTOS DA CLASSE '.inputValue' E TODOS OS MODELOS
// COMPARA COMPARA A CLASSE COM O VALOR E ATUALIZA SEMPRE QUE FOREM SEMELHANTES
// SE A FUNÇÃO RECEBEU A STRING 'moedas' APAGARÁ TODOS OS INPUTS NA QUAL O VALOR ATRIBUIDO É <= 1
// CASO CONTRARIO APAGARÁ TODOS OS INPUTS NA QUAL O VALOR ATRIBUIDO É > 1
// CHAMA A FUNÇÃO '_Dinheiro.setModelos()'
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

// FUNÇÃO QUE APAGA APENAS UM INPUT ESPECIFICO
// E É ISSO :D
// CHAMA A FUNÇÃO '_Dinheiro.setModelos()'
function ApagarUm(DOMInput) {
    if(DOMInput){
        DOMInput.value = 0;
    }

    _Dinheiro.setModelos();
}

// FUNÇÃO PARA CONVERTER VALORES
// RECEBE UM VALOR E O RETORNA CONVERTIDO PARA O FORMATO DA MOEDA BRASILEIRA (BRL)
function ConvertToBRL(INT_VALUE) {
    let _intValue = INT_VALUE.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    return _intValue;
}

// OBJETO COM A LISTA DE MODELOS, VALORES TOTAIS E FUNÇÕES QUE CONTROLAM O OBJETO
let _Dinheiro = {
    // LISTA DE MODELOS
    _DadosDinheiro : [
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "umCent",
            img : 'img/1_centavo.png',
            valor : 0.01,
            total : 0,
            atalho : {
                char : "Q",
                code : "KeyQ"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cincoCent",
            img : 'img/5_centavos.png',
            valor : 0.05,
            total : 0,
            atalho : {
                char : "W",
                code : "KeyW"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "dezCent",
            img : 'img/10_centavos.png',
            valor : 0.10,
            total : 0,
            atalho : {
                char : "E",
                code : "KeyE"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "vinCinCent",
            img : 'img/25_centavos.png',
            valor : 0.25,
            total : 0,
            atalho : {
                char : "R",
                code : "KeyR"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cinquentaCent",
            img : 'img/50_centavos.png',
            valor : 0.50,
            total : 0,
            atalho :  {
                char : "T",
                code : "KeyT"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "umReal",
            img : 'img/1_real.png',
            valor : 1,
            total : 0,
            atalho :  {
                char : "Y",
                code : "KeyY"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "doisReais",
            img : 'img/02_reais.png',
            valor : 2,
            total : 0,
            atalho :  {
                char : "A",
                code : "KeyA"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cincoReais",
            img : 'img/05_reais.png',
            valor : 5,
            total : 0,
            atalho :  {
                char : "S",
                code : "KeyS"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "dezReais",
            img : 'img/10_reais.png',
            valor : 10,
            total : 0,
            atalho :  {
                char : "D",
                code : "KeyD"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "vinteReais",
            img : 'img/20_reais.png',
            valor : 20,
            total : 0,
            atalho :  {
                char : "F",
                code : "KeyF"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cinquentaReais",
            img : 'img/50_reais.png',
            valor : 50,
            total : 0,
            atalho :  {
                char : "G",
                code : "KeyG"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cemReais",
            img : 'img/100_reais.png',
            valor : 100,
            total : 0,
            atalho :  {
                char : "H",
                code : "KeyH"
            }
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "duzentosReais",
            img : 'img/200_reais.png',
            valor : 200,
            total : 0,
            atalho :  {
                char : "J",
                code : "KeyJ"
            }
        }
    ],
    // OS VALORES TOTAIS SÃO SEPARADOS PARA FICAR MAIS FACIL DE OBTE-LOS
    _ValorTotal : {
        totalDinheiro : 0,
        totalCedulas : 0,
        totalMoedas: 0
    },
    // FUNÇÃO QUE RETORNA A LISTA DE MODELOS
    getModelos : ()=>{
        return _Dinheiro._DadosDinheiro;
    },
    // FUNÇÃO PARA ATRIBUIR NOVOS VALORES A LISTA DE MODELOS
    //ATRIBUI O VALOR TOTAL DOS MODELOS RELATIVO A MULTIPLICAÇÃO DO VALOR DO INPULT COM O VALOR DA MOEDA (3 MOEDAS DE 25 = 3 x 0.25)
    // CHAMA FUNÇÃO '_Dinheiro.atualizaDisplay()' 
    setModelos : ()=>{
        let _inptValues = document.querySelectorAll('.inputValue');
        let _modelos = _Dinheiro.getModelos();
        let [_ttlCedula, _ttlMoeda] = [0,0];
        let _valoresTotais = _Dinheiro._ValorTotal;
        
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

        _Dinheiro.atualizaDisplay();
    },
    // FUNÇÃO PARA EXIBIR OS DADOS PARA O CLIENTE
    // PEGA TODOS OS VALORES E EXIBE ELES PARA O USUARIO PASSADOS PELA FUNÇÃO 'ConvertToBRL()' :D
    // CHAMA A FUNÇÃO 'PocketTotalDisplay()' PASSANDO OS VALORES TOTAIS 
    atualizaDisplay : () =>{
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

        PocketTotalDisplay(_Dinheiro._ValorTotal.totalDinheiro, _Dinheiro._ValorTotal.totalCedulas, _Dinheiro._ValorTotal.totalMoedas);
    }
};

// FUNÇÃO PARA ATUAIZAR OS VALORES DO DISPLAY COMPACTO
// ACHEI NECESSARIO COLOCAR O MINI-DISPLAY DE VALORES PARA MELHOR VISUALIZAÇÃO EM DISPOSITIVOS COMPACTOS
// ATUALIZA OS VALORES DO MINI-DISPLAY
// O MINI-DISPLAY SÓ É EXIBIDO SE O DISPLAY DE VALORES TOTAIS PRINCIPAL ESTIVER FORA DA TELA  
function PocketTotalDisplay(PkTotal, PkCedulas, PkMoedas){
    let _totalCedulasElement = document.querySelector('#idTotalCedulas');
    document.querySelector('#pocketTotalBar').style.visibility = (_totalCedulasElement.getBoundingClientRect().bottom <= 0 ? 'visible' : 'hidden');

    document.querySelector('#idPocketTotalDinheiro').textContent = ConvertToBRL(PkTotal);
    document.querySelector('#idPocketTotalCedulas').textContent = ConvertToBRL(PkCedulas);
    document.querySelector('#idPocketTotalMoedas').textContent = ConvertToBRL(PkMoedas);

}
// COMENTEI TUDINHO PQ GOSTO DE DEIXAR MARCADO ;D