import createHistory from 'history/createBrowserHistory'
import Location from '../src/location.model'

import { BaseModel, Store } from 'sagan'

describe('Store', () => {
    it('throws if props don\'t pass validation', () => {

        const history = createHistory()
        const location = new Location(history.location)

        console.error = jest.fn();

        BaseModel.prototype.checkTypes(history.location, location.typeMap)
        expect(console.error).not.toHaveBeenCalled()
        console.error.mockRestore()

        BaseModel.prototype.checkTypes({name: 'Sagan'}, location.typeMap)
        expect(console.error).toHaveBeenCalled()
        console.error.mockRestore()
    })

    it('updates location state on route change dispatch', () => {

        const history = createHistory()

        const store = new Store({
            models: {
                location: new Location(history.location)
            }
        })

        expect(store.getState().location).toEqual({"hash": "", "pathname": "/", "search": "", "state": undefined})

        store.dispatch({type: 'location/change', payload: {"hash": "", "pathname": "/test", "search": "", "state": undefined}})
        expect(store.getState().location).toEqual({"hash": "", "pathname": "/test", "search": "", "state": undefined})
    })
})
