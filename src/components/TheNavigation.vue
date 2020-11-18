<template>
	<div>
		<div  >
			<ul>
				<li>
					<router-link :to=" {name:'Home'}">
						Home
					</router-link>
				</li>
				<li  v-if="!authenticated">
					<router-link :to=" {name:'SignIn'}">
						Sign in
					</router-link>
				</li>
				<div  v-if="authenticated">
					<li @click.prevent="signOut()">
						<router-link :to=" {}">
							Sign Out
						</router-link>
					</li>
					<li>
						<router-link :to=" {name:'Dashboard'}">
							Dashboard
						</router-link>
					</li>
				</div>
			</ul>
		</div>
	</div>
</template>	

<script>
import { mapGetters, mapActions } from 'vuex'
	export default {
		// data: () => ({
		// 	rutas: ['Home'],
		// 	rutasLogin: ['Dashboard', 'SignOut']
		// }),
		computed: {
			...mapGetters({
				'authenticated': 'auth/authenticated', 
				'user': 'auth/user'
			})
		},
		methods: {
			...mapActions({
				signOutAction: 'auth/signOut'
			}),

			signOut() {
				this.signOutAction().then(()=>{
					this.$router.replace({
						name: 'Home'
					})
				})
			}
		}
	}
</script>


