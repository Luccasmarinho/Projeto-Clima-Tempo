import { consultaApi } from "./consultaApi.js";

const inputPesquisa = document.querySelector(".container__pesquisa__input-procura");
const form = document.querySelector(".container__pesquisa");
const secaoHidden = document.querySelector(".box-hidden");

form.addEventListener("submit", (event) => {
    event.preventDefault()
    mostrandoDados(inputPesquisa.value)
})

async function mostrandoDados(cityName) {
    const erro = document.getElementById("box-error")
    erro.style.display = "none" 

    try {
        const busca = await consultaApi.buscaApi(cityName)
        const dados = {
            temperaturaMax: busca.main.temp_max,
            temperaturaMin: busca.main.temp_min,
            humidade: busca.main.humidity,
            temperaturaAtual: busca.main.temp,
            nomeDaCidade: busca.name,
            siglaDoPais: busca.sys.country,
            vento: busca.wind.speed,
            icone: busca.weather[0].icon,
            descricao: busca.weather[0].description
        }

        const tempMax = document.getElementById("temperatura-maxima")
        const tempMin = document.getElementById("temperatura-minima")
        const humidade = document.getElementById("humidade")
        const vento = document.getElementById("vento")
        const cidade = document.getElementById("cidade")
        const temperaturaAtual = document.getElementById("temperatura-atual")
        const iconeClima = document.getElementById("img-clima")
        const condicaoClimatica = document.getElementById("condicao-climatica")

        secaoHidden.classList.remove("box-hidden")

        tempMax.innerHTML = `${dados.temperaturaMax.toFixed(1)} °C`
        tempMin.innerHTML = `${dados.temperaturaMin.toFixed(1)} °C`
        humidade.innerHTML = `${dados.humidade} %`
        vento.innerHTML = `${dados.vento.toFixed(1)} Km/h`
        cidade.innerHTML = `${dados.nomeDaCidade}, ${dados.siglaDoPais}`
        temperaturaAtual.innerHTML = `${dados.temperaturaAtual.toFixed(1)} °C`
        condicaoClimatica.innerHTML = `${dados.descricao.toUpperCase()}`
        iconeClima.setAttribute("src", `https://openweathermap.org/img/wn/${dados.icone}@2x.png`)


        return dados
    } catch(e) {
        erro.style.display = "block"
    }
    secaoHidden.classList.add("box-hidden")
}

