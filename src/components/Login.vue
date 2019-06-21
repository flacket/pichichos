<template>
  <v-dialog max-width="600px" v-model="dialog">

    <v-btn flat slot="activator">
      <!--<v-icon class="mr-2">person</v-icon>-->
      Iniciar Sesión
    </v-btn>
    <v-card>
      <v-card-title>
        <h2>Iniciar Sesión</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="email" label="Email" prepend-icon="email" 
          ></v-text-field>
          <v-text-field
            v-model="password" name="input-10-1" label="Contraseña" prepend-icon="vpn_key"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            @click:append="show = !show"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn flat @click="login" class="success mx-0 mt-3">Aceptar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import firebaseAuth from '@/database/FirebaseAuth'
export default {
  data() {
    return {
      email: '',
      password: '',
      show: false,
      dialog: false
    }
  },
  methods: {
  login() {
    if(this.$refs.form.validate()){
      firebaseAuth.signInWithEmailAndPassword(this.email,this.password).then(userCred => {
      //this.dialog = false;
      this.$router.go({path: this.$router.path});
      alert(`Cuenta Logueada ${userCred.email}`);
      },
      err => {
        alert(err.message);
      });
    }
  }
  }
}
</script>