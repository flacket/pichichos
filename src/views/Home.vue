<template>
  <div>
    <v-parallax
      style="margin-top: -24px; margin-left: -24px; margin-right: -24px;"
      dark
      :src="foto3"
    >
      <v-layout align-center column justify-center>
        <h1 class="display-3 font-weight-regular mb-3">Pichichos</h1>
        <h4 class="display-1 font-weight-thin">Bienvenidos!!!</h4>
      </v-layout>
    </v-parallax>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>

        <v-card-title class="headline">
        <v-icon left color="orange">warning</v-icon>  Oops! </v-card-title>
        <v-card-text>Esta página todavía está en construcción
          <br><br>nuestros gatitos estan trabajando duro para terminar pronto.</v-card-text>
          <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-layout row wrap>
      <v-flex xs12 md4 class="pt-4 px-2">
        <v-hover>
          <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-width="600" :class="`elevation-${hover ? 12 : 2}`"> 
            <v-img :aspect-ratio="16/9" src="https://www.abc.net.au/news/image/7372098-3x2-700x467.jpg">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex orange darken-2 transition-fast-in-fast-out v-card--reveal display-3 white--text"
                  style="height: 100%;"
                ></div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="pt-4" style="position: relative;">
              <div class="font-weight-light grey--text title mb-2">Just random text</div>
              <h3 class="display-1 font-weight-light orange--text mb-2">Mascotas Perdidas</h3>
              <div
                class="font-weight-light title mb-2"
              >Doggo ipsum vvv big ol wow very biscit, snoot.</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="primary">
                <v-icon small left>search</v-icon>
                <span flat @click="$router.push('perdidas')">Ir a Perdidas</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>

      <v-flex xs12 md4 class="pt-4 px-2">
        <v-hover>
          <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-width="600"
            :class="`elevation-${hover ? 12 : 2}`">
            <v-img :aspect-ratio="16/9" src="https://i.pinimg.com/originals/6f/97/ef/6f97ef9fd5b6811f5febe3e4fa89df9f.jpg">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                ></div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="pt-4" style="position: relative;">
              <div class="font-weight-light grey--text title mb-2">Some more random for u</div>
              <h3 class="display-1 font-weight-light orange--text mb-2">Adopta</h3>
              <div class="font-weight-light title mb-2">
                Puggo sub woofer waggy,
                <br>the neighborhood pupper extremely cuuute
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="primary">
                <v-icon small left>loyalty</v-icon>
                <span flat @click="dialog = true">Ir a Adoptar</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>

      <v-flex xs12 md4 class="pt-4 px-2">
        <v-hover>
          <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-width="600" :class="`elevation-${hover ? 12 : 2}`">
            <v-img :aspect-ratio="16/9" src="https://animalfair.com/wp-content/uploads/2015/07/tumblr_m5hfctHc7i1rrgr1no1_1280.jpg">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                ></div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="pt-4" style="position: relative;">
              <div class="font-weight-light grey--text title mb-2">Random is life</div>
              <h3 class="display-1 font-weight-light orange--text mb-2">Registra una Mascota</h3>
              <div class="font-weight-light title mb-2">
                Ruff fluffer floofs long woofer heckin good boys
                <br>and girls tungg you shock.
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="primary">
                <v-icon small left>assignment</v-icon>
                <span flat @click="$router.push('registrarMascota')">Ir a Registrar</span>
                <!--<span flat @click="dialog = true">Ir a Registrar</span>-->
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      dialog: false,
      foto1: 'https://live.staticflickr.com/7809/47574229121_a48bab4d73_h.jpg',
      foto2: 'https://www.petcafe.com.au/wp-content/uploads/2019/01/pet-cafe-1920x1080.jpeg',
      foto3: 'https://www.straight.com/files/v3/styles/gs_large/public/images/18/07/col_realestate_2635.jpg',
      foto4: 'https://content.usaa.com/mcontent/static_assets/Media/pc-mainBnr-petInsurance.jpg',
    }
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
