export default {
    state: {
        ads: [
            {
                title: 'First ad',
                description: 'Hello i am description',
                promo: false,
                imageSrc: 'https://ok2web.ru/wp-content/uploads/2016/12/hq-36.jpg',
                id: '1'
            },
            {
                title: 'Second ad',
                description: 'Hello i am description',
                promo: true,
                imageSrc: 'https://mirpozitiva.ru/wp-content/uploads/2019/11/1569595590_kniga.jpg',
                id: '2'
            },
            {
                title: 'Third ad',
                description: 'Hello i am description',
                promo: true,
                imageSrc: 'https://mirpozitiva.ru/wp-content/uploads/2019/11/1472042500_03.jpg',
                id: '3'
            },
        ]
    },
    mutations: {
        createAd (state, payload) {
            state.ads.push(payload)
        }
    },
    actions: {
        createAd ({commit}, payload) {
            payload.id = 'xcb'

            commit('createAd', payload)
        }
    },
    getters: {
        ads (state) {
            return state.ads
        },
        promoAds (state) {
            return state.ads.filter(ad => {
                return ad.promo === true
            })
        },
        myAds (state) {
            return state.ads
        },
        adById (state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }

    }
}