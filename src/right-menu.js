const menuDireito = document.getElementById("right-menu")
const opAbrir = document.getElementById("menu-abrir")
const verCarrinhoBody = document.getElementById("ver-carrinho")

$("#menu-abrir").click(function () {

    document.getElementById('infoEEndereco').style.display = 'none'
    document.getElementById('horarioAtendimento').style.display = 'none'
    document.getElementById('ligarEmpresa').style.display = 'none'
    document.getElementById('enviarMensagem').style.display = 'none'



    document.getElementById('finalizarPedido-container').style.display = 'none'
    document.getElementById('ver-carrinho-container').style.display = 'none'
    document.getElementById("modal-container").style.display = 'none'
    verCarrinhoBody.style.display = 'none'



    menuDireito.style.display = "flex"


    document.getElementsByTagName("html")[0].style.scrollBehavior = "auto"

    $("html").css({ "overflow": "hidden" });


    corpo.style.filter = 'grayscale(0) blur(0)'

});




function modalInfoEEndereco(){
    menuDireito.style.display = 'none'
    corpo.style.filter = "grayscale(60%) blur(5px)"
    $("html").css({ "overflow": "hidden" });

    document.getElementById('infoEEndereco').style.display = 'flex'
}



function modalHorarioAtendimento(){
    menuDireito.style.display = 'none'
    corpo.style.filter = "grayscale(60%) blur(5px)"
    $("html").css({ "overflow": "hidden" });

    document.getElementById('horarioAtendimento').style.display = 'flex'

}

function modalLigarEmpresa(){
    menuDireito.style.display = 'none'
    corpo.style.filter = "grayscale(60%) blur(5px)"
    $("html").css({ "overflow": "hidden" });

    document.getElementById('ligarEmpresa').style.display = 'flex'
}


function modalEnviarMensagem(){
    menuDireito.style.display = 'none'
    corpo.style.filter = "grayscale(60%) blur(5px)"
    $("html").css({ "overflow": "hidden" });

    document.getElementById('enviarMensagem').style.display = 'flex'
}



$('.container-modal-menu-lateral').click((e) => {
    console.log(e.target.className)

    if(e.target.className == 'container-modal-menu-lateral'){
        document.getElementById('infoEEndereco').style.display = 'none'
        document.getElementById('horarioAtendimento').style.display = 'none'
        document.getElementById('ligarEmpresa').style.display = 'none'
        document.getElementById('enviarMensagem').style.display = 'none'



        verCarrinhoBody.style.display = "flex"


        corpo.style.filter = "grayscale(0%) blur(0)"


        $("html").css({ "overflow": "auto" });
    }


})


menuDireito.addEventListener('click', (e) => {

    if (e.target.id == "right-menu") {

        document.getElementById('infoEEndereco').style.display = 'none'
        document.getElementById('horarioAtendimento').style.display = 'none'

        menuDireito.style.display = 'none'
        document.getElementById("modal-container").style.display = 'none'

        verCarrinhoBody.style.display = "flex"



        document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth"

        $("html").css({ "overflow": "auto" });


        corpo.style.filter = 'grayscale(0) blur(0)'


    }
})
