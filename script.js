// Variável global com a quantidade inicial de itens já inseridos no formulário
let itemCounter = 2;

// Função para adicionar um novo item ao clicar no botão "Adicionar Item"
function adicionarNovoItem() {

    // Incrementa o contador de itens
    itemCounter++;

    // HTML que será inserido para criar um novo item
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

    // Cria um novo elemento div e insere o HTML do novo item
    const divNovoItem = document.createElement('div');
    divNovoItem.innerHTML = novoItemHTML;
    
    // Seleciona o elemento com classe form-group e insere o novo item antes dele
    const formGroup = document.querySelector('.form-group');
    formGroup.parentNode.insertBefore(divNovoItem, formGroup);
}

// Função para criar o modal com o resumo dos itens
function criarResumoItens() {

    // Remove o modal anterior, caso exista
    const modalAnterior = document.getElementById('resumoModal');
    if (modalAnterior) {
        modalAnterior.parentNode.removeChild(modalAnterior);
    }

    // HTML do modal com o resumo dos itens
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

    // Percorre todos os itens existentes e insere os valores no resumo
    for (let i = 1; i <= itemCounter; i++) {
        const quantidadeItem = parseInt(document.getElementById('quantidade_item' + i).value);
        const alturaItem = parseFloat(document.getElementById('altura_item' + i).value);
        const larguraItem = parseFloat(document.getElementById('largura_item' + i).value);
        const comprimentoItem = parseFloat(document.getElementById('comprimento_item' + i).value);
        const pesoItem = parseFloat(document.getElementById('peso_item' + i).value);
        const freteItem = document.getElementById('frete_item' + i).value;

        resumoHTML += `<li><strong>Item ${i}:<br></strong> ${quantidadeItem} uni - ${alturaItem} x ${larguraItem} x ${comprimentoItem} cm - ${pesoItem} kg: ${freteItem}</li><br>`;
    }

    // Criação do rodapé do modal, com botão de download e de fechar
    resumoHTML += '</ul>';
    resumoHTML += '</div>';
    resumoHTML += '<div class="modal-footer">';
    resumoHTML += '<button type="button" class="btn btn-primary" id="btnDownloadResumo">Baixar Resumo</button>';
    resumoHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>';
    resumoHTML += '</div>';
    resumoHTML += '</div>';
    resumoHTML += '</div>';
    resumoHTML += '</div>';

    // Cria um novo elemento div e insere o HTML do modal
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = resumoHTML;
    document.body.appendChild(modalContainer);

    // Exibe o modal
    $('#resumoModal').modal('show');

    // Adiciona o evento de clique no botão de download do resumo
    document.getElementById('btnDownloadResumo').addEventListener('click', downloadResumo);
}

// Função para baixar o resumo dos itens em um arquivo .txt
function downloadResumo() {
    // Gera o resumo dos itens em formato de texto
    const resumo = gerarResumoTexto();

    // Cria um novo Blob com o resumo em formato de texto
    const blob = new Blob([resumo], { type: 'text/plain' });

    // Cria um link para download do arquivo .txt e simula o click nele
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'resumo_itens.txt';
    link.click();
}

// Função para gerar o resumo dos itens em formato de texto para ser baixado
function gerarResumoTexto() {
  let resumo = '';

  const valorPacote = parseFloat(document.getElementById('valor_pacote').value);
  const valorFormatado = valorPacote.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  resumo += `Pacote:\n`;
  resumo += `Dimensões: ${document.getElementById('altura').value} x ${document.getElementById('largura').value} x ${document.getElementById('comprimento').value} cm\n`;
  resumo += `Peso: ${document.getElementById('peso').value} kg\n`;
  resumo += `Valor do frete: ${valorFormatado}\n\n`;

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

  //Obtém os valores dos campos do pacote
  var alturaPacote = parseFloat(document.getElementById('altura').value);
  var larguraPacote = parseFloat(document.getElementById('largura').value);
  var comprimentoPacote = parseFloat(document.getElementById('comprimento').value);
  var pesoPacote = parseFloat(document.getElementById('peso').value);
  var valorPacote = parseFloat(document.getElementById('valor_pacote').value);

  // Valida se todos os campos do pacote foram preenchidos
  if (isNaN(alturaPacote) || isNaN(larguraPacote) || isNaN(comprimentoPacote) || isNaN(pesoPacote) || isNaN(valorPacote)) {
      alert("Preencha todos os campos do Pacote.");
      return;
  }

  // Calcula o volume do pacote
  var volumePacote = alturaPacote * larguraPacote * comprimentoPacote;

  // Valida se o volume do pacote é maior que o volume dos itens
  var volumeItens = 0;
  var pesoItens = 0;

  // Percorre todos os itens e calcula o volume e peso total
  for (var i = 1; i <= itemCounter; i++) {
      var quantidadeItem = parseInt(document.getElementById('quantidade_item' + i).value);
      var alturaItem = parseFloat(document.getElementById('altura_item' + i).value);
      var larguraItem = parseFloat(document.getElementById('largura_item' + i).value);
      var comprimentoItem = parseFloat(document.getElementById('comprimento_item' + i).value);
      var pesoItem = parseFloat(document.getElementById('peso_item' + i).value);

      // Valida se todos os campos do item foram preenchidos
      if (isNaN(quantidadeItem) || isNaN(alturaItem) || isNaN(larguraItem) || isNaN(comprimentoItem) || isNaN(pesoItem)) {
          alert("Preencha todos os campos do Item " + i + ".");
          return;
      }

      // Calcula o volume total do item e adiciona ao volume total dos itens
      volumeItens += (alturaItem * larguraItem * comprimentoItem) * quantidadeItem;
      // Calcula o peso total do item e adiciona ao peso total dos itens
      pesoItens += pesoItem * quantidadeItem;
  }

  // Valida se o volume dos itens é maior que o volume do pacote
  if (volumeItens > volumePacote) {
      alert("Revise as medidas dos itens");
      return;
  }

  // Valida se o peso dos itens é maior que o peso do pacote
  if (pesoItens > pesoPacote) {
      alert("Revise o peso dos itens");
      return;
  }

    // Loop através de todos os itens novamente para calcular o frete para cada item
      for (var i = 1; i <= itemCounter; i++) {

      // Obtem os valores dos campos do item
      var quantidadeItem = parseInt(document.getElementById('quantidade_item' + i).value);
      var alturaItem = parseFloat(document.getElementById('altura_item' + i).value);
      var larguraItem = parseFloat(document.getElementById('largura_item' + i).value);
      var comprimentoItem = parseFloat(document.getElementById('comprimento_item' + i).value);
      var pesoItem = parseFloat(document.getElementById('peso_item' + i).value);

      // Calcula o volume total do item
      var volumeItem = alturaItem * larguraItem * comprimentoItem * quantidadeItem;

      // Calcula a proporção do volume e peso do item em relação ao volume e peso total dos itens
      var proporcaoCubagemItem = volumeItem / volumeItens;
      
      // Calcula a proporção do peso do item em relação ao peso total dos itens
      var proporcaoPesoItem = pesoItem * quantidadeItem / pesoItens;

      // Calcula o frete para o item com base nas proporções e no valor do pacote
      var freteItem = (proporcaoCubagemItem * volumePacote + proporcaoPesoItem * pesoPacote) / (volumePacote + pesoPacote) * valorPacote;

      // Formata o valor do frete de acordo com a quantidade de itens
      if (quantidadeItem > 1) {
          freteItem /= quantidadeItem;
          freteItem = "R$ " + freteItem.toFixed(2).replace('.', ',') + "/uni";
      } else {
          freteItem = "R$ " + freteItem.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
          });
      }

      // Insere o valor do frete calculado no campo do item
      document.getElementById('frete_item' + i).value = freteItem;
  }

    // Cria o resumo dos itens e exibe o modal
  criarResumoItens();
}
