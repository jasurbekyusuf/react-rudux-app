import {connect} from "react-redux";
import ModalForUser from "../modals/ModalForUser";
import {useEffect, useState} from "react";
import {addUser, editUser, deleteUser} from '../redux/reducers/userReducer'

function User({users, editUser, deleteUser, addUser}) {

    const [modalVis, setModalVis] = useState(false)
    const [checkAddOrEdit, setCheckAddOrEdit] = useState(false)
    const [userId, setUserId] = useState('')

    // checkAddOrEdit true bo'lsa yangi user qo'shilaytogan bo'ladi, false bo'lsa mavjud user
    // o'zgartirilayotgan bo'ladi

    function getUserNameAndPhone(name, phone) {

        if (checkAddOrEdit) {
            let checkName = false
            users.map(item => {
                if (item.phone === phone) checkName = true
            })
            checkName ? alert('Bu telefon raqam boshqa user ga tegishli!') : addUser({name, phone});
            setCheckAddOrEdit(false)
        } else {
            if (!checkAddOrEdit) {
                let checkName = false
                users.map(item => {
                    if (item.phone === phone) checkName = true
                })
                checkName ? alert('Bu telefon raqam boshqa user ga tegishli!') : editUser({userId, name, phone});
            }
        }
    }

    function editClicked(userId) {
        setModalVis(true)
        setUserId(userId)
    }

    function deleteClicked(userId) {
        deleteUser(userId)
    }

    function addClicked() {
        setCheckAddOrEdit(true)
        setModalVis(true)
    }

    return <div className={'row'}>
        <div className="col-md-10 offset-1">
            <div className={'mt-5'}>
                <h2 className={' text-center'}>Users</h2>
                <button className={'btn btn-success'} style={{float: 'right', marginTop: '-40px'}}
                        onClick={addClicked}>+ Add
                </button>
            </div>
            <table className={'table mt-4 '}>
                <thead>
                <tr>
                    <th style={{width: '25%'}}>Id</th>
                    <th style={{width: '25%'}}>Name</th>
                    <th style={{width: '25%'}}>Phone</th>
                    <th style={{width: '25%'}}>Settings</th>
                </tr>
                </thead>
                <tbody>
                {users.map(item =>
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>
                            <button className={'btn btn-primary'} onClick={() => editClicked(item.id)}>edit</button>
                            <button className={'btn btn-danger mx-3'} onClick={() => deleteClicked(item.id)}>delete
                            </button>
                        </td>

                    </tr>
                )}
                </tbody>
            </table>
            <ModalForUser modalVis={modalVis} toggle={() => setModalVis(false)} getUserNameAndPhone={getUserNameAndPhone}/>
        </div>
    </div>

}

function mapStateToProps(state) {
    console.log(state)
    return {
        users: state.userReducer.users
    }
}

let a = connect(mapStateToProps, {addUser, editUser, deleteUser})


export default a(User);