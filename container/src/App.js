import React, { lazy, Suspense, useState } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles'

const AuthAppLazy = lazy(() => import('./components/AuthApp'))
const MarketingAppLazy = lazy(() => import('./components/MarketingApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

export default function ({ }) {
    const [signedIn, setSignedIn] = useState(false);

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header signedIn={signedIn} onSignOut={() => setSignedIn(false)} />
                    <Suspense fallback={<div>loading...</div>}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthAppLazy onSignIn={() => setSignedIn(true)} />
                            </Route>
                            <Route path='/' component={MarketingAppLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}