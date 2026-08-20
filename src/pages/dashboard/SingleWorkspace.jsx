import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const SingleWorkspace = () => {
 
  const { user } = useAuth();
  const axios = useAxios();
  const { id } = useParams();
  
  const modalRef = useRef();
  console.log(id)

  const { data: workspace = {} } = useQuery({
    queryKey: ['workspace', id],
   
    queryFn: async () => {
      const res =await axios.get(`/workspaces/${id}/singleWorkspace`);
      return res.data
    }
  })
  const existOwner = workspace?.ownerEmail === user?.email;
 

  //const existWorkspaceOwner = workspace.ownerEmail===user.email
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
      role: 'member',
      inviterName: user?.displayName,
      inviterEmail: user?.email,
    };
    axios.post('/invitations', invitation).then(res => {
      modalRef.current.close()
   })
  };
  return (
    <div>
      {existOwner && <button onClick={handelOpenModal}>invite member</button>}

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
