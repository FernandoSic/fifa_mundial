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

function obtenerIdentificadorEquipo(equipo) {
    if (!equipo || typeof equipo !== 'object') {
        return null
    }

    return equipo.id ?? equipo.codigo_FIFA ?? equipo.nombre ?? null
}

function validarGrupo(datos = {}) {
    const errores = []

    const datosSanitizados = {
        nombre: normalizarTexto(datos.nombre),
        description: normalizarTexto(datos.description ?? datos.descripcion),
    }

    if (typeof datosSanitizados.nombre !== 'string' || datosSanitizados.nombre.length === 0) {
        errores.push('El nombre del grupo es obligatorio')
    }

    if (
        datosSanitizados.description !== undefined &&
        datosSanitizados.description !== null &&
        typeof datosSanitizados.description !== 'string'
    ) {
        errores.push('La descripcion del grupo debe ser un texto valido')
    }

    if (datosSanitizados.description === '') {
        datosSanitizados.description = null
    }

    return {
        esValido: errores.length === 0,
        errores,
        datosSanitizados,
    }
}

function validarFormacionDeGrupos(datos = {}) {
    const errores = []

    const datosSanitizados = {
        cantidad_grupos: convertirAEnteroSiEsPosible(datos.cantidad_grupos),
        equipos: Array.isArray(datos.equipos) ? datos.equipos : [],
    }

    if (!Number.isInteger(datosSanitizados.cantidad_grupos)) {
        errores.push('La cantidad de grupos debe ser un numero entero')
    } else if (datosSanitizados.cantidad_grupos <= 1) {
        errores.push('La cantidad de grupos debe ser mayor a 1')
    }

    if (!Array.isArray(datos.equipos)) {
        errores.push('Los equipos deben enviarse en un arreglo')
    } else if (datosSanitizados.equipos.length === 0) {
        errores.push('Debe enviar al menos un equipo para formar grupos')
    }

    if (
        Number.isInteger(datosSanitizados.cantidad_grupos) &&
        Array.isArray(datos.equipos) &&
        datosSanitizados.equipos.length > 0
    ) {
        if (datosSanitizados.equipos.length < datosSanitizados.cantidad_grupos) {
            errores.push('No hay suficientes equipos para formar la cantidad de grupos solicitados')
        }

        if (datosSanitizados.equipos.length % datosSanitizados.cantidad_grupos !== 0) {
            errores.push('La cantidad de equipos debe dividirse exactamente entre la cantidad de grupos')
        }

        const identificadores = datosSanitizados.equipos.map(obtenerIdentificadorEquipo)
        const identificadoresValidos = identificadores.filter((identificador) => identificador !== null)
        const identificadoresUnicos = new Set(identificadoresValidos)

        if (identificadoresValidos.length !== identificadoresUnicos.size) {
            errores.push('No se pueden repetir equipos en la formacion de grupos')
        }
    }

    return {
        esValido: errores.length === 0,
        errores,
        datosSanitizados,
    }
}

module.exports = {
    validarGrupo,
    validarFormacionDeGrupos,
}
