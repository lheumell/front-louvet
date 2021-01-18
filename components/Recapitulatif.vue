<template>
  <v-expansion-panels class="mt" :info="info">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h2>Récapitulatif</h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>
          <span style="color: #7f8c8d ;">Type de materiel :</span>
          {{ info.typeMateriel }}
        </p>
        <p>
          <span style="color: #7f8c8d ;">Numero de chantier :</span>
          {{ info.numeroChantier }}
        </p>
        <p>
          <span style="color: #7f8c8d ;">Nom du chantier :</span>
          {{ info.nomChantier }}
        </p>
        <p>
          <span style="color: #7f8c8d ;">Adresse du chantier :</span>
          {{ info.adresseChantier }}
        </p>
        <p>
          <span style="color: #7f8c8d ;"
            >Nom du chef de chantier (referent) :</span
          >
          {{ info.nomChef }}
        </p>
        <p>
          <span style="color: #7f8c8d ;"
            >Numero de téléphone du Chef de chantier :</span
          >
          {{ info.numChef }}
        </p>

        <p>
          <span style="color: #7f8c8d ;">A partir du </span> {{ date }} <span style="color: #7f8c8d ;">à</span> 
          {{ info.time }} <span style="color: #7f8c8d ;"> pour </span>
          {{ info.nbHeure
          }}<span style="color: #7f8c8d ;"> {{ info.typeTemps }} </span>
        </p>
        <p v-if="info.chauffeur">
          <span style="color: #7f8c8d ;">Chauffeur actuel :</span>
          {{ info.chauffeur }}
        </p>
         <p v-if="info.tarif">
          <span style="color: #7f8c8d ;">Tarif de l'engin :</span>
          {{ info.tarif }}
        </p>
        <p v-if="info.commentaire">
          <span style="color: #7f8c8d ;">Commentaires divers :</span>
          {{ info.commentaire }}
        </p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import axios from "axios";

export default {
  props: {
    info: {}
  },
  data() {
    return {
      date: this.info.date.substr(0, 10)
    }
    
  }
};
</script>

<style>
.mt {
  margin-top: 2rem;
}
</style>
