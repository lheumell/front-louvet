<template>
  <div class="fdr">
    <v-card flat>
      <v-snackbar v-model="snackbar" absolute top right color="success">
        <span>Registration successful!</span>
        <v-icon dark>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-snackbar>
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <h1>Feuille de route</h1>
          <v-row>
            <v-col cols="12" sm="12"><span>Informations sur le chantier</span></v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="form.typeMat"
                color="blue darken-2"
                label="Type de materiel"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="form.numChantier"
                color="blue darken-2"
                label="n° chantier"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="form.intitChantier"
                color="blue darken-2"
                label="Intitulé du chantier"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="form.adresseChantier"
                color="blue darken-2"
                label="Adresse du chantier"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="form.chefChantier"
                color="blue darken-2"
                label="nom du chef de chantier"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="form.numChef"
                color="blue darken-2"
                label="n° du chef de chantier"
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
                  <v-text-field class="calendar"
                    v-model="date"
                    label="Date"
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
                  <v-btn text color="primary" @click="save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="form.nbHeure"
                type="number"
                placeholder="nb heure"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text @click="resetForm">
            Tout effacer
          </v-btn>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="!formIsValid"
                text
                color="primary"
                v-bind="attrs"
                v-on="on"
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
export default {
  data() {
    const defaultForm = Object.freeze({
      typeMat: "",
      numChantier: "",
      intitChantier: "",
      adresseChantier: "",
      chefChantier: "",
      numChef: "",
      nbHeure: "",
    });

    return {
      form: Object.assign({}, defaultForm),
      snackbar: false,
      defaultForm,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      dialog: false,
    };
  },

  computed: {
    formIsValid() {
      return (
        this.form.typeMat &&
        this.form.numChantier &&
        this.form.intitChantier &&
        this.form.adresseChantier &&
        this.form.chefChantier &&
        this.form.numChef &&
        this.form.nbHeure
      );
    },
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    submit() {
      this.snackbar = true;
      this.dialog = false;
      this.resetForm();
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
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
