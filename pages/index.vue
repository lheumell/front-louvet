<template>
  <div class="home">
    <v-container>
      <v-row dense>
        <v-col cols="12" sm='6'>
          <v-card color="#385F73" dark>
            <v-card-title class="headline">
              Bonjour {{ nom + " " + prenom }},
            </v-card-title>

            <v-card-subtitle class="pt-2 pb-1"
              >Email: {{ identifiant }}</v-card-subtitle
            >
            <v-card-subtitle class="pt-0">Statut: {{ statut }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import nuxtStorage from "nuxt-storage";

export default {
  data() {
    return {
      nom: nuxtStorage.sessionStorage.nom,
      prenom: nuxtStorage.sessionStorage.prenom,
      identifiant: nuxtStorage.sessionStorage.identifiant,
      statut: nuxtStorage.sessionStorage.statut
    };
  }
};
</script>
