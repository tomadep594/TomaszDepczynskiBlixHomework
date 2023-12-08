import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box';
import CustomTextInput from './CustomTextInput';

export default function App() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(true);
  const [payLoad, setPayLoad] = useState({});
  const [isPayLoadShown, setIsPayLoadShown] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [serverAddress, setServerAddress] = useState('');
  const [serverPath, setServerPath] = useState('');
  const [port, setPort] = useState('');

  const data = [
    { label: 'Advanced', value: 'Advanced' },
    { label: 'Manual', value: 'Manual' }
  ];

  const onSubmitAdvanced = () => {
    setIsError(false);
    validateEmail();
    validatePassword();
    validateAddress();
    validatePort();
    validateServerPath();
    setPayLoad({
      'User Name': userName,
      'Password': password,
      'Server Address': serverAddress,
      'Server Path': serverPath,
      'Port': port,
      'SSL': isChecked
    });
    setIsPayLoadShown(true);
  }

  const onSubmitManual = () => {
    setIsError(false);
    validateEmail();
    validatePassword();
    validateAddress();
    setPayLoad({
      'User Name': userName,
      'Password': password,
      'Server Address': serverAddress,
    });
    setIsPayLoadShown(true);
  }

  const eraseData = () => {
    setUserName('');
    setPassword('');
    setServerAddress('');
    setServerPath('');
    setPort('');
    setIsChecked(false);
  }

  const validateEmail = () => {
    if (!/\S+@\S+\.\S+/.test(userName)) {
      setIsError(true);
    }
  }

  const validatePassword = () => {
    if (!password) {
      setIsError(true);
    }
  }

  const validateAddress = () => {
    if (!serverAddress) {
      setIsError(true);
    }
  }

  const validateServerPath = () => {
    if (!/^[a-zA-Z0-9/]*$/.test(serverPath)) {
      setIsError(true);
    }
  }

  const validatePort = () => {
    if (!(port > 0 && port < 3)) {
      setIsError(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputView}>
        <Text style={styles.fieldTitleStyle}>Account Type: </Text>
        <Dropdown
          style={styles.dropdownStyle}
          data={data}
          onChange={item => {
            setValue(item.value)
            setIsFocus(false)
            setIsPayLoadShown(false)
            setIsAdvanced(item.value == "Advanced" ? true : false)
            eraseData()
          }}
          labelField="label"
          valueField="value"
          value={value}
        />
      </View>

      <CustomTextInput
        label={'User Name'}
        placeholder={'required'}
        value={userName}
        onChangeText={(text) => {
          setUserName(text)
          setIsPayLoadShown(false)
        }}
      />
      <CustomTextInput
        label={'Password'}
        placeholder={'required'}
        value={password}
        onChangeText={(text) => {
          setPassword(text)
          setIsPayLoadShown(false)
        }}
        isSecureTextEntry
      />
      <CustomTextInput
        label={'Server Address'}
        placeholder={'required'}
        value={serverAddress}
        onChangeText={(text) => {
          setServerAddress(text)
          setIsPayLoadShown(false)
        }}
      />
      {isAdvanced && (
        <>
          <CustomTextInput
            label={'Server Path'}
            placeholder={'required'}
            value={serverPath}
            onChangeText={(text) => {
              setServerPath(text)
              setIsPayLoadShown(false)
            }}
          />
          <View style={styles.textInputView}>
            <Text style={styles.fieldTitleStyle}>Port: </Text>
            <TextInput
              style={styles.portTextInput}
              onChangeText={(text) => {
                setPort(text)
                setIsPayLoadShown(false)
              }}
              value={port}
            />
            <CheckBox
              style={styles.checkBoxStyle}
              onClick={() => {
                setIsChecked(!isChecked)
                setIsPayLoadShown(false)
              }}
              isChecked={isChecked}
            />
            <Text>Use SSL</Text>
          </View>
        </>
      )}


      <Button
        title='Submit'
        onPress={() => isAdvanced ? onSubmitAdvanced() : onSubmitManual()}
      />

      {isError ? <Text>The form is not valid!</Text> : null}
      {isPayLoadShown && !isError ? <Text>{JSON.stringify(payLoad)}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    paddingLeft: 8
  },
  fieldTitleStyle: {
    width: 100,
    textAlign: 'right'
  },
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  dropdownStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    paddingLeft: 8
  },
  portTextInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 8,
    paddingLeft: 8,
    width: 50,

  },
  checkBoxStyle: {
    marginLeft: 16,
    marginRight: 8
  }
});
