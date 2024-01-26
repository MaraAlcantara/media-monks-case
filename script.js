
const fs = require('fs');

//1ª FUNÇÃO: LER O ARQUIVO:
const lerArquivoJson = (arquivo) => {
    try {
        const dados = fs.readFileSync(arquivo);
        return JSON.parse(dados);
    } catch (error) {
        console.error(`Erro ao ler o arquivo ${arquivo}:`, error);
        return null;
    }
};

//2ª FUNÇÃO: CORRIGINDO OS DADOS:
const corrigirNomes = (dado) => {
    return dado.map((item) => {
        const newMarca = item.marca ? item.marca.replace(/æ/g, 'a').replace(/ø/g, 'o') : undefined;
        const newNome = item.nome ? item.nome.replace(/æ/g, 'a').replace(/ø/g, 'o') : undefined;
        return {...item, marca: newMarca, nome: newNome};
    });
};

//3ª FUNÇÃO: CORRIGINDO AS VENDAS:
const corrigirVendas = (dado) => {
    return dado.map((item) => {
        const newVendas = parseInt(item.vendas);
        return {...item, vendas: newVendas};
    });
};

//4ª FUNÇÃO: 
const alterarDatabase = (dado) => {
    return corrigirVendas(corrigirNomes(dado));
};


//5ª FUNÇÃO: ESCREVER O ARQUIVO JSON CORRIGIDO. 
const escreverJson = (local, dados) => {
    try {
        const json = JSON.stringify(dados);
        fs.writeFileSync(local, json);
    } catch (error) {
        console.error(`Erro ao escrever o arquivo ${local}:`, error);
    }
};

const localDoArquivo_1 = './correcao_database_1.json';
const localDoArquivo_2 = './correcao_database_2.json';

const database1 = lerArquivoJson('./broken_database_1.json');
const database2 = lerArquivoJson('./broken_database_2.json');

const correcaoDatabase1 = alterarDatabase(database1);
const correcaoDatabase2 = alterarDatabase(database2);

escreverJson(localDoArquivo_1, correcaoDatabase1);
escreverJson(localDoArquivo_2, correcaoDatabase2);

console.log('Os Arquivos foram devidamente corrigidos.');