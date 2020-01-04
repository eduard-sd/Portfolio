<template>
  <v-app>
    <v-navigation-drawer app temporary></v-navigation-drawer>

    <v-app-bar app
               color="primary"
               dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Add application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>Link 1</v-btn>
      </v-toolbar-items>
    </v-app-bar>



    <!-- Sizes your content based upon application components -->
    <v-content>
      <!--<router-view></router-view>-->
    </v-content>

  </v-app>
</template>

<script>
export default {
};
</script>
