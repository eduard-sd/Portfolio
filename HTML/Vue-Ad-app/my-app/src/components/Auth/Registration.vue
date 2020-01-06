<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" >
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Registration form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" value lazy-validation>
                            <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="Email"
                                    required
                                    prepend-icon="mdi-email"
                            />

                            <v-text-field
                                    v-model="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    :counter="6"
                                    required
                                    prepend-icon="mdi-lock"
                                    :rules="passwordRules"
                            />
                            <v-text-field
                                    v-model="confirmPassword"
                                    label="Confirm password"
                                    name="confirm-password"
                                    type="password"
                                    :counter="6"
                                    required
                                    prepend-icon="mdi-lock"
                                    :rules="confirmPasswordRules"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" @click="onSubmit" :disabled="!valid">Create account!</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                email: '',
                password: '',
                confirmPassword: '',
                valid: false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
                ],
                confirmPasswordRules: [
                    v => !!v || 'Password is required',
                    v => (v === this.password) || 'Password must be the same'
                ],
            }
        },
        methods: {
            onSubmit () {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    }

                    alert(user)
                }
            }
        }
    }
</script>