<template>
  <v-card
    :loading="loading"
    class="mx-auto"
    max-width="500"
    style="margin-top: 100px;"
  >
    <v-img
      class="white--text align-end"
      height="250px"
      src="https://upload.wikimedia.org/wikipedia/fr/3/31/Eurovia2008.png"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
    >
      <v-card-title
        >Application suivi materiel
        <br />
      </v-card-title>
    </v-img>

    <v-card-text class="text--primary" v-if="forgotPassword == false">
      <v-text-field
        v-model="identifiant"
        prepend-icon="mdi-account"
        type="test"
        label="Identifiant"
      ></v-text-field>

      <v-text-field
        v-model="password"
        prepend-icon="mdi-key-chain"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="Mot de passe"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <div
        class="body-2 forgotPasswordText"
        style="color:#0e4a8b;"
        @click="(forgotPassword = true), (alert = false)"
      >
        Mot de passe oublié ?
      </div>
    </v-card-text>

    <v-card-text class="text--primary" v-if="forgotPassword == true">
      <v-text-field
        v-model="identifiant"
        prepend-icon="mdi-account"
        type="test"
        label="Identifiant"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="forgotPassword == false"
        color="#0e4a8b"
        text
        @click="login()"
      >
        Connexion
      </v-btn>
      <v-btn
        v-if="forgotPassword"
        color="#0e4a8b"
        text
        @click="forgotPassword = false"
      >
        Retour
      </v-btn>
      <v-spacer v-if="forgotPassword"></v-spacer>
      <v-btn
        :disabled="send"
        v-if="forgotPassword"
        color="#0e4a8b"
        text
        @click="sendMail()"
      >
        {{ textButton }}
        <v-icon dark right class="ml-2" small>{{ iconSend }} </v-icon>
      </v-btn>
    </v-card-actions>

    <v-alert v-if="alert" border="top" :type="alertColor">
      {{ alertText }}
    </v-alert>
  </v-card>
</template>

<script>
import Notification from "~/components/Notification";
import axios from "axios";
import nuxtStorage from "nuxt-storage";

export default {
  components: {
    Notification
  },

  data() {
    return {
      API_URL: process.env.API_URL,
      password: "",
      showPassword: false,
      identifiant: "",
      loading: false,
      forgotPassword: false,
      alertText: "",
      alert: false,
      alertColor: "",
      send: false,
      textButton: "M'envoyer un mail",
      seconds: 60,
      iconSend: "mdi-send",
      nom: nuxtStorage.sessionStorage.nom
    };
  },

  methods: {
    login() {
      var self = this;
      axios
        .post("http://3.21.164.98/beta-louvet/login", {
          email: this.identifiant,
          password: this.password
        })
        .then(function(response) {
          console.log(response.data.user[0].id);
          if (response.data.user.length != 0) {
            nuxtStorage.sessionStorage.nom = response.data.user[0].nom;
            nuxtStorage.sessionStorage.prenom = response.data.user[0].prenom;
            nuxtStorage.sessionStorage.identifiant =
              response.data.user[0].email;
            nuxtStorage.sessionStorage.password =
              response.data.user[0].password;
            nuxtStorage.sessionStorage.statut = response.data.user[0].statut;
          } 
          self.$router.push("/");
        
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.loginPage {
  max-width: 600px;
  margin: auto;
}
</style>
