import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from "react-redux";

function ModalForChiqim({modalVis, toggle, getChiqim, kassalar, users}) {

    function getUserNameAndPhoneInModal(event) {
        event.preventDefault();
        let userId = event.target[0].value
        let kassaId = event.target[1].value
        let amount = event.target[2].value
        if (amount) {
            getChiqim(userId, kassaId, amount)
            toggle();
        }
    }


    return <div>
        <Modal isOpen={modalVis} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add new chiqim</ModalHeader>
            <ModalBody>
                <form onSubmit={getUserNameAndPhoneInModal} id={'btn'}>
                    <select className={'form-control form-select'}>
                        {users.map(item =>
                            <option value={item.id}>{item.name}</option>
                        )}
                    </select>
                    <select className={'form-control form-select my-3'}>
                        {kassalar.map(item =>
                            <option value={item.id}>{item.name}</option>
                        )}
                    </select>
                    <input type={'number'} className={'form-control'} placeholder={'Enter amount of money...'}/>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button type={'submit'} form={'btn'} color="primary">save</Button>{' '}
                <Button color="secondary" className={'mx-3'} onClick={toggle}>cancel</Button>
            </ModalFooter>
        </Modal>
    </div>

}

function mapStateToProps(state) {
    return {
        kassalar: state.kassaReducer.kassalar,
        users: state.userReducer.users
    }
}


let a = connect(mapStateToProps, null)


export default a(ModalForChiqim)
