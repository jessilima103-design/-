document.addEventListener("DOMContentLoaded", () => {
    
    const formulario = document.getElementById("formulario-simulador");
    const btnLimpiar = document.getElementById("btn-limpiar");
    
    const contenedorResultados = document.getElementById("resultados-dinamicos");
    const mensajeInicial = document.getElementById("estado-inicial-mensaje");
    const alertaImpacto = document.getElementById("alerta-impacto");

    const resProducto = document.getElementById("res-producto");
    const resIncrementoUnidad = document.getElementById("res-incremento-unidad");
    const resPorcentaje = document.getElementById("res-porcentaje");
    const resGastoSemanal = document.getElementById("res-gasto-semanal");
    const resTotalAnterior = document.getElementById("res-total-anterior");
    const resTotalActual = document.getElementById("res-total-actual");
    const resDiferencia = document.getElementById("res-diferencia");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const productoVal = document.getElementById("producto").value.trim();
        const precioAnteriorVal = parseFloat(document.getElementById("precio-anterior").value);
        const precioActualVal = parseFloat(document.getElementById("precio-actual").value);
        const cantidadSemanaVal = parseFloat(document.getElementById("cantidad-semana").value);
        const semanasVal = parseInt(document.getElementById("semanas").value);

        if (productoVal === "" || isNaN(precioAnteriorVal) || isNaN(precioActualVal) || isNaN(cantidadSemanaVal) || isNaN(semanasVal)) {
            alert("Por favor, complete todos los campos con valores numéricos válidos.");
            return;
        }

        if (precioAnteriorVal <= 0 || precioActualVal <= 0 || cantidadSemanaVal <= 0 || semanasVal <= 0) {
            alert("Los valores de precio, cantidad y semanas deben ser mayores a cero.");
            return;
        }

        const incrementoUnidad = precioActualVal - precioAnteriorVal;
        const porcentajeAumento = (precioAnteriorVal > 0) ? (incrementoUnidad / precioAnteriorVal) * 100 : 0;
        
        const gastoSemanalAnterior = precioAnteriorVal * cantidadSemanaVal;
        const gastoSemanalActual = precioActualVal * cantidadSemanaVal;
        
        const gastoPeriodoAnterior = gastoSemanalAnterior * semanasVal;
        const gastoPeriodoActual = gastoSemanalActual * semanasVal;
        
        const diferenciaGastoTotal = gastoPeriodoActual - gastoPeriodoAnterior;

        resProducto.textContent = productoVal;
        resIncrementoUnidad.textContent = `${incrementoUnidad.toFixed(2)} Bs`;
        resPorcentaje.textContent = `${porcentajeAumento.toFixed(2)}%`;
        resGastoSemanal.textContent = `${gastoSemanalAnterior.toFixed(2)} Bs / ${gastoSemanalActual.toFixed(2)} Bs`;
        resTotalAnterior.textContent = `${gastoPeriodoAnterior.toFixed(2)} Bs`;
        resTotalActual.textContent = `${gastoPeriodoActual.toFixed(2)} Bs`;
        
        if (diferenciaGastoTotal > 0) {
            resDiferencia.innerHTML = `<span class="txt-critico">+${diferenciaGastoTotal.toFixed(2)} Bs</span>`;
        } else if (diferenciaGastoTotal < 0) {
            resDiferencia.innerHTML = `<span style="color: #27ae60;">${diferenciaGastoTotal.toFixed(2)} Bs (Ahorro)</span>`;
        } else {
            resDiferencia.textContent = "0.00 Bs (Sin variación)";
        }

        alertaImpacto.className = "alerta";
        
        if (porcentajeAumento >= 30) {
            alertaImpacto.classList.add("alerta-critica");
            alertaImpacto.textContent = `⚠️ ALERTA CRÍTICA: El precio de este producto subió de forma severa (${porcentajeAumento.toFixed(1)}%). El impacto sobre la economía familiar es muy alto.`;
        } else if (porcentajeAumento > 0 && porcentajeAumento < 30) {
            alertaImpacto.classList.add("alerta-moderada");
            alertaImpacto.textContent = `⚠️ IMPACTO MODERADO: Registra un incremento del ${porcentajeAumento.toFixed(1)}%. Requiere reajuste presupuestario leve.`;
        } else {
            alertaImpacto.classList.add("alerta-estable");
            alertaImpacto.textContent = `✅ ESTABLE: El precio no ha sufrido incrementos en este periodo simulado.`;
        }

        mensajeInicial.classList.add("oculto");
        contenedorResultados.classList.remove("oculto");
    });

    btnLimpiar.addEventListener("click", () => {
        formulario.reset();
        contenedorResultados.classList.add("oculto");
        mensajeInicial.classList.remove("oculto");
    });
});