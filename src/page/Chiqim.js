import {connect} from "react-redux";
import {useEffect, useState} from "react";
import ModalForChiqim from "../modals/ModalForChiqim";
import {addChiqim, editChiqim, deleteChiqim} from "../redux/reducers/chiqimReducer";

function Chiqim({kirimlar, chiqimlar, editChiqim, deleteChiqim, addChiqim, users, kassalar}) {

    const [modalVis, setModalVis] = useState(false)
    const [checkAddOrEdit, setCheckAddOrEdit] = useState(false)
    const [chiqimId, setChiqimId] = useState('')

    // checkAddOrEdit true bo'lsa yangi chiqim qo'shilaytogan bo'ladi, false bo'lsa mavjud chiqim
    // o'zgartirilayotgan bo'ladi

    function getChiqim(userId, kassaId, amount) {

        if (checkAddOrEdit) {
            let a = 0
            kirimlar.map(item => {
                if (item.kassaId === kassaId) a += parseInt(item.amount)
            })
            chiqimlar.map(item => {
                if (item.kassaId === kassaId) a -= parseInt(item.amount)
            })

            console.log(a, parseInt(amount))
            a >= parseInt(amount) ? addChiqim({
                userId,
                kassaId,
                amount
            }) : alert("Siz kiritgan pul miqdoriga yetarli mablag' " +
                "bu kassada mavjud emas. Iltimos kamroq pul miqdorini kiriting.");

            setCheckAddOrEdit(false)
        } else {
            if (!checkAddOrEdit) {
                let a = 0
                kirimlar.map(item => {
                    if (item.kassaId === kassaId) a += parseInt(item.amount)
                })
                chiqimlar.map(item => {
                    if (item.kassaId === kassaId) a -= parseInt(item.amount)
                })
                a >= amount ? editChiqim({
                    chiqimId,
                    userId,
                    kassaId,
                    amount
                }) : alert("Siz kiritgan pul miqdoriga yetarli mablag' " +
                    "bu kassada mavjud emas. Iltimos kamroq pul miqdorini kiriting.");
            }
        }
    }

    function editClicked(chiqimId) {
        setModalVis(true)
        setChiqimId(chiqimId)
    }

    function deleteClicked(chiqimId) {
        deleteChiqim(chiqimId)
    }

    function addClicked() {
        setCheckAddOrEdit(true)
        setModalVis(true)
    }

    return <div className={'row'}>
        <div className="col-md-10 offset-1">
            <div className={'mt-5'}>
                <h2 className={' text-center'}>Chiqim</h2>
                <button className={'btn btn-success'} style={{float: 'right', marginTop: '-40px'}}
                        onClick={addClicked}>+ Add
                </button>
            </div>
            <table className={'table mt-4 '}>
                <thead>
                <tr>
                    <th style={{width: '16.6%'}}>Id</th>
                    <th style={{width: '16.6%'}}>User</th>
                    <th style={{width: '16.6%'}}>Kassa</th>
                    <th style={{width: '16.6%'}}>Amount</th>
                    <th style={{width: '16.6%'}}>Date</th>
                    <th style={{width: '16.6%'}}>Settings</th>
                </tr>
                </thead>
                <tbody>
                {chiqimlar.map(item =>
                    <tr>
                        <td>{item.id}</td>
                        <td>{users.filter(item2 => item2.id === parseInt(item.userId))[0].name}</td>
                        <td>{kassalar.filter(item2 => parseInt(item2.id) === parseInt(item.kassaId))[0].name}</td>
                        <td>{item.amount}</td>
                        <td>{item.date}</td>
                        <td>
                            <button className={'btn btn-primary'} onClick={() => editClicked(item.id)}>edit</button>
                            <button className={'btn btn-danger mx-3'} onClick={() => deleteClicked(item.id)}>delete
                            </button>
                        </td>

                    </tr>
                )}
                </tbody>
            </table>
            <ModalForChiqim modalVis={modalVis} toggle={() => setModalVis(false)}
                            getChiqim={getChiqim}/>
        </div>
    </div>

}

function mapStateToProps(state) {
    // console.log(state.chiqimReducer.chiqimlar)
    return {
        chiqimlar: state.chiqimReducer.chiqimlar,
        users: state.userReducer.users,
        kassalar: state.kassaReducer.kassalar,
        kirimlar: state.kirimReducer.kirimlar
    }
}


let a = connect(mapStateToProps, {addChiqim, editChiqim, deleteChiqim})


export default a(Chiqim);