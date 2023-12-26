import React from "react";
import { MultipleSelectList} from "react-native-dropdown-select-list";
import { Roles } from "../model/roles"

type Props = {
    role: Roles,
    onPress: (role: Roles) => void
}

export default function Rolelist(){
    const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Mobiles', disabled:true  },
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]
  return(
    <MultipleSelectList 
        setSelected={(val: React.SetStateAction<string>) => setSelected(val)} 
        data={data} 
        save="value"
    />
  )
};