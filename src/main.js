const modal = document.getElementById('modal-container')
const container = document.getElementById("container")
const corpo = document.getElementById("corpo")
const modalContainerBody = document.getElementById('modal-container-body')
const verCarrinhoBotao = document.getElementById("ver-carrinho")

$('#numeroTelefoneCliente').mask('(00) 0 0000-0000');
$('#cep').mask('00000-000');

$("#nomeCliente").on("input", function () {
    var regexp = /[^a-zA-Z]/g;
    if (this.value.match(regexp)) {
        $(this).val(this.value.replace(regexp, ''));
    }
});





let itensCarrinho = []
let totalItens = []

let enderecoCliente


let verItensCarrinho = []
let VertotalItens = 0

let dadosDoProdutoSelecionado = {
    titulo: '',
    descricao: '',
    preco: '',
    imagem: '',
    adicionais: '',
    quantidade: '',
    precoQuantidade: ''
}


document.getElementById("produtosCarrinho").innerHTML = ''

$("#container").click((e) => {

    const id = e.target.className

    if (id >= 1 && id <= 9) {

        document.getElementById('quantidadeItem').value = 1

        fetch('http://localhost:3333/produto/1' + id)
            .then(dados => dados.json())
            .then(dadosProduto => {

                dadosDoProdutoSelecionado.id = dadosProduto.id
                dadosDoProdutoSelecionado.titulo = dadosProduto.titulo
                dadosDoProdutoSelecionado.descricao = dadosProduto.descricao
                dadosDoProdutoSelecionado.preco = dadosProduto.preco
                dadosDoProdutoSelecionado.imagem = dadosProduto.fotos[0]
                dadosDoProdutoSelecionado.adicionais = dadosProduto.adicionais
                dadosDoProdutoSelecionado.posicaoElementoNoArrayCarrinho

                dadosDoProdutoSelecionado.quantidade = 1
                dadosDoProdutoSelecionado.precoQuantidade = parseFloat (dadosDoProdutoSelecionado.preco * parseInt(document.getElementById("quantidadeItem").value).toFixed(2) )

                function adicionarDadosItens() {


                    document.getElementById("modalImageBody").src = dadosDoProdutoSelecionado.imagem
                    document.getElementById("modalTitulo").innerHTML = dadosDoProdutoSelecionado.titulo
                    document.getElementById("modalDescricao").innerHTML = dadosDoProdutoSelecionado.descricao
                    document.getElementById("modalPreco").innerHTML = 'R$ ' + dadosDoProdutoSelecionado.preco.toFixed(2)


                }

                adicionarDadosItens()

                $("html").css({ "overflow": "hidden" });

                if (dadosDoProdutoSelecionado.adicionais.length > 0) {

                    document.getElementById('adicionais').style.display = 'flex'


                    let ops = 100

                    dadosDoProdutoSelecionado.adicionais.map((item) => {

                        document.getElementById('adicionaisBody').innerHTML +=
                            `
                            <p>${item.titulo}</p>


                            ${item.opcoes.map((item) => {
                                return (

                                    `
                                        <div id="opadiconais">
                                            <input type="radio" id="opcional" name="${ops}" value="${item.preco}" onclick="atuValorOp()">

                                            <p>${item.titulo}</p>
                                            <p>R$ ${item.preco.toFixed(2)}</p>
                                        </div>

                                    `

                                )
                            }).join('')
                            }
                        
                            
                        `
                        ops++
                    })

                    opcional[0].checked = true


                }
                document.getElementById('subtotal').innerHTML = `R$ ${dadosDoProdutoSelecionado.preco.toFixed(2)}`



                verCarrinhoBotao.style.display = "none"
                corpo.style.filter = "grayscale(60%) blur(5px)"
                modal.style.display = "flex"


                verCarrinhoBotao.style.display = "none"

            })



    }

})



function atuQuantidade(){
    dadosDoProdutoSelecionado.precoQuantidade = parseFloat((dadosDoProdutoSelecionado.preco * parseInt(document.getElementById("quantidadeItem").value)).toFixed(2))
    dadosDoProdutoSelecionado.quantidade = parseFloat(document.getElementById("quantidadeItem").value)

    document.getElementById('subtotal').innerHTML = `R$ ${dadosDoProdutoSelecionado.precoQuantidade.toFixed(2)}`



}


function atuValorOp() {
    dadosDoProdutoSelecionado.preco = Number(parseFloat(document.querySelector('input[name="100"]:checked').value)).toFixed(2)
    dadosDoProdutoSelecionado.precoQuantidade = parseFloat((dadosDoProdutoSelecionado.preco * parseInt(document.getElementById("quantidadeItem").value)).toFixed(2))

    document.getElementById('subtotal').innerHTML = `R$ ${dadosDoProdutoSelecionado.precoQuantidade.toFixed(2)}`

}


function fecharModal() {

    corpo.style.filter = 'grayscale(0) blur(0)'

    $("html").css({ "overflow": "auto" });
    $("html").css({ "overflow-x": "hidden" });

    verCarrinhoBotao.style.display = "flex"


    document.getElementById("adicionaisBody").innerHTML = ''
    modal.style.display = "none"

    dadosDoProdutoSelecionado = {}

}
function adicionarAoCarrinho() {
    VertotalItens = 0;

    itensCarrinho.push(JSON.stringify(dadosDoProdutoSelecionado))

    verItensCarrinho = itensCarrinho.map((itens) => {
        return JSON.parse(itens)

    })

    totalItens = verItensCarrinho.map((precoItem) => {
        return precoItem.precoQuantidade
    })

    for (var i = 0; i < totalItens.length; i++) {
        VertotalItens += totalItens[i]
    }


    document.getElementById('modal-container').style.display = 'none'
    document.getElementById("adicionaisBody").innerHTML = ''
    $("html").css({ "overflow": "auto" });
    $("html").css({ "overflow-x": "hidden" });


    document.getElementById('totalCarrinhoAtual').innerHTML = `R$ ${VertotalItens.toFixed(2)} - (${verItensCarrinho.length})`
    corpo.style.filter = 'blur(0) grayscale(0)'
    verCarrinhoBotao.style.display = "flex"


    dadosDoProdutoSelecionado = {}
}

function verCarrinho() {
    document.getElementById("right-menu").style.display = 'none'

    verItensCarrinho.map((itens) => {
        document.getElementById('produtosCarrinho').innerHTML +=
            `
            <div class="card-produto-carrinho" >

                <div class="card-produto-body-carrinho">

                    <div id="descricoesProduto-carrinho">
                        <h3 id="itemTitulo-carrinho">${itens.titulo}</h3>
                        <p id="itemDescricao-carrinho">${itens.descricao}</p>
                        <p id="itemPreco-carrinho">R$ ${itens.precoQuantidade.toFixed(2)}</p>

                        <p id="itemQuantidade-body">Quantidade:  ${itens.quantidade} </p>
                        
                    </div>

                    <div id="imageProduto-carrinho">
                        <img src='${itens.imagem}' alt="" id="itemIcone-carrinho">
                    </div>

                </div>

            </div>
        `
    })

    if (document.getElementById("produtosCarrinho").innerHTML == '') {
        document.getElementById("produtosCarrinho").innerHTML =
            `
            <div id="carrinhoVazio">
                <p id="carrinhoVazioTexto">Carrinho Vazio :( </p>
            <div>
        `
    }


    document.getElementById("total").innerHTML = 'R$ ' + VertotalItens.toFixed(2)

    document.getElementById('ver-carrinho').style.display = "none"

    document.getElementById('ver-carrinho-container').style.display = "flex"
    corpo.style.filter = "grayscale(60%) blur(5px)"

    $("html").css({ "overflow": "hidden" });

}

function fecharCarrinho() {
    document.getElementById('produtosCarrinho').innerHTML = ''
    document.getElementById('ver-carrinho-container').style.display = "none"
    document.getElementById('ver-carrinho').style.display = "flex"

    corpo.style.filter = "grayscale(0) blur(0)"
    $("html").css({ "overflow": "auto" });
    $("html").css({ "overflow-x": "hidden" });
}


function finalizarCarrinho() {

    $("#total-carrinho").click(function () {

        if (verItensCarrinho.length > 0) {
            fecharCarrinho()

            verCarrinhoBotao.style.display = 'none'
            corpo.style.filter = "grayscale(60%) blur(5px)"

            $("html").css({ "overflow": "hidden" });
            document.getElementById('finalizarPedido-container').style.display = 'flex'

            document.getElementById('subtotalPedido').innerHTML = 'R$ ' + `${VertotalItens.toFixed(2)}`



            document.getElementById('totalPedido').innerHTML = 'R$ ' + `${(VertotalItens + 5).toFixed(2)}`

            document.querySelector("#OPreceberEmCasa").setAttribute("checked", "checked")
            document.getElementById("endereco").style.display = 'flex'


        } 
    })


}



function voltarVerCarrinho() {
    document.getElementById("finalizarPedido-container").style.display = 'none'
    verCarrinho()
}






$("#OPreceberEmCasa").click(function () {
    document.getElementById('endereco').style.display = 'flex'

    document.getElementById('totalPedido').innerHTML = 'R$ ' + `${(VertotalItens + 5).toFixed(2)}`
    document.getElementById('taxaDeEntrega').style.display = 'flex'
    document.getElementById('taxaDeEntrega').style.visibility = 'visible'
});


$("#OPretirarNoLocal").click(function () {
    document.getElementById('endereco').style.display = 'none'
    document.getElementById('totalPedido').innerHTML = 'R$ ' + `${(VertotalItens).toFixed(2)}`
    document.getElementById('taxaDeEntrega').style.visibility = 'hidden'


});




$('#cep').blur(function () {
    if (document.getElementById("cep").value.length == 9) {
        fetch(`https://viacep.com.br/ws/${document.getElementById("cep").value}/json/`)
            .then((response) => response.json())
            .then((endereco) => {
                enderecoCliente = endereco


                document.getElementById('cidade').value = endereco.localidade
                document.getElementById('bairro').value = endereco.bairro
                document.getElementById('rua').value = endereco.logradouro

                if (endereco.erro) {
                    document.getElementById('cep').value = null

                    document.getElementById('cidade').value = null
                    document.getElementById('bairro').value = null
                    document.getElementById('rua').value = null

                    document.getElementById('numero').value = null

                    alert('CEP INVALIDO')
                }

            })

    } else {
        alert('CEP INVALIDO')
    }
})




function fecharCompra() {


    if (document.getElementById("OPreceberEmCasa").checked) {

        if (document.getElementById('nomeCliente').value.length < 3) {
            alert('Nome Invalido')

            return;

        }


        if (document.getElementById('numeroTelefoneCliente').value.length < 16) {
            alert('Número de telefone inválido')
            return;

        }

        if (document.getElementById('cep').value.length < 9) {
            alert('CEP Inválido')
            return;

        }


        if (document.getElementById('numero').value.length < 1) {
            alert('Numero invalido')
            return;

        }

        VertotalItens += 5



    }






    enviarPost()
}



function enviarPost() {

    const data = {
        pedido: verItensCarrinho,
        entrega: `${document.querySelector('input[name="selecFormaDeEntrega"]:checked').value}`,

        formaDePagamento: `${document.getElementById('opsDePagamento').value}`,

        contato: {

            nome: `${document.getElementById('nomeCliente').value}`,
            telefone: `${document.getElementById("numeroTelefoneCliente").value}`

        },
        endereco: enderecoCliente,
        totaConsumo: VertotalItens

    };




    fetch("http://localhost:3333/novo-pedido/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
        })
        .catch((error) => {
        });


    document.getElementById("finalizarPedido-container").style.display = "none"
    document.getElementById('pedidoFinalidado').style.display = "flex"

    setTimeout(() => { location.reload() }, 5000)


}

