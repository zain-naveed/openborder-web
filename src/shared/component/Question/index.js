import React, { useState, useEffect } from "react";
import initialElements from "../../initialElements.json/initialElements";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles from "./question.module.scss";
import { SaveIco } from "../../../assets";
import ViewSummary from "./viewSummary";
import { getQuestionService,getQuestionStateService } from "../../index";
import Loader from "../../loader/loader";
import Footer from "../footers";
import Navigation from "../../../pages/navigation";
import ModalRestart from "../../component/Modals/ModalRestart";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { language } from "../../util/constant";
import { addOrUpdateQuestionService, deleteStateService } from "../../services";
import { toastMessage } from "..";
const Question = () => {
  const [firstElement, setFirstElement] = useState(null);
  const [allQuestion, setAllQuestion] = useState([]);
  const [tempQuestion,setTempQuestion] = useState([])
  const [child, setChild] = useState([]);
  const [path, setPath] = useState([]);
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState([]);
  const [immigrationHistory, setImmigrationHistory] = useState([]);
  const [factorsOptions, setFactorsOptions] = useState([]);
  const [inadmissibilty, setInadmissibilty] = useState([]);
  const [loader, setLoader] = useState(false);
  const [multiLinkArr, setMultiLinkArr] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [des, setdes] = useState([]);
  const { t, i18n } = useTranslation();
  let enumObj ={
    link:"link",
    multilink:'multilink'
  }
  const {
    lang: { lang },
    user:{user}
  } = useSelector((state) => state.root);
  const history = useHistory();
  const evaluateAnd = (newItem) => {
    let tempAND = newItem.split("&&");
    for (const item of path) {
      if (item.nodeId === tempAND[0] && item.optionId === tempAND[1]) {
        return true;
      }
    }
    return false;
  };

  const evaluateWithoutAnd = (newItem) => {
    for (const item of path) {
      
      if (item.nodeId === newItem) {
        return true;
      }
    }
    return false;
  };

  const solveFinalCondition = (result) => {
    let firstCondition = result[0];
    let operation = result[1];
    let thirdCondition = result[2];
    return evaluateCondition(firstCondition, operation, thirdCondition);
  };

  const findNodeInPath = (newItem) => {
    if (newItem.includes("||")) {
      let tempOR = newItem.split("||");
      let check = false;
      tempOR.forEach((newItem) => {
        if (newItem.includes("&&")) {
          check = check || evaluateAnd(newItem);
        } else {
          check = check || evaluateWithoutAnd(newItem);
        }
      });
      return check;
    } else if (newItem.includes("&&")) {
      return evaluateAnd(newItem);
    } else {
      return evaluateWithoutAnd(newItem);
    }
  };

  const evaluateCondition = (firstCondition, operation, thirdCondition) => {
    if (operation === "AND") {
      if (firstCondition && thirdCondition) {
        return true;
      } else {
        return false;
      }
    } else if (operation === "OR") {
      if (firstCondition || thirdCondition) {
        return true;
      } else {
        return false;
      }
    } else if (operation === "AND NOT") {
      if (firstCondition && !thirdCondition) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    
    let tempImmigration = [];
    let tempFactors = [];
    let tempInadmissibilty = [];
    summary.forEach((item, index) => {
      console.log('sumary mutate',);
      if (item.category === "immigrationHistory") {
        tempImmigration.push({
          id: item.id,
          category: "YOUR IMMIGRATION HISTORY",
          description:  item?.description?.includes('&lt;') ? item?.description?.replace(/&lt;/ig,"<"):item?.description,
        });
      } else if (item.category === "factorsOptions") {
        tempFactors.push({
          id: item.id,
          category: "FACTORS RELATING TO YOUR OPTIONS",
          description: item?.description?.includes('&lt;') ? item?.description?.replace(/&lt;/ig,"<"):item?.description,
        });
      } else if (item.category === "inadmissibility") {
        tempInadmissibilty.push({
          id: item.id,
          category: "GROUNDS OF INADMISSIBILITY",
          description: item?.description?.includes('&lt;') ? item?.description?.replace(/&lt;/ig,"<"):item?.description,
        });
      } else {
      }
    });
    setImmigrationHistory(tempImmigration);
    setFactorsOptions(tempFactors);
    setInadmissibilty(tempInadmissibilty);
  }, [summary]);
const resetMutate = (val,type)=>{
  let resetEnum = {
    Marriedlabel:"Are you married?",
    AgeLabel:"How old are you?"
  }
 let Maryelem = firstElement?.data?.label == resetEnum.Marriedlabel
 let Agelem = firstElement?.data?.label == resetEnum.AgeLabel
 if(Maryelem){
   if(!val && type === "unmarry" ){
   let temp=  tempQuestion.filter(ii=>ii.id === firstElement.id);
   let valINd =  temp[0]?.data?.child.findIndex(ii=>ii.text === hardtext.click);
   if(valINd > -1){
     let Childes = temp[0]?.data?.child
     Childes[valINd].text = hardtext.notMarried
     temp[0].data.child = Childes
   }
   setFirstElement(temp[0])
 
   }else if(!val && type === "marry"){
    let temp=  tempQuestion.filter(ii=>ii.id === firstElement.id);
    let valINd =  temp[0]?.data?.child.findIndex(ii=>ii.text === hardtext.click);
    if(valINd > -1){
      let Childes = temp[0]?.data?.child
      Childes[valINd].text = hardtext.Married
      temp[0].data.child = Childes
    }
    setFirstElement(temp[0])
   }
 }
 if(Agelem){
  if(!val && type === "underAge" ){
    let temp=  tempQuestion.filter(ii=>ii.id === firstElement.id);
   let valINd =  temp[0]?.data?.child.findIndex(ii=>ii.text === hardtext.click);
   if(valINd > -1){
     let Childes = temp[0]?.data?.child
     Childes[valINd].text = hardtext.ageUnder21
     temp[0].data.child = Childes
   }
   setFirstElement(temp[0])
    }else 
   if(!val && type === "overAge" ) {
    let temp=  tempQuestion.filter(ii=>ii.id === firstElement.id);
    let valINd =  temp[0]?.data?.child.findIndex(ii=>ii.text === hardtext.click);
    if(valINd > -1){
      let Childes = temp[0]?.data?.child
      Childes[valINd].text = hardtext.ageOver21
      temp[0].data.child = Childes
    }
    setFirstElement(temp[0])
    }
 }
 
}











  useEffect(() => {
    let conditions = firstElement?.data?.conditions;
    // console.log('firstElement',firstElement);
    if (!conditions?.length > 0) {
     let getUnderage = path.find(ii=>ii?.text == hardtext?.ageUnder21)
     resetMutate(getUnderage,'underAge');
     console.log('getUnderage',getUnderage);
      if(getUnderage){
        let cloneMultiLinkArr = [...multiLinkArr];
   
        let findArrInx = cloneMultiLinkArr.findIndex(ii=> ii?.id == getUnderage.optionId); 
        if(findArrInx > -1){
          let obj = {
            ...getUnderage,
            id:getUnderage.optionId
          }
          cloneMultiLinkArr[findArrInx] =  obj
        }else{
          let obj = {
            ...getUnderage,
            id:getUnderage.optionId
          }
          cloneMultiLinkArr.push(obj)
        }
        
        setMultiLinkArr(cloneMultiLinkArr)
      }
     let getOverage = path.find(ii=>ii.text == hardtext.ageOver21)
     resetMutate(getOverage,'overAge');
     if(getOverage){
        let cloneMultiLinkArr = [...multiLinkArr];
        let findArrInx = cloneMultiLinkArr.findIndex(ii=> ii?.id == getOverage.optionId); 
        if(getOverage > -1){
          let obj = {
            ...getOverage,
            id:getOverage.optionId
          }
          cloneMultiLinkArr[findArrInx] = obj
        }else{
          let obj = {
            ...getOverage,
            id:getOverage.optionId
          }
          cloneMultiLinkArr.push(obj)
        }
        
        setMultiLinkArr(cloneMultiLinkArr)
      }
      console.log('getUnderage',getOverage);
     let getunMarried = path.find(ii=>ii.text == hardtext.notMarried)
     resetMutate(getunMarried,'unmarry');
      if(getunMarried){
        let cloneMultiLinkArr = [...multiLinkArr];
        let findArrInx = cloneMultiLinkArr.findIndex(ii=> ii?.id == getunMarried.optionId); 
        if(findArrInx > -1){
          let obj = {
            ...getunMarried,
            id:getunMarried.optionId
          }
          cloneMultiLinkArr[findArrInx] = obj
        }else{
          let obj = {
            ...getunMarried,
            id:getunMarried.optionId
          }
          cloneMultiLinkArr.push(obj)
        }
       
        setMultiLinkArr(cloneMultiLinkArr)
      }
     let getMarried = path.find(ii=>ii.text == hardtext.Married)
     resetMutate(getMarried,'marry');
      if(getMarried){
        let cloneMultiLinkArr = [...multiLinkArr];
        let findArrInx = cloneMultiLinkArr.findIndex(ii=> ii?.id == getMarried.optionId);
        if(findArrInx > -1){
          let obj = {
            ...getMarried,
            id:getMarried.optionId
          }
          cloneMultiLinkArr[findArrInx] = obj
        }else{
          let obj = {
            ...getMarried,
            id:getMarried.optionId
          }
          cloneMultiLinkArr.push(obj)
        }
        
        setMultiLinkArr(cloneMultiLinkArr)
      }
      
      if(getUnderage && Object.keys(getUnderage).length){
      
        let under = firstElement?.data?.child.find(ii=>ii.id == getUnderage?.optionId)
        
        if(under){
          setLabel(firstElement?.data?.label);
          setDescription({
            eng: firstElement?.data?.description?.replace(/&lt;/gi, "<"),
    
            span: firstElement?.data?.description_ES?.replace(/&lt;/gi, "<"),
          });
          under.text = hardtext.click
        return  setChild([under]);  
        }else{

          setChild(firstElement?.data?.child);  
        }
        
      }else if(getOverage && Object.keys(getOverage).length){
        let over = firstElement?.data?.child.find(ii=>ii.id == getOverage?.optionId)
        
        if(over){
          setLabel(firstElement?.data?.label);
          setDescription({
            eng: firstElement?.data?.description?.replace(/&lt;/gi, "<"),
    
            span: firstElement?.data?.description_ES?.replace(/&lt;/gi, "<"),
          });
          over.text = hardtext.click
        return   setChild([over]);  
        }else{
          setChild(firstElement?.data?.child);  
        }  
      }

      if(getunMarried && Object.keys(getunMarried).length){
        
        let unMarried = firstElement?.data?.child.find(ii=>ii.id == getunMarried.optionId)
        
        if(unMarried){
          setLabel(firstElement?.data?.label);
          setDescription({
            eng: firstElement?.data?.description?.replace(/&lt;/gi, "<"),
    
            span: firstElement?.data?.description_ES?.replace(/&lt;/gi, "<"),
          });
          unMarried.text = hardtext.click
       return   setChild([unMarried]);  
        }else{
          setChild(firstElement?.data?.child);  
        }
        
      }else if(getMarried && Object.keys(getMarried).length){
        let Married = firstElement?.data?.child.find(ii=>ii.id == getMarried.optionId)
        
        if(Married){
          setLabel(firstElement?.data?.label);
          setDescription({
            eng: firstElement?.data?.description?.replace(/&lt;/gi, "<"),
    
            span: firstElement?.data?.description_ES?.replace(/&lt;/gi, "<"),
          });
          Married.text = hardtext.click
       return   setChild([Married]);  
        }else{
          setChild(firstElement?.data?.child);  
        }
      }else{
        setChild(firstElement?.data?.child);  
      }
      
      // setChild(firstElement?.data?.child);
      setLabel(firstElement?.data?.label);
      setDescription({
        eng: firstElement?.data?.description?.replace(/&lt;/gi, "<"),

        span: firstElement?.data?.description_ES?.replace(/&lt;/gi, "<"),
      });
    } else {

      let cloneDescription = [...des];
      for (const conditionItem of conditions) {
        let condition = conditionItem.condition.split(">");
        var result = [];

        var flag = false;
        condition.forEach((newItem, newIndex) => {
          if (newItem === "AND" || newItem === "OR" || newItem === "AND NOT") {
            result.push(newItem);
          } else {
            result.push(findNodeInPath(newItem));
          }
        });

        
        if (result.length === 3) {
          flag = solveFinalCondition(result);
        } else if (result.length > 3) {
          let temp = [];
          result.forEach((item, index) => {
            if (temp.length === 3) {
              temp = [solveFinalCondition(temp)];
              temp.push(item);
            } else {
              temp.push(item);
            }
          });
          flag = solveFinalCondition(temp);
        } else {
          flag = result[0];
        }

        if (flag) {
          let arr = [];
          let obj = {
            eng: conditionItem.conditionDescription?.replace(
              /&lt;/gi,
              "<"
            ),
            span :conditionItem?.conditionDescription_ES?.replace(
              /&lt;/gi,
              "<"
            ),
            child: conditionItem.conditionOptions,
            label: {
              eng: conditionItem.conditionLabel,
              span:conditionItem?.conditionLabel_ES
            },
          };
          // arr.push(obj)
          // console.log('arr',arr);
          cloneDescription = [...cloneDescription, obj];
          // cloneDescription.push(obj);
          // break;
          // setChild([])
          // setLabel("");
          // setDescription("")
          setdes(cloneDescription);
        } else {
          

          setChild(firstElement.data.child);
          setLabel(firstElement.data.label);

          setDescription({
            eng: firstElement?.data?.description?.replace(/&lt;/gi, "<"),

            span: firstElement?.data?.description_ES?.replace(/&lt;/gi, "<"),
          });
        }
      }
    }
  }, [firstElement]);
  const getPathMultLinkNodefromOption = (item) => {
    for (const node of allQuestion) {
      let findNodeId = node.data?.child.filter((ii) => ii.id === item.id);
      if (!findNodeId?.length) {
        getNodeidFromConditionOptions(node, item, (resp) => {
          console.log("conditions", resp);
          if(resp){
            findNodeId = resp;
          }
          
        });

        if (findNodeId?.length > 0) {
          return findNodeId;
        }
      }else
      if(findNodeId?.length){
        console.log(node);
        
        return [node];
      }
    }
  };
  const getNodeidFromConditionOptions = (node, item, callback) => {
    let exceptions = {};
    try {
      node?.data?.conditions?.forEach((element) => {
        let val = element?.conditionOptions.filter(
          (cond) => cond.id === item.id
        );

        if (val.length) {
          callback([node]);

          throw exceptions;
        }
      });
    } catch (error) {
      if (error !== exceptions) throw error;
    }
  };
  let hardtext = {
    ageUnder21:"I am under 21 years old.",
    ageOver21:"I am 21 years old, or older.",
    notMarried:"I am not married.",
    Married:"I am legally married.",
    click:"Please Click to Proceed"
  }
  const findNext = (item) => {
    if (item.targetNode === null) {
      let getNodeId = getPathMultLinkNodefromOption(item);
    console.log({
      nodeId: getNodeId[0].id,
      optionId: item.id,
    })
      let cloneMultiLinkArr = [...multiLinkArr];
      let newTemp = [...path];
      item["nodeId"] = getNodeId[0].id
     
      let addNewOptionIndx = newTemp.findIndex(ii=>ii?.nodeId == firstElement.id && ii?.optionId == item.id);
      if(addNewOptionIndx < 0){
        cloneMultiLinkArr.push(item);
        newTemp.push({
          nodeId: getNodeId[0].id,
          optionId: item.id,
          text: item.text,
          type:enumObj.multilink
        });
        setPath(newTemp);
        setMultiLinkArr(cloneMultiLinkArr);
      }
      
 
      // setFirstElement(null);
      
    } else {
      //---------- set Next Node start ---------
      let newTemp = [...path];
      // let addNewOptionIndx = newTemp.findIndex(ii=>ii?.nodeId == firstElement.id && ii?.optionId == item.id);
      // if(addNewOptionIndx < 0){
       
      // }
      newTemp.push({
        nodeId: firstElement.id,
        optionId: item.id,
        text: item.text,
        type:enumObj.link
      });
      setPath(newTemp);
    
      let temp = allQuestion.filter(
        (newItem, index) => newItem.id === item.targetNode
      );
      setdes([]);
      setChild([]);
      setFirstElement(temp[0]);

      // ----------- set Next Node End ----------------
      //------------ set Summary Start ----------------
      if (item.summaryCatagory) {
        let temp = [...summary];
        temp.push({
          id: firstElement.id,
          category: item.summaryCatagory,
          description: item.summaryDescription,
        });
        setSummary(temp);
      }
      //------------ set Summary Delete ----------------
    }
  };

  // Method for Showing Errors
  const setToastify = () => {
    toast.error("Refresh");
  };

  const setToastifySaved = () => {
    toast.success("Saved");
  };

  // Method for Previous Page
  const goBack = () => {
    // console.log('zain');
  let clonePath =[...path]

    let pathEndNode = clonePath[clonePath.length -1];
  
    
    //----- find summary and delete
    let temp = [...summary];
    
    let pathLength = path.length;
    temp = summary.filter(
      (item, index) => item.id !== path[pathLength - 1].nodeId
    );
    setSummary(temp);
    //------ end find summary and delete
  clonePath = clonePath.slice(0,(clonePath.length-1))
    if(pathEndNode.type == enumObj.multilink){
      let ind = (clonePath.length - 1)
      while (ind) {
        if(clonePath[ind]?.type != enumObj.link){
          clonePath = clonePath.slice(0,(clonePath.length-1))
        }else{
          pathEndNode = clonePath[clonePath.length -1]
          clonePath = clonePath.slice(0,(clonePath.length-1))
          break
        }
        ind--
      }
    }
    temp = allQuestion.filter((item, index) => item.id === pathEndNode.nodeId);
  setPath(clonePath)
  let dumArr = []
  clonePath.filter(ii=>  ii.type === enumObj.multilink || ii?.text === hardtext.Married || ii?.text === hardtext.notMarried || ii?.text === hardtext.ageOver21 || ii?.text === hardtext.ageUnder21)
  .forEach((resp)=>{
    let findElement = multiLinkArr.find(ii=> ii?.nodeId === resp?.nodeId && ii?.id === resp?.optionId);
    dumArr.push(findElement)
  })
    
// console.log('back elements',temp);

// console.log('traverse elements',path);
    setFirstElement(temp[0]);
    setMultiLinkArr(dumArr);
    setdes([]);
  };
  const handleRestart = () => {
    sessionStorage.removeItem("OPTIONS");
    sessionStorage.removeItem("SUMMARY");
    let temp = allQuestion[0];
    console.log(temp);
    setChild(temp.data.child);
    setLabel(temp.data.label);
    setDescription({
      eng: temp.data.description,
      span: temp.data.description_ES,
    });
    setSummary([]);
    setdes([]);
    setPath([]);
    setMultiLinkArr([])
    setImmigrationHistory([]);
    setFactorsOptions([]);
    setInadmissibilty([]);
    setFirstElement(temp);
    setLoader(false)
    let obj ={
      user_id:user.id,
    }
    deleteStateService(obj).then(({data})=>{
      console.log('data',data);
      setLoader(true)
    }).catch(err=>{
      setLoader(true)
      console.log('err',err);
    })
  };


  const saveAndContinueLater = () => {
    console.log(path,firstElement);
    let arr = path.map(ii=>ii.nodeId)
    console.log('zain',arr);
  //   let hav = []
  //   let obj = {}
  //  const newobj = path.map((item,ind)=>{
  //   return{
  //     [item.nodeId]:item?.optionId,
  //     type:item.type,
  //     id:ind+1
  //   }
  //   })
    // let resp = {}
    // for (let index = 0; index < newobj.length; index++) {
    //   console.log('index',newobj[index],'response',newobj[index]);
    //   obj[Object.keys(newobj[index])[0]] = newobj[index][Object.keys(newobj[index])[0]]
    //   obj['index'] = index
    // }
    // newobj.map((item,inx)=>{
      // debugger
      // console.log("kjfhbjksdfxbf",newobj[inx]);

      // obj[Object.keys(item)[0]] = item[Object.keys(item)[0]];
     
    // })
    let obj = {};
    // console.log('zianadsfa',sortObject(obj));
    // console.log("dfbv,dfxbxfdgb",newobj);
   path.forEach((resp,inx)=>{
    if(resp.type === enumObj.multilink){
        if(obj[resp.nodeId]){
          obj[resp.nodeId] += `~${resp.optionId}`
        }else{

          obj[resp.nodeId] = resp.optionId
        }

      }else{
      
        if(obj[resp.nodeId]?.includes('~')){
          obj[resp.nodeId] += `~${resp.optionId}`
        }else{
          obj =  {
            ...obj,
             [resp.nodeId]:resp.optionId
           }
          
        }
         
      }
      
      
    })
    console.log('resp',obj);
    let ServerResp = {
      user_id:user.id,
      last_question:firstElement.id,
      prev_selections:JSON.stringify(obj),
      questions_order:JSON.stringify(arr),
      current_summary:JSON.stringify(summary)
    }
    console.log('userasfd',ServerResp);
    setLoader(false)
    addOrUpdateQuestionService(ServerResp).then(({data})=>{
        console.log("dafa",data);
        toastMessage("Question State Successfully Save!!","success")
        setLoader(true)
    }).catch(err=>{
      setLoader(true)
      console.log('err',err);
    })
    // sessionStorage.setItem("OPTIONS", JSON.stringify(path));
    // sessionStorage.setItem("SUMMARY", JSON.stringify(summary));
    // setToastifySaved();
  };

  const loadPreviousQuestion = (questions) => {
    let convertedOptions = JSON.parse(sessionStorage.getItem("OPTIONS"));
    if (convertedOptions) {
      setPath(convertedOptions);
      let lastSelectedOption = convertedOptions[convertedOptions.length - 1];
      let lastQuestion = questions?.filter(
        (newItem, index) => newItem.id === lastSelectedOption.nodeId
      );
      let selectedChildOption = lastQuestion[0].data.child.filter(
        (newItem, index) => newItem.id === lastSelectedOption.optionId
      );
      var BreakException = {};

      if (!selectedChildOption.length) {
        lastQuestion[0].data.conditions?.forEach((conditionitem) => {
          try {
            let getVal = conditionitem?.conditionOptions?.filter(
              (ii) => ii.id === lastSelectedOption.optionId
            );
            if (getVal.length > 0) {
              selectedChildOption = getVal;
              throw BreakException;
            }
          } catch (error) {
            if (error !== BreakException) throw error;
          }
        });
      }
      
      let nextQuestion = questions?.filter(
        (newItem, index) => newItem.id === selectedChildOption[0]?.targetNode
      );
      setFirstElement(nextQuestion[0]);
      setSummary(JSON.parse(sessionStorage.getItem("SUMMARY")));
    }

    //MOVE TO HOME SCREEN
  };
const getQuesetionState = (allQustn)=>{
  let obj ={
    user_id: user.id
  }
  setSummary([]);

  getQuestionStateService(obj).then(({data:{data}})=>{
    console.log("data",data);
    let parseSumary = JSON.parse(data.current_summary);
    let lastQuestionId = data.last_question;
    let parsePrevSelect =  JSON.parse(data.prev_selections);
    let allQuestionsIds = JSON.parse(data.questions_order);
    console.log(parsePrevSelect,allQuestionsIds,path,path.length);
    if(parsePrevSelect){
      let arr = [];
      console.log('allQustn',allQustn);
      
      let clonePath = [...path]
      let childArr = []
      let cloneMultiLinkArr = [...multiLinkArr]
      allQuestionsIds.forEach((ndId)=>{
        
        if(parsePrevSelect[ndId].includes('~')){
          let findArr = arr.filter(ii=>ii.nodeId === ndId)
          // debugger
          // if(findArr.length === (parsePrevSelect[ndId].split("~").length - 1)){
            let getQuestion =  allQustn.find(ii=>ii.id == ndId);
           let matchVal = null
         getQuestion.data.conditions.filter(echCondtn=>{
           let val =  echCondtn.conditionOptions.find(iii=> iii.id === parsePrevSelect[ndId].split("~")[findArr.length]);
            if(val){
              matchVal = val
            }
           })
           if(matchVal && matchVal.targetNode){
            arr.push({
              type:enumObj.link,
              nodeId:ndId,
              optionId:parsePrevSelect[ndId].split("~")[findArr.length]
            })
           }
          else{
            
            arr.push({
              type:enumObj.multilink,
              nodeId:ndId,
              optionId:parsePrevSelect[ndId].split("~")[findArr.length]
              
            })
            cloneMultiLinkArr.push({
              type:enumObj.multilink,
              id:parsePrevSelect[ndId].split("~")[findArr.length],
              nodeId:ndId,
              optionId:parsePrevSelect[ndId].split("~")[findArr.length]
              
            })
          }
        }else{
          if(parsePrevSelect[ndId]){
            let selectedNode = allQustn?.find((ii)=> ii.id === ndId);
        let selectOption = selectedNode.data.child.find(findEl=>findEl.text === hardtext.Married || findEl.text === hardtext.notMarried || findEl.text === hardtext.ageUnder21 || findEl.text === hardtext.ageOver21 )
        console.log('selectedNode',);
       if(selectOption){
        cloneMultiLinkArr.push({
          type:enumObj.link,
          id:selectOption.id,
          nodeId:selectedNode.id,
          optionId:selectOption.id,
          text:selectOption.text
          
        })
        arr.push({
          type:enumObj.link,
          nodeId:ndId,
          optionId:parsePrevSelect[ndId],
          text:selectOption.text
        })
       }else{
        arr.push({
          type:enumObj.link,
          nodeId:ndId,
          optionId:parsePrevSelect[ndId],
    
        })
       }
           
          }else{
            // clonePath.push({
            //   type:enumObj.link,
            //   nodeId:ndId,
            //   optionId:parsePrevSelect[ndId]
            // })
          }
         
         
        }
      })
      console.log('clonePath',clonePath,arr);
      setPath(arr)
      setMultiLinkArr(cloneMultiLinkArr)
      // console.log(arr);
    }
    if(lastQuestionId){
      let findQuestion =  allQustn.filter((item, index) => item.id === lastQuestionId)
      setFirstElement(findQuestion[0])
    }
    
   
    if(parseSumary && parseSumary.length > 0 ){
      setSummary(parseSumary)
    }

  }).catch((err)=>{
    console.log("erro state",err);
  })
  
}
  const getAllQuestion = () => {
    setLoader(false);
    getQuestionService()
      .then(({ data: { data } }) => {
        setLoader(true);
        setPath([]);
        setAllQuestion(data.questions);
        setTempQuestion(data.questions)
        // sessionStorage.removeItem("OPTIONS");
        if (sessionStorage.getItem("OPTIONS") != null) {
          loadPreviousQuestion(data.questions);
        } else {
          setFirstElement(data.questions[0]);
        }
        getQuesetionState(data.questions)
      })
      .catch((err) => {
        setLoader(true);
        console.log("err", err);
      });
  };
  useEffect(() => {
    setLoader(true);
    // loadPreviousQuestion(initialElements)
    getAllQuestion();
  }, []);
  console.log('multilink arr',firstElement);
  return <>
      <div className="main">
        {path?.length ? (
          <Navigation label={t("explore")} onPress={() => goBack()} />
        ) : (
          <Navigation label={t("explore")} onPress={() => history.goBack()} />
        )}
        <div>
          <ToastContainer />
          <ViewSummary
            immigrationHistory={immigrationHistory}
            factorsOptions={factorsOptions}
            inadmissibility={inadmissibilty}
          />
          <br />
          <div className="opt">
            {des?.length > 0 ? (
              des?.map((desitem, sinx) => {
                return (
                  <div
                    style={{
                      borderBottom: `${
                        des?.length > 1 ? "1px solid black" : ""
                      }`,
                    }}
                  >
                    <div
                      key={sinx}
                      style={{ marginLeft: "5%" }}
                      dangerouslySetInnerHTML={{ __html: lang == language.spanish ? desitem.span : desitem.eng }}
                    ></div>
                    {desitem?.child?.map((sitem, index) => {
                      return multiLinkArr.find((ii) => ii?.id === sitem?.id)
                        ?.id == sitem.id ? (
                        <div key={index} className="opt-s">
                          <button
                            className="btn btn-active"
                            onClick={() => findNext(sitem)}
                          >
                            {lang == language.spanish ? sitem.text_ES:  sitem.text}
                          </button>
                        </div>
                      ) : (
                        <div key={index} className="opt-s">
                          <button
                            className="btn btn-ques"
                            onClick={() => findNext(sitem)}
                          >
                            {lang == language.spanish ? sitem.text_ES:  sitem.text}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
                //   return multiLinkArr.find(ii=>ii.id === item.id)?.id == item.id? (
                //     <div key={index} className="opt-s">
                //      <button
                //         className="btn btn-active"
                //         onClick={() => findNext(item)}
                //       >
                //        {item.text}
                //       </button>
                //     </div>
                //   ):<div key={index} className="opt-s">
                //  <button
                //     className="btn btn-ques"
                //     onClick={() => findNext(item)}
                //   >
                //     {item.text}
                //   </button>

                // </div>
              })
            ) : (
              <>
                <div
                  className="ques"
                  dangerouslySetInnerHTML={{
                    __html: lang == "sp" ? description.span : description.eng,
                  }}
                ></div>
                {child?.map((item, index) => {
                  return multiLinkArr.find((ii) => ii?.id === item?.id)?.id ==
                    item.id ? (
                    <div key={index} className="opt-s">
                      <button
                        className="btn btn-active"
                        onClick={() => findNext(item)}
                      >
                        {item.text}
                      </button>
                    </div>
                  ) : (
                    <div key={index} className="opt-s">
                      {lang == language.spanish && item?.text_es ? (
                        <button
                          className="btn btn-ques"
                          onClick={() => findNext(item)}
                        >
                          {item.text_es}
                        </button>
                      ) : lang == language.eng && item?.text ? (
                          
                        <button
                          className="btn btn-ques"
                          onClick={() => findNext(item)}
                        >
                          {item.text}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className="foot">
          {path.length > 0 ? (
            <>
              <div className="foots">
                <Footer
                  label={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                  }
                  onPress={()=>goBack()}
                />
                <Footer
                  label={t("save")}
                  onPress={saveAndContinueLater}
                  img={SaveIco}
                />

                {/* <Footer label="Restart" onPress={handleRestart} /> */}

                <ModalRestart onPress={handleRestart} />
              </div>

              <div className="footer container">
                <button type="submit" className="btn btn-main">
                  {t("consultant")}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
      
      {
       !loader &&  <Loader />
      }
      
    </>
  
};

export default Question;
