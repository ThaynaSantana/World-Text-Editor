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
    var title_content = title.value;
    var content = text.value;
    let documento = "Titulo: "+title_content+"\n"+content;
    navigator.clipboard.writeText(documento);
}

// Download / Baixar o documento em txt
function Download(){
    var title_content = title.value;
    var content = text.value;
    let documento = title_content+"\n"+content;
    var blob = new Blob([documento], { type: "text/plain" });
    var link = document.createElement("a");
    link.download = title_content+".txt";
    link.href = window.URL.createObjectURL(blob);
    link.click();
}