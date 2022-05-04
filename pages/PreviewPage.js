import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
  export default function PreviewPage({route}) {
    console.log(route.params.websearch);
    const urlWeb = route.params.websearch.url;
    const [source, setSource] = useState({ uri: urlWeb })

    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_websearh')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        console.log(e);
      }
    }

    useEffect(() => {
      console.log("======== PreviewPage :: useEffect :: ============");
      const newSource = { uri: urlWeb };
      setSource(newSource);
    }, [urlWeb]);

    return (
        <WebView style={styles.container} source={source} />
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
  });
  