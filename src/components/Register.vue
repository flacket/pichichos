<template>
  <v-dialog max-width="600px">

    <v-btn flat slot="activator">Registrarse</v-btn>
    <v-card>
      <v-card-title>
        <h2>Registrarse</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="user" label="Nombre de Usuario" prepend-icon="person" 
          :rules="[rules.required]"
          ></v-text-field>
          <v-text-field v-model="email" label="Email" prepend-icon="email" 
          :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="password" name="input-10-1" label="Contraseña" prepend-icon="vpn_key"
            :rules="[rules.required, rules.min]"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="password2" name="input-10-1" label="Repite Contraseña"
            :rules="[rules.required, rules.min]"
            type="password"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn flat @click="submit" class="success mx-0 mt-3">Aceptar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from 'firebase'

export default {
data() {
    return {
      email: '',
      user: '',
      password: '',
      password2: '',
      rules: {
          required: value => !!value || 'Campo Obligatorio',
          min: v => v.length >= 8 || 'Mínimo 8 Caracteres',
          passMatch: () => ('El usuario y contraseña ingresados no coinciden')
      }
    }
},
methods: {
    submit(e) {
        if(this.$refs.form.validate()){
            firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(user => {
              alert(`Cuenta creada para ${user.email}`);
            },
            err => {
              alert(err.message);
            });
            console.log(this.user, this.password);
        }
        e.preventDefault();
    }
}
}
</script>