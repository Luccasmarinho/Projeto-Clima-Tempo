async function buscaApi(cityName) {
    const apiKey = "c19f683c82f48506051da40b0ae35358";
    const busca = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`)
    const conexaoEstabelecida = await busca.json()
    
    if(busca.status == "404") {
        throw new Error("Cidade não encontrada.")
    }

    return conexaoEstabelecida
}

export const consultaApi = {
    buscaApi
}