function normalizarTexto(valor) {
    return typeof valor === 'string' ? valor.trim() : valor
}

function convertirAEnteroSiEsPosible(valor) {
    if (typeof valor === 'number' && Number.isInteger(valor)) {
        return valor
    }

    if (typeof valor === 'string' && valor.trim() !== '') {
        const valorConvertido = Number(valor)

        if (Number.isInteger(valorConvertido)) {
            return valorConvertido
        }
    }

    return valor
}

function esValorVacio(valor) {
    return valor === undefined || valor === null || valor === ''
}

function validarEquipo(datos = {}) {
    const errores = []

    const datosSanitizados = {
        nombre: normalizarTexto(datos.nombre),
        codigo_FIFA: normalizarTexto(datos.codigo_FIFA),
        nombre_tecnico: normalizarTexto(datos.nombre_tecnico),
        cantidad_jugadores: convertirAEnteroSiEsPosible(datos.cantidad_jugadores),
        ranking_fifa: convertirAEnteroSiEsPosible(datos.ranking_fifa),
        grupoId: esValorVacio(datos.grupoId)
            ? null
            : convertirAEnteroSiEsPosible(datos.grupoId),
    }

    if (typeof datosSanitizados.nombre !== 'string' || datosSanitizados.nombre.length === 0) {
        errores.push('El nombre del pais es obligatorio')
    }

    if (
        typeof datosSanitizados.codigo_FIFA !== 'string' ||
        datosSanitizados.codigo_FIFA.length === 0
    ) {
        errores.push('El codigo FIFA es obligatorio')
    } else {
        datosSanitizados.codigo_FIFA = datosSanitizados.codigo_FIFA.toUpperCase()

        if (datosSanitizados.codigo_FIFA.length !== 3) {
            errores.push('El codigo FIFA debe tener exactamente 3 caracteres')
        }
    }

    if (
        typeof datosSanitizados.nombre_tecnico !== 'string' ||
        datosSanitizados.nombre_tecnico.length === 0
    ) {
        errores.push('El nombre del tecnico es obligatorio')
    }

    if (!Number.isInteger(datosSanitizados.cantidad_jugadores)) {
        errores.push('La cantidad de jugadores debe ser un numero entero')
    } else {
        if (datosSanitizados.cantidad_jugadores <= 0) {
            errores.push('La cantidad de jugadores debe ser un numero entero positivo')
        }

        if (
            datosSanitizados.cantidad_jugadores < 23 ||
            datosSanitizados.cantidad_jugadores > 26
        ) {
            errores.push('La cantidad de jugadores debe estar entre 23 y 26')
        }
    }

    if (!Number.isInteger(datosSanitizados.ranking_fifa)) {
        errores.push('El ranking FIFA debe ser un numero entero')
    } else if (datosSanitizados.ranking_fifa <= 0) {
        errores.push('El ranking FIFA debe ser un numero entero positivo')
    }

    if (
        datosSanitizados.grupoId !== null &&
        (!Number.isInteger(datosSanitizados.grupoId) || datosSanitizados.grupoId <= 0)
    ) {
        errores.push('El grupoId debe ser un numero entero positivo')
    }

    return {
        esValido: errores.length === 0,
        errores,
        datosSanitizados,
    }
}

module.exports = {
    validarEquipo
}
