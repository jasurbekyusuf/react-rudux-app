import {Link, Switch, Route} from "react-router-dom";
import Kassa from "./page/Kassa";
import User from "./page/User";
import Kirim from "./page/Kirim";
import Chiqim from "./page/Chiqim";
import KassaReport from "./page/KassaReport";
import UserReport from "./page/UserReport";

function App(){

    return <div className={'container'}>
<div className="row mt-3">
    <div className="col-md-10 offset-1 d-flex justify-content-around">
        <Link to={'/kassa'}><button className={'btn btn-success'}>Kassa</button> </Link>
        <Link to={'/foydalanuvchi'}><button className={'btn btn-info'}>Foydalanuvchi</button> </Link>
        <Link to={'/kirim'}><button className={'btn btn-primary'}>Kirim</button> </Link>
        <Link to={'/chiqim'}><button className={'btn btn-danger'}>Chiqim</button> </Link>
        <Link to={'/kassaReport'}><button className={'btn btn-dark text-white'}>Kassa report</button> </Link>
        <Link to={'/userReport'}><button className={'btn  btn-secondary text-white'}>User report</button> </Link>

    </div>
</div>


                <Switch>
                    <Route path={'/kassaReport'} component={KassaReport}/>
                    <Route path={'/kassa'} component={Kassa}/>
                    <Route path={'/foydalanuvchi'} component={User}/>
                    <Route path={'/kirim'} component={Kirim}/>
                    <Route path={'/chiqim'} component={Chiqim}/>
                    <Route path={'/userReport'} component={UserReport}/>
                </Switch>

    </div>

}
export default App;