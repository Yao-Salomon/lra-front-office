"use client";
import { BellIcon, ChatBubbleLeftIcon, CircleStackIcon, CloudIcon, DocumentIcon, DocumentPlusIcon, EnvelopeIcon, FireIcon, HashtagIcon, MagnifyingGlassIcon, MegaphoneIcon, MusicalNoteIcon, PlusCircleIcon, PlusIcon, ReceiptRefundIcon, ShoppingCartIcon, SignalIcon, TagIcon, TicketIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import {BellAlertIcon, BellSlashIcon, CheckCircleIcon, CogIcon, EnvelopeOpenIcon, ServerStackIcon, SwatchIcon} from "@heroicons/react/24/solid"
import { Button, Tabs,Tab,Card, CardBody, CardHeader, Input, Select, SelectItem, Textarea, SelectSection, Chip, Tooltip, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Badge, Image } from "@nextui-org/react";
import { createCommands, createMailList, loadCommandDetails, loadCommands, loadEssais, loadMateriaux, loadNotifications, loadSettings, updateNotification } from "../_components/services";
import { useState, useEffect } from 'react'
import Constants from "../constants";
import Link from "next/link";
import Alert from "../_components/alert";

export default function Main(){
    const [rootUILoading,setRootUILoading]=useState(false);

    const [commands,setCommands]=useState([{id:0,number:"",details:"",etat:0,date_prelevement:""}]);

    const [initiatedCommands,setInitiatedCommands]=useState([{id:0,number:"",details:"",etat:0,date_prelevement:""}]);
    const [receivedCommands,setReceivedCommands]=useState([]);
    const [treatedCommands,setTreatedCommands]=useState([]);
    const [deliveredCommands,setDeliverdCommands]=useState([]);

    const [userSettings,setUserSettings]=useState({id:0,mail_list:""});
    const [userSettingsMails,setUserSettingsMails]=useState("");
    const [userSettingMailsValid,setUserSettingsMailsValid]=useState(true);
    const [userSettingMailsDuplicate,setUserSettingsDuplicate]=useState(false);
    const [mailSavingAlert,setMailSavingAlert]=useState(false);

    const savingMailMessage="Le liste de diffusion a bien été enregistrée";


    const [confirmedCommands,setConfirmedCommands]=useState([]);
    const [commandDetails,setCommandDetails]=useState({essais:[{id:0,label:"",norme:"",fichier:"",abbreviation:"",version:"",details:""}],materiaux:[{id:0,label:"",details:"",code:""}]});
    const [modalLoading,setModalLoading]=useState(false);
    const rootUrl=Constants.downoladRootUrl;

    const [essais,setEssais]=useState([{id:0,label:"None"}]);
    const [materiaux,setMateriaux]=useState([{id:0,label:"None"}]);
    const {isOpen, onOpen, onOpenChange}=useDisclosure();

    const [commandLoading,setCommandLoading]=useState(true);
    const [mailSettingLoading,setMailSettingLoading]=useState(false);
    const [notificationUpdateLoading,setNotificationLoading]=useState(false);

    const [userNotifications,setUserNotifications]=useState([{id:0,message:""}]);
    const [synthesisDocuments,setSynthesisDocuments]=useState([]);

    const [createCommandLoading,setCreateCommandLoading]=useState(false);
    const [fieldDisabled,setFieldDisabled]=useState(false);
    const [datePrelevement,setDatePrelevement]=useState(0);
    const [essaisCm,setEssaisCm]=useState([]);
    const [materiauxCm,setMateriauxCm]=useState([]);
    const [detailsCm,setDetailsCm]=useState("");

    const [dateError,setDateError]=useState(false);
    const [essaisError,setEssaisError]=useState(false);
    const [materiauError,setMateriauError]=useState(false);
    const [detailsError,setDetailsError]=useState(false);
    const [size, setSize] = useState('md');
      
    const handleOpen = () => {
        onOpen();
      }
    
    useEffect(() => {
        async function doLoad(){

            await loadCommands("salomon")
            .then(res=>{
                setCommands(res);
                let initiated=res.filter(function(element:any){
                    return element.etat>=1;
                });
                let received=res.filter(function(element:any){
                    return element.etat>=2;
                });
                let treated=res.filter(function(element:any){
                    return element.etat>=3;
                });
                let delivered=res.filter(function(element:any){
                    return element.etat>=4;
                });
                let confirmed=res.filter(function(element:any){
                    return element.etat>=5;
                });

                setInitiatedCommands(initiated);
                setTreatedCommands(treated);
                setReceivedCommands(received);
                setDeliverdCommands(delivered);
                setConfirmedCommands(confirmed);
                
            })
            .finally(()=>{
                setCommandLoading(false);
            });

            await loadEssais()
            .then(res=>{
                setEssais(res);
            })
            .finally(()=>{

            });

            await loadMateriaux()
            .then(res=>{
                setMateriaux(res)
            })
            .finally(()=>{

            });

            await loadSettings("salomon")
            .then(res=>{
                setUserSettings(res);
                setUserSettingsMails(res.mail_list);
            })
            .finally(()=>{

            })

            await loadNotifications("salomon")
            .then(res=>{
                setUserNotifications(res);
            })
            .finally(()=>{

            })
        }
        doLoad();
      }, []);

    return(
        <div className="flex min-h-screen justify-center">
            <div className="rounded m-2 basis-9/12">
                <Tabs aria-label="Options" color="primary" variant="bordered">
                    <Tab
                        key="dashboard"
                        
                        title={
                            <div className="flex items-center space-x-2 group">
                                <ShoppingCartIcon height={20} width={20}/>
                                <span>Tableau de bord</span>
                            </div>
                        }
                    > 
                        <Card>
                            <CardBody>
                                <div className="flex flex-col">
                                    <p className="font-bold mb-2 flex"> <FireIcon color="orange" width={20} height={20}/>Commandes</p>
                                    <div className="flex justify-around">
                                        <Tooltip content="Toutes les commandes passées par l'utilisateur">
                                            <div className="flex border rounded-xl p-1 shadow-sm hover:shadow-sm">
                                                <p className="font-bold mr-2">Total:</p>
                                                <Chip className="bg-blue-400 text-white">{commands.length}</Chip>
                                            </div> 
                                        </Tooltip>
                                        
                                        <div className="flex border rounded-xl p-1 shadow-sm hover:shadow">
                                            <p className="font-bold mr-2">Initiés:</p>
                                            <Chip className="bg-blue-500 text-white">{initiatedCommands.length}</Chip>
                                        </div>
                                        <div className="flex border rounded-xl p-1 shadow-sm hover:shadow">
                                            <p className="font-bold mr-2">Reçues:</p>
                                            <Chip className="bg-blue-600 text-white">{receivedCommands.length}</Chip>
                                        </div>
                                        <div className="flex border rounded-xl p-1 shadow-sm hover:shadow">
                                            <p className="font-bold mr-2">Traitées:</p>
                                            <Chip className="bg-blue-700 text-white">{treatedCommands.length}</Chip>
                                        </div>
                                        <div className="flex border rounded-xl p-1 shadow-sm hover:shadow">
                                            <p className="font-bold mr-2">Livrées:</p>
                                            <Chip className="bg-blue-800 text-white">{deliveredCommands.length}</Chip>
                                        </div>
                                        <div className="flex border rounded-xl p-1 shadow-sm hover:shadow">
                                            <p className="font-bold mr-2">Confirmées:</p>
                                            <Chip className="bg-blue-900 text-white">{confirmedCommands.length}</Chip>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col mt-5">
                                    <p className="font-bold mb-2 flex"> <DocumentPlusIcon color="orange" width={20} height={20}/>Documents</p>
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-semibold">Aucun document n'a encore été généré.</p>

                                        <Image
                                        alt="nextui logo"
                                        height={100}
                                        radius="md"
                                        src="./logo.png"
                                        width={100}
                                        className='p-3 mt-5'
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mt-5">
                                    <p className="font-bold mb-2 flex"> <ReceiptRefundIcon color="orange" width={20} height={20}/>Retours</p>
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-semibold">Aucun retour n'a encore été fait.</p>

                                        <Image
                                        alt="nextui logo"
                                        height={100}
                                        radius="md"
                                        src="./logo.png"
                                        width={100}
                                        className='p-3 mt-5'
                                        />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>  
                    </Tab>
                    <Tab
                        key="creation"
                        title={
                            <div className="flex items-center space-x-2">
                                <PlusCircleIcon height={20} width={20}/>
                                <span> Création</span>
                            </div> 
                        }
                    >   
                        <Card>
                            <CardHeader>

                            </CardHeader>
                            <CardBody>
                                <div className="m-2 basis-4/12 mr-2 flex justify-center">
                                    <div className="basis-7/12 bg-blue-900 p-2 rounded-xl shadow">
                                        <div className="bg-white hover:bg-blue-100 px-2 py-1 rounded-xl w-3/5 flex justify-center">
                                            <TagIcon height={20} width={20} color="blue"/>
                                            <p className="font-bold font-md ml-2">Nouvelle commande</p>
                                        </div>
                                        <Input 
                                            label="Date de prélèvement"
                                            placeholder="Entrez la date de prélèvement"
                                            variant="faded"
                                            errorMessage={dateError?"La date doit ne doit pas être vide":""}
                                            isInvalid={dateError}
                                            required
                                            isDisabled={fieldDisabled}
                                            onValueChange={(value)=>{
                                                let datePrelevement=new Date(value);
                                                if(datePrelevement.getTime()!=0 && !isNaN(datePrelevement.getTime())){
                                                    setDateError(false);
                                                }
                                                setDatePrelevement(datePrelevement.getTime());
                                            }}
                                            className="my-1"
                                            type="datetime-local"
                                        />
                                        <Select
                                            selectionMode="multiple"
                                            label="Matériaux"
                                            isDisabled={fieldDisabled}
                                            onOpenChange={(state)=>{
                                                if(!state&&(materiauxCm.length!=0)){
                                                    setMateriauError(false);
                                                }
                                            }}
                                            required
                                            errorMessage={materiauError?"Vous devez choisir au moins un matériau":""}
                                            isInvalid={materiauError}
                                            items={materiaux}
                                            onChange={(event)=>{
                                                let value=event.target.value;
                                                let valueArray=value.split(',');
                                                let choices:any=[];
                                                materiaux.forEach((materiau,index)=>{
                                                    valueArray.forEach(element => {
                                                        if(materiau.id==parseInt(element)){
                                                            choices.push(materiau);
                                                        }
                                                    });
                                                })
                                                setMateriauxCm(choices);
                                            }}
                                            className="my-1"
                                        >
                                            {materiaux.map((data)=>{
                                                return(
                                                    <SelectItem
                                                        key={data.id}
                                                        title={data.label}
                                                    />
                                                )
                                            })}
                                        </Select>
                                        <Select
                                            selectionMode="multiple"
                                            label="Essais"
                                            isDisabled={fieldDisabled}
                                            onOpenChange={(state)=>{
                                                if(!state&&(essaisCm.length!=0)){
                                                    setEssaisError(false);
                                                }
                                            }}
                                            required
                                            className="my-1"
                                            errorMessage={essaisError?"Vous devez choisir au moins un essai":""}
                                            isInvalid={essaisError}
                                            onChange={(event)=>{
                                                let value=event.target.value;
                                                let valueArray=value.split(',');
                                                let choices:any=[];
                                                essais.forEach((essai,index)=>{
                                                    valueArray.forEach(element => {
                                                        if(essai.id==parseInt(element)){
                                                            choices.push(essai);
                                                        }
                                                    });
                                                })
                                                setEssaisCm(choices);
                                            }}
                                            showScrollIndicators
                                            
                                        >   
                                            <SelectSection
                                            >
                                                
                                            </SelectSection>
                                            <SelectSection
                                                title="Items"
                                            >
                                                {essais.map((data)=>{
                                                    return(
                                                        <SelectItem
                                                            key={data.id}
                                                            title={data.label}
                                                        />
                                                    )
                                                })}
                                            </SelectSection>
                                            
                                        </Select>
                                        <Textarea
                                            label="Détails"
                                            variant="faded"
                                            className="my-1"
                                            isDisabled={fieldDisabled}
                                            onValueChange={(value)=>{
                                                setDetailsCm(value);
                                            }}
                                        />
                                        <Button
                                            size="md"
                                            color="primary"
                                            variant="shadow"
                                            isLoading={createCommandLoading}
                                            onClick={async ()=>{
                                                //states changes
                                                setCreateCommandLoading(true);
                                                setFieldDisabled(true);

                                                console.log("Value of date",datePrelevement);
                                                console.log("Essais",essaisCm);
                                                console.log("Matériaux",materiauxCm);
                                                console.log("Détails",detailsCm);

                                                if(datePrelevement===0 || isNaN(datePrelevement)){
                                                    setDateError(true);
                                                }
                                                if(essaisCm.length==0){
                                                    setEssaisError(true);
                                                }
                                                if(materiauxCm.length==0){
                                                    setMateriauError(true)
                                                }
                                                if(!dateError&&!essaisError&&!materiauError){
                                                    let dateISOString=new Date(datePrelevement);
                                                    await createCommands(dateISOString.toISOString(),essaisCm,materiauxCm,detailsCm,"salomon")
                                                    .then(res=>{
                                                        console.log(res);
                                                    })
                                                    .finally(()=>{
                                                        setFieldDisabled(false);
                                                        setCreateCommandLoading(false);
                                                    });
                                                    
                                                }
                                            }}
                                        >
                                            Créer une commande
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab
                        key="lastCommands"
                        title={
                            <div className="flex items-center space-x-2">
                                <TicketIcon width={20} height={20}/>
                                <span> Commandes récentes</span>
                            </div>
                        }
                    >
                         {
                        commandLoading?
                            <p>Loading</p>
                            :
                            <>
                            <Card>,
                                <div className="flex flex-wrap p-2">
                                <Input 
                                    type="search"
                                    placeholder="Rechercher par numéro de commande"
                                    startContent={<MagnifyingGlassIcon height={25} width={25}/>}

                                    onValueChange={(value)=>{

                                        setCommands(initiatedCommands);
                                        let commandFiltered:any=initiatedCommands.filter(function(element){
                                            return element.number.toLowerCase().includes(value.toLowerCase())
                                        })
                                        setCommands(commandFiltered);

                                    }}
                                />
                                {commands.map((data)=>{
                                    return(
                                        <div className=" flex flex-col m-1 border hover:shadow-blue-100 rounded-lg p-2 shadow-sm hover:shadow-md" key={data.id}>
                                            <p className="flex p-2 shadow rounded-sm"><FireIcon height={25} width={25} color="orange"/>{data.number.toUpperCase()}</p>
                                            <div className="flex my-1">
                                                {data.etat>=1&&<CheckCircleIcon height={25} width={25} className="text-green-300"/>}
                                                {data.etat>=2&&<CheckCircleIcon height={25} width={25} className="text-green-400"/>}
                                                {data.etat>=3&&<CheckCircleIcon height={25} width={25} className="text-green-500"/>}
                                                {data.etat>=4&&<CheckCircleIcon height={25} width={25} className="text-green-600"/>}
                                                {data.etat>=5&&<CheckCircleIcon height={25} width={25} className="text-green-700"/>}
                                            </div>
                                            <div>
                                                <Button
                                                    variant="faded"
                                                    color="default"
                                                    isLoading={modalLoading}
                                                    className="shadow-sm"
                                                    onClick={async()=>{
                                                        setModalLoading(true);
                                                        await loadCommandDetails("salomon",data.id)
                                                        .then((res)=>{
                                                            setCommandDetails(res);
                                                            handleOpen();
                                                            console.log(commandDetails);
                                                        })
                                                        .finally(()=>{
                                                            setModalLoading(false);
                                                        });
                                                    }}
                                                >
                                                    <SwatchIcon height={25} width={25} className="text-gray-400"/>Détails
                                                </Button>
                                                <Modal backdrop="blur" size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
                                                    <ModalContent>
                                                        {(onClose)=>(
                                                            <>
                                                                <ModalHeader>
                                                                    <p className="font-bold flex items-center"><SwatchIcon height={25} width={25} color="orange"/><span className="font-bold ml-2">Details de la commande {data.number}</span></p>
                                                                </ModalHeader>
                                                                <ModalBody>
                                                                    <div className="flex flex-col items-start justify-between">
                                                                        <div>
                                                                            <p className="font-bold flex items-center"> <CogIcon height={25} width={25}/> Essais</p>
                                                                            <div className="flex flex-wrap">
                                                                                {commandDetails.essais.map((essai,index)=>{
                                                                                    function getNameFromFile(path:string){

                                                                                        let componentArray=path.split("/");
                                                                                        let fileName=componentArray[componentArray.length-1];
                                                                                        return fileName;
                                                                                    }
                                                                                    return(
                                                                                        <div key={essai.id} className="rounded-lg border shadow p-2 mr-1">
                                                                                            <p>Label: {essai.label}</p>
                                                                                            <p>Norme: {essai.norme}</p>
                                                                                            <p>Abbréviation: {essai.abbreviation}</p>
                                                                                            <p>Détails: {essai.details}</p>
                                                                                            <p className="my-2 flex items-center flex-wrap"><DocumentIcon className="" height={25} width={25}/><Link className="border rounded-lg p-2 bg-blue-600 hover:bg-blue-700 text-white" target="_blank" title="P6" href={`${rootUrl}${essai.fichier}`}>{getNameFromFile(essai.fichier)}</Link></p>
                                                                                            <p>Version: {essai.version}</p>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                            <p className="font-bold flex items-center mt-2"><CircleStackIcon height={25} width={25} /> Matériaux</p>
                                                                            <div className="flex flex-wrap">
                                                                                {commandDetails.materiaux.map((materiau,index)=>{
                                                                                    return(
                                                                                        <div key={materiau.id} className="rounded border shadow p-2 mr-1 my-1">
                                                                                            <p>Label: {materiau.label}</p>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                        <Button
                                                                            onPress={onClose}
                                                                            variant="ghost"
                                                                            color="danger"
                                                                            className="mt-2"
                                                                        > Fermer</Button>
                                                                    </div>
                                                                </ModalBody>
                                                                <ModalFooter></ModalFooter>
                                                            </>
                                                            
                                                        )}
                                                    </ModalContent>
                                                </Modal>
                                            </div>
                                        </div>  
                                    )  
                                })}
                                </div>
                            </Card>
                            </>   
                        }
                    </Tab>
                    <Tab
                        key="status"
                        title={
                            <div className="flex items-center space-x-2">
                            <DocumentIcon height={20} width={20}/>
                            <span> Documents de synthèses</span>
                            </div>
                        }
                    >
                        <Card>
                            <CardHeader>

                            </CardHeader>
                            <CardBody>
                                {synthesisDocuments.length==0&&<div className="flex flex-col justify-center items-center">
                                    <p className="font-semibold">Aucun documents de synthèse n'a encore été généré.</p>
                                    <p className="font-semibold">Ceux-ci s'afficheront ici après production.</p>

                                    <Image
                                    alt="nextui logo"
                                    height={100}
                                    radius="md"
                                    src="./logo.png"
                                    width={100}
                                    className='p-3 mt-5'
                                    />
                                </div>}
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab
                        key="notifications"
                        title={
                            <div className="flex items-center">
                                <BellIcon height={20} width={20}/>
                                <span> Notifications</span>
                                {userNotifications.length>0&&<Chip className="ml-1" variant="dot">{userNotifications.length}</Chip>}
                            </div>
                        }
                    >   
                        <Card>
                            <CardBody>
                                {userNotifications.map((data,index)=>{

                                    return(
                                        <div key={index} className="rounded-lg border p-2">
                                            <p className="flex font-semibold items-center"><BellAlertIcon height={20} width={20} color="gray"/>Notifications N° {index+1}</p>
                                            <p className="my-2 ml-2">{data.message}</p>
                                            <Button
                                                variant="faded"
                                                color="primary"
                                                isLoading={notificationUpdateLoading}
                                                size="sm"
                                                onClick={async ()=>{
                                                    setNotificationLoading(true)
                                                    await updateNotification(data.id)
                                                    .then(async res=>{
                                                        await loadNotifications("salomon")
                                                        .then(res=>{
                                                            setUserNotifications(res);
                                                        })
                                                        .finally(()=>{

                                                        })
                                                    }).finally(()=>{
                                                        setNotificationLoading(false)
                                                    })
                                                }}
                                            ><p className="flex "><BellSlashIcon width={15} height={15}/><span>Marquer comme lu</span></p></Button>
                                        </div>
                                    )
                                })}
                                {userNotifications.length==0&&
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-semibold">Votre boîte de notifications est vide.</p>

                                        <Image
                                        alt="nextui logo"
                                        height={100}
                                        radius="md"
                                        src="./logo.png"
                                        width={100}
                                        className='p-3 mt-5'
                                        />
                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab
                        key="settings"
                        title={
                            <div className="flex items-center">
                                <CogIcon height={20} width={20}/>
                                <span> Paramétrages</span>
                            </div>
                        }
                    >   
                        <Card>
                            <CardBody className="flex flex-col items-start">
                                <p className="font-extrabold flex text-blue-500"><EnvelopeOpenIcon height={20} width={20}/>Mails de distribution</p>
                                <div className="flex flex-row flex-wrap">
                                    {userSettings.mail_list.split(";").map((email,index)=>{
                                        return(
                                            <div key={index} >
                                                <div className="m-1 flex items-center p-2"><EnvelopeIcon height={20} width={20}/><span className="font-medium ml-2">{email}</span></div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <Textarea
                                        cols={50}
                                        rows={30}
                                        value={userSettingsMails}
                                        onValueChange={(value)=>{

                                            setUserSettingsMails(value);
                                            setUserSettingsMailsValid(true);
                                            setUserSettingsDuplicate(false);

                                            let mail_list=value.split(";")

                                            for(let mail in mail_list){
                                                if(mail_list[mail].match("\\w+@\\w+.\\w{2,5}")){
                                                    console.log("mail valide",mail_list[mail])
                                                }else{
                                                    if(mail_list[mail].length!=0){
                                                        setUserSettingsMailsValid(false);
                                                    }
                                                    if(userSettingsMails.includes(mail_list[mail])){
                                                        setUserSettingsDuplicate(true);
                                                    }
                                                }
                                            }
                                            
                                        }}  
                                    />
                                <div>
                                    {!userSettingMailsValid&&<p className="text-red-500 font-semibold flex "><SignalIcon height={15} width={15}/> L'un des mails n'est pas au bon format</p>}
                                    {userSettingMailsDuplicate&&<p className="text-red-500 font-semibold"><SignalIcon height={15} width={15}/> L'un des mails est dupliqué</p>}
                                </div>
                                <Button
                                    variant="shadow"
                                    color="success"
                                    className="mt-2"
                                    isLoading={mailSettingLoading}
                                    onClick={async ()=>{
                                        setMailSettingLoading(true);
                                        if(userSettingMailsValid&&!userSettingMailsDuplicate){
                                            await createMailList(userSettings.id,userSettingsMails,"salomon")
                                            .then(async (res)=>{
                                                setMailSavingAlert(true);
                                                setTimeout(() => {
                                                    setMailSavingAlert(false);
                                                  }, 5000);

                                                  await loadSettings("salomon")
                                                  .then(res=>{
                                                      setUserSettings(res);
                                                      setUserSettingsMails(res.mail_list);
                                                  })
                                                  .finally(()=>{
                                                    setMailSettingLoading(false);
                                                  })
                                            })
                                        }else{
                                            setMailSettingLoading(false);
                                        }
                                    }}
                                ><p className="text-white font-semibold flex items-center"><CloudIcon height={25} width={25}/>Enregistrer</p></Button>
                               {mailSavingAlert&&<Alert type="success" title="Status d'enregistrement" message={savingMailMessage}/>}
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab
                        key="ecoute"
                        title={
                            <div className="flex items-center">
                                <MegaphoneIcon height={20} width={20}/>
                                <span> Services clients</span>
                            </div>
                        }
                    >   
                        <Card>
                            <CardBody className="flex flex-col items-start">
                                <p className="font-extrabold flex text-blue-500 items-center"><ChatBubbleLeftIcon height={20} width={20}/>Votre Page</p>
                                <div className="flex flex-row flex-wrap">
                                    <div>
                                        <div className="m-1 flex items-center p-2"><HashtagIcon height={20} width={20}/><span className="font-medium ml-2">Ecoute client</span></div>
                                    </div>
                                </div>
                                <Input
                                    variant="faded"
                                    placeholder="Entrez un titre pour votre retour client"
                                    label="Titre"
                                    className="mb-2"
                                />
                                <Textarea
                                        label="Contenu"
                                        cols={50}
                                        rows={30} 
                                    />
                                <Button
                                    variant="shadow"
                                    color="success"
                                    className="mt-2"
                                    isLoading={mailSettingLoading}
                                    onClick={async ()=>{
                                    }}
                                ><p className="text-white font-semibold flex items-center"><CloudIcon height={25} width={25}/>Envoyer</p></Button>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>
        
        
    )
}

