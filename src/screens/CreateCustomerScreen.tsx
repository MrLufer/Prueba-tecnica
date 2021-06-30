import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import customerApi from '../api/customerApi';
import {useForm} from '../hooks/useForm';

import {appTheme} from '../theme/appTheme';
const CreateCustomerScreen = () => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const {first_name, last_name, onChange} = useForm({
    first_name: '',
    last_name: '',
  });

  const showDatepicker = () => {
    setShow(true);
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };

  const createCustomer = async () => {
    console.log({first_name, last_name, date});
    if (first_name && last_name && date) {
      console.log('todo bien');
      let birth_date = moment(date).format('YYYY-MM-DD');
      let res = await customerApi.post('/customer', {
        first_name,
        last_name,
        birth_date,
      });
      if (res.status === 200) {
        Alert.alert(
          'Se creo con exito el cliente',
          `El cliente ${first_name} ${last_name} fue registrado con exito.`,
        );
      } else {
        Alert.alert(
          'Error al crear el cliente',
          'Hay un error en el servidor intente más tarde.',
        );
      }
    } else {
      Alert.alert('Error al crear el cliente', 'Ingresar todos los campos');
    }
  };

  return (
    <View style={appTheme.screenContainer}>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
          RETO REACT NATIVE
        </Text>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text style={{color: 'white'}}>Nombre</Text>

        <TextInput
          placeholder="Ingrese su nombre:"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="default"
          style={styles.inputField}
          underlineColorAndroid="white"
          selectionColor="white"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={value => onChange(value, 'first_name')}
          value={first_name}
          onSubmitEditing={createCustomer}
        />

        <Text style={{color: 'white'}}>Apellido</Text>

        <TextInput
          placeholder="Ingrese su apellido:"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="default"
          style={styles.inputField}
          underlineColorAndroid="white"
          selectionColor="white"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={value => onChange(value, 'last_name')}
          value={last_name}
          onSubmitEditing={createCustomer}
        />

        <Text style={{color: 'white'}}>Fecha de Nacimiento</Text>
        <Button onPress={showDatepicker} title="Ingresar Fecha" />
        {show && (
          <DateTimePicker
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}
        <Text style={{color: 'white'}}>
          Su fecha de nacimiento es {moment(date).format('YYYY-MM-DD')}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => createCustomer()}>
          <Text style={styles.buttonText}>Crear Cliente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateCustomerScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  inputField: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
