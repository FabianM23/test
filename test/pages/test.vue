<template>
  <v-container>
    <!-- Encabezado con mensaje de bienvenida -->
    <v-row justify="center" class="mb-6">
      <v-col cols="12" class="text-center">
        <h1 class="display-2 font-italic">Bienvenido al Cuestionario de Informática</h1>
      </v-col>
    </v-row>

    <!-- Preguntas del Cuestionario -->
    <v-subheader class="mb-4">Responde las siguientes preguntas:</v-subheader>

    <v-card v-for="(pregunta, index) in preguntas" :key="index" class="my-4">
      <v-card-title class="headline">{{ pregunta.texto }}</v-card-title>
      <v-container>
        <v-radio-group v-model="respuestas[index]" column>
          <v-radio v-for="(opcion, i) in pregunta.opciones" :key="i" :label="opcion" :value="opcion"></v-radio>
        </v-radio-group>
      </v-container>
    </v-card>

    <!-- Botón para guardar el cuestionario y mostrar resultados -->
    <v-btn color="primary" @click="guardarCuestionario" :disabled="!testCompleto">Guardar Cuestionario y Ver Resultados</v-btn>

    <!-- Modal para mostrar los resultados -->
    <v-dialog v-model="modalResultado" max-width="800">
      <v-card class="resultado-modal">
        <v-card-title class="headline">Resultado del Cuestionario</v-card-title>
        <v-card-text>
          <v-container>
            <div class="resultado-info">
              <div>
                <strong>Respuestas Correctas:</strong> {{ respuestasCorrectas }}
              </div>
              <v-simple-table class="resultado-table">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Pregunta</th>
                      <th class="text-left">Respuesta Marcada</th>
                      <th class="text-left">Correcta</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(respuesta, index) in resultado.respuestas" :key="index">
                      <td>{{ respuesta.pregunta }}</td>
                      <td>{{ respuesta.respuesta }}</td>
                      <td :class="{'blue--text': respuesta.esCorrecta, 'red--text': !respuesta.esCorrecta}">
                        {{ respuesta.esCorrecta ? 'Correcta' : 'Incorrecta' }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="irAPaginaRegistro">Cerrar y Regresar al Registro</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      usuario: null,
      preguntas: [
        {
          texto: "¿Qué es un algoritmo?",
          opciones: [
            "a) Un tipo de hardware",
            "b) Un conjunto de instrucciones para resolver un problema o realizar una tarea",
            "c) Un lenguaje de programación",
            "d) Una unidad de almacenamiento"
          ],
          respuestaCorrecta: "b) Un conjunto de instrucciones para resolver un problema o realizar una tarea"
        },
        {
          texto: "¿Cuál de los siguientes es un sistema operativo?",
          opciones: [
            "a) Python",
            "b) Microsoft Word",
            "c) Linux",
            "d) HTML"
          ],
          respuestaCorrecta: "c) Linux"
        },
        {
          texto: "¿Qué significa 'RAM' en informática?",
          opciones: [
            "a) Random Access Memory",
            "b) Read Access Memory",
            "c) Rapid Action Memory",
            "d) Real-time Access Memory"
          ],
          respuestaCorrecta: "a) Random Access Memory"
        },
        {
          texto: "¿Qué es una base de datos?",
          opciones: [
            "a) Un tipo de procesador",
            "b) Un conjunto organizado de datos que se puede acceder, gestionar y actualizar",
            "c) Un software de edición de imágenes",
            "d) Un programa antivirus"
          ],
          respuestaCorrecta: "b) Un conjunto organizado de datos que se puede acceder, gestionar y actualizar"
        },
        {
          texto: "¿Qué es el software libre?",
          opciones: [
            "a) Software que se puede usar, modificar y distribuir libremente",
            "b) Software gratuito sin restricciones de uso",
            "c) Software de prueba por tiempo limitado",
            "d) Software exclusivo para instituciones educativas"
          ],
          respuestaCorrecta: "a) Software que se puede usar, modificar y distribuir libremente"
        },
        {
          texto: "¿Cuál es la principal función de un servidor web?",
          opciones: [
            "a) Ejecutar aplicaciones de escritorio",
            "b) Almacenar y entregar páginas web a los usuarios",
            "c) Proteger contra virus informáticos",
            "d) Editar documentos en línea"
          ],
          respuestaCorrecta: "b) Almacenar y entregar páginas web a los usuarios"
        },
        {
          texto: "¿Qué es la nube en términos informáticos?",
          opciones: [
            "a) Un fenómeno meteorológico",
            "b) Un servicio de almacenamiento y procesamiento de datos en servidores remotos accesibles a través de Internet",
            "c) Una plataforma de programación",
            "d) Un tipo de malware"
          ],
          respuestaCorrecta: "b) Un servicio de almacenamiento y procesamiento de datos en servidores remotos accesibles a través de Internet"
        },
        {
          texto: "¿Cuál de los siguientes es un lenguaje de programación?",
          opciones: [
            "a) HTTP",
            "b) SQL",
            "c) C++",
            "d) XML"
          ],
          respuestaCorrecta: "c) C++"
        },
        {
          texto: "¿Qué es un firewall?",
          opciones: [
            "a) Un tipo de red",
            "b) Una medida de seguridad para controlar el tráfico de red entrante y saliente",
            "c) Un dispositivo para enfriar los componentes del ordenador",
            "d) Un sistema de archivos"
          ],
          respuestaCorrecta: "b) Una medida de seguridad para controlar el tráfico de red entrante y saliente"
        },
        {
          texto: "¿Qué es la inteligencia artificial (IA)?",
          opciones: [
            "a) La capacidad de un sistema informático para realizar tareas que normalmente requieren inteligencia humana",
            "b) Un tipo de hardware avanzado",
            "c) Un algoritmo específico para juegos",
            "d) Un tipo de base de datos"
          ],
          respuestaCorrecta: "a) La capacidad de un sistema informático para realizar tareas que normalmente requieren inteligencia humana"
        }
      ],
      respuestas: Array(10).fill(''), // Inicializa un array para almacenar las respuestas del usuario
      modalResultado: false,
      resultado: {
        nota: 0,
        respuestas: []
      }
    };
  },
  computed: {
    // Verifica si todas las preguntas han sido respondidas
    testCompleto() {
      return this.respuestas.every(respuesta => respuesta !== '');
    },
    // Calcula la cantidad de respuestas correctas
    respuestasCorrectas() {
      return this.resultado.respuestas.filter(respuesta => respuesta.esCorrecta).length;
    }
  },
  methods: {
    async guardarCuestionario() {
      // Construir objeto de resultados para enviar al servidor
      const resultados = this.preguntas.map((pregunta, index) => ({
        pregunta: pregunta.texto,
        respuesta: this.respuestas[index],
        esCorrecta: this.respuestas[index] === pregunta.respuestaCorrecta
      }));

      // Calcular nota
      const nota = resultados.reduce((acumulador, resultado) => {
        return resultado.esCorrecta ? acumulador + 1 : acumulador;
      }, 0);

      // Guardar resultados localmente (en memoria del navegador) para mostrar en el modal
      this.resultado = {
        nota: nota,
        respuestas: resultados
      };

      // Mostrar el modal con los resultados
      this.modalResultado = true;

      // Limpiar respuestas para el próximo cuestionario
      this.respuestas = Array(10).fill('');

      // Guardar resultados en el servidor
      try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const response = await axios.post('http://localhost:8000/resultados', {
          usuario_id: usuario.id,
          nota: nota,
          respuestas: resultados
        });
        console.log('Resultados guardados:', response.data);
      } catch (error) {
        console.error('Error al guardar resultados:', error);
      }
    },
    irAPaginaRegistro() {
      // Redirigir al usuario a la página de registro
      this.modalResultado = false;
      this.$router.push('/registro');
    }
  },
  mounted() {
    // Verificar si el usuario está registrado
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      // Redirigir al usuario a la página de registro si no está registrado
      this.$router.push('/registro');
    } else {
      this.usuario = JSON.parse(usuario);
    }
  }
};
</script>

<style scoped>
/* Estilos generales de la página */
.container {
  background-color: #f0f0f0; /* Fondo gris claro */
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

/* Estilos para el encabezado */
.display-2 {
  font-size: 3rem;
  color: #3f51b5; /* Azul */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Sombra de texto */
}

.font-italic {
  font-style: italic;
}

/* Estilos para las preguntas */
.v-subheader {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
}

/* Estilos para las tarjetas de pregunta */
.v-card {
  background-color: #ffffff; /* Fondo blanco */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  margin-bottom: 20px;
  padding: 20px;
}

/* Estilos para las opciones de respuesta */
.v-radio-group {
  margin-top: 10px;
}

.v-radio {
  margin-bottom: 10px;
}

/* Estilos para el botón de guardar cuestionario */
.v-btn {
  margin-top: 20px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #4caf50; /* Verde */
}

/* Estilos para el modal de resultados */
.resultado-modal {
  background-color: #ffffff; /* Fondo blanco */
  border-radius: 10px;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada */
}

.resultado-modal .headline {
  font-size: 1.8rem;
  color: #0adff7; /* Verde */
  text-align: center;
  margin: 20px 0;
}

.resultado-info {
  text-align: center;
  margin-bottom: 20px;
}

.resultado-info strong {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}

.resultado-table {
  margin-top: 20px;
}

/* Estilos para las celdas de la tabla de resultados */
.blue--text {
  color: #2196f3; /* Azul */
}

.red--text {
  color: #f44336; /* Rojo */
}
</style>
