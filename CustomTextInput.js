// SecureTextInput.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ label, placeholder, value, isSecureTextEntry, onChangeText }) => {
    return (
        <View style={styles.textInputView}>
            <Text style={styles.fieldTitleStyle}>{label}</Text>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                value={value}
                secureTextEntry={isSecureTextEntry}
                onChangeText={(text) => onChangeText(text)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    fieldTitleStyle: {
        width: 100,
        textAlign: 'right',
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        flex: 1,
        marginLeft: 8,
        paddingLeft: 8,
    },
});

export default CustomTextInput;
