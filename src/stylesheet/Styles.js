import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "red",
    flex: 1 / 2,
    height: 200,
    marginTop: 0,
  },
  //login style
  Login: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  InputContainer:{
    width:'80%'
  },
  Input:{
    backgroundColor:'white',
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:15,
    marginTop:5,

  },
  ButtonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,
  },
  ButtonLogin:{
    backgroundColor:'#0782F9',
    width:'100%',
    padding:15,
    borderRadius:10,
    alignItems:'center'

  },
  LoginText:{
    color:'white',
    fontWeight:'700',
    fontSize:16,
  },
  RegisterText:{
    color:'#0782F9',
    fontWeight:'700',
    fontSize:16,
  },
  ButtonOutline:{
    backgroundColor:'white',
    marginTop:10,
    borderColor:'#0782F9',
    borderWidth:2
  },
  ForgetPasswordContainer:{
    padding:10,
    justifyContent:'center',
    alignItems:'center',
  },
  ForgetPasswordText:{
    textDecorationLine:"underline",
  },
  //Home Style
  HomeContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   
  },
  PickImageButton:{
    backgroundColor:'#0782F9',
    width:'100%',
    padding:15,
    margin:5,
    borderRadius:20,
    alignItems:'center'
  },
  HomeText:{
    color:'white',
    fontWeight:'700',
    fontSize:16,
  },
  ButtonSignOut:{
    backgroundColor:'#EE4540',
    width:'100%',
    padding:15,
    borderRadius:10,
    alignItems:'center',
    marginTop:40,
  }
  
});
