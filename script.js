window.addEventListener('load', (event) =>{
    CriarModelos();
});

function CriarModelos() {
    let container = document.getElementById('container');
    let Modelos = ListaModelos();
    if(Modelos){
        for (const modelo of Modelos) {
            let [div_container, label_img, img, label_val, input_val, span_total, btn_clear, img2, span_atalho] = [
                document.createElement('div'),
                document.createElement('label'),
                document.createElement('img'),
                document.createElement('label'),
                document.createElement('input'),
                document.createElement('span'),
                document.createElement('button'),
                document.createElement('img'),
                document.createElement('span')
            ];
            // div_container
            div_container.classList.add('container_dinheiro');

            // label_img
            label_img.setAttribute('for', modelo.id);
            label_img.classList.add('labelImg');
            // img
            img.setAttribute('src', modelo.img);
            img.setAttribute('onclick',`(${modelo.id}.value++)`);

            label_img.appendChild(img);
            div_container.appendChild(label_img);
            // label_val
            label_val.setAttribute('for', modelo.id);
            label_val.classList.add('labelValue');
            label_val.textContent = `${modelo.valor < 1 ? "¢" : "R$"}${modelo.valor}`;

            div_container.appendChild(label_val);
            //input_val
            input_val.setAttribute('type','number');
            input_val.setAttribute('min','0');
            input_val.setAttribute('value','0');
            input_val.setAttribute('max','999999999999');
            input_val.setAttribute('id', modelo.id);
            input_val.classList.add('inputValue');

            div_container.appendChild(input_val);
            // span_total
            span_total.classList.add('spanTotal');
            span_total.setAttribute('data-span-for', modelo.id);
            span_total.textContent = "Total: R$00,00";

            div_container.appendChild(span_total);
            // btn_clear
            btn_clear.classList.add('btnLimparUm');
            // img2
            img2.setAttribute('src','img/trash_placeholder.png');

            btn_clear.appendChild(img2);
            div_container.appendChild(btn_clear);
            // span_atalho
            span_atalho.classList.add('spanAtalho');
            span_atalho.textContent = modelo.atalho;

            div_container.appendChild(span_atalho);
            container.appendChild(div_container);

            // <div class="container_dinheiro">
            ///     <label for="idVal" class="labelImg"><img src="img/moeda_placeholder.png" onclick="(idVal.value++)"></label>
            ///     <label for="idVal" class="labelValue">&cent;0.01</label>
            ///     <input type="number" id="idVal" class="inputValue">
            ///     <span class="spanTotal" data-span-for="idVal">Total: &cent; 00.00</span>
            //     <button class="btnLimparUm"><img src="img/trash_placeholder.png" alt=""></button>
            //     <span class="spanAtalho">W</span>
            // </div>

        }
    }
}

function ListaModelos() {
    let Modelos = [
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "umCent",
            img : 'img/moeda_placeholder.png',
            valor : 0.01,
            total : 0,
            atalho : "Q"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cincoCent",
            img : 'img/moeda_placeholder.png',
            valor : 0.05,
            total : 0,
            atalho : "W"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "dezCent",
            img : 'img/moeda_placeholder.png',
            valor : 0.10,
            total : 0,
            atalho : "E"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "vinCinCent",
            img : 'img/moeda_placeholder.png',
            valor : 0.25,
            total : 0,
            atalho : "R"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cinquentaCent",
            img : 'img/moeda_placeholder.png',
            valor : 0.50,
            total : 0,
            atalho : "T"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "umReal",
            img : 'img/moeda_placeholder.png',
            valor : 1,
            total : 0,
            atalho : "Y"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "doisReais",
            img : 'img/moeda_placeholder.png',
            valor : 2,
            total : 0,
            atalho : "A"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cincoReais",
            img : 'img/moeda_placeholder.png',
            valor : 5,
            total : 0,
            atalho : "S"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "dezReais",
            img : 'img/moeda_placeholder.png',
            valor : 10,
            total : 0,
            atalho : "D"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "vinteReais",
            img : 'img/moeda_placeholder.png',
            valor : 20,
            total : 0,
            atalho : "F"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cinquentaReais",
            img : 'img/moeda_placeholder.png',
            valor : 50,
            total : 0,
            atalho : "G"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "cemReais",
            img : 'img/moeda_placeholder.png',
            valor : 100,
            total : 0,
            atalho : "H"
        },
        {   
            
            // <!-- id, img, valor, total, atalho -->
            id : "duzentosReais",
            img : 'img/cédula_placeholder.png',
            valor : 200,
            total : 0,
            atalho : "J"
        }
    ];
    return Modelos;
}