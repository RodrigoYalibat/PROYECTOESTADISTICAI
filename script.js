document.getElementById("btnCalcular").addEventListener("click", calcular);

function calcular() {
    const datosText = document.getElementById("datos").value.trim();
    if (!datosText) return alert("Ingrese datos separados por espacios.");

    let datos = datosText.split(/\s+/).map(Number);
    if (datos.length < 21) {
        alert("Debes ingresar al menos 21 datos.");
        return;
    }

    datos.sort((a, b) => a - b);
    const n = datos.length;

    const minDato = Math.min(...datos);
    const maxDato = Math.max(...datos);

    // Número de clases
    const k = Math.round(1 + 3.322 * Math.log10(n));

    // Amplitud de clase redondeada al entero superior
    let rango = maxDato - minDato;
    let amplitud = Math.ceil(rango / k);

    // Generar límites de clases consecutivos
    let limites = [];
    let inicio = minDato;
    while (inicio <= maxDato) {
        let fin = inicio + amplitud - 1;
        limites.push([inicio, fin]);
        inicio = fin + 1;
    }

    // Frecuencia absoluta
    let frec_abs = limites.map(([li, ls]) => datos.filter(d => d >= li && d <= ls).length);

    // Frecuencia acumulada
    let frec_acum = [];
    let acum = 0;
    for (let f of frec_abs) {
        acum += f;
        frec_acum.push(acum);
    }

    // Frecuencia relativa y porcentaje
    let frec_rel = frec_abs.map(f => f / n);
    let frec_rel_porc = frec_rel.map(fr => (fr * 100).toFixed(2));
    let marcas = limites.map(([li, ls]) => ((li + ls) / 2).toFixed(2));

    // Llenar tabla
    const tbody = document.querySelector("#tabla tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < limites.length; i++) {
        const row = `<tr>
            <td>${limites[i][0]} - ${limites[i][1]}</td>
            <td>${marcas[i]}</td>
            <td>${frec_abs[i]}</td>
            <td>${frec_acum[i]}</td>
            <td>${frec_rel[i].toFixed(4)}</td>
            <td>${frec_rel_porc[i]} %</td>
        </tr>`;
        tbody.innerHTML += row;
    }

    // Calculos estadísticos
    const media = datos.reduce((a,b) => a+b,0)/n;
    const sorted = [...datos];
    const mediana = n % 2 === 0 ? (sorted[n/2-1]+sorted[n/2])/2 : sorted[Math.floor(n/2)];

    const moda_map = {};
    datos.forEach(d => moda_map[d] = (moda_map[d]||0)+1);
    let maxCount = Math.max(...Object.values(moda_map));
    const moda = Object.keys(moda_map).filter(x => moda_map[x] === maxCount);

    const desv_media = datos.reduce((a,d) => a + Math.abs(d - media),0)/n;
    const desv_est = Math.sqrt(datos.reduce((a,d)=>a + (d-media)**2,0)/n);

    const resultados = `Media aritmética: ${media.toFixed(2)}
Mediana: ${mediana.toFixed(2)}
Moda: ${moda.join(", ")}
Desviación media: ${desv_media.toFixed(2)}
Desviación estándar: ${desv_est.toFixed(2)}
Rango (R): ${rango.toFixed(2)}
Número de clases (k): ${k}
Amplitud de clase (A): ${amplitud}`;

    document.getElementById("resultados").textContent = resultados;
}
