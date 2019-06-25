<template>
  <div>
    <h1 class="subheading grey--text">Mascotas Perdidas</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="pet in mascotas" :key="pet.id">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="pet.imagen">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ pet.nombre }}</div>
              <div class="grey--text">{{ pet.raza }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>message</v-icon>
                <span class="">Ver Perfil</span>
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

export default {
  data() {
    return {
      mascotas: []
    }
  },
  created() {
    //const docRef = firestore.doc("mascotasPerdidas")


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
  }
}
</script>