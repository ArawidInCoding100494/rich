

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../FireBase/FireBaseConfig";




export const UseFireStore = (collectionName) => {

    const addDocument = (data)=>{
       return  addDoc(collection(db, collectionName), data)
        // .then(()=> alert("ma'lumot qo'shildi"))
        // .catch((error)=>alert(error.message))
    }


    const deleteDocument = (id)=> {
        return deleteDoc(doc(db, collectionName, id))
        // deleteDoc(doc(db, collectionName, id))
        // .then(()=>alert("ma'lumot o'chirildi"))
        // .catch((error)=>alert(error.message))
    }


    const editDocument = async (id, newDoc, setItem) => {
        return updateDoc(doc(db, collectionName, id), newDoc)
    //     const document = doc(db, collectionName, id);
    // await updateDoc(document, newDoc)
    //   .then(() => alert("Successfully edited"),setItem(null))
    //   .catch((error) => alert(error.message));
    }

    return {addDocument, deleteDocument, editDocument}
}