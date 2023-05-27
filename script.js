const { jsPDF } = window.jspdf;

const text = document.getElementById("text");
let tamanho = text.style.fontSize;
let count = 1;

// Title do editor de texto
const title = document.getElementById('title-text');
const titleSize = () => {
    let size = document.defaultView.getComputedStyle(document.getElementById("title-text"))['fontSize']
    return Number(size.replace(/\D/g, ""));
};

const titleFamily = () => {
    let family = document.defaultView.getComputedStyle(document.getElementById("title-text"))['fontFamily']
    return family;
}

function ToColorTitle() {
    let colorSelected = document.getElementById('color_title').value;
    title.style.color = colorSelected;
}

// ---------------------------------------------
// Texto do editor de texto
const textSize = () => {
    let size = document.defaultView.getComputedStyle(document.getElementById("text"))['fontSize']
    return Number(size.replace(/\D/g, ""));
};
const textFamily = () => {
    let family = document.defaultView.getComputedStyle(document.getElementById("text"))['fontFamily']
    return family;
}

// Variaveis do texto e titulo do documento
var title_content = title.value;
var content = text.value;
let documento = title_content+"\n"+content;
// .


// Tranforma em italico
function ToItalic() { 
    if (text.style.fontStyle == 'italic'){
        text.style.fontStyle = 'normal';
    } else {
        text.style.fontStyle = 'italic';
    }
}
// Tranforma em negrito
function ToBold() {
    if (text.style.fontWeight == 'bold'){
        text.style.fontWeight = 'normal';
    } else {
        text.style.fontWeight = 'bold';
    }
}
// Tranforma em sublilhado
function ToSubline() {
    if (text.style.textDecoration == 'underline'){
        text.style.textDecoration = 'none';
    } else {
        text.style.textDecoration = 'underline';
    }
}
// Tranforma aumenta gradativamente a fonte
function ToBigfont() {
    tamanho = textSize() + 10;
    text.style.fontSize = tamanho + 'px';
}
// Tranforma diminui gradativamente a fonte
function ToSmallfont() {
    tamanho = textSize() - 10;
    text.style.fontSize = tamanho + 'px';
}
// Alinha para a esquerda(Left) o texto
function ToAlignLeft(){
    if(text.style.textAlign != 'left'){
        text.style.textAlign = 'left'
    }
}
// Alinha para o meio o texto
function ToAlignMiddle(){
    if(text.style.textAlign != 'center'){
        text.style.textAlign = 'center';
    }
}
// Alinha para a direita(Right) o texto
function ToAlignRight(){
    if (text.style.textAlign != 'right'){
        text.style.textAlign = 'right';
    }
}

// Alterna de fontes de acordo com o select (TITLE-TEXT AND TEXT)
function toAlternativeFonts() {
    let select_font = document.querySelector('select').value;
    let family_font = textFamily();
    if (select_font != family_font){
        text.style.fontFamily = select_font;
        title.style.fontFamily = select_font;
    }
}

// Alternar as cores do campo TEXTO
function ToColorText() {
    let colorSelected = document.getElementById('color_text').value;
    text.style.color = colorSelected;
}

// Copiar texto digitado na TextArea

function CopyText() {
    title_content = title.value;
    content = text.value;
    documento = "Titulo: "+title_content+"\n"+content;
    navigator.clipboard.writeText(documento);
    window.alert("Copiado com sucesso.")
}

// Download / Baixar o documento em txt
function Download(){
    title_content = title.value;
    content = text.value;
    documento = title_content+"\n"+content;
    var blob = new Blob([documento], { type: "text/plain" });
    var link = document.createElement("a");
    link.download = title_content+".txt";
    link.href = window.URL.createObjectURL(blob);
    link.click();
}

function getEstilo(){
    let estilo_fonte="";
    if(text.style.fontWeight == 'bold'){
        if(text.style.fontStyle == 'italic'){
            estilo_fonte = "bolditalic";
        } else {
            estilo_fonte = "bold";
        }  
    } else if(text.style.fontStyle == 'italic'){
        estilo_fonte = "italic";
    } else {
        estilo_fonte = "normal";
    }
    return estilo_fonte;
}
// Alinhamento e as coordenadas para o objeto jspDF
// Variaveis

let x_title = 20;
let y_title = 20;
let y_text = y_title+20;

function getAlinhamentoX(){
    let alinhamento = text.style.textAlign;
    let x_text;
    if (alinhamento == "center"){
        x_text = 105
    } else if (alinhamento == "left"){
        x_text = 20
    } else if (alinhamento == "right") {
        x_text = -20
    } else {
        x_text = 20;
    }
    return x_text;
}

function onSavepdf(){
    // criando objeto jsPDF
    var doc = new jsPDF();
    // variaveis
    title_content = title.value;
    content = text.value;
    let alinhamento = text.style.textAlign;
    
    // Estilizar o documento
    //      Titulo do documento
    doc.setFont(titleFamily(), getEstilo()); // Setando a fonte
    doc.setFontSize(titleSize());
    doc.setTextColor(title.style.color); // a COR 
    doc.text(title_content, x_title, y_title); // e o TEXTO (posiçao)

    //      Texto do documento
    doc.setFont(textFamily(), getEstilo());
    doc.setFontSize(textSize());
    doc.setTextColor(text.style.color);
    //doc.splitTextToSize(text, 2);
    doc.text(content, getAlinhamentoX(), y_text, null, null, alinhamento); // Alinhando o texto de acordo com a variavel
    // Salvar o documento em PDF 
    doc.save(title_content+".pdf");
}

function imprimir(){
    title_content = title.value;
    content = text.value;
    documento = title_content+"\n"+content;
    // Criar uma janela pop-up temporária
    let janelaImpressao = window.open('', '_blank', 'width=600,height=600');
  
    // Escrever o conteúdo do textarea na janela pop-up
    janelaImpressao.document.write('<html><head><title>Impressão</title></head><body>');
    janelaImpressao.document.write('<pre>' + documento + '</pre>');
    janelaImpressao.document.write('</body></html>');
    janelaImpressao.document.close();
  
    // Chamar a função de impressão na janela pop-up
    janelaImpressao.print();
}