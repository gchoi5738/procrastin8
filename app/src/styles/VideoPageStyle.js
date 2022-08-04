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
        width: "870px"
    },
      procrastin8btn: {
        height:"55px"
      },

    },
    videoContainer: {

    },
    nextButton: {

    },
    mainPage: {
        flexGrow: "1",
    },
    formAndVideo:{
        border:"2px solid red",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    description:{
      paragraph:"true",
      color:"blue",
      fontSize:"1em"
    },
    boxDescription: {
      flexDirection:"row",
      width: '35%',
      height: '25vh',
      border: '2px solid red',
      backgroundColor: 'lightgray'
    },
    descriptionTimerContainer: {
      display:"flex",
      justifyContent:"space-between",
      marginTop:"2em",
      border:"2px solid red"
    }, 
    boxTimer: {
      flexDirection:"row",
      width: "500px",
      height: "135px",
      border: '2px solid red',
      backgroundColor: 'lightgray',
      padding:"10px"
    }
  });

  export default styles;