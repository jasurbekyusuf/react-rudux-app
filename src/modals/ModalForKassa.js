import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function ModalForKassa({modalVis, toggle, getKassaName}) {

    function getKassaNameInModal(event) {
        event.preventDefault();
        if (event.target[0].value) {
            getKassaName(event.target[0].value)
            toggle();
        }
    }


    return <div>
        <Modal isOpen={modalVis} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add new kassa</ModalHeader>
            <ModalBody>
                <form onSubmit={getKassaNameInModal} id={'btn'}>
                    <input type={'text'} className={'form-control'} placeholder={'Enter kassa name...'}/>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button type={'submit'} form={'btn'} color="primary">save</Button>{' '}
                <Button color="secondary" className={'mx-3'} onClick={toggle}>cancel</Button>
            </ModalFooter>
        </Modal>
    </div>

}

export default ModalForKassa
