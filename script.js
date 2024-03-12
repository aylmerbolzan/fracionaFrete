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

function calcular() {
    var alturaPacote = parseFloat(document.getElementById('altura').value);
    var larguraPacote = parseFloat(document.getElementById('largura').value);
    var comprimentoPacote = parseFloat(document.getElementById('comprimento').value);
    var pesoPacote = parseFloat(document.getElementById('peso').value);
    var valorPacote = parseFloat(document.getElementById('valor_pacote').value);

    var volumePacote = alturaPacote * larguraPacote * comprimentoPacote;

    var volumeItens = 0;
    var pesoItens = 0;
    for (var i = 1; i <= itemCounter; i++) {
        var quantidadeItem = parseInt(document.getElementById('quantidade_item' + i).value);
        var alturaItem = parseFloat(document.getElementById('altura_item' + i).value);
        var larguraItem = parseFloat(document.getElementById('largura_item' + i).value);
        var comprimentoItem = parseFloat(document.getElementById('comprimento_item' + i).value);
        var pesoItem = parseFloat(document.getElementById('peso_item' + i).value);

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
}
