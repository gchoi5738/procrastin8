const styles = () => ({
    page: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#343a40",
        position:"absolute",
        top:"0px",
        right:"0px",    
        left:"0px"
    },
    myToolBar: {
      display: "flex",
      justifyContent:"space-between"
    },
    title: {
      color:"white",
      font:"Roboto"
    },
    helpButton: {
      color: "white",
      fontSize:"1em"

    },
    signOutButton: {
  
    },
    tagForm: {
      tags: {
        height: "50px",
        width: "870px",
        input: {color:"white"}

    },
      procrastin8btn: {
        height:"55px"
      },

    },
    videoContainer: {

    },
    nextButton: {
      marginBottom:"5em"
    },
    mainPage: {
        flexGrow: "1",
    },
    formAndVideo:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    description:{
      paragraph:"true",
      color:"purple",
      fontSize:"1em"
    },
    boxDescription: {
      flexDirection:"row",
      width: "500px",
      height: "135px",
      border: '2px solid red',
      padding:"10px",
      backgroundColor: 'lightgray'
    },
    descriptionTimerContainer: {
      display:"flex",
      justifyContent:"space-between",
      marginTop:"2em",
      marginBottom: "2em"
    }, 
    boxTimer: {
      flexDirection:"row",
      width: "500px",
      height: "135px",
      border: '2px solid red',
      backgroundColor: 'lightgray',
      padding:"10px",
      display:"flex",
      justifyContent:"space-evenly",
      alignItems: "center"
    },
    countdown:{
      flexDirection:"row"
    },
    timer : {
      fontSize:'80px'
    }
  });

  export default styles;