import React from 'react';

const InviteMembersStep = ({next}) => {
  return (
    <div>
      <p>inviteMember</p>
      <button onClick={next}>skip</button>
      <button onClick={next}>next</button>
    </div>
  );
};

export default InviteMembersStep;