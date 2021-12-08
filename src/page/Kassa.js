import {connect} from "react-redux";
import ModalForKassa from "../modals/ModalForKassa";
import {useEffect, useState} from "react";
import {addKassa, editKassa, deleteKassa} from "../redux/reducers/kassaReducer";

function Kassa({kassalar, editKassa, deleteKassa, addKassa}) {

    const [modalVis, setModalVis] = useState(false)
    const [checkAddOrEdit, setCheckAddOrEdit] = useState(false)
    const [kassaId, setKassaId] = useState('')

    // checkAddOrEdit true bo'lsa yangi kassa qo'shilaytogan bo'ladi, false bo'lsa mavjud kassa
    // o'zgartirilayotgan bo'ladi

    function getKassaName(kassaName) {

        if (checkAddOrEdit) {
            let checkName = false
            kassalar.map(item => {
                if (item.name === kassaName) checkName = true
            })
            checkName ? alert('Bunday nomli kassa allaqachon mavjud!') : addKassa(kassaName);
            setCheckAddOrEdit(false)
        } else {
            if (!checkAddOrEdit) {
                let checkName = false
                kassalar.map(item => {
                    if (item.name === kassaName) checkName = true
                })
                checkName ? alert('Bunday nomli kassa allaqachon mavjud!') : editKassa({kassaId, name : kassaName});
            }
        }
    }

    function editClicked(kassaId) {
        setModalVis(true)
        setKassaId(kassaId)
    }

    function deleteClicked(kassId) {
        deleteKassa(kassId)
    }

    function addClicked() {
        setCheckAddOrEdit(true)
        setModalVis(true)
    }

    return <div className={'row'}>
        <div className="col-md-6 offset-3">
            <div className={'mt-5'}>
                <h2 className={' text-center'}>Kassalar</h2>
                <button className={'btn btn-success'} style={{float: 'right', marginTop: '-40px'}}
                        onClick={addClicked}>+ Add
                </button>
            </div>
            <table className={'table mt-4 '}>
                <thead>
                <tr>
                    <th style={{width: '33%'}}>Id</th>
                    <th style={{width: '33%'}}>Name</th>
                    <th style={{width: '33%'}}>Settings</th>
                </tr>
                </thead>
                <tbody>
                {kassalar.map(item =>
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <button className={'btn btn-primary'} onClick={() => editClicked(item.id)}>edit</button>
                            <button className={'btn btn-danger mx-3'} onClick={() => deleteClicked(item.id)}>delete
                            </button>
                        </td>

                    </tr>
                )}
                </tbody>
            </table>
            <ModalForKassa modalVis={modalVis} toggle={() => setModalVis(false)} getKassaName={getKassaName}/>
        </div>
    </div>

}

function mapStateToProps(state) {
    return {
        kassalar: state.kassaReducer.kassalar
    }
}

let a = connect(mapStateToProps, {addKassa, editKassa, deleteKassa})


export default a(Kassa);