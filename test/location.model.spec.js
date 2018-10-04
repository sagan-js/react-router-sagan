import { createBrowserHistory } from 'history'
import Location from '../src/location.model'

import { BaseModel, Store } from 'sagan'

describe('Store', () => {
    it('throws if props don\'t pass validation', () => {

        const history = createBrowserHistory()
        const location = new Location(history.location)

        const spy1 = jest.spyOn(global.console, 'error')
        BaseModel.prototype.checkTypes(history.location, location.typeMap)
        expect(spy1).not.toHaveBeenCalled()

        const spy2 = jest.spyOn(global.console, 'error')
        BaseModel.prototype.checkTypes({name: 'Sagan'}, location.typeMap)
        expect(spy2).toHaveBeenCalled()
    })

    it('updates location state on route change dispatch', () => {

        const history = createBrowserHistory()

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
