import ReactDom from 'react-dom'
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from "react-redux";
import {store} from './redux/store'
import {BrowserRouter} from "react-router-dom";

function Index() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    )
}


ReactDom.render(
    <Index/>,
    document.getElementById('root')
)