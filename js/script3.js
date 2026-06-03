document.addEventListener("DOMContentLoaded", () => {
    
    const formulario = document.getElementById("formulario-presupuesto");
    const btnLimpiar = document.getElementById("btn-limpiar");
    
    const contenedorResultados = document.getElementById("resultados-dinamicos");
    const mensajeInicial = document.getElementById("estado-inicial-mensaje");
    const alertaImpacto = document.getElementById("alerta-impacto");

    const resPresupuesto = document.getElementById("res-presupuesto");
    const resProducto = document.getElementById("res-producto");
    const resTotalCompra = document.getElementById("res-total-compra");
    const resClasificacion = document.getElementById("res-clasificacion");
    const resSaldo = document.getElementById("res-saldo");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const presupuestoVal = parseFloat(document.getElementById("presupuesto").value);
        const productoVal = document.getElementById("producto").value.trim();
        const precioVal = parseFloat(document.getElementById("precio").value);
        const cantidadVal = parseFloat(document.getElementById("cantidad").value);

        if (isNaN(presupuestoVal) || productoVal === "" || isNaN(precioVal) || isNaN(cantidadVal)) {
            alert("Por favor, introduce valores numéricos correctos en todos los campos.");
            return;
        }

        if (presupuestoVal <= 0 || precioVal <= 0 || cantidadVal <= 0) {
            alert("Los importes financieros y las cantidades deben ser mayores que cero.");
            return;
        }

        const totalCompra = precioVal * cantidadVal;
        const saldoRestante = presupuestoVal - totalCompra;
        const porcentajeConsumo = (totalCompra / presupuestoVal) * 100;

        resPresupuesto.textContent = `${presupuestoVal.toFixed(2)} Bs`;
        resProducto.textContent = productoVal;
        resTotalCompra.textContent = `${totalCompra.toFixed(2)} Bs`;

        let clasificacionText = "";
        if (porcentajeConsumo <= 30) {
            clasificacionText = "Gasto Bajo (Representa menos del 30% de tus fondos)";
        } else if (porcentajeConsumo > 30 && porcentajeConsumo <= 75) {
            clasificacionText = "Gasto Medio (Representa entre el 30% y 75% de tus fondos)";
        } else {
            clasificacionText = "Gasto Alto (Representa más del 75% de tus fondos)";
        }
        resClasificacion.textContent = clasificacionText;

        alertaImpacto.className = "alerta";

        if (saldoRestante < 0) {
            const faltante = Math.abs(saldoRestante);
            resSaldo.innerHTML = `<span class="txt-critico">Faltante (-${faltante.toFixed(2)} Bs)</span>`;
            
            alertaImpacto.classList.add("alerta-insuficiente");
            alertaImpacto.textContent = `❌ EL DINERO NO ALCANZA: Tu presupuesto es insuficiente para pagar esta cantidad de ${productoVal}. Te faltan exactamente ${faltante.toFixed(2)} Bs para cubrir la cuenta total.`;
        
        } else {
            resSaldo.innerHTML = `<span class="txt-estable">Saldo Restante (+${saldoRestante.toFixed(2)} Bs)</span>`;
            
            if (porcentajeConsumo > 75) {
                alertaImpacto.classList.add("alerta-advertencia");
                alertaImpacto.textContent = `⚠️ ¡CUIDADO!: El dinero te alcanza para comprar el producto, pero estás comprometiendo el ${porcentajeConsumo.toFixed(1)}% de tu presupuesto en esta sola adquisición. Tu margen de seguridad es mínimo.`;
            } else {
                alertaImpacto.classList.add("alerta-exito");
                alertaImpacto.textContent = `✅ COMPRA VIABLE: El dinero cubre perfectamente el costo de la compra. Te sobrarán ${saldoRestante.toFixed(2)} Bs libres para otros gastos indispensables del hogar.`;
            }
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