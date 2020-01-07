<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text-secondary mb-3">Create new ad</h1>
                <v-form ref="form" v-model="valid" lazy-validation class="mb-3">
                    <v-text-field
                            v-model="title"
                            :rules="[v => !!v || 'Title is required']"
                            label="Ad title"
                            required
                            prepend-icon="mdi-email"
                            name="title"
                            type="text"
                    />

                    <v-textarea
                            v-model="description"
                            label="Ad description"
                            name="description"
                            type="multi-line"
                            required
                            prepend-icon="mdi-lock"
                            :rules="[v => !!v || 'Description is required']"
                    />
                </v-form>

                <v-layout row>
                    <v-flex xs12 class="mb-3">
                        <v-btn
                                color="blue-grey"
                                class="ma-2 white--text"
                        >
                            Upload
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 class="mb-3">
                        <img src="" alt="" height="100px">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 class="mb-3">
                        <v-switch
                                v-model="promo"
                                label="Add to promo"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn
                                :disabled="!valid"
                                class="ma-2 success"
                                @click="createAd"
                        >
                            Create ad
                        </v-btn>
                    </v-flex>
                </v-layout>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                promo: false,
                title: '',
                description: '',
                valid: false
            }
        },
        methods: {
            createAd () {
                if (this.$refs.form.validate()) {
                    //logic
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo
                    }
                    console.log(ad)
                }
            }
        }
    }
</script>
