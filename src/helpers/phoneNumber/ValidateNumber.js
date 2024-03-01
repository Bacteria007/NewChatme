export default ValidateNumber = async (phoneInputRef, phoneNo, country) => {
    console.log('in validate number function');

    try {
      console.log('checking this',phoneNo);
      const isValidNumber = await phoneInputRef.current?.isValidNumber(phoneNo)
      if (!isValidNumber) {
    //    console.log(`Invalid ${country} number`);
    //     Alert.alert(`Invalid phone number for ${country}`);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error validating phone number:', error);
      return false;
    }
  };