import React, { useState } from 'react';

import WelcomeStep from './WelcomeStep';
import CreateWorkSpaceStep from './CreateWorkSpaceStep';
import InviteMembersStep from './InviteMembersStep';
import CreateProjectStep from './CreateProjectStep';
import { useNavigate } from 'react-router';

const Onboarding = () => {
  const[workspaceId,setWorkspaceId]=useState(null)
  const [step, setStep] = useState(1);
 
  const navigate=useNavigate()
  const finishStep = () => {
    navigate('/dashboard')
  }
  
  return (
    <>
      {step === 1 && <WelcomeStep next={() => setStep(2)}></WelcomeStep>}
      {step === 2 && (
        <CreateWorkSpaceStep
          setWorkspaceId={setWorkspaceId}
          next={() => setStep(3)}
        ></CreateWorkSpaceStep>
      )}
      {step === 3 && (
        <InviteMembersStep next={() => setStep(4)}></InviteMembersStep>
      )}
      {step === 4 && (
        <CreateProjectStep
          workspaceId={workspaceId}
          finish={finishStep}
        ></CreateProjectStep>
      )}
    </>
  );
};

export default Onboarding;