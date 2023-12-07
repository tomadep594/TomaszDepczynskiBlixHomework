import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box'

export default function App() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isManual, setIsManual] = useState(true);
  const [payLoad, setPayLoad] = useState({});
  const [isPayLoadShown, setIsPayLoadShown] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const data = [
    { label: 'Advanced', value: 'Advanced' },
    { label: 'Manual', value: 'Manual' }
  ];

  const fields = [
    { label: 'User Name: ', placeholder: 'name@example.com', isManual },
    { label: 'Password: ', placeholder: 'Required', secureTextEntry: true, isManual },
    { label: 'Server address: ', placeholder: 'example.com', isManual },
    { label: 'Server path: ', placeholder: '/calendars/user/' }
  ]

  const onSubmit = () => {
    setIsError(false);
    setIsPayLoadShown(true);
    validateEmail();
    validatePassword();
    validateAddress();
    validatePort();
    validateServerPath();
    setPayLoad({ 'SSL: ': isChecked });
    console.log(payLoad);
  }

  const validateEmail = () => {
    if (!/\S+@\S+\.\S+/.test(payLoad['User Name: '])) {
      setIsError(true);
    }
  }

  const validatePassword = () => {
    if (!payLoad['Password: ']) {
      setIsError(true);
    }
  }

  const validateAddress = () => {
    if (!payLoad['Server address: ']) {
      setIsError(true);
    }
  }

  const validateServerPath = () => {
    if (!/^[a-zA-Z0-9/]*$/.test(payLoad['Server path: '])) {
      setIsError(true);
    }
  }

  const validatePort = () => {
    if (!(payLoad['Port: '] > 0 && payLoad['Port: '] < 3)) {
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
            setValue(item.value);
            setIsFocus(false);
            setIsManual(item.value == "Manual" ? true : false)
            setPayLoad({ 'accountType': item.value })
          }}
          labelField="label"
          valueField="value"
          value={value}
        />
      </View>

      {fields.map((input, index) => (
        (isManual && fields[index].isManual) || !isManual ? (
          <View key={index} style={styles.textInputView}>
            <Text style={styles.fieldTitleStyle}>{input.label}</Text>
            <TextInput
              style={styles.textInput}
              placeholder={input.placeholder}
              secureTextEntry={input.secureTextEntry}
              onChangeText={(text) => {
                setPayLoad(prevPayload => ({ ...prevPayload, [input.label]: text }))
              }}
            />
          </View>
        ) : null
      ))}

      {!isManual ? (
        <View style={styles.textInputView}>
          <Text style={styles.fieldTitleStyle}>Port: </Text>
          <TextInput
            style={styles.portTextInput}
            onChangeText={(text) => {
              setPayLoad({ 'Port: ': text })
            }}
          />
          <CheckBox
            style={styles.checkBoxStyle}
            onClick={() => {
              setIsChecked(!isChecked)
            }}
            isChecked={isChecked}
          />
          <Text>Use SSL</Text>
        </View>) : null}

      <Button
        title='Submit'
        onPress={() => onSubmit()}
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
    marginLeft: 8,
    paddingLeft: 8,
    width: 50
  },
  checkBoxStyle: {
    marginLeft: 16,
    marginRight: 8
  }
});
