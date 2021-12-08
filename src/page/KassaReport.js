import {useEffect, useState} from "react";
import {connect} from "react-redux";

function KassaReport({kassalar,kirimlar, chiqimlar}){

    let [balanceKassa, setBalanceKassa] = useState([])

useEffect(()=>{
    balanceKassa = []
    setBalanceKassa([...balanceKassa])
    kassalar.map(item=>{
        let a = 0
        kirimlar.map(item2=>{ if(parseInt(item2.kassaId) === item.id)   a= a + parseInt(item2.amount)})
        chiqimlar.map(item3=>{ if(parseInt(item3.kassaId) === item.id)   a= a - parseInt(item3.amount)})
        balanceKassa.push(a)
        setBalanceKassa([...balanceKassa])
    })
    },[kirimlar,chiqimlar,kassalar])

    return <div className={'container'}>
        <div className="row my-5">
            {kassalar.map(item=>

            <div className="col-md-3 mx-5 my-4">
               <div>
                   <h4>{item.name}</h4>
                   <h6>{balanceKassa[item.id-1]} sum</h6>
               </div>
                <div className={'my-3 p-3'} style={{backgroundColor:'lightgray'}}>
                    {kirimlar.map(item2=> parseInt(item2.kassaId) === item.id ?
                            <p className={'text-success'} style={{fontSize: '15px'}}>Kirim : {item2.amount}</p>
:'')}
                    {chiqimlar.map(item3=> parseInt(item3.kassaId) === item.id ?
                        <p className={'text-danger'} style={{fontSize:'15px'}}>Chiqim : {item3.amount}</p>
                        : ''
                    )}
                </div>
                <br></br>
                <hr></hr>
            </div>
                )}
        </div>
    </div>

}

function mapStateToProps(state){
    return {
        kassalar : state.kassaReducer.kassalar,
        kirimlar : state.kirimReducer.kirimlar,
        chiqimlar : state.chiqimReducer.chiqimlar
    }
}

let a = connect(mapStateToProps,null)

export default a(KassaReport);