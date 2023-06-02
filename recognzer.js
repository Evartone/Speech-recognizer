
const textarea = document.getElementById('textarea')
const btnGravar = document.querySelector("#btnGravar")
const btnParar = document.querySelector("#btnParar")
const btnBaixar = document.querySelector("#btnBaixar")
const btnLimpar = document.querySelector("#btnLimpar")

class speechApi {

    constructor() {

        const speechToText = window.SpeechRecognition || window.webkitSpeechRecognition 

      this.speechApi = new speechToText()
      this.output = textarea.output
      this.speechApi.continuous = true // declaração de que o Speech será continou // 
      this.speechApi.lang = 'pt-BR'
       
      this.speechApi.onresult = (e)=> {
        var resultIndex = e.resultIndex
        var transcript = e.results[resultIndex][0].transcript

        textarea.value += transcript
      }
                     
    }

    start (){

        this.speechApi.start()
    }

    stop () {

        this.speechApi.stop()
    }

}

var speech = new speechApi()

btnGravar.addEventListener("click", ()=>{

    btnGravar.disabled = true;
    btnParar.disabled = false;
    speech.start()
})

btnParar.addEventListener("click", ()=>{

    btnGravar.disabled = false;
    btnParar.disabled = true;
    speech.stop()
})

btnBaixar.addEventListener("click", ()=>{
    var text = textarea.value
    var filename = "speech.txt"

    download(text, filename)

})

function download (text, filename){
   
    var element = document.createElement("a")
    element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)

    element.style.display = 'none'

    document.body.appendChild(element)
    element.click()

    document.body.removeChild(element)

}

btnLimpar.addEventListener("click", ()=>{
   textarea.value = "";
   btnGravar.disabled = false
   btnParar.disabled = true
    speech.stop();
})





