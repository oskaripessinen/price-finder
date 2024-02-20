import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    
  },



  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    
    
  },


  buttonContainer: {
    backgroundColor: 'transparent',
    marginLeft: '50%',
    
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white', 
    padding: 2, 
    alignSelf: 'center',
    
    
    
    

  },
  button: {
    alignSelf: 'center',
    
  },
  
  cameraButton: {
    backgroundColor: '#e5e5e5',
    width: 60,
    height: 60,
    borderRadius: 50,
    padding: 1, 
    alignSelf: 'center',
  },

  barcode: {
    
    color: 'white',
    right: 30,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'white',
    padding: 7,
    borderRadius: 100,
    },

  barcodeIcon: {
    
    color: 'white',
  },
  
  
  barcodeScanner: {
    ...StyleSheet.absoluteFillObject,
  },
  
 

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },


  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: 'white',
    top: 40,
    textAlign: 'center',
  },

  modalView: {
    marginTop: 300,
    margin: 0,
    padding: 20,
    backgroundColor: '#161616',
    borderRadius: 5,
    paddingHorizontal: 100,
    height: 1000,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  


  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)', 
  },



  handle: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    borderRadius: 15,
    alignItems: 'center',
  },
  handleLine: {
    width: 80,
    height: 4,
    borderRadius: 10,
    top: 25,
    backgroundColor: 'white',
    
  },


  square: {
    position: 'absolute',
    marginTop: '50%',
    marginLeft: '15%',
    
    width: '70%',
    height: '25%',
    borderWidth: 0,
    borderColor: 'white',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderRadius: 25,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },

  squareTR: {
    position: 'absolute',
    width: 50,
    top: 0,
    right: 0,
    height: 50,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 2,
    borderTopRightRadius: 10,
    borderColor: 'white',
    
    backgroundColor: 'transparent',
    
  },
  squareTL: {
    position: 'absolute',
    width: 50,
    top: 0,
    left: 0,
    height: 50,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },

  squareBL: {
    position: 'absolute',
    width: 50,
    bottom: 0,
    left: 0,
    height: 50,
    borderWidth: 2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 10,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },

  squareBR: {
    position: 'absolute',
    width: 50,
    bottom: 0,
    right: 0,
    height: 50,
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 10,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },

  webview: {
    top: 40,
    flex: 0,
    width:  375,
    height: 500,
    zIndex: 1,

  },

  infoButton: {
    position: 'absolute',
    top: 10,
    left: 0,
    margin: 25,
    
   
    
  },

  info: {
    marginBottom: 5,
    padding: 0,

  },
  CircleInfoIcon: {

    color: 'white',
  },

  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0, 
    paddingVertical: 10, 
    backgroundColor: 'rgba(22, 22, 22, 0.96)',
    width: '100%',
    alignItems: 'center',
  },

});

export default styles;
