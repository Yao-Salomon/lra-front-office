"use client";
import { BellIcon, ChatBubbleLeftIcon, CircleStackIcon, CloudIcon, DocumentIcon, DocumentPlusIcon, EnvelopeIcon, ExclamationTriangleIcon, FireIcon, GiftIcon, GiftTopIcon, HashtagIcon, InformationCircleIcon, MagnifyingGlassIcon, MegaphoneIcon, MusicalNoteIcon, PencilSquareIcon, PlusCircleIcon, PlusIcon, ReceiptRefundIcon, ShieldCheckIcon, ShoppingCartIcon, SignalIcon, SquaresPlusIcon, TagIcon, TicketIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import {BellAlertIcon, BellSlashIcon, CheckBadgeIcon, CheckCircleIcon, CogIcon, EnvelopeOpenIcon, PaperAirplaneIcon, ServerStackIcon, SwatchIcon, TrashIcon} from "@heroicons/react/24/solid"
import { Button, Tabs,Tab,Card, CardBody, CardHeader, Input, Select, SelectItem, Textarea, SelectSection, Chip, Tooltip, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Badge, Image, Spinner, Listbox, ListboxItem, divider } from "@nextui-org/react";
import { createCommands, createMailList, loadCommandDetails, loadCommands, loadCorrespondance, loadEssais, loadMateriaux, loadNotifications, loadSettings, savingCommands, updateNotification } from "../_components/services";
import { useState, useEffect } from 'react'
import Constants from "../constants";
import Link from "next/link";
import Alert from "../_components/alert";
import Messages from "../_components/messages";

export default function Main(){
    const [commands,setCommands]=useState([{id:0,number:"",details:"",etat:0,date_prelevement:""}]);

    const [commandRecap,setCommandRecap]=useState([{materiau:{id:0,label:"",code:"",situation:""},date_prelevement:"",origine:"",situation:"",essais:[{id:0,label:"",abbreviation:""}],details:""}]);

    const [initiatedCommands,setInitiatedCommands]=useState([{id:0,number:"",details:"",etat:0,date_prelevement:""}]);
    const [receivedCommands,setReceivedCommands]=useState([]);
    const [treatedCommands,setTreatedCommands]=useState([]);
    const [deliveredCommands,setDeliverdCommands]=useState([]);

    const [userSettings,setUserSettings]=useState({id:0,mail_list:""});
    const [userSettingsMails,setUserSettingsMails]=useState("");
    const [userSettingMailsValid,setUserSettingsMailsValid]=useState(true);
    const [userSettingMailsDuplicate,setUserSettingsDuplicate]=useState(false);
    const [mailSavingAlert,setMailSavingAlert]=useState(false);


    const [confirmedCommands,setConfirmedCommands]=useState([]);
    const [commandDetails,setCommandDetails]=useState([{materiau:{id:0,label:"",code:"",situation:""},date_prelevement:"",origine:"",situation:"",essais:[{id:0,label:"",abbreviation:""}],details:""}]);
    const [modalLoading,setModalLoading]=useState(false);
    const rootUrl=Constants.downoladRootUrl;

    const [essais,setEssais]=useState([{id:0,label:"None"}]);
    const [dynamicEssais,setDynamicEssais]=useState([{id:0,label:"",abbreviation:""}]);
    const [dynamicMateriaux,setDynamicMateriaux]=useState({id:0,label:"",code:"",situation:"",origin:""});
    const [materiaux,setMateriaux]=useState([{id:0,label:"None"}]);
    const {isOpen, onOpen, onOpenChange}=useDisclosure();

    const [commandLoading,setCommandLoading]=useState(true);
    const [savingCommandLoading,setSavingCommandLoading]=useState(false);
    const [rootUILoading,setRootUILoading]=useState(false);
    const [submitCommandLoading,setSubmitCommandLoading]=useState(false);
    const [mailSettingLoading,setMailSettingLoading]=useState(false);
    const [notificationUpdateLoading,setNotificationLoading]=useState(false);
    const [loadingDynamicEssai,setLoadingDynamicEssai]=useState(false);

    const [userNotifications,setUserNotifications]=useState([{id:0,message:""}]);
    const [duplicateNofitification,setDuplicateNotification]=useState(false);
    const [savingSuccessful,setSavingSuccessfull]=useState(false);
    const [savingError,setSavingError]=useState(false);

    const [synthesisDocuments,setSynthesisDocuments]=useState([]);

    const [createCommandLoading,setCreateCommandLoading]=useState(false);
    const [fieldDisabled,setFieldDisabled]=useState(false);
    const [datePrelevement,setDatePrelevement]=useState(0);
    const [essaisCm,setEssaisCm]=useState([]);
    const [materiauxCm,setMateriauxCm]=useState([]);
    const [detailsCm,setDetailsCm]=useState("");
    const [originCm,setOriginCm]=useState("");
    const [situationCm,setSituationCm]=useState("");
    const [domLoading,setDomLoading]=useState(true);

    const [dateError,setDateError]=useState(false);
    const [essaisError,setEssaisError]=useState(false);
    const [originCmError,setOriginCmError]=useState(false);
    const [situationCmError,setSituationCmError]=useState(false);
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
                console.log("commands loaded",res);
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
            setCommandRecap([]);
        }
        doLoad();
      }, []);

    return(
        <div className="flex min-h-screen justify-center" onLoad={()=>{
            setDomLoading(false);
        }}>
            {domLoading&&
                <div className="min-w-screen fixed z-100 inset-0 flex items-center justify-center">
                    <Spinner size="lg" color="success"/>
                </div>
            }
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
                                <div className="m-2 mr-2 flex justify-around">
                                    <div className="basis-6/12 bg-blue-900 p-2 rounded-xl shadow">
                                        <div className="bg-white hover:bg-blue-100 px-2 py-1 rounded-xl w-3/5 flex justify-start items-center">
                                            <PencilSquareIcon height={20} width={20} color="blue"/>
                                            <p className="font-bold font-md ml-2">CREATION DE LA COMMANDE</p>
                                        </div>
                                        <Select
                                            selectionMode="single"
                                            label="Matériaux"
                                            isDisabled={fieldDisabled}
                                            onOpenChange={(state)=>{
                                                if(!state&&(JSON.stringify(dynamicMateriaux)!="{}")){
                                                    setMateriauError(false);
                                                }
                                            }}
                                            required
                                            errorMessage={materiauError?"Vous devez choisir au moins un matériau":""}
                                            isInvalid={materiauError}
                                            items={materiaux}
                                            onChange={async (event)=>{
                                                setDynamicEssais([]);
                                                setLoadingDynamicEssai(true);
                                                let value=event.target.value;
                                                let materiauDynamic:any;

                                                materiaux.forEach((materiau,index)=>{
                                                    if(materiau.id==parseInt(value)){
                                                        materiauDynamic=materiau;
                                                    }
                                                })

                                                if(value.length!=0){
                                                    await loadCorrespondance(parseInt(value))
                                                .then(res=>{
                                                    setDynamicEssais(res);
                                                })
                                                .finally(()=>{
                                                    setLoadingDynamicEssai(false);
                                                });
                                                }
                                                setDynamicMateriaux(materiauDynamic);
                                                
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
                                        <Input 
                                            label="Origine"
                                            placeholder="Lieu géographique où le matériau a été prélevé ..."
                                            variant="faded"
                                            errorMessage={originCmError?"L'origine ne  doit ne doit pas être vide":""}
                                            isInvalid={originCmError}
                                            required
                                            isDisabled={fieldDisabled}
                                            onValueChange={(value)=>{
                                                setOriginCm(value);
                                                if(value.length!=0){
                                                    setOriginCmError(false);
                                                }
                                            }}
                                            className="my-1"
                                            type="text"
                                        />
                                        <Input 
                                            label="Situation"
                                            placeholder="Couche chaussée, PK, Profil,..."
                                            variant="faded"
                                            errorMessage={situationCmError?"La situation doit ne doit pas être vide":""}
                                            isInvalid={situationCmError}
                                            required
                                            isDisabled={fieldDisabled}
                                            onValueChange={(value)=>{
                                                setSituationCm(value);
                                                if(value.length!=0){
                                                    setSituationCmError(false);
                                                }
                                            }}
                                            className="my-1"
                                            type="text"
                                        />
                                        <div className="flex justify-center">
                                            <p className="text-white text-xs flex items-center "><ExclamationTriangleIcon height={15} width={15}/><span>Choisissez un matériau et les essais disponibles seront chargés automatiquement</span></p>
                                        </div>
                                        <Select
                                            selectionMode="multiple"
                                            label="Essais"
                                            endContent={loadingDynamicEssai?<Spinner size="sm"/>:""}
                                            isDisabled={fieldDisabled}
                                            onOpenChange={(state)=>{
                                                if(!state&&(dynamicEssais.length!=0)){
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
                                            <SelectSection>
                                                {dynamicEssais.map((data)=>{
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
                                            label="Informations supplémentaires"
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
                                            onClick={()=>{
                                                //states changes
                                                setFieldDisabled(true);
                                                let is_valid=true;

                                                if(datePrelevement===0 || isNaN(datePrelevement)){
                                                    setDateError(true);
                                                    is_valid=false;
                                                    
                                                }
                                                if(essaisCm.length==0){
                                                    setEssaisError(true);
                                                    is_valid=false;
                                                }
                                                if(originCm.length==0){
                                                    setOriginCmError(true);
                                                    is_valid=false;
                                                }
                                                if(situationCm.length==0){
                                                    setSituationCmError(true);
                                                    is_valid=false;
                                                }
                                                if(JSON.stringify(dynamicMateriaux)=="{}"){
                                                    setMateriauError(true)
                                                    is_valid=false;
                                                }
                                                if(!dateError&&!essaisError&&!materiauError&&!originCmError&&!situationCmError){
                                                
                                                    let previousCommanString=JSON.stringify(commandRecap);
                                                    let currentCommandString=JSON.stringify({materiau:dynamicMateriaux,date_prelevement:datePrelevement,origine:originCm,situation:situationCm,essais:dynamicEssais,details:detailsCm});
                                                    let dateIsoFormat=new Date(datePrelevement).toISOString()

                                                    if(previousCommanString.includes(currentCommandString)){
                                                        setDuplicateNotification(true);
                                                        setTimeout(() => {
                                                            setDuplicateNotification(false);
                                                        }, 5000);
                                                    }else{
                                                        if(commandRecap.length!=0){
                                                            setCommandRecap([
                                                                ...commandRecap,
                                                                {materiau:dynamicMateriaux,date_prelevement:dateIsoFormat,origine:originCm,situation:situationCm,essais:dynamicEssais,details:detailsCm}
                                                            ]);
                                                        }else{
                                                            if(is_valid){
                                                                setCommandRecap([{materiau:dynamicMateriaux,date_prelevement:dateIsoFormat,origine:originCm,situation:situationCm,essais:dynamicEssais,details:detailsCm}]);
                                                            }
                                                        }
                                                    }                                                  
                                                }
                                                setFieldDisabled(false);
                                            }}
                                        >
                                            <PlusIcon height={20} width={20}/> Ajouter
                                        </Button>
                                        {duplicateNofitification&&<Alert type="warning" title={Messages.fr.duplicateTitle} message={Messages.fr.duplicateMessage}/>}
                                    </div>
                                    <div className="basis-5/12 flex flex-col justify-between border p-2 rounded-xl shadow hover:shadow-md">
                                        <div className="bg-white hover:bg-blue-100 px-2 py-1 rounded-xl w-2/5 flex justify-start items-center">
                                            <ShieldCheckIcon height={20} width={20} color="blue"/>
                                            <p className="font-bold font-md ml-2">FINALISATION</p>
                                        </div>
                                        <div>
                                            
                                            <Listbox
                                                className="max-h-[400px] overflow-auto"
                                                variant="shadow"
                                            >
                                                {
                                                    commandRecap.map((data,index)=>{
                                                    const date_prelevement=new Date(data.date_prelevement);
                                                        return(
                                                            <ListboxItem 
                                                                key={index}
                                                                title={data.materiau.label}
                                                                description={
                                                                    <div className="flex flex-col">
                                                                        <p><span className="mr-1">{date_prelevement.toLocaleDateString()}</span> <span className="mr-1">{data.origine}</span><span className="mr-1">{data.situation}</span></p>
                                                                        <p className="flex">
                                                                            {
                                                                                data.essais.map((data,index)=>{

                                                                                    return(
                                                                                        <span className="ml-1">{data.abbreviation}</span>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                }
                                                                color="success"
                                                                variant="flat"
                                                                startContent={<HashtagIcon height={20} width={20}/>}
                                                                endContent={
                                                                    <div>
                                                                        <Button
                                                                            isIconOnly={true}
                                                                            color="danger"
                                                                            variant="flat"
                                                                            size="sm"
                                                                        >
                                                                            <TrashIcon height={20} width={20}/>
                                                                        </Button>
                                                                    </div>
                                                                }
                                                            >
                                                                {data.materiau.label}
                                                            </ListboxItem>
                                                        )
                                                    })
                                                }
                                            </Listbox>
                                            
                                        </div>
                                        <div>
                                            <div className="flex justify-end">
                                                <Button
                                                    size="md"
                                                    color="success"
                                                    variant="shadow"
                                                    className="m-1 text-white"
                                                    isLoading={savingCommandLoading}
                                                    isDisabled={savingSuccessful||savingError}
                                                    onClick={async ()=>{
                                                        //states changes
                                                        if(commandRecap.length!=0){
                                                            setSavingCommandLoading(true);
                                                            await savingCommands(commandRecap,"salomon")
                                                            .then((res)=>{
                                                                setSavingSuccessfull(true);
                                                                setTimeout(() => {
                                                                    setSavingSuccessfull(false);
                                                                }, 5000);
                                                            })
                                                            .finally(()=>{
                                                                setSavingCommandLoading(false);
                                                            })
                                                        }else{
                                                            setSavingError(true);
                                                            setTimeout(() => {
                                                                setSavingError(false);
                                                            }, 5000);
                                                        }
                                                        //Value validation

                                                    }}
                                                >
                                                    Soumettre
                                                </Button>
                                            {savingSuccessful&&<Alert title={Messages.fr.savingSuccessfulTitle} message={Messages.fr.savingSuccessful} type="success"/>}
                                            {savingError&&<Alert title={Messages.fr.savingErrorTitle} message={Messages.fr.savingError} type="danger"/>}
                                            </div>
                                        </div>
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
                        <Card>
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
                            <Listbox
                                className="max-h-[600px] overflow-auto"
                                variant="shadow"
                                label="Liste des commandes"
                            >
                                {commands.map((data,index)=>{
                                    return(
                                        <ListboxItem
                                            key={index}
                                            variant="faded"
                                            textValue={data.number}
                                            endContent={
                                                <div>
                                                    <Button
                                                        variant="shadow"
                                                        color="primary"
                                                        isLoading={modalLoading}
                                                        className="shadow-sm"
                                                        onClick={async()=>{
                                                            setModalLoading(true);
                                                            await loadCommandDetails("salomon",data.id)
                                                            .then((res)=>{
                                                                setCommandDetails(res);
                                                                console.log("commandes details",res);
                                                                handleOpen();
                                                            })
                                                            .finally(()=>{
                                                                setModalLoading(false);
                                                            });
                                                        }}
                                                        isIconOnly={true}
                                                    >
                                                        <SquaresPlusIcon height={20} width={20}/>
                                                    </Button>
                                                    <Modal backdrop="blur" size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
                                                        <ModalContent>
                                                            {(onClose)=>(
                                                                <>
                                                                    <ModalHeader>
                                                                        <p className="font-bold flex items-center"><SwatchIcon height={25} width={25} color="orange"/><span className="font-bold ml-2">Details de la commande {data.number}</span></p>
                                                                    </ModalHeader>
                                                                    <ModalBody>
                                                                        <Listbox
                                                                            className="max-h-[500px] overflow-auto"
                                                                            variant="shadow"
                                                                            label="Liste des informations"
                                                                        >
                                                                        {commandDetails.map((data)=>{
                                                                            return(
                                                                                <ListboxItem
                                                                                    key={`${data.materiau.label}${data.origine}${data.date_prelevement}`}
                                                                                >
                                                                                    <p>{data.materiau.label}</p>
                                                                                    <div>
                                                                                        
                                                                                    </div>
                                                                                </ListboxItem>
                                                                            )
                                                                            })}
                                                                        </Listbox>
                                                                        <div className="flex flex-col items-start justify-between">
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
                                            }
                                            className="group"
                                            title={<p className="font-bold text-md">{data.number.toUpperCase()}</p>}
                                            startContent={
                                                    <div>

                                                    </div>
                                            }
                                            description={
                                                <div className="flex flex-col items-start border-t-2 rounded-xl group-hover:rounded-sm">
                                                    <div className="flex my-1">
                                                        {data.etat>=1&&<CheckCircleIcon height={25} width={25} className="text-emerald-100"/>}
                                                        {data.etat>=2&&<CheckCircleIcon height={25} width={25} className="text-emerald-200"/>}
                                                        {data.etat>=3&&<CheckCircleIcon height={25} width={25} className="text-emerald-300"/>}
                                                        {data.etat>=4&&<CheckCircleIcon height={25} width={25} className="text-emerald-400"/>}
                                                        {data.etat>=5&&<CheckCircleIcon height={25} width={25} className="text-emerald-500"/>}
                                                    </div>
                                                </div>
                                            }
                                        />
                                        
                                    )  
                                })}

                            </Listbox>
                            </div>
                        </Card>  
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
                                                    //mail validity actions
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
                               {mailSavingAlert&&<Alert type="success" title="Status d'enregistrement" message={Messages.fr.savingMailMessage}/>}
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

