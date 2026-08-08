import React, { useRef } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';

const SingleWorkspace = () => {
  const axios=useAxios()
  const { id } = useParams();
  console.log(id);
  const modalRef = useRef();
  const handelOpenModal = () => {
    modalRef.current.showModal();
  }
  const handelInviteMember = e => {
    
    e.preventDefault();
    const email = e.target.email.value;
    const invitation = {
      email,
      workspaceId: id,
      status: 'pending',
      role:'member'
    };
    axios.post('/invitations', invitation).then(res => {
      console.log(res.data);
   })
  };
  return (
    <div>
      <button onClick={handelOpenModal}>invite member</button>

      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <form onSubmit={handelInviteMember}>
            <input type="email" name="email" placeholder="email address" />
            <button type="submit">Invite</button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SingleWorkspace;
