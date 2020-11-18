import axios from 'axios'


export default {
	namespaced: true,
	state: {
		token: '',
		user: {
		}
	},
	getters: {
		authenticated(state){
			return state.token && state.user
		},
		user (state) {
			return state.user
		}
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token
		},
		SET_USER(state, data) {
			state.user = data
		}
	},
	actions: {
		async signIn({dispatch}, credentials) {
			let response = await axios.post('auth/signin', credentials)
			dispatch('attempt', response.data.token)
		},

		async attempt ({commit, state}, token) {
			token ? commit('SET_TOKEN', token) : null
			if (!state.token) {
				return
			}

			try {
				//compruebo que exista el token
				let response = await axios.get('auth/my')
				commit('SET_USER', response.data)
			} catch (err) {
				//no existe, caducó la sesion entonces lo elimino.
				commit('SET_USER', null)
				commit('SET_TOKEN', null)
			}
		},

		signOut({commit}) {
			return axios.post('auth/signout').then(()=>{
				commit('SET_USER', null)
				commit('SET_TOKEN', null)
			})
		}
	},
}
