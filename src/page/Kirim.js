import {connect} from "react-redux";
import {useEffect, useState} from "react";
import ModalForKirim from "../modals/ModalForKirim";
import {addKirim, editKirim, deleteKirim} from "../redux/reducers/kirimReducer";

function Kirim({kirimlar, editKirim, deleteKirim, addKirim,  users, kassalar}) {

    const [modalVis, setModalVis] = useState(false)
    const [checkAddOrEdit, setCheckAddOrEdit] = useState(false)
    const [kirimId, setKirimId] = useState('')

    // checkAddOrEdit true bo'lsa yangi kirim qo'shilaytogan bo'ladi, false bo'lsa mavjud kirim
    // o'zgartirilayotgan bo'ladi

    function getKirim(userId, kassaId, amount) {

        if (checkAddOrEdit) {
            addKirim({userId, kassaId, amount});
            setCheckAddOrEdit(false)
        } else {
            if (!checkAddOrEdit) {
                editKirim({kirimId, userId, kassaId, amount})
            }
        }
    }

    function editClicked(kirimId) {
        setModalVis(true)
        setKirimId(kirimId)
    }

    function deleteClicked(kirimId) {
        deleteKirim(kirimId)
    }

    function addClicked() {
        setCheckAddOrEdit(true)
        setModalVis(true)
    }

    return <div className={'row'}>
        <div className="col-md-10 offset-1">
            <div className={'mt-5'}>
                <h2 className={' text-center'}>Kirim</h2>
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
                {kirimlar.map(item =>
                    <tr>
                        <td>{item.id}</td>
                        <td>{users.filter(item2=>item2.id === parseInt(item.userId))[0].name}</td>
                        <td>{kassalar.filter(item2=>item2.id === parseInt(item.kassaId))[0].name}</td>
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
            <ModalForKirim modalVis={modalVis} toggle={() => setModalVis(false)}
                          getKirim={getKirim}/>
        </div>
    </div>

}

function mapStateToProps(state) {
    return {
        kirimlar: state.kirimReducer.kirimlar,
        users : state.userReducer.users,
        kassalar : state.kassaReducer.kassalar
    }
}

let a = connect(mapStateToProps, {addKirim, editKirim, deleteKirim})


export default a(Kirim);