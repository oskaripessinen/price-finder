import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TouchableOpacity, Modal, TouchableWithoutFeedback, Animated, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './app_styles';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import { Tooltip } from 'react-native-elements';

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSquare, setShowSquare] = useState(false);
  const [squarePosition, setSquarePosition] = useState({ x: 0, y: 0 });
  const [scannedData, setScannedData] = useState(null);
  const [serverData, setServerData] = useState(null);
  const translateY = useRef(new Animated.Value(-200)).current;
  const [isBackgroundDarkened, setIsBackgroundDarkened] = useState(false);
 

  const webViewRef = useRef(null);


  const onGestureEvent = ({ nativeEvent }) => {
    let newY = nativeEvent.translationY;
    
    translateY.setValue(newY);

  };

 
  
  const barcodeSquare = () => {
    setShowSquare(!showSquare);
    
  };
  

  useEffect(() => {
    if (!isModalVisible) {
      setServerData(null);
      setScannedData(null);
      setIsBackgroundDarkened(false);
    
    }else {
      setIsBackgroundDarkened(true);
    }
  }, [isModalVisible]);
  
  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let offset = nativeEvent.translationY;
  
      if (offset >= 150) {
        setIsModalVisible(false);
      } else {
        
        Animated.spring(translateY, {
          toValue: 0,
          tension: 20,
          friction: 5,
          useNativeDriver: true,
        }).start();
      }
    }
  };
  
  useEffect(() => {
      if (serverData) {
        
        console.log('Server data received:', serverData);
  
        
      }
    }, [serverData]);
  
  
  useEffect(() => {
    if (isModalVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);
  
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
    })();
  }, []);
  
  const handleBarCodeScanned = async ({ type, data }) => {
    if(!isModalVisible && type.includes('EAN')) {
      console.log(data);
      console.log(type);
      setScannedData(data);
      setIsModalVisible(true);

      const response = await axios.post('serverIp/scannedBarcode', {
        barcodeData: data,
        barcodeType: type,
        
      });
      console.log('Server response:', response.data);
    }
  };
  
  const handleCapture = async () => {

    
    

    if (cameraRef) {
      try {
        const { uri } = await cameraRef.takePictureAsync({ mediaType: 'photo' });
        console.log('Picture taken, uri:', uri);
        setIsModalVisible(true);
        console.log("test");
        const formData = new FormData();
        formData.append('image', {
          uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
        console.log("testi");
  
        const response = await axios.post('serverIp/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("testi");
        
        console.log('Server response:', response.data);
        const serverData = response.data;

        setServerData(serverData);


      } catch (error) {
        console.error('Error taking or uploading picture:', error);
      }
    }
  };

  const webViewSource = serverData
  ? { uri: `https://hinta.fi/haku?q=${serverData}` }
  : scannedData
  ? { uri: `https://hinta.fi/haku?q=${scannedData}` }
  : null;
  
  if (!hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={() => {}} title="Grant permission" />
      </View>
    );
  }
  
  return (
    <GestureHandlerRootView style={styles.container}>      
      <Camera style={styles.camera} type={type} ref={(ref) => setCameraRef(ref)} onBarCodeScanned={handleBarCodeScanned}>

      <View style={styles.infoButton}>
        <Tooltip popover={<Text>Ota kuva tuotteesta tai skannaa sen viivakoodi.</Text>} containerStyle={{  height: 'auto', width: '85%',  }} >
            <View
              style={{
                
                marginTop: '10%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
            <View style={styles.info}>
              <FontAwesomeIcon icon={faCircleInfo} style={styles.CircleInfoIcon} size={30}/>
            </View> 
            </View>
          </Tooltip>
        </View>

        <View style={styles.buttonBar}>
          <TouchableOpacity onPress={handleCapture}>
            <View style={styles.buttonContainer}>
              <View style={styles.cameraButton}></View>
            </View>
          </TouchableOpacity>
    
          <TouchableOpacity onPress={barcodeSquare}>
            <View style={styles.barcode}>
              <FontAwesomeIcon icon={faBarcode} style={styles.barcodeIcon} size={20}/>
            </View>
          </TouchableOpacity>
        </View>

        
  
        {showSquare && (
          <View style={[styles.square, { left: squarePosition.x, top: squarePosition.y }]}>
            <View style={styles.squareTR}/>
            <View style={styles.squareTL}/>
            <View style={styles.squareBL}/>
            <View style={styles.squareBR}/>
          </View>
        )}
      </Camera>
  
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
  
        <View style={styles.centeredView}>
          <Animated.View
            style={[
              styles.modalView,
              {
                transform: [{ translateY: translateY }],
              },
            ]}
          >
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onHandlerStateChange}
            >
              <View style={styles.handle}>
                <View style={styles.handleLine}/>
              </View>
            </PanGestureHandler>
  
            {webViewSource ? (
              <WebView
                ref={webViewRef}
                source={webViewSource}
                style={styles.webview}
                javaScriptEnabled={true}
              />
            ) : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
              </View>
            )}
          </Animated.View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );

    
}