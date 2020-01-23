<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-item v-for="link of links" :key="link.title" :to="link.url">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Add application</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-for="link in links" :key="link.title" :to="link.url">
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <template v-if="error">
      <v-snackbar
              @input="closeError"
              :value="true"
              :color="error"
              :multi-line="mode === 'multi-line'"
              :timeout="5000"
      >
        {{ error }}
        <v-btn
                color="red"
                text
                @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      links: [
        {title: 'Login', icon: 'mdi-lock', url: '/login'},
        {title: 'Registration',icon: 'mdi-face', url: '/registration'},
        {title: 'Orders', icon: 'mdi-bookmark', url: '/orders'},
        {title: 'New ad', icon: 'mdi-note', url: '/new'},
        {title: 'My ads', icon: 'mdi-pen ', url: '/list'},
      ]
    }
  },
  computed:{
    error() {
      return this.$store.getters.error
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError')
    }
  },


};
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>