<template>
  <v-container fluid class="bg-lighten-2 py-8">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12" id="registro-card">
          <v-card-title class="headline text-center">Registro de Usuario</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="usuario.nombre"
                label="Nombre"
                required
                outlined
                dense
                class="custom-input"
              ></v-text-field>
              <v-text-field
                v-model="usuario.email"
                label="Email"
                required
                :rules="[v => !!v || 'Email es requerido', v => /.+@.+\..+/.test(v) || 'Email debe ser válido']"
                outlined
                dense
                class="custom-input"
              ></v-text-field>
              <v-text-field
                v-model="usuario.edad"
                label="Edad"
                type="number"
                required
                :rules="[v => !!v || 'Edad es requerida', v => v > 0 || 'Edad debe ser un número positivo']"
                outlined
                dense
                class="custom-input"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="guardarUsuario">Registrarse</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
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
      }
    };
  },
  methods: {
    async guardarUsuario() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        try {
          const response = await axios.post('http://localhost:8000/usuarios', this.usuario);
          console.log('Usuario registrado:', response.data);
          localStorage.setItem('usuario', JSON.stringify(response.data));

          // Redirigir al usuario a la página del test
          this.$router.push('/test');
        } catch (error) {
          console.error('Error al registrar usuario:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
#registro-card {
  background-color: #ffffff; /* Fondo blanco */
  border-radius: 10px; /* Bordes redondeados */
  padding: 20px; /* Espaciado interno */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  transition: transform 0.3s ease-in-out;
}

#registro-card:hover {
  transform: translateY(-5px); /* Efecto de elevación al pasar el mouse */
}

.headline {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1976d2; /* Color azul primario */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Sombra de texto */
}

.bg-lighten-2 {
  background-color: #f0f3f5; /* Color de fondo */
}

.custom-input {
  margin-bottom: 16px; /* Margen inferior para separar los campos */
  border-radius: 8px; /* Bordes redondeados para los campos */
}

.v-btn {
  text-transform: none; /* Transformación de texto desactivada en el botón */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra suave en el botón */
}

.v-btn:hover {
  background-color: #1565c0; /* Color de fondo al pasar el mouse */
  color: #ffffff; /* Color de texto al pasar el mouse */
}
</style>
