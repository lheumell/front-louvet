<template>
  <v-expansion-panels class="mt" :infoRegie="infoRegie">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h2>Bon de régie</h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content
        ><p>
          <span style="color: #7f8c8d ;">Client :</span>
          {{ infoRegie[0].client }}
        </p>
         <p>
          <span style="color: #7f8c8d ;">Type de materiel : </span>
          {{ infoRegie[0].typeMat }}
        </p>
        <p>
          <span style="color: #7f8c8d ;">date du bon : </span>
          {{ infoRegie[0].date }}
        </p>
        <p>
          <span style="color: #7f8c8d ;">Nombres d'heure de jour :</span>
          {{ infoRegie[0].nbHeuresJour }}
        </p>
        <p>
          <span style="color: #7f8c8d ;">Nombres d'heure de nuit : </span>
          {{ infoRegie[0].nbHeuresNuit }}
        </p>
      </v-expansion-panel-content>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          type="submit"
          text
          @click="validate(isButton)"
          v-if="RegieValide != 'Feuille de route validée' && statut == 2"
        >
          Valider
        </v-btn>
      </v-card-actions>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import nuxtStorage from "nuxt-storage";
export default {
  props: {
    infoRegie: {},
    RegieValide: ""
  },
  data() {
    return {
      isButton: true,
      statut: nuxtStorage.sessionStorage.statut
    };
  },
  methods: {
    validate(param) {
      console.log("c'est validé");
      this.isButton = false;
      this.$emit("ValidateRegie", param);
    }
  }
};
</script>

<style>
.mt {
  margin-top: 2rem;
}
</style>
