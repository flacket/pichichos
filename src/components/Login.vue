<template>
  <v-dialog max-width="600px" transition="dialog-top-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text rounded v-bind="attrs" v-on="on">
      <!--<v-icon class="mr-2">person</v-icon>-->
      Iniciar Sesión
    </v-btn>
    </template>
    <v-card>
      <v-progress-linear v-if="loading" color="primary" style="margin: 0" :indeterminate="true"></v-progress-linear>
      <v-card-title>
        <h2>Iniciar Sesión</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="email" label="Email" prepend-icon="email"></v-text-field>
          <v-text-field
            v-model="password"
            name="input-10-1"
            label="Contraseña"
            prepend-icon="vpn_key"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            @click:append="show = !show"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn text rounded @click="login" class="success mx-0 mt-3">Aceptar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import firebaseApp from "../FirebaseApp";

export default {
  data() {
    return {
      loading: false,
      email: "",
      password: "",
      show: false,
      dialog: false
    };
  },
  methods: {
    login: function() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        firebaseApp.auth().signInWithEmailAndPassword(this.email, this.password).then(
          () => {
            this.$router.go({ path: this.$router.path });
            //this.$router.replace('/');
          },
          err => {
            this.loading = false;
            alert("Oops. " + err.message);
          }
        );
      }
    }
  }
};
</script>