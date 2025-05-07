import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState, memo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loadDrivers, loadMoreDrivers } from '../store/thunk/driversThunk';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { Driver } from '../store/types/driver.types';

export type RootStackParamList = {
  Drivers: Driver[];
  DriverWebView: { url: string };
};

const ITEM_HEIGHT = 64;

const DriverItem = memo(({ item, onPress }: { item: Driver; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.name}>{item.givenName} {item.familyName}</Text>
    <Text style={styles.nationality}>{item.nationality}</Text>
  </TouchableOpacity>
));

// const WelcomeScreen = () => (
//   <View style={styles.welcomeContainer}>
//     <Text style={styles.flag}>🏁</Text>
//     <Text style={styles.welcomeText}>Добро пожаловать в это демо!</Text>
//   </View>
// );

function DriversScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<any>();
  const { DriverTable, loading, offset, total, limit, error } = useSelector((state: RootState) => state.drivers);
  const [showWelcome, setShowWelcome] = useState(true);
  const [refreshing, setRefreshing] = useState(false);



  useEffect(() => {
    if (offset === 0) {
      dispatch(loadDrivers({ offset: 0, limit: 30 }));
    }
  }, [dispatch, offset]);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (!loading && offset < total) {
      dispatch(loadMoreDrivers({ offset, limit }));
    }
  }, [dispatch, loading, offset, total, limit]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(loadDrivers({ offset: 0, limit: 30 }))
      .finally(() => setRefreshing(false));
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <DriverItem
        item={item}
        onPress={() => navigation.navigate('DriverWebView', { url: item.url })}
      />
    ),
    [navigation]
  );

  if (showWelcome) {return <WelcomeScreen />;}

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Что-то пошло не так: {error}</Text>
          <Text style={styles.errorHint}>Потяните вниз для повторной попытки</Text>
        </View>
      )}
      <FlatList
        data={DriverTable.Drivers}
        keyExtractor={item => item.driverId}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        windowSize={10}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator style={styles.loader} /> : null}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#222']}
            tintColor="#222"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  nationality: {
    color: '#888',
    marginTop: 2,
  },
  loader: {
    marginVertical: 16,
  },
  errorContainer: {
    backgroundColor: '#fffbe9',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#f5c542',
    alignItems: 'center',
  },
  errorText: {
    color: '#c00',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  errorHint: {
    color: '#888',
    fontSize: 14,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flag: {
    fontSize: 64,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
});

export default DriversScreen;
