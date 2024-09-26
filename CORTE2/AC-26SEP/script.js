<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Primitivas Vectorizadas</title>
    <style>
        svg {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <!-- Lienzo SVG -->
    <svg id="svgCanvas" width="500" height="500"></svg>

    <script>
        // Clase base Figura, que contiene el lienzo SVG
        class Figura {
            constructor() {
                this.svgCanvas = document.getElementById('svgCanvas');
            }
        }

        // Clase para representar un punto en el plano
        class Punto {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        }

        // Clase para representar una línea
        class Linea extends Figura {
            #punto1;
            #punto2;

            constructor(punto1, punto2) {
                super();
                this.#punto1 = punto1;
                this.#punto2 = punto2;
            }

            dibujar() {
                const linea = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                linea.setAttribute('x1', this.#punto1.x);
                linea.setAttribute('y1', this.#punto1.y);
                linea.setAttribute('x2', this.#punto2.x);
                linea.setAttribute('y2', this.#punto2.y);
                linea.setAttribute('stroke', 'black');
                linea.setAttribute('stroke-width', 2);
                this.svgCanvas.appendChild(linea);
            }
        }

        // Clase para representar una circunferencia
        class Circunferencia extends Figura {
            #centro;
            #radio;

            constructor(centro, radio) {
                super();
                this.#centro = centro;  // centro es un objeto Punto
                this.#radio = radio;
            }

            dibujar() {
                const circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circ.setAttribute('cx', this.#centro.x);
                circ.setAttribute('cy', this.#centro.y);
                circ.setAttribute('r', this.#radio);
                circ.setAttribute('stroke', 'black');
                circ.setAttribute('stroke-width', 2);
                circ.setAttribute('fill', 'none');
                this.svgCanvas.appendChild(circ);
            }
        }

        // Clase para representar una elipse
        class Elipse extends Figura {
            #centro;
            #radioX;
            #radioY;

            constructor(centro, radioX, radioY) {
                super();
                this.#centro = centro;  // centro es un objeto Punto
                this.#radioX = radioX;
                this.#radioY = radioY;
            }

            dibujar() {
                const elipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                elipse.setAttribute('cx', this.#centro.x);
                elipse.setAttribute('cy', this.#centro.y);
                elipse.setAttribute('rx', this.#radioX);
                elipse.setAttribute('ry', this.#radioY);
                elipse.setAttribute('stroke', 'black');
                elipse.setAttribute('stroke-width', 2);
                elipse.setAttribute('fill', 'none');
                this.svgCanvas.appendChild(elipse);
            }
        }

        // Función principal para dibujar las primitivas
        function dibujarPrimitivas() {
            // Dibujar una línea
            const punto1 = new Punto(50, 50);
            const punto2 = new Punto(200, 200);
            const linea = new Linea(punto1, punto2);
            linea.dibujar();

            // Dibujar una circunferencia
            const centroCirc = new Punto(300, 100);
            const circunferencia = new Circunferencia(centroCirc, 50);
            circunferencia.dibujar();

            // Dibujar una elipse
            const centroElipse = new Punto(400, 300);
            const elipse = new Elipse(centroElipse, 80, 50);
            elipse.dibujar();
        }

        // Ejecutar el dibujo cuando se carga el script
        window.onload = dibujarPrimitivas;
    </script>
</body>
</html>
