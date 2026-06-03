document.addEventListener("DOMContentLoaded", () => {
    
    const formulario = document.getElementById("formulario-combustible");
    const btnLimpiar = document.getElementById("btn-limpiar");
    
    const contenedorResultados = document.getElementById("resultados-dinamicos");
    const mensajeInicial = document.getElementById("estado-inicial-mensaje");
    const alertaImpacto = document.getElementById("alerta-impacto");

    const resTiempoMinutos = document.getElementById("res-tiempo-minutos");
    const resTiempoHoras = document.getElementById("res-tiempo-horas");
    const resDemandaTotal = document.getElementById("res-demanda-total");
    const resReservaInicial = document.getElementById("res-reserva-inicial");
    const resBalance = document.getElementById("res-balance");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const vehiculosVal = parseInt(document.getElementById("vehiculos").value);
        const tiempoAtencionVal = parseFloat(document.getElementById("tiempo-atencion").value);
        const litrosPromedioVal = parseFloat(document.getElementById("litros-promedio").value);
        const reservaSurtidorVal = parseFloat(document.getElementById("reserva-surtidor").value);

        if (isNaN(vehiculosVal) || isNaN(tiempoAtencionVal) || isNaN(litrosPromedioVal) || isNaN(reservaSurtidorVal)) {
            alert("Por favor, rellene todos los campos de simulación con parámetros correctos.");
            return;
        }

        if (vehiculosVal < 0 || tiempoAtencionVal <= 0 || litrosPromedioVal <= 0 || reservaSurtidorVal < 0) {
            alert("Los valores de tiempo, litros consumidos y reserva no pueden ser negativos ni cero.");
            return;
        }

        const tiempoEsperaMinutos = vehiculosVal * tiempoAtencionVal;
        const tiempoEsperaHoras = tiempoEsperaMinutos / 60;
        const demandaCombustibleTotal = vehiculosVal * litrosPromedioVal;
        const balanceCombustibleRemanente = reservaSurtidorVal - demandaCombustibleTotal;

        resTiempoMinutos.textContent = `${tiempoEsperaMinutos.toFixed(0)} minutos`;
        resTiempoHoras.textContent = `${tiempoEsperaHoras.toFixed(2)} horas`;
        resDemandaTotal.textContent = `${demandaCombustibleTotal.toLocaleString('es-ES')} Litros`;
        resReservaInicial.textContent = `${reservaSurtidorVal.toLocaleString('es-ES')} Litros`;

        alertaImpacto.className = "alerta";

        if (balanceCombustibleRemanente < 0) {
            const faltante = Math.abs(balanceCombustibleRemanente);
            resBalance.innerHTML = `<span class="txt-critico">Insuficiente (Faltan ${faltante.toLocaleString('es-ES')} L)</span>`;
            
            alertaImpacto.classList.add("alerta-roja");
            alertaImpacto.textContent = `🚨 CRISIS DE SUMINISTRO: El volumen en reserva no cubrirá la fila por completo. Se agotará antes de atender a todos los vehículos. Faltan ${faltante.toLocaleString('es-ES')} litros.`;
        
        } else if (balanceCombustibleRemanente >= 0 && balanceCombustibleRemanente <= 200) {
            resBalance.innerHTML = `<span class="txt-moderado">Crítico Crítico (${balanceCombustibleRemanente.toLocaleString('es-ES')} L restantes)</span>`;
            
            alertaImpacto.classList.add("alerta-naranja");
            alertaImpacto.textContent = `⚠️ RIESGO ELEVADO: El combustible alcanzará de manera extremadamente justa para abastecer los autos en espera, dejando el surtidor prácticamente desierto.`;
        
        } else {
            resBalance.innerHTML = `<span class="txt-estable">Abastecido (+${balanceCombustibleRemanente.toLocaleString('es-ES')} L sobrantes)</span>`;
            
            alertaImpacto.classList.add("alerta-verde");
            alertaImpacto.textContent = `✅ SUMINISTRO VIABLE: La estación dispone de suficiente reserva para abastecer la fila de espera actual con un margen de seguridad aceptable.`;
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