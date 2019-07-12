<template>
  <v-container>
    <v-form class="px-3" ref="form">
      <v-subheader>Datos Basicos:</v-subheader>
      <v-layout row wrap>
        <v-flex xs12 md6 px-3>
          <v-text-field v-model="nombre" label="Nombre"></v-text-field>
          <v-radio-group v-model="perdEnc" row>
            <v-radio label="Perdí mi mascota" color="orange" value="perdida"></v-radio>
            <v-radio label="Encontré una mascota" color="orange" value="encontrada"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12 md6 px-3 mb-5>
          <v-select
            v-model="tipoAnimal"
            :items="tipoItems"
            v-on:change="cambiarRaza()"
            label="Tipo de Mascota"
          ></v-select>
          <v-select v-model="sexo" :items="sexoItems" label="Sexo"></v-select>
        </v-flex>
      </v-layout>

      <v-subheader>Apariencia:</v-subheader>
      <v-layout row wrap>
        <v-flex xs12 sm7 md8 lg9>
          <v-layout row wrap>
            <v-flex xs12 sm6 lg4 px-3>
              <v-select v-model="raza" :items="razaItems" label="Raza" :disabled="razaDisabled"></v-select>
            </v-flex>
            <v-flex xs12 sm6 lg2 px-3> 
              <v-select v-model="edad" :items="edadItems" label="Edad"></v-select>
            </v-flex>
            <v-flex xs12 sm6 lg3 px-3>
              <v-select
                v-model="tamano"
                :items="tamanoItems"
                label="Tamaño"
                :hint="tamanoHint"
                v-on:change="cambiartamanoHint()"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 lg3 px-3>
              <v-select v-model="pelo" :items="peloItems" label="Pelo"></v-select>
            </v-flex>
            <v-flex xs12 px-3>
              <v-textarea
                v-model="descripcion"
                label="Descripción"
                value
                hint="Describe como es tu mascota, que caracteristicas especiales tiene, etc."
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm5 md4 lg3 px-3>
          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            @change="selectedImage"
          />
          <v-img
            @click="selectImage"
            class="imagen"
            :src="imageUrl"
            width="230"
            height="230"
          ></v-img>
          <p>{{filename}}</p>
          <v-btn small class="mt-0 primary" @click="selectImage">Subir Imagen</v-btn>
        </v-flex>
      </v-layout>
      <!--<p>Por último, marca en el mapa donde perdiste tu mascota</p>-->

      <p v-if="loading" class="mt-4">Registrando mascota, espera mientras le ponemos la correa..</p>
      <v-progress-linear v-if="loading" v-model="loadingProgress"></v-progress-linear>
      <v-btn color="orange" class="white--text" @click="registrar">Registrar Mascota</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import firebaseApp from "../FirebaseApp";
import { readAndCompressImage } from "browser-image-resizer";

//TODO: borrar estos 2 import y ver como arreglar el puto geoPoint
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  data() {
    return {
      loading: false,
      loadingProgress: 0,

      nombre: "",
      perdEnc: "perdida",
      sexoItems: ["macho", "hembra"],
      sexo: "",
      tipoItems: ["perro", "gato"],
      tipoAnimal: "",
      razaItems: [""],
      razaPerros: [
        "Affenpinscher",
        "Afgano",
        "Akita japonés",
        "Basenji",
        "Basset Azul De Gascuña",
        "Basset Hound",
        "Basset leonado de Bretaña",
        "Beagle",
        "Beauceron",
        "Bedlington Terrier",
        "Bergamasco",
        "Bichón boloñés",
        "Bichón Frisé",
        "Bloodhound",
        "Bobtail o Antiguo Pastor Inglés",
        "Border Collie",
        "Border Terrier",
        "Borzoi",
        "Boston Terrier",
        "Bóxer",
        "Boyero de Berna",
        "Boyero de Flandes",
        "Bracco italiano",
        "Braco alemán de pelo corto",
        "Braco alemán de pelo duro",
        "Braco de Weimar (de pelo corto/suave)",
        "Braco húngaro",
        "Braco húngaro de pelo duro",
        "Bretón",
        "Buhund Noruego",
        "Bull Terrier",
        "Bull Terrier Miniatura",
        "Bulldog",
        "Bulldog francés",
        "Bullmastiff",
        "Cairn terrier",
        "Caniche Enano",
        "Caniche Grande",
        "Caniche Toy",
        "Carlino",
        "Cavalier King Charles Spaniel",
        "Cazador de Alces Noruego (Elkhound Noruego)",
        "Chihuahua (de pelo largo)",
        "Chihuahua (de pelo suave)",
        "Chin japonés",
        "Chow Chow (de pelo duro)",
        "Chow Chow (de pelo suave)",
        "Clumber Spaniel",
        "Cobrador de Nueva Escocia",
        "Cocker Spaniel Americano",
        "Cocker spaniel inglés",
        "Collie barbudo",
        "Collie de Pelo Corto",
        "Corgi Galés (de Cardigan) (Pelaje medio/largo).",
        "Corgi Galés de Pembroke",
        "Cotón de Tulear",
        "Crestado Chino",
        "Dachshund (pelo largo)",
        "Dálmata",
        "Dandie Dinmont Terrier",
        "Dóbermann",
        "Dogo de Burdeos",
        "Esquimal Canadiense",
        "Field spaniel",
        "Fox terrier de pelo duro",
        "Fox terrier de pelo liso",
        "Foxhound",
        "Galgo",
        "Galgo italiano",
        "Golden Retriever",
        "Gran azul de Gascuña",
        "Gran danés",
        "Grifón belga (pelaje corto y suave)",
        "Grifón de Bruselas (pelaje corto y áspero)",
        "Grifón vandeano basset (grande)",
        "Grifón vandeano basset (pequeño)",
        "Habanero",
        "Hamilton stovare",
        "Hovawart",
        "Husky Siberiano",
        "Keeshond",
        "Kerry blue terrier",
        "King Charles Spaniel",
        "Komondor",
        "Kuvasz húngaro",
        "Labrador Retriever",
        "Laekenois",
        "Lakeland Terrier",
        "Lancashire Heeler",
        "Lebrel escocés",
        "Leonberger",
        "Lhasa apso",
        "Lobero irlandés",
        "Lowchen (pequeño perro león)",
        "Malamute de Alaska",
        "Malinois",
        "Maltés",
        "Manchester terrier",
        "Mastín Inglés o Mastiff",
        "Mastín Napolitano",
        "Mastín Tibetano",
        "Munsterlander (Grande)",
        "Norfolk Terrier (Terrier de Norfolk)",
        "Otterhound",
        "Papillón",
        "Parson Jack Russell Terrier (de pelaje corto/suave)",
        "Pastor australiano",
        "Pastor belga Groenendael",
        "Pastor belga Laekenois",
        "Pastor belga Malinois",
        "Pastor belga Tervueren",
        "Pastor de Anatolia",
        "Pastor de Brie o Briard",
        "Pastor de los Pirineos",
        "Pastor de Maremma",
        "Pastor de Shetland o Shetland Sheepdog",
        "Pastor ganadero australiano",
        "Pastor Lapón de Suecia",
        "Pastor Polaco de las Llanuras",
        "Perro de Agua Español",
        "Perro de agua irlandés",
        "Perro de Agua Portugués",
        "Perro de Canaán",
        "Perro de Montaña de los Pirineos",
        "Perro del Faraón",
        "Perro finlandés de Laponia",
        "Perro pastor alemán",
        "Perro salchicha (Miniatura de pelo duro)",
        "Perro salchicha (Miniatura de pelo largo)",
        "Perro salchicha (Miniatura de pelo liso)",
        "Perro salchicha (pelo duro)",
        "Perro salchicha (pelo liso)",
        "Perro Serra da Estrela",
        "Pinscher (Alemán)",
        "Pinscher Miniatura",
        "Podenco ibicenco (pelaje corto y liso)",
        "Pointer",
        "Pomerania",
        "Puli húngaro",
        "Retriever de Chesapeake",
        "Retriever de pelo liso",
        "Retriever de pelo rizado",
        "Rhodesian Ridgeback o Crestado Rodesiano",
        "Rottweiler",
        "Rough Collie o Pastor Escocés de Pelo Largo",
        "Sabueso bávaro de montaña",
        "Sabueso Italiano (de pelo corto/suave)",
        "Saluki o Galgo Persa",
        "Samoyedo",
        "San Bernardo (pelaje medio/largo)",
        "Schipperke",
        "Schnauzer Estándar",
        "Schnauzer gigante",
        "Schnauzer Miniatura",
        "Scottish Terrier o Terrier Escocés",
        "Sealyham Terrier",
        "Setter escocés",
        "Setter inglés",
        "Setter irlandés",
        "Setter irlandés rojo y blanco",
        "Shar Pei",
        "Shiba inu japonés",
        "Shih Tzu",
        "Skye Terrier",
        "Sloughi o Galgo Árabe",
        "Soft Coated Wheaten Terrier",
        "Spaniel holandés",
        "Spaniel Tibetano",
        "Spinone italiano",
        "Spitz alemán mediano",
        "Spitz alemán pequeño",
        "Spitz finlandés",
        "Spitz japonés",
        "Springer Spaniel Galés",
        "Springer spaniel inglés",
        "Staffordshire Bull Terrier",
        "Sussex Spaniel",
        "Terranova (Newfoundland)",
        "Terrier australiano",
        "Terrier Checo",
        "Terrier de Airedale",
        "Terrier de Norwich (Norwich Terrier)",
        "Terrier Galés",
        "Terrier irlandés",
        "Terrier sedoso australiano",
        "Terrier Tibetano",
        "Toy terrier inglés (Negro y fuego)",
        "Vallhund Sueco",
        "West Highland White Terrier",
        "Whippet",
        "Xoloitzcuintle (Mediano)",
        "Yorkshire Terrier"
      ],
      razaGatos: [
        "Oriental de pelo largo",
        "Selkirk rex",
        "Abisinio",
        "Americano de pelo duro",
        "Asiático",
        "Azul ruso",
        "Balinés",
        "Bengalí",
        "Birmano",
        "Bobtail japonés de pelo corto",
        "Bobtail japonés de pelo largo",
        "Bombay",
        "Bosque de Noruega",
        "Bosque de Siberia",
        "Británico de pelo corto",
        "Burmés",
        "Burmilla",
        "Chinchilla",
        "Cornish rex",
        "Cymric",
        "Devon rex",
        "Exótico de pelo corto",
        "Fold escocés",
        "Khao Manee",
        "Korat",
        "Laperm",
        "Maine coon",
        "Manx",
        "Mau egipcio",
        "Mist australiano",
        "Munchkin",
        "Ocigato",
        "Oriental de pelo corto",
        "Persa de pelo largo",
        "Pixie bob",
        "Ragdoll",
        "Savannah",
        "Siamés",
        "Singapura",
        "Snowshoe",
        "Somali",
        "Sphynx",
        "Tiffanie",
        "Tonkinese",
        "Van turco"
      ],
      raza: "",
      razaDisabled: true,

      tamanoItems: ["pequeño", "mediano", "grande"],
      tamano: "",
      tamanoHint: "",
      edadItems: ["cachorro", "joven", "adulto", "anciano"],
      edad: "",
      peloItems: ["corto", "medio", "largo"],
      pelo: "",
      descripcion: "",
      filename: "",
      imageUrl: "",
      image: null,
      geo: { lat: -31.53914, lng: -68.567303 }
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    selectedImage(e) {
      const files = e.target.files;
      this.filename = files[0].name;

      if (this.filename.lastIndexOf(".") <= 0) {
        return alert("Por favor agrega un archivo valido!");
      } else {
        const config = {
          quality: 0.9,
          maxWidth: 500,
          maxHeight: 500,
          autoRotate: true
        };
        readAndCompressImage(files[0], config).then(resizedImage => {
          // aca se guarda la imagen redimensionada
          this.image = resizedImage;
        });
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          //imagen en blob
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        //info de la imagen
        //this.image = files[0];
      }
    },
    cambiartamanoHint() {
      if (this.tamano == "") this.tamanoHint = "debes seleccionar un tamaño";
      else if (this.tamano == "pequeño") this.tamanoHint = "menos de 11Kg";
      else if (this.tamano == "mediano") this.tamanoHint = "entre 11Kg y 27Kg";
      else this.tamanoHint = "más de 28Kg";
    },
    cambiarRaza() {
      if (this.tipoAnimal == "gato") {
        this.razaItems = this.razaGatos;
      } else {
        this.razaItems = this.razaPerros;
      }
      this.razaDisabled = false;
    },
    registrar: function() {
      this.loading = true;
      let key;
      var user = firebaseApp.auth().currentUser;
      firebaseApp
        .firestore()
        .collection("mascotasPerdidas")
        .add({
          nombre: this.nombre,
          perdEnc: this.perdEnc,
          sexo: this.sexo,
          tipoAnimal: this.tipoAnimal,
          raza: this.raza,
          tamano: this.tamano,
          pelo: this.pelo,
          edad: this.edad,
          usuario: user.uid,
          descripcion: this.descripcion,
          fechaCreacion: new Date(),
          geoubicacion: new firebase.firestore.GeoPoint(
            this.geo.lat,
            this.geo.lng
          )
        })
        .then(collKey => {
          //almaceno el id de la coleccion recien guardada
          key = collKey.id;
          //Filepath = Direccion de guardado + Id del usuario + extension del archivo (.jpg)
          var filePath =
            "mascotasPerdidas/" +
            key +
            this.filename.slice(this.filename.lastIndexOf("."));
          //creo la referencia de donde se almacenara en GoogleStorage con el filePath
          var storageRef = firebaseApp.storage().ref(filePath);
          //guardo la imagen
          var task = storageRef.put(this.image);
          var self = this;
          task.on(
            "state_changed",
            function progress(snapshot) {
              var percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              self.loadingProgress = percentage;
            },
            function error(err) {
              console.log(
                "Oopps hubo un problema al subir la imagen: ",
                err.message
              );
            },
            function complete() {
              task.snapshot.ref.getDownloadURL().then(downloadURL => {
                firebaseApp
                  .firestore()
                  .collection("mascotasPerdidas")
                  .doc(key)
                  .set(
                    {
                      imagen: downloadURL
                    },
                    { merge: true }
                  )
                  .then(
                    () => {
                      alert("Mascota Registrada");
                      self.$router.push("/");
                      //this.$router.push({ path: this.$router.go(-1) });
                    },
                    err => {
                      self.loading = false;
                      alert("Oops. " + err.message);
                    }
                  );
              });
            }
          ); //task.on
        });
    } //registrar
  } //methods
}; //export default
</script>
<style>
.imagen:hover {
  background: darkgray
}
.imagen {
  background: grey
}
</style>
