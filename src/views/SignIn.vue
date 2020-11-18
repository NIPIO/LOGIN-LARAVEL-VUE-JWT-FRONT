<template>
  <div>
  	<form @submit.prevent="submit">
	  	<input v-model="form.email" placeholder="email">
		<input v-model="form.password" placeholder="password">
		<button type="submit">SignIn</button>
	</form>
  </div>
</template>

<script>
import {mapActions}  from 'vuex'

export default {
	name: 'SignIn',
	components: {
	},
	data() {
		return {
			form: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		...mapActions({
			//proviene del modulo auth metodo sigin
			signIn: 'auth/signIn'
		}),

		submit() {
			this.signIn(this.form).then(()=>{
				this.$router.replace({
					name: 'Dashboard'
				})
			})
		}

	}
}
</script>
