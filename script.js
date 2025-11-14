function alertBox(msg) {
    const box = document.createElement("div")
    box.className = "alertbox"
    box.textContent = msg
    document.getElementById("alerts").appendChild(box)
    setTimeout(()=>box.remove(), 2000)
}

document.getElementById("btnCalcular").addEventListener("click", calcular)
document.getElementById("btnLimpiar").addEventListener("click", limpiar)

function limpiar() {
    document.getElementById("datos").value = ""
    document.querySelector("#tabla tbody").innerHTML = ""
    document.getElementById("resultados").textContent = ""
}

function calcular() {
    let txt = document.getElementById("datos").value.trim()
    if (!txt) return alertBox("Ingresa datos.")
    let datos = txt.split(/[\s,]+/).map(Number)
    if (datos.some(isNaN)) return alertBox("Solo números.")
    if (datos.length < 21) return alertBox("Mínimo 21 datos.")

    datos.sort((a,b)=>a-b)
    let n = datos.length
    let min = datos[0]
    let max = datos[n-1]
    let rango = max - min
    let k = Math.round(1 + 3.322 * Math.log10(n))
    let a = Math.ceil(rango / k)

    let limites = []
    let ini = min
    while (ini <= max) {
        let fin = ini + a - 1
        limites.push([ini, fin])
        ini = fin + 1
    }

    let frec_abs = limites.map(r => datos.filter(x => x>=r[0] && x<=r[1]).length)
    let frec_acum = []
    let acum = 0
    frec_abs.forEach(f => {acum+=f; frec_acum.push(acum)})
    let frec_rel = frec_abs.map(f=>f/n)
    let frec_pct = frec_rel.map(f=>(f*100).toFixed(2))
    let marcas = limites.map(r=>((r[0]+r[1])/2).toFixed(2))

    let tbody = document.querySelector("#tabla tbody")
    tbody.innerHTML = ""
    for (let i=0;i<limites.length;i++) {
        tbody.innerHTML += `
        <tr>
            <td>${limites[i][0]} - ${limites[i][1]}</td>
            <td>${marcas[i]}</td>
            <td>${frec_abs[i]}</td>
            <td>${frec_acum[i]}</td>
            <td>${frec_rel[i].toFixed(4)}</td>
            <td>${frec_pct[i]}%</td>
        </tr>`
    }

    let media = datos.reduce((a,b)=>a+b,0)/n
    let mediana = n%2===0 ? (datos[n/2-1]+datos[n/2])/2 : datos[(n-1)/2]
    let map = {}
    datos.forEach(x=>map[x]=(map[x]||0)+1)
    let maxF = Math.max(...Object.values(map))
    let moda = Object.keys(map).filter(x=>map[x]==maxF)
    let desv_media = datos.reduce((a,x)=>a+Math.abs(x-media),0)/n
    let desv_est = Math.sqrt(datos.reduce((a,x)=>a+(x-media)**2,0)/n)

    document.getElementById("resultados").textContent =
        "Media: " + media.toFixed(2) +
        "\nMediana: " + mediana.toFixed(2) +
        "\nModa: " + moda.join(", ") +
        "\nDesviación media: " + desv_media.toFixed(2) +
        "\nDesviación estándar: " + desv_est.toFixed(2) +
        "\nRango: " + rango +
        "\nNúmero de clases: " + k +
        "\nAmplitud de clase: " + a
}
