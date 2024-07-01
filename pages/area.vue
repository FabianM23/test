<template>
    <v-container fill-height fluid>
      <!-- Formulario de registro y test -->
      <v-row justify="center">
        <v-col>
          <material-card color="orange" title="Test de Conceptos de Informática">
            <v-form ref="form">
              <v-text-field
                v-model="usuario.nombre"
                label="Nombre"
                required
                :rules="[v => !!v || 'Nombre es requerido']"
              ></v-text-field>
              <v-text-field
                v-model="usuario.email"
                label="Email"
                required
                :rules="[v => !!v || 'Email es requerido', v => /.+@.+\..+/.test(v) || 'Email debe ser válido']"
              ></v-text-field>
              <v-text-field
                v-model="usuario.edad"
                label="Edad"
                type="number"
                required
                :rules="[v => !!v || 'Edad es requerida']"
              ></v-text-field>
  
              <!-- Preguntas del test -->
              <v-subheader>Preguntas:</v-subheader>
              <v-checkbox v-for="(pregunta, index) in preguntas" :key="index" v-model="respuestas[index]" :label="pregunta"></v-checkbox>
  
              <!-- Botones -->
              <v-row>
                <v-col cols="2">
                  <v-btn color="success" @click="guardar()">Guardar</v-btn>
                </v-col>
                <v-col cols="2">
                  <v-btn color="orange" @click="cancelar()">Cancelar</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </material-card>
        </v-col>
      </v-row>
  
      <!-- Visualización de resultados -->
      <v-row>
        <v-subheader>Resultados:</v-subheader>
        <v-card v-for="(resultado, index) in resultados" :key="index" class="my-2" elevation="2" rounded width="600">
          <v-row>
            <v-col>{{ resultado.nombre }} - {{ resultado.email }} - {{ resultado.edad }}</v-col>
            <v-col>
              <v-chip v-for="(respuesta, idx) in resultado.respuestas" :key="idx" color="blue" class="ma-1">{{ respuesta }}</v-chip>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        usuario: {
          nombre: '',
          email: '',
          edad: null
        },
        preguntas: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3'], // Ejemplo de preguntas
        respuestas: [], // Aquí se guardarán las respuestas del usuario
        resultados: [] // Aquí se mostrarán los resultados guardados
      };
    },
    methods: {
      async guardar() {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          // Guardar respuestas en el servidor
          const datosGuardar = {
            nombre: this.usuario.nombre,
            email: this.usuario.email,
            edad: this.usuario.edad,
            respuestas: this.respuestas
          };
  
          await axios.post('http://localhost:8000/resultados', datosGuardar)
            .then(response => {
              console.log('Guardado exitosamente:', response.data);
              this.resultados.push(response.data); // Agregar resultado a la lista de resultados mostrados
            })
            .catch(error => {
              console.error('Error al guardar:', error);
            });
  
          // Limpiar formulario y respuestas
          this.$refs.form.reset();
          this.respuestas = [];
        }
      },
      cancelar() {
        this.$refs.form.reset();
        this.respuestas = [];
      },
      async cargarResultados() {
        await axios.get('http://localhost:8000/resultados')
          .then(response => {
            this.resultados = response.data;
          })
          .catch(error => {
            console.error('Error al cargar resultados:', error);
          });
      }
    },
    mounted() {
      this.cargarResultados();
    }
  };
  </script>
  