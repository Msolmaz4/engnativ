import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Style } from "./Style";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Store } from "./Store";
import { add } from "./Slice";

export default function App() {
  const [modal, setModal] = useState(false);

  return (
    <Provider store={Store}> 
    <View
      style={[
        Style.container,
        { backgroundColor: !modal ? "white" : "rgba(37, 37, 37, 0.4)" },
      ]}
    >
      <StatusBar style="auto" />
      <Word />
      <Create modal={{ modal, setModal }} />
    </View></Provider>
  );
}

const Word = () => {
  const [index,setIndex] = useState(0)
  const dictionary = useSelector((state)=>state.dictionary)
  useEffect(()=>{
 console.log(dictionary)
  },[])
  const move = (where) => {
    if (where === "next") {
      setIndex(prev => prev + 1)
    } else {
      setIndex(prev => prev - 1)
    }

  }
  return (
    <>
      <Text style={Style.words}>
      {index + 1} <AntDesign name="heart" size={40} color="red" />
        <Text style={Style.current}> {dictionary.length}</Text>
      </Text>

      <View style={Style.word}>
        <View style={Style.wordSegment}>
          <TouchableOpacity onPress={() => {
            if (index === 0) return
            move("previous")
          }}>
            <AntDesign name="left" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[Style.wordSegment, { flex: 3 }]}>
          <Text style={Style.en}> {dictionary[index].en} </Text>
          <Text style={Style.tr}>{dictionary[index].tr}</Text>
        </View>
        <View style={Style.wordSegment}>
          <TouchableOpacity onPress={() => {
            if(index + 1 === dictionary.length) return
            move("next")
          }}>
            <AntDesign name="right" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const Create = (props) => {
  const { setModal } = props.modal;

  return (
    <View style={Style.createButton}>
      <View style={Style.circle}>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Ionicons name="md-add" size={50} color="white" />
        </TouchableOpacity>
      </View>
      <ModalView {...props} />
    </View>
  );
};

const ModalView = (props) => {
  const { modal, setModal } = props.modal;
  const [en, setEn] = useState("")
  const [tr, setTr] = useState("")
  const dispatch  = useDispatch()
  return (
    <Modal
      transparent
      animationType="slide"
      visible={modal}
      onRequestClose={() => setModal(false)}
    >
      <View style={Style.modal}>
        <TouchableOpacity style={Style.close} onPress={() => setModal(false)}>
          <Text style={Style.cross}>x</Text>
        </TouchableOpacity>

        <TextInput value={en} onChangeText={(e)=>setEn(e)} placeholder="English" style={Style.textBox} />
        <TextInput value={tr} onChangeText={(e)=>setTr(e)} placeholder="Turkish" style={Style.textBox} />

        <TouchableOpacity onPress={() => {
         dispatch(add({en,tr}))
         setEn("")
         setTr("")
        }}>
          <View style={Style.button}>
            <AntDesign name="heart" size={20} color="red" />
            <Text style={Style.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};