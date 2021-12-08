import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function ModalForUser({modalVis, toggle, getUserNameAndPhone}) {

    function getUserNameAndPhoneInModal(event) {
        event.preventDefault();
        let name = event.target[0].value
        let phone = event.target[1].value
        if (name && phone) {
            getUserNameAndPhone(name, phone)
            toggle();
        }
    }


    return <div>
        <Modal isOpen={modalVis} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add new user</ModalHeader>
            <ModalBody>
                <form onSubmit={getUserNameAndPhoneInModal} id={'btn'}>
                    <input type={'text'} className={'form-control'} placeholder={'Enter user name...'}/>
                    <input type={'number'} className={'form-control my-3'} placeholder={'Enter user phone...'}/>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button type={'submit'} form={'btn'} color="primary">save</Button>{' '}
                <Button color="secondary" className={'mx-3'} onClick={toggle}>cancel</Button>
            </ModalFooter>
        </Modal>
    </div>

}

export default ModalForUser
