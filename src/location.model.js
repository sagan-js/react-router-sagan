import { extendModel } from 'sagan'

const Location = extendModel({
    props: {
        location: 'string',
        pathname: 'string',
        search: 'string',
        hash: 'string',
        key: 'string',
        state: 'any'
    },
    derived: {

    },
    reducers: {
        change: function(state, payload) {
            return {
                ...payload
            }
        }
    }
})

export default Location