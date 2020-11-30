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
          v-for="(item, i) in items"
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
      <!-- <v-btn icon class="mr-10">
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
            {{ prenom + "" + nom }}
              <v-avatar class="mb-1" color="#0e4a8b" size="30">
                <span>{{ prenom + "" + nom }}</span>
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="goToMyProfile()">
              <v-list-item-title>
                {{ prenom + " " + nom }}
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item link @click="dialogAddItem = true">
              <v-list-item-title icon>
                <v-icon class="pr-2">mdi-plus</v-icon>Ajouter un Item
              </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="logout()">
              <v-list-item-title icon>
                <v-icon class="pr-2">mdi-logout</v-icon>Déconnexion
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn> -->
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
import nuxtStorage from 'nuxt-storage';

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
          to: "/"
        },
        {
          icon: "mdi-plus-box",
          title: "Creer une feuille",
          to: "/createForm"
        },
        {
          icon: "mdi-history",
          title: "History",
          to: "/list"
        },
        {
          icon: "mdi-login",
          title: "Login",
          to: "/loginForm"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Application suivi materiel"
    };
  }
};
</script>
