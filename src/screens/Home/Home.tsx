import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {TextInput, Card} from 'react-native-paper';
import useUsers from '../../hooks/useUsers';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [users, loading] = useUsers();
  const [filter, setFilter] = useState([]);
  const [textInput, setText] = useState('');

  const filterEmail = text => {
    let filtered = users.filter(user => {
      return user.email.toLowerCase().includes(text.toLowerCase());
    });
    setFilter(filtered);
  };

  useEffect(() => {
    setFilter(users);
  }, [users]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingBottom: 30,
            paddingTop: 20,
            paddingHorizontal: 10,
          }}>
          <TextInput
            autoComplete={false}
            mode="outlined"
            label="Ingresa un correo"
            value={textInput}
            onChangeText={text => {
              setText(text);
              filterEmail(text);
            }}
          />
          {filter.length > 0 ? (
            filter.map(user => (
              <Card key={user.id} style={{padding: 15, margin: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text>{user.name}</Text>
                    <Text>{user.email}</Text>
                  </View>

                  <Button
                    mode="contained"
                    onPress={() =>
                      navigation.navigate('Posts', {userId: user.id})
                    }>
                    INGRESAR
                  </Button>
                </View>
              </Card>
            ))
          ) : (
            <View>
              <Text>Ingresa un correo</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
