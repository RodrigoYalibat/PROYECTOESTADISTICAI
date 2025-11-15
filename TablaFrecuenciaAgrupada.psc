Algoritmo TablaFrecuenciaAgrupada
	// Variables
	Definir n, i, j, k, rango, amplitud, inicio, acum, suma, media, mediana, desv_media, desv_est, minDato, maxDato, valor, encontrado, contador, maximo, resultadoLog, aux, potencia Como Real
	Definir texto, moda_texto Como Cadena
	// Arreglos
	Dimensionar datos(1000)
	Dimensionar frec_abs(100)
	Dimensionar frec_acum(100)
	Dimensionar frec_rel(100)
	Dimensionar frec_rel_porc(100)
	Dimensionar marcas(100)
	Dimensionar limite_inf(100)
	Dimensionar limite_sup(100)
	Dimensionar moda_valor(100)
	Dimensionar moda_cont(100)
	// Entrada de datos
	Escribir 'Ingrese la cantidad de datos:'
	Leer n
	Si n<21 Entonces
		Escribir 'Debes ingresar al menos 21 datos.'
	FinSi
	Para i<-1 Hasta n Con Paso 1 Hacer
		Escribir 'Dato ', i, ': '
		Leer datos[i]
	FinPara
	// Ordenamiento
	Para i<-1 Hasta n-1 Con Paso 1 Hacer
		Para j<-i+1 Hasta n Con Paso 1 Hacer
			Si datos[i]>datos[j] Entonces
				valor <- datos[i]
				datos[i] <- datos[j]
				datos[j] <- valor
			FinSi
		FinPara
	FinPara
	minDato <- datos[1]
	maxDato <- datos[n]
	rango <- maxDato-minDato
	// Calcular log10(n) aproximado
	resultadoLog <- 0
	potencia <- 1
	aux <- n
	Mientras aux>=10 Hacer
		aux <- aux/10
		resultadoLog <- resultadoLog+1
	FinMientras
	resultadoLog <- resultadoLog+(aux-1)
	// Número de clases con Sturges
	k <- Redon(1+3.322*resultadoLog)
	// Amplitud de clase
	amplitud <- Trunc(rango/k)
	Si amplitud*k<rango Entonces
		amplitud <- amplitud+1
	FinSi
	// Límites de clase
	inicio <- minDato
	Para i<-1 Hasta k Con Paso 1 Hacer
		limite_inf[i] <- inicio
		limite_sup[i] <- inicio+amplitud-1
		inicio <- inicio+amplitud
	FinPara
	// Frecuencias absolutas
	Para i<-1 Hasta k Con Paso 1 Hacer
		frec_abs[i] <- 0
		Para j<-1 Hasta n Con Paso 1 Hacer
			Si datos[j]>=limite_inf[i] Y datos[j]<=limite_sup[i] Entonces
				frec_abs[i] <- frec_abs[i]+1
			FinSi
		FinPara
	FinPara
	// Frecuencia acumulada y relativa
	acum <- 0
	Para i<-1 Hasta k Con Paso 1 Hacer
		acum <- acum+frec_abs[i]
		frec_acum[i] <- acum
		frec_rel[i] <- frec_abs[i]/n
		frec_rel_porc[i] <- frec_rel[i]*100
		marcas[i] <- (limite_inf[i]+limite_sup[i])/2
	FinPara
	// Media
	suma <- 0
	Para i<-1 Hasta n Con Paso 1 Hacer
		suma <- suma+datos[i]
	FinPara
	media <- suma/n
	// Mediana
	Si n MOD 2=0 Entonces
		mediana <- (datos[n/2]+datos[(n/2)+1])/2
	SiNo
		mediana <- datos[(n+1)/2]
	FinSi
	// Moda
	contador <- 0
	Para i<-1 Hasta n Con Paso 1 Hacer
		encontrado <- 0
		Para j<-1 Hasta contador Con Paso 1 Hacer
			Si moda_valor[j]=datos[i] Entonces
				moda_cont[j] <- moda_cont[j]+1
				encontrado <- 1
			FinSi
		FinPara
		Si encontrado=0 Entonces
			contador <- contador+1
			moda_valor[contador] <- datos[i]
			moda_cont[contador] <- 1
		FinSi
	FinPara
	maximo <- 0
	Para i<-1 Hasta contador Con Paso 1 Hacer
		Si moda_cont[i]>maximo Entonces
			maximo <- moda_cont[i]
		FinSi
	FinPara
	moda_texto <- ''
	Para i<-1 Hasta contador Con Paso 1 Hacer
		Si moda_cont[i]=maximo Entonces
			moda_texto <- moda_texto+ConvertirATexto(moda_valor[i])+' '
		FinSi
	FinPara
	// Desviaciones
	suma <- 0
	Para i<-1 Hasta n Con Paso 1 Hacer
		suma <- suma+Abs(datos[i]-media)
	FinPara
	desv_media <- suma/n
	suma <- 0
	Para i<-1 Hasta n Con Paso 1 Hacer
		suma <- suma+(datos[i]-media)^2
	FinPara
	desv_est <- Raiz(suma/n)
	// Salida
	Escribir '=============================='
	Escribir 'TABLA DE FRECUENCIAS AGRUPADAS'
	Escribir '=============================='
	Para i<-1 Hasta k Con Paso 1 Hacer
		Escribir limite_inf[i], ' - ', limite_sup[i], ' | Marca: ', marcas[i], ' | f: ', frec_abs[i], ' | F: ', frec_acum[i], ' | fr: ', frec_rel[i], ' | %: ', frec_rel_porc[i]
	FinPara
	Escribir '=============================='
	Escribir 'Media: ', media
	Escribir 'Mediana: ', mediana
	Escribir 'Moda: ', moda_texto
	Escribir 'Desviación media: ', desv_media
	Escribir 'Desviación estándar: ', desv_est
	Escribir 'Rango: ', rango
	Escribir 'Número de clases: ', k
	Escribir 'Amplitud: ', amplitud
FinAlgoritmo
