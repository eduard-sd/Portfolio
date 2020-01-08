<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-img
                        src="https://ok2web.ru/wp-content/uploads/2016/12/hq-36.jpg"
                    ></v-img>
                    <v-card-text>
                        <h1 class="text--primary">lorem</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, consequatur.</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="warning" flat>Edit</v-btn>
                        <v-btn class="success">Buy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>