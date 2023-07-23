import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { View, TextInput, Button, TouchableOpacity } from 'react-native';
import AppContext from '../../context/AppContext';

const AddContact = () => {
  const [newContact, setNewContact] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const {currentUserId,baseUrl}  = useContext(AppContext);
  const handleAddContact = async () => {
    const formData = new FormData();
    console.log("currentUser",currentUserId)
    formData.append("userId", currentUserId);
    formData.append('name',newContactName);
    formData.append("phoneNumber",newContact);

    try {
      const response = await fetch(`${baseUrl}/addContacts`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: formData,

      });
   
      const data = await response.json(); // Parse the response body as JSON
      console.log('Contact added:', data);
      // Reset the new contact input
      setNewContact('');
      setNewContactName('');

    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter phone no"
        value={newContact}
        onChangeText={setNewContact}
      />
      <TextInput
        placeholder="Enter name"
        value={newContactName}
        onChangeText={setNewContactName}
      />
      <TouchableOpacity  onPress={handleAddContact} >
        <View><Text>ADD CONTACT</Text></View>
      </TouchableOpacity>
    </View>
  );
};

export default AddContact
