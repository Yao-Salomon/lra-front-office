"use client"
import { Menu,Tab } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {AdjustmentsHorizontalIcon, ChatBubbleBottomCenterIcon, ChevronDoubleDownIcon, HomeIcon, HomeModernIcon, LockClosedIcon, PaperAirplaneIcon} from '@heroicons/react/24/outline'
import {Input, NextUIProvider} from "@nextui-org/react";
import { Button,Card,CardHeader,CardBody,Image,Divider,CardFooter } from '@nextui-org/react'
import { useState } from 'react'
import {logIn} from './_components/services';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';

export default function Home() {
  const router =useRouter();
  const [emailFocus, setEmailFocus] = useState(false);
  const [currentUser,setCurrentUser]=useState({    
    clearance:0,
    customer_care:0,
    date_joined:"",
    email: "",
    first_name: "",
    imputation: "",
    is_active: false,
    is_admin:false,
    last_login:"",
    last_name:"",
    provenance:"",
    username:""
  });
  const [loggedStatus,setLoggedStatus]=useState(false);
  const [passwordFocus,setPasswordFocus]=useState(false);
  const [emailValue,setEmailValue]=useState("");
  const [passwordValue,setPasswordValue]=useState("");
  const [buttonLoading,setButtonLoading]=useState(false);
  const [resetPanelVisible,setResetPanelVisible]=useState(false);
  const [resetEmail,setResetEmail]=useState("");
  const [resetPanelCount,setResetPanelCount]=useState(0);
  const [errorMessageVisible,setErrorMessageVisible]=useState(false);

  return (
    <NextUIProvider>
      <div className="min-h-screen flex justify-around items-center bg-[url('/images/bg_lab.jpg')] bg-blend-multiply">
          <div className='min-h-screen flex justify-around min-w-full items-center bg-blue-700/75'>
            <Card className="max-w-[400px] shadow-lg bg-white/75 z-0">
              <CardHeader className="flex gap-3">
                <Image
                  alt="nextui logo"
                  height={50}
                  radius="md"
                  src="./logo.png"
                  width={100}
                  className='p-3'
                />
                <div className="flex flex-col">
                  <p className="text-md font-bold"> Connexion</p>
                  <p className="text-small text-default-500">Entrez vos identifiants pour vous connecter</p>
                </div>
              </CardHeader>
              <Divider/>
              <CardBody>
                <div className=''>
                  <Input 
                    label="Email" 
                    type="email" 
                    placeholder="Entrez votre email" 
                    className='mb-1'
                    value={emailValue}
                    isClearable
                    isRequired
                    autoFocus={emailFocus}
                    variant="faded"
                    startContent={
                      <ChatBubbleBottomCenterIcon height={10} width={10} className='text-black'/>
                    }
                    onValueChange={value=>{
                      setEmailValue(value);
                    }}
                    />
                  <Input 
                    label="Mot de passe" 
                    type="password" 
                    placeholder="Entrez votre mot de passe" 
                    className='mt-1'
                    isClearable
                    isRequired
                    value={passwordValue}
                    variant="faded"
                    autoFocus={passwordFocus}
                    startContent={
                      <LockClosedIcon height={10} width={10} className='text-black'/>
                    }
                    onValueChange={value=>{
                      setPasswordValue(value);
                    }}
                  />
                  <Button
                    size='sm'
                    isLoading={buttonLoading}
                    color='primary'
                    className='mt-2'
                    variant="shadow"
                    onClick={async event=>{
                        setButtonLoading(true);
                        console.log("valeur de l'email",emailValue);
                        console.log("valeur du mot de passe",passwordValue);
                        await logIn(emailValue,passwordValue)
                        .then(async res=>{
                          //System notification management
                          let permissionGranted = await isPermissionGranted();
                          if (!permissionGranted) {
                            const permission = await requestPermission();
                            permissionGranted = permission === 'granted';
                          }
                          if (permissionGranted) {
                            if(res.status==401){
                              sendNotification({ title: 'Erreur', body: 'Une erreur est survenue lors de la connexion. Vérifiez vos identifiants'});
                            }
                          }
                          //response treatment
                          if(res.username){

                            setErrorMessageVisible(false);
                            setLoggedStatus(false);
                            setLoggedStatus(true);
                            router.push('/main');
                            setButtonLoading(false); 

                          }else{
                            setErrorMessageVisible(true);
                            setResetPanelCount(resetPanelCount+1);
                          }

                          if(resetPanelCount>1){
                            setResetPanelVisible(true);
                          }

                        })
                        .finally(()=>{
                          
                        });
                    }}
                  >
                    <PaperAirplaneIcon className='text-blue-300 hover:text-white' height={15} width={15}/> <span className='text-md'>Valider</span>
                  </Button>
                  {errorMessageVisible&&<p className='text-sm text-red-900 my-2 font-bold'>Vérifiez vos identifiants et réesayez</p>}
                  {resetPanelVisible&&<div>
                    <div className='flex justify-around flex-row'>
                        <div className=''>
                          <Input
                            type="email"
                            placeholder="email"
                            variant="faded"
                            className='mb-1'
                          />
                          <Button
                            size='sm'
                            color="warning"
                            variant="flat"
                            onClick={()=>{
                              
                            }}
                          >
                            Demander une réinitialisation ?
                          </Button>
                        </div>
                        <Button
                          size='sm'
                          variant="flat"
                          color="primary"
                        >
                          Annuler
                        </Button>
                    </div>
                  </div>}
                </div>
              </CardBody>
              <Divider/>
              <CardFooter>
                <Link
                  className='text-md'
                  href="https://www.termsandconditionsgenerator.com/live.php?token=sVPjeINH6JSlLFgOGDL5Igrj873L2dOU"
                >
                  Vos données sont privées! <span className='font-bold'>Voir notre politique</span>.
                </Link>
              </CardFooter>
            </Card>
          </div>
      </div>
    </NextUIProvider>
  )
}
