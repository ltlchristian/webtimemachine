import { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as WebBrowser from 'expo-web-browser';
import { Foundation } from '@expo/vector-icons';
import { NavigationContext } from '@react-navigation/native';
import dayjs from 'dayjs';
import services from '../services';

export default function Archive() {

  const [url, setUrl] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [archive, setArchive] = useState({}); 
  const [hasResponse, sethasResponse] = useState(false);
  const [hasWebLink, sethasWebLink] = useState(false);

  // We can access navigation object via context
  const navigation = useContext(NavigationContext);

  // DateTimePicker
  const onChangeDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(currentDate);
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // Search with Wayback Machine API
  const search = (url, timestamp) => {
    sethasResponse(false);
    services
    .searchByUrlAndTime(url, timestamp)
    .then((response) => {
      console.log(response);
      setArchive(response);
      storeData(JSON.stringify(response));
      sethasResponse(true);
      if(response.archived_snapshots.closest) {
        sethasWebLink(true);
      } else {
        sethasWebLink(false);
      }
    })
    .catch(console.log);
  }

  const handlePressButtonSearch = () => {
    const timestamp = dayjs(date).format('YYYYMMDDhhmmss');
    console.log("handlePressButtonSearch", url, timestamp);
    search(url, timestamp);
  }

  // WebBrowser
  const handlePressButtonWebBrowser = async (url) => {
    const result = await WebBrowser.openBrowserAsync(url);
    console.log(result);
  };

  // WebView
  const handlePressButtonPreview = async (url) => {
    navigation.navigate('Preview', {
      websearch: archive,
    });
  };

  // Async-storage
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_websearh', value)
    } catch (e) {
      console.log(e);
    }
  };

  // Initialise with google.fr as Exemple
  useEffect(() => {
    const timestamp = dayjs(date).format('YYYYMMDDhhmmss');
    search("google.fr", timestamp);
  }, []);


  return (
      <View style={styles.container}>

        <View style={styles.search}>
          <SafeAreaView>
            <TextInput
            style={styles.input}
            onChangeText={setUrl}
            placeholder="www.google.fr"
            value={url}
            />

            <View style={styles.date}>
            <Text style={styles.affdate}>{dayjs(date).format('DD/MM/YYYY')}</Text>
            <Foundation style={styles.datepicker} onPress={showDatepicker} name="calendar" size={100} />
            </View>

            <TouchableOpacity
            onPress={handlePressButtonSearch}
            style={styles.button}>
            <Text style={styles.text}>Rechercher</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChangeDatePicker}
          />
        )}

        { hasResponse ? (
          <View style={styles.resultat}>
            <Text style={styles.response}>{JSON.stringify(archive, null, 2)}</Text>
            {hasWebLink && <Button title="webbrowser" color="#2E9AFE" onPress={() => {handlePressButtonWebBrowser(archive.archived_snapshots.closest.url)}}/>}
            {hasWebLink && <Button title="webview" color="#0101DF" onPress={() => {handlePressButtonPreview(archive.archived_snapshots.closest.url)}}/>}
          </View>) : (
          <View style={styles.resultat}>
              <ActivityIndicator size="large" color="gray" />
          </View>
          )}

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  search: {
    flex: 1,
    backgroundColor: "yellow",
    padding: 50
  },

  resultat: {
    flex: 2,
    backgroundColor: "white"
  },

  date: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  affdate: {
    fontSize: 25
  },

  datepicker: {
    margin: 10
  },

  response: {
    backgroundColor: "white",
    borderWidth: 2,
    paddingHorizontal: 10,
    marginBottom: 10
  },

  input: {
    borderWidth: 2,
    marginHorizontal: 50,
    marginBottom: 10,
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: "white"
  },

  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 50,
  },

  text: {
    textAlign: "center",
    color: "white",
  },

  link: {
    margin: 5,
    backgroundColor: "red"
  },
});
