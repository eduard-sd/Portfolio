<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">My ads</h1>
                <v-card class="elevation-10 mb-3" v-for="ad in ads" :key="ad.id" >
                    <v-layout >
                        <v-flex xs4>
                            <v-img
                                :src="ad.imageSrc"
                                height="175px"
                            ></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary">{{ ad.title }}</h2>
                                <p>{{ ad.description }}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        class="info"
                                        :to="'/ad/' + ad.id"
                                >Open</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                ads: [
                    {
                        title: 'First ad',
                        description: 'Hello i am description Hello i am description Hello i am description Hello i am description Hello i am description',
                        promo: false,
                        imageSrc: 'https://ok2web.ru/wp-content/uploads/2016/12/hq-36.jpg',
                        id: '1'
                    },
                    {
                        title: 'First ad',
                        description: 'Hello i am description Hello i am description Hello i am description Hello i am description Hello i am description',
                        promo: false,
                        imageSrc: 'https://ok2web.ru/wp-content/uploads/2016/12/hq-36.jpg',
                        id: '1'
                    }
                ]
            }
        }
    }
</script>
