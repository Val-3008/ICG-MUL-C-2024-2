// Clase Punto con encapsulamiento
class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }
}

// Función para generar un número aleatorio entre un rango
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Genera una lista de puntos aleatorios
function generarPuntosAleatorios(cantidad) {
    const puntos = [];
    for (let i = 0; i < cantidad; i++) {
        const x = generarNumeroAleatorio(50, 550);  // Coordenadas X aleatorias
        const y = generarNumeroAleatorio(50, 350);  // Coordenadas Y aleatorias
        puntos.push(new Punto(x, y));
    }
    return puntos;
}

// Dibujo del polígono en el canvas
function dibujarPoligonoCanvas(puntos) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Iniciar el camino del polígono
    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());

    // Dibujar líneas entre los puntos
    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].getX(), puntos[i].getY());
    }

    // Cerrar el camino y dibujar
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Verificar si el polígono es cóncavo o convexo y mostrar en el enunciado
    const tipo = esConvexo(puntos) ? "Convexo" : "Cóncavo";
    document.getElementById("tipoPoligono").innerText = `El polígono es: ${tipo}`;
}

// Determina si el polígono es convexo o cóncavo
function esConvexo(puntos) {
    const n = puntos.length;
    let signo = 0;

    for (let i = 0; i < n; i++) {
        const dx1 = puntos[(i + 1) % n].getX() - puntos[i].getX();
        const dy1 = puntos[(i + 1) % n].getY() - puntos[i].getY();
        const dx2 = puntos[(i + 2) % n].getX() - puntos[(i + 1) % n].getX();
        const dy2 = puntos[(i + 2) % n].getY() - puntos[(i + 1) % n].getY();

        const cruz = dx1 * dy2 - dy1 * dx2;

        if (cruz !== 0) {
            if (signo === 0) {
                signo = Math.sign(cruz);
            } else if (Math.sign(cruz) !== signo) {
                return false; // Es cóncavo
            }
        }
    }

    return true; // Es convexo
}

// Asegurarnos de que el DOM esté completamente cargado antes de ejecutar el código
window.onload = function() {
    // Genera un número aleatorio de puntos para variar el polígono cada vez
    const cantidadPuntos = generarNumeroAleatorio(3, 8);  // Polígonos con entre 3 y 8 puntos
    const puntosAleatorios = generarPuntosAleatorios(cantidadPuntos);

    // Dibuja el polígono en el canvas con los puntos generados
    dibujarPoligonoCanvas(puntosAleatorios);
}
