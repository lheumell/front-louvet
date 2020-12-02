<template>
  <div class="list_page">
    <div class="list" v-if="showlist">
      <li v-for="item in items" :key="item.id">
        <v-container>
          <button @click="updateSelected(item)" style="width: 100%">
            <v-row justify="space-around">
              <v-card width="100%">
                <v-card-title class="ma-8">
                  <p
                    class="ml-3 "
                    style="position: absolute;top: 50%; transform: translateY(-50%);"
                  >
                    N° de chantier : {{ item.id }}
                  </p>

                  <v-icon
                    style="position:absolute; right: 1rem; top: 50%; transform: translateY(-50%); "
                  >
                    mdi-play</v-icon
                  >
                </v-card-title>

                <p v-if="item.etat == 'Feuille de route validée'" class="green">
                  {{ item.etat }}
                </p>
              </v-card>
            </v-row>
          </button>
        </v-container>
      </li>
    </div>
    <div v-else>
      <Item :info="this.selectedItem" @goToBack="goToBack" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
     API_URL: process.env.API_URL,
    showlist: true,
    selectedItem: {},
    items: {}
  }),
  methods: {
    goToBack() {
      this.showlist = true;
    },
    updateSelected(selectedItem) {
      this.selectedItem = selectedItem;
      this.showlist = false;
    }
  },
  mounted() {
    axios
      .get(this.API_URL + "/getFeuilleDeRoute")
      .then(reponse => (this.items = reponse.data.feuilleDeRoute));
  }
};
</script>

<style lang="scss">
li {
  list-style: none;
}
</style>
