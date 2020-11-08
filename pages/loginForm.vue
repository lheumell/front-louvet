<template>
  <section class="section loginPage ">
    <v-card flat>
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <h2 class="title has-text-centered">Welcome back!</h2>

            <Notification :message="error" v-if="error" />

            <v-form method="post" @submit.prevent="login">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" sm="12">
                    <div class="control">
                      <v-text-field
                        type="email"
                        class="input"
                        name="email"
                        v-model="email"
                        label="Email"
                        required
                      >
                      </v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <div class="control">
                      <v-text-field
                        type="password"
                        class="input"
                        name="password"
                        v-model="password"
                        label="Password"
                        required
                      >
                      </v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <div class="control">
                      <v-btn text color="primary" type="submit">
                        Log In
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>

            <div class="has-text-centered" style="margin-top: 20px">
              <nuxt-link to="/">
                Mot de passe oublié ?
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </section>
</template>

<script>
import Notification from "~/components/Notification";

export default {
  components: {
    Notification
  },

  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });

        this.$router.push("/");
      } catch (e) {
        this.error = e.response.data.message;
      }
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
