<template>
  <div class="item" :info="info">
    <v-card elevation="4">
      <p style="background-color: red;" class="text-center">
        <span class="deep-orange darken-2">{{ info.etat }}</span>
      </p>
      <div class="container px-10 pb-10">
        <button class="btn btn-primary" @click="goToBack(showlist)">
          <v-icon class="mb-6">mdi-chevron-left </v-icon>
        </button>
        <h1>
          <span style="color: #7f8c8d;">Numero du chantier:</span>
          {{ info.numeroChantier }}
        </h1>
        <Recapitulatif :info="info" />
        <Regie
          :infoRegie="this.bonDeRegie"
          :RegieValide="this.info.etat"
          v-if="bonDeRegie[0]"
          @ValidateRegie="ValidateRegie"
        />

        <v-form method="post" @submit.prevent="submit">
          <v-container
            v-if="info.etat != 'Feuille de route validée' && statut == 2"
          >
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="chauffeur"
                  color="blue darken-2"
                  label="Nom chauffeur"
                  required
                >
                </v-text-field>
                <p v-if="info.chauffeur != null">
                  Le chauffeur actuel : {{ info.chauffeur }}
                </p>
              </v-col>
              <v-col>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit" text @click="submit()">
                    Envoyer
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
            <v-row v-if="!info.tarif">
              <v-col cols="12" md="6" >
                <v-text-field
                  v-model="tarif"
                  color="blue darken-2"
                  label="Tarif de l'engin"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit" text @click="submitTarif()">
                    Envoyer
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-form method="post" v-if="!bonDeRegie[0]">
          <v-container v-if="statut == 3 && nom == info.chauffeur">
            <v-row>
              <v-col cols="12" md="5" lg="5" xl="5">
                <v-text-field
                  v-model="nbHeuresJour"
                  color="blue darken-2"
                  label="Nombre d'heures jour"
                  type="number"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="5" lg="5" xl="5">
                <v-text-field
                  v-model="nbHeuresNuit"
                  color="blue darken-2"
                  label="Nombre d'heures nuit"
                  type="number"
                  required
                >
                </v-text-field
              ></v-col>
              <v-col>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    type="submit"
                    text
                    @click="submitRegie()"
                  >
                    Envoyer
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import nuxtStorage from "nuxt-storage";

export default {
  props: {
    info: {},
    showlist: false
  },
  data() {
    return {
      chauffeur: "",
      tarif: "",
      bonDeRegie: {},
      nbHeuresJour: "",
      nbHeuresNuit: "",
      statut: nuxtStorage.sessionStorage.statut,
      nom: nuxtStorage.sessionStorage.nom
    };
  },
  methods: {
    ValidateRegie() {
      axios.post(
        "http://localhost:8081/updateEtat/" + this.info.numeroChantier,
        {
          etat: "Feuille de route validée"
        }
      );
      axios
        .get("http://localhost:8081/getEtat/" + this.info.numeroChantier)
        .then(
          reponse => (this.info.etat = reponse.data.feuilleDeRoute[0].etat)
        );
    },
    goToBack(param) {
      this.$emit("goToBack", param);
    },
    submit() {
      axios
        .post(
          "http://localhost:8081/addChauffeur/" + this.info.numeroChantier,
          {
            chauffeur: this.chauffeur
          }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      axios
        .post("http://localhost:8081/updateEtat/" + this.info.numeroChantier, {
          etat: "En attente du bon de regie du chauffeur"
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      axios
        .get("http://localhost:8081/getChauffeur/" + this.info.numeroChantier)
        .then(
          reponse =>
            (this.info.chauffeur = reponse.data.feuilleDeRoute[0].chauffeur)
        );
      axios
        .get("http://localhost:8081/getEtat/" + this.info.numeroChantier)
        .then(
          reponse => (this.info.etat = reponse.data.feuilleDeRoute[0].etat)
        );
    },
    submitTarif() {
            axios
        .post(
          "http://localhost:8081/addTarif/" + this.info.numeroChantier,
          {
            tarif: this.tarif
          }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitRegie() {
      axios
        .post("http://localhost:8081/addBonRegie", {
          nbHeuresJour: this.nbHeuresJour,
          nbHeuresNuit: this.nbHeuresNuit,
          numeroChantier: this.info.numeroChantier,
          typeMat: this.info.typeMateriel,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      axios
        .get("http://localhost:8081/getBonDeRegie/" + this.info.numeroChantier)
        .then(reponse => (this.bonDeRegie = reponse.data.bonDeRegie));
      axios
        .post("http://localhost:8081/updateEtat/" + this.info.numeroChantier, {
          etat: "En attente de validation par le dispatcheur"
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      axios
        .get("http://localhost:8081/getEtat/" + this.info.numeroChantier)
        .then(
          reponse => (this.info.etat = reponse.data.feuilleDeRoute[0].etat)
        );
    }
  },
  mounted() {
    axios
      .get("http://localhost:8081/getBonDeRegie/" + this.info.numeroChantier)
      .then(reponse => (this.bonDeRegie = reponse.data.bonDeRegie));
  }
};
</script>
