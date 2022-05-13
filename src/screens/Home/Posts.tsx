import {useRoute, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, SafeAreaView, Text, View, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import usePosts from '../../hooks/usePosts';

const Posts = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId}: any = route.params;
  const [posts, loading] = usePosts({userId});

  console.log(posts);

  return (
    <SafeAreaView>
      <ScrollView>
        {!loading &&
          posts.map((post: any) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', {postId: post.id})}>
              <Card style={{padding: 15, margin: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      {post.title}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={{uri: post.thumbnailUrl}}
                      style={{width: 60, height: 60}}
                    />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Posts;
