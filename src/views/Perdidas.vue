<template>
  <div>
    <h1 class="display-1 primary--text font-weight-medium">Mascotas Perdidas</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="pet in mascotas" :key="pet.id">
          <v-card class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="150" class="grey lighten-2">
                <v-img :src="pet.imagen"></v-img>
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ pet.nombre }}</div>
              <div class="grey--text">{{ pet.raza }}</div>
              <div class="grey--text">{{ pet.tipoAnimal }}</div>
              <div class="grey--text">{{ pet.fechaCreacion | moment }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="isLoggedIn" flat color="primary">
                <v-icon small left>message</v-icon>
                <span flat @click="goPerfil(pet.id)">Ver Perfil</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebaseApp from "../FirebaseApp";
import moment from 'moment';
moment.locale('es-us');

export default {
  data() {
    return {
      isLoggedIn: false,
      petIdKey: '',
      mascotas: [],
    }
  },
  created() {
    //const docRef = firestore.doc("mascotasPerdidas")
    if (firebaseApp.auth().currentUser)
      this.isLoggedIn = true;
    else this.isLoggedIn = false;

    firebaseApp.firestore().collection('mascotasPerdidas').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if(change.type === 'added'){
          this.mascotas.push({
            ...change.doc.data(),
            id: change.doc.id
          })
          //revisar si esta bien (change.doc.id  debe ser el id a eliminar)
        }else if(change.type == 'removed'){
          this.$delete(this.todos, change.doc.id)
        }
      })
    })
  },
  methods: {
    goPerfil: function(id){
      this.$router.push('/perfil/' + id);
    }
  },
  filters: {
  moment: function (date) {
    //validar si es tipo fecha
    return moment(date.toDate()).calendar();
  }
}
}
</script>