# React Router Sagan
This library helps you keep your router state in sync with your Sagan store. A copy is kept within a Sagan model for recording, persisting, and rewinding user actions.

***This library is not necessary for using Sagan together with React Router. You can use the two together just fine.***


### Installation
```
npm install --save react-router-sagan
```

## API

#### `new Location(history.location)`
***You must add this model to your store for syncing to work***

A model that stores location updates from `history`. Data is accessed in the same manor as any other Sagan model.

## Components

#### `<ConnectedRouter>`
***This component must be used if you want history updates to stay in sync with your Sagan store***

`<ConnectedRouter>` is a HOC that wraps the `Router` component from `react-router` with your Sagan store. It listens to updates from `history` and dispatches updates to the `Location` model.

## Example

```javascript
import React from 'react'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import Routes from 'routes.index'

import { Store } from 'sagan'
import { Provider } from 'react-sagan'
import { ConnectedRouter, Location } from 'react-router-sagan'

const history = createBrowserHistory()

const store = new Store({
    models: {
        location: new Location(history.location)
    },
    middlewares: []
})

renderContext(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
)

```
## Programmatically Navigating
React Router Sagan exposes React Router's `history` and `match` objects as props to your routes.

#### `history`

- `push` - Pushes a new location to history, becoming the current location.
- `replace` - Replaces the current location in history.
- `go` - Moves backwards or forwards a relative number of locations in history.
- `goForward` - Moves forward one location. Equivalent to `go(1)`
- `goBack` - Moves backwards one location. Equivalent to `go(-1)`
