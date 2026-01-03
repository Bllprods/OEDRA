document.addEventListener("DOMContentLoaded", ()=>{
    const main = document.querySelector('main');
    const cont = document.createElement('div');
    cont.setAttribute("id", "cont");
    cont.setAttribute("hx-trigger","load");
    cont.setAttribute("hx-get","/view/telas/subTelas-Globais/planilhas.html");
    cont.setAttribute("class", "cardGroup modulo")

    main.appendChild(cont);
    htmx.process(cont);
});

// verificando o elemento clicado e redirecionando
document.addEventListener("click", (event) => {
    if (event.target && event.target.id === 'I') {
        const container = document.getElementById('cont');
        if (container) {
            // Executa a requisição AJAX diretamente para o container
            // https://v1.htmx.org/api/
            htmx.ajax('GET', '/view/telas/subTelas-Globais/inventario.html', {
                target: '#cont',
                swap: 'innerHTML'
            });
        }
    }
    if (event.target && event.target.id === 'G') {
        const container = document.getElementById('cont');
        if (container) {
            // Executa a requisição AJAX diretamente para o container
            // https://v1.htmx.org/api/
            htmx.ajax('GET', '/view/telas/subTelas-Globais/gestao.html', {
                target: '#cont',
                swap: 'innerHTML'
            });
        }
    }
    if (event.target && event.target.id === 'RH') {
        const container = document.getElementById('cont');
        if (container) {
            // Executa a requisição AJAX diretamente para o container
            // https://v1.htmx.org/api/
            htmx.ajax('GET', '/view/telas/subTelas-Globais/RH.html', {
                target: '#cont',
                swap: 'innerHTML'
            });
        }
    }
    if (event.target && event.target.id === 'F') {
        const container = document.getElementById('cont');
        if (container) {
            // Executa a requisição AJAX diretamente para o container
            // https://v1.htmx.org/api/
            htmx.ajax('GET', '/view/telas/subTelas-Globais/funcionario.html', {
                target: '#cont',
                swap: 'innerHTML'
            });
        }
    }
});

//codigo inventario
document.addEventListener("htmx:afterSwap", (event) => {
    // ao trocar
    const Galpao = document.getElementById("Galpao");
    const Lar = document.getElementById('Lar');
    const Com = document.getElementById('Com');
    const Utils = document.querySelectorAll('.Utils');

    if (Galpao && !document.getElementById('andar')) { // se tiver carregado e n tiver desenhado
        const andar = document.createElement('div');
        andar.setAttribute('id', 'andar');
        andar.setAttribute('draggable', "true");
        Galpao.appendChild(andar);
    }

    if (Lar) {
        Lar.addEventListener("input", (e) => {
            let valor = e.target.value;
            console.log("Largura alterada para:", valor);
            // Atualize a largura do 'Andar' aqui se desejar
            const andar = document.getElementById('andar');
            if(andar) andar.style.width = valor + "px";
        });
    }
    if (Com) {
        Com.addEventListener("input", (e) => {
            let valor = e.target.value;
            console.log("Comprimento alterado para:", valor);
            const andar = document.getElementById('andar');
            if(andar) andar.style.height = valor + "px";
        });
    }

    // movimento
    const andar = document.getElementById('andar');

    Utils.forEach((util) => {
        util.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            e.dataTransfer.effectAllowed = "copy"; // Define que é uma cópia
        });
    });
    // 3. Configurar o ANDAR para receber os itens (Cópia)
    if (andar) {
        andar.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
        });

        andar.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation(); // IMPEDE que o Galpao receba este drop

            const idModelo = e.dataTransfer.getData('text/plain');
            const modelo = document.getElementById(idModelo);

            if (modelo && modelo.classList.contains('Utils')) {
                const novoItem = modelo.cloneNode(true);
                
                // Configura a cópia
                novoItem.id = "elem_" + Date.now();
                novoItem.style.position = "absolute";
                novoItem.classList.remove('Utils'); // Opcional

                // Cálculo de posição dentro do andar
                const rectAndar = andar.getBoundingClientRect();
                const x = e.clientX - rectAndar.left - (modelo.offsetWidth / 2);
                const y = e.clientY - rectAndar.top - (modelo.offsetHeight / 2);

                novoItem.style.left = `${x}px`;
                novoItem.style.top = `${y}px`;

                andar.appendChild(novoItem);
            }
        });
    }
    if (andar && Galpao) {
        // mover o mapa
        andar.addEventListener('dragstart', (e) =>{
            // criar um armazenamento temporario dos dados do elemento "arrastado"
            e.dataTransfer.setData('text/plain', e.target.id);
        });
        andar.addEventListener('dragend', (e) => {
            // ...
        });
        Galpao.addEventListener('dragover', (e) => {
            e.preventDefault(); 
        });
        Galpao.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text'); // recuperando o id do elemento "arrastado"
            const mapa = document.getElementById(id);

            // Calcular a nova posição com base na posição do mouse e no offset do container
            const ContMap = Galpao.getBoundingClientRect();
            const x = e.clientX - ContMap.left - (mapa.offsetWidth / 2);
            const y = e.clientY - ContMap.top - (mapa.offsetHeight / 2);

            mapa.style.left = `${x}px`;
            mapa.style.top = `${y}px`;
        });
    }

});

