import {useEffect, useState} from "react";
import {connect} from "react-redux";

function UserReport({users, kirimlar, chiqimlar, kassalar}) {

    let [balances, setBalances] = useState([])

    useEffect(() => {
            balances = []
            setBalances([...balances])
            let countId = ''
            let valueCountId = ''

            users.map(item => {
                kassalar.map(item2 => {
                    let a = 0
                    kirimlar.map(item3 => {
                        if (item.id === parseInt(item3.userId) && item2.id === parseInt(item3.kassaId)) a += parseInt(item3.amount)
                    })

                    chiqimlar.map(item4 => {
                        if (item.id === parseInt(item4.userId) && item2.id === parseInt(item4.kassaId)) a -= parseInt(item4.amount)
                    })

                    if (a !== 0) {
                        if (countId) {
                            countId++;
                            valueCountId = countId;
                        }
                        if (balances.length === 0) {
                            countId = 1
                        } else if (parseInt(balances[balances.length - 1].userId) === item.id) {
                            countId = ''
                        } else {
                            countId = valueCountId
                        }
                        balances.push({
                            id: countId,
                            userId: item.id,
                            kassaId: item2.id,
                            balance: a
                        })
                        setBalances([...balances])
                    }
                })
            })
        },
        [users, kirimlar, chiqimlar, kassalar]
    )


    return <div className={'container'}>
        <div className="row mt-5">
            <div className="col-md-8 offset-2">
                <table className={'table'}>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Kassa</th>
                        <th>Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {balances.map(item =>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.id ? users.map(item2 => item2.id === parseInt(item.userId) ? item2.name : '') : ''}</td>
                            <td>{kassalar.map(item3 => item3.id === parseInt(item.kassaId) ? item3.name : '')}</td>
                            <td>{item.balance} sum</td>
                        </tr>
                    )}
                    </tbody>
                </table>

            </div>
        </div>
    </div>


}

function mapStateToProps(state) {
    return {
        users: state.userReducer.users,
        kirimlar: state.kirimReducer.kirimlar,
        chiqimlar: state.chiqimReducer.chiqimlar,
        kassalar: state.kassaReducer.kassalar
    }
}


let a = connect(mapStateToProps, null)

export default a(UserReport);