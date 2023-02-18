import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  f1: {
    flex: 1,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pre_input: {
    paddingTop: 20,
    marginHorizontal: 10,
    color: "#217093",
    fontSize: 16,
    fontFamily: "Arial",
    fontStyle: "Bold",
  },
  InputContainer: {
    marginBottom: 20,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#217093",
    borderBottomWidth: 1,
    // backgroundColor:'#f3fafd',
    // borderRadius: 20
  },
  Input: {
    flex: 1,
    color: "#353538",
    // paddingHorizontal:15,
    paddingVertical: 10,
    marginTop: 5,
    // borderLeftWidth: 1,
    // borderLeftColor:   "#217093",

    // borderColor: "#217093",
    // borderWidth:2,
    marginLeft: 10,
    height: Dimensions.get("screen").height * 0.06,
  },
  iconContainer: {
    padding: 10,
  },

  ButtonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  ButtonLogin: {
    backgroundColor: "#1b5ede",
    width: "50%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  LoginText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  RegisterText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  ButtonOutline: {
    backgroundColor: "white",
    marginTop: 10,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  ForgetPasswordContainer: {
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  ForgetPasswordText: {
    textAlign: "right",
    textDecorationLine: "underline",
    left: Dimensions.get("screen").width * 0.25,
    textAlign: "right",
    color: "#0782F9",
    fontWeight: "bold",
  },

  RegisterContainer: {
    // padding:50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dontaccText: {
    fontSize: 13,
    marginBottom: 10,
    // color: '#0782F9',
    // fontWeight: 'bold',
  },
  RegisterText: {
    fontSize: 15,
    color: "#0782F9",
    fontWeight: "bold",
  },
  //Home Style
  HomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  PickImageButton: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    marginTop: 10,
    borderRadius: 7,
    alignItems: "center",
  },
  SaveImageButton: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    marginTop: 10,
    alignItems: "center",
  },
  HomeText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  ButtonSignOut: {
    backgroundColor: "#EE4540",
    width: "100%",
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: Dimensions.get("screen").width * 0.27,
    height: Dimensions.get("screen").width * 0.27,
    marginBottom: Dimensions.get("screen").height * 0.07,
  },
});
