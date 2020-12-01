<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in activeRubrique"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import nuxtStorage from "nuxt-storage";

export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      nom: nuxtStorage.sessionStorage.nom,
      prenom: nuxtStorage.sessionStorage.prenom,
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
          isntStatut1: true
        },
        {
          icon: "mdi-plus-box",
          title: "Creer une feuille",
          to: "/createForm",
          isntStatut1: false
        },
        {
          icon: "mdi-history",
          title: "History",
          to: "/list",
          isntStatut1: true
        },
        {
          icon: "mdi-login",
          title: "Login",
          to: "/loginForm",
          isntStatut1: true
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Application suivi materiel"
    };
  },
  computed: {
    activeRubrique() {
      if (nuxtStorage.sessionStorage.statut != 1) {
        return this.items.filter(function(u) {
          return u;
        });
      } else {
        return this.items.filter(function(u) {
          return u;
        });
      }
    }
  }
};
</script>
