export default function (context) {
    if(context.store.state.auth.loggedIn && !context.store.state.wallet.initialized) {
        console.log('Loading wallet...')
        return context.$axios.$get('/api/wallet/did/list').then(dids => context.store.dispatch('wallet/initialize', dids))
    }
}
  