let itemCounter = 2;

function adicionarNovoItem() {
    itemCounter++;
    const novoItemHTML = `
    <fieldset class="border p-2 mt-3">
      <legend class="w-auto">Item ${itemCounter}</legend>
      <div class="form-row">
        <div class="col-lg">
          <label for="quantidade_item${itemCounter}">Quantidade:</label>
          <input type="number" id="quantidade_item${itemCounter}" class="form-control">
        </div>
        <div class="col-lg">
          <label for="altura_item${itemCounter}">Altura (cm):</label>
          <input type="number" id="altura_item${itemCounter}" class="form-control">
        </div>
        <div class="col-lg">
          <label for="largura_item${itemCounter}">Largura (cm):</label>
          <input type="number" id="largura_item${itemCounter}" class="form-control">
        </div>
        <div class="col-lg">
          <label for="comprimento_item${itemCounter}">Comprimento (cm):</label>
          <input type="number" id="comprimento_item${itemCounter}" class="form-control">
        </div>
        <div class="col-lg">
          <label for="peso_item${itemCounter}">Peso (kg):</label>
          <input type="number" id="peso_item${itemCounter}" class="form-control">
        </div>
        <div class="col-lg">
          <label for="frete_item${itemCounter}">Valor (R$):</label>
          <input type="text" id="frete_item${itemCounter}" class="form-control frete-item" readonly>
        </div>
      </div>
    </fieldset>
    `;
    const divNovoItem = document.createElement('div');
    divNovoItem.innerHTML = novoItemHTML;
    const formGroup = document.querySelector('.form-group');
    formGroup.parentNode.insertBefore(divNovoItem, formGroup);
}

function criarResumoItens() {
    const modalAnterior = document.getElementById('resumoModal');
    if (modalAnterior) {
        modalAnterior.parentNode.removeChild(modalAnterior);
    }

    let resumoHTML = '<div class="modal fade" id="resumoModal" tabindex="-1" role="dialog" aria-labelledby="resumoModalLabel" aria-hidden="true">';
    resumoHTML += '<div class="modal-dialog" role="document">';
    resumoHTML += '<div class="modal-content">';
    resumoHTML += '<div class="modal-header">';
    resumoHTML += '<h5 class="modal-title" id="resumoModalLabel">Resumo dos Itens</h5>';
    resumoHTML += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    resumoHTML += '<span aria-hidden="true">&times;</span>';
    resumoHTML += '</button>';
    resumoHTML += '</div>';
    resumoHTML += '<div class="modal-body">';
    resumoHTML += '<ul>';

    for (let i = 1; i <= itemCounter; i++) {
        const quantidadeItem = parseInt(document.getElementById('quantidade_item' + i).value);
        const alturaItem = parseFloat(document.getElementById('altura_item' + i).value);
        const larguraItem = parseFloat(document.getElementById('largura_item' + i).value);
        const comprimentoItem = parseFloat(document.getElementById('comprimento_item' + i).value);
        const pesoItem = parseFloat(document.getElementById('peso_item' + i).value);
        const freteItem = document.getElementById('frete_item' + i).value;

        resumoHTML += `<li><strong>Item ${i}:<br></strong> ${quantidadeItem} uni - ${alturaItem} x ${larguraItem} x ${comprimentoItem} cm - ${pesoItem} kg: ${freteItem}</li><br>`;
    }

    resumoHTML += '</ul>';
    resumoHTML += '</div>';
    resumoHTML += '<div class="modal-footer">';
    resumoHTML += '<button type="button" class="btn btn-primary" id="btnDownloadResumo">Baixar Resumo</button>';
    resumoHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>';
    resumoHTML += '</div>';
    resumoHTML += '</div>';
    resumoHTML += '</div>';
    resumoHTML += '</div>';

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = resumoHTML;
    document.body.appendChild(modalContainer);

    $('#resumoModal').modal('show');

    document.getElementById('btnDownloadResumo').addEventListener('click', downloadResumo);
}

function downloadResumo() {
    const resumo = gerarResumoTexto();

    const blob = new Blob([resumo], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'resumo_itens.txt';
    link.click();
}

function gerarResumoTexto() {
    let resumo = '';
    for (let i = 1; i <= itemCounter; i++) {
        const quantidadeItem = parseInt(document.getElementById('quantidade_item' + i).value);
        const alturaItem = parseFloat(document.getElementById('altura_item' + i).value);
        const larguraItem = parseFloat(document.getElementById('largura_item' + i).value);
        const comprimentoItem = parseFloat(document.getElementById('comprimento_item' + i).value);
        const pesoItem = parseFloat(document.getElementById('peso_item' + i).value);
        const freteItem = document.getElementById('frete_item' + i).value;

        resumo += `Item ${i}:\n`;
        resumo += `Quantidade: ${quantidadeItem} uni\n`;
        resumo += `Dimensões: ${alturaItem} x ${larguraItem} x ${comprimentoItem} cm\n`;
        resumo += `Peso: ${pesoItem} kg\n`;
        resumo += `Valor do frete: ${freteItem}\n\n`;
    }
    return resumo;
}

function calcular() {
    var alturaPacote = parseFloat(document.getElementById('altura').value);
    var larguraPacote = parseFloat(document.getElementById('largura').value);
    var comprimentoPacote = parseFloat(document.getElementById('comprimento').value);
    var pesoPacote = parseFloat(document.getElementById('peso').value);
    var valorPacote = parseFloat(document.getElementById('valor_pacote').value);

    if (isNaN(alturaPacote) || isNaN(larguraPacote) || isNaN(comprimentoPacote) || isNaN(pesoPacote) || isNaN(valorPacote)) {
        alert("Preencha todos os campos do Pacote.");
        return;
    }

    var volumePacote = alturaPacote * larguraPacote * comprimentoPacote;

    var volumeItens = 0;
    var pesoItens = 0;
    for (var i = 1; i <= itemCounter; i++) {
        var quantidadeItem = parseInt(document.getElementById('quantidade_item' + i).value);
        var alturaItem = parseFloat(document.getElementById('altura_item' + i).value);
        var larguraItem = parseFloat(document.getElementById('largura_item' + i).value);
        var comprimentoItem = parseFloat(document.getElementById('comprimento_item' + i).value);
        var pesoItem = parseFloat(document.getElementById('peso_item' + i).value);

        if (isNaN(quantidadeItem) || isNaN(alturaItem) || isNaN(larguraItem) || isNaN(comprimentoItem) || isNaN(pesoItem)) {
            alert("Preencha todos os campos do Item " + i + ".");
            return;
        }

        volumeItens += (alturaItem * larguraItem * comprimentoItem) * quantidadeItem;
        pesoItens += pesoItem * quantidadeItem;
    }

    if (volumeItens > volumePacote) {
        alert("Revise as medidas dos itens");
        return;
    }

    if (pesoItens > pesoPacote) {
        alert("Revise o peso dos itens");
        return;
    }

    for (var i = 1; i <= itemCounter; i++) {
        var quantidadeItem = parseInt(document.getElementById('quantidade_item' + i).value);
        var alturaItem = parseFloat(document.getElementById('altura_item' + i).value);
        var larguraItem = parseFloat(document.getElementById('largura_item' + i).value);
        var comprimentoItem = parseFloat(document.getElementById('comprimento_item' + i).value);
        var pesoItem = parseFloat(document.getElementById('peso_item' + i).value);

        var volumeItem = alturaItem * larguraItem * comprimentoItem * quantidadeItem;
        var proporcaoCubagemItem = volumeItem / volumeItens;
        var proporcaoPesoItem = pesoItem * quantidadeItem / pesoItens;

        var freteItem = (proporcaoCubagemItem * volumePacote + proporcaoPesoItem * pesoPacote) / (volumePacote + pesoPacote) * valorPacote;

        document.getElementById('frete_item' + i).value = freteItem.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    criarResumoItens();
}
