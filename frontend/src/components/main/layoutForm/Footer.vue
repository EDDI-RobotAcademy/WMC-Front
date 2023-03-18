<template>
    <v-footer inset padless class="justify-center pl-0">
      <v-card flat class="text-center" width="100%">
          <v-divider></v-divider>
          <v-card-text class="grey--text">
              <v-btn v-for="icon in icons" :key="icon" class="mx-2" icon>
                  <v-icon size="16px">
                      {{ icon }}
                    </v-icon>
                </v-btn>
                <br>
                Copyright - (주)WMC. All right reserved.
          </v-card-text>
        
      </v-card>
    </v-footer>
    
  </template>
  
  <script>
  export default {
      name: "Footer",
      data: () => ({
          icons: [
              "mdi-facebook",
              "mdi-twitter",
              "mdi-google-plus",
              "mdi-linkedin",
              "mdi-instagram"
          ]
      })
  }
  </script>
  
  <style>
  </style>