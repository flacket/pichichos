<template>
  <div>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-avatar class="my-3" size="200"
          ><img src="https://pbs.twimg.com/profile_images/1127096828078559234/-HbpN8tn_400x400.png"/>
        </v-avatar>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display font-weight-bold mb-3">
          Pichichos
        </h1>
        <p class="subheading font-weight-regular">
          Creada con ❤️ por Facundo Gallardo
          <br>para información del proyecto visita mi
          <a href="https://github.com/flacket" target="_blank">Perfil Github</a>
        </p>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <h2 class="headline font-weight-bold mb-3">Mis Redes Sociales</h2>

        <v-layout justify-center>
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
    </div>
</template>

<script>

  export default {
    data: () => ({
      whatsNext: [
        {
          text: 'Facebook',
          href: 'https://www.facebook.com/facundogallardo'
        },
        {
          text: 'Instagram',
          href: 'https://www.instagram.com/facundogallardo'
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/FacundoGallard'
        }
      ]
    })
  }
</script>
