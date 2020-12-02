<template>
  <div class="fdr">
    <v-card flat>
      <v-snackbar v-model="snackbar" absolute top right color="success">
        <span>Registration successful!</span>
        <v-icon dark>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-snackbar>
      <v-form ref="form" method="post" @submit.prevent="submit">
        <v-container fluid>
          <h1>Feuille de route</h1>
          <v-row>
            <v-col cols="12" sm="12"
              ><span>Informations sur le chantier</span></v-col
            >
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="typeMat"
                color="blue darken-2"
                label="Type de materiel"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="numChantier"
                type="number"
                color="blue darken-2"
                label="n° chantier"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="intitChantier"
                color="blue darken-2"
                label="Intitulé du chantier"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="adresseChantier"
                color="blue darken-2"
                label="Adresse du chantier"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="chefChantier"
                color="blue darken-2"
                label="nom du chef de chantier"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="numChef"
                color="blue darken-2"
                label="n° de tel du chef de chantier"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12"><p>Date et durée</p></v-col>
            <v-col cols="6" sm="6" md="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="A partir du"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6" sm="6">
              <v-menu
                ref="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
                    label="à"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="time"
                  format="24hr"
                  @click:minute="$refs.menu2.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="nbHeure"
                type="number"
                placeholder="pour ... jours ou heures"
              ></v-text-field>
            </v-col>
            <v-col cols="2" sm="2">
              <v-select :items="items" v-model="typeTemps"></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text @click="clear">
            Tout effacer
          </v-btn>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                color="primary"
                v-bind="attrs"
                v-on="on"
                :disabled="!isValideForm"
              >
                Continuer
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                description
              </v-card-title>

              <v-col cols="12" md="12">
                <v-textarea
                  name="input-7-1"
                  placeholder="Ajouter description..."
                  v-model="description"
                ></v-textarea>
              </v-col>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit" text @click="submit()">
                  Envoyer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    const defaultForm = Object.freeze({});
    return {
       API_URL: process.env.API_URL,
      form: Object.assign({}, defaultForm),
      isValideForm: true,
      snackbar: false,
      items: ["heure(s)", "jour(s)"],
      defaultForm,
      date: new Date().toISOString().substr(0, 10),
      menu: false, 
      menu2: false,
      time: null,
      dialog: false,
      typeMat: "",
      numChantier: "",
      intitChantier: "",
      adresseChantier: "",
      chefChantier: "",
      numChef: "",
      nbHeure: "",
      description: "",
      typeTemps: ""
    };
  },
  computed: {
    formIsValid() {
      this.typeMat &&
        this.numChantier &&
        this.intitChantier &&
        this.adresseChantier &&
        this.chefChantier &&
        this.numChef &&
        this.nbHeure;
    }
  },

  methods: {
    clear() {
      (this.typeMat = ""),
        (this.numChantier = ""),
        (this.intitChantier = ""),
        (this.adresseChantier = ""),
        (this.chefChantier = ""),
        (this.numChef = ""),
        (this.nbHeure = "");
    },
    submit() {
      var self = this;
      this.dialog = false;

      axios
        .post("http://3.21.164.98/beta-louvet/addFeuilleDeRoute", {
          typeMateriel: this.typeMat,
          numeroChantier: this.numChantier,
          nomChantier: this.intitChantier,
          adresseChantier: this.adresseChantier,
          nomChef: this.chefChantier,
          numChef: this.numChef,
          date: this.date,
          time: this.time,
          nbHeure: this.nbHeure,
          typeTemps: this.typeTemps,
          commentaire: this.description
        })
        .then(function(response) {
          console.log(response);
          self.snackbar = true;
          self.clear();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    save(date) {
      this.$refs.menu.save(date);
      // this.menu = false
    }
  }
};
</script>

<style lang="scss">
.fdr {
  max-width: 900px;
  margin: auto;
}
.calendar {
  input {
    padding: 8px;
  }
}
</style>
