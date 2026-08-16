import React, { useState } from 'react';

import WelcomeStep from './WelcomeStep';
import CreateWorkSpaceStep from './CreateWorkSpaceStep';
import InviteMembersStep from './InviteMembersStep';
import CreateProjectStep from './CreateProjectStep';
import { useNavigate } from 'react-router';

const Onboarding = () => {
  const [workspaceId, setWorkspaceId] = useState(null);
  const[workspaceName,setWorkspaceName]=useState(null)
  const [step, setStep] = useState(1);
 
  const navigate=useNavigate()
  const finishStep = () => {
    navigate('/dashboard')
  }
  
  return (
    <>
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
          {step === 1 && <WelcomeStep next={() => setStep(2)}></WelcomeStep>}
          {step === 2 && (
            <CreateWorkSpaceStep
              setWorkspaceName={setWorkspaceName}
              setWorkspaceId={setWorkspaceId}
              next={() => setStep(3)}
            ></CreateWorkSpaceStep>
          )}
          {step === 3 && (
            <InviteMembersStep
              workspaceName={workspaceName}
              workspaceId={workspaceId}
              next={() => setStep(4)}
            ></InviteMembersStep>
          )}
          {step === 4 && (
            <CreateProjectStep
              workspaceId={workspaceId}
              finish={finishStep}
            ></CreateProjectStep>
          )}
        </div>
      </div>
    </>
  );
};

export default Onboarding;