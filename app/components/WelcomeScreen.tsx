import { StyleSheet, View, Text } from 'react-native';

import { useRef } from 'react';

import { useEffect } from 'react';
import { Easing } from 'react-native';

import { Animated } from 'react-native';

export const WelcomeScreen = () => {
    const spinValue = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
      // fade-in для текста с задержкой
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        delay: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }).start();
    }, [spinValue, fadeAnim]);

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.welcomeContainer}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Text style={styles.flag}>🏁</Text>
        </Animated.View>
        <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>Добро пожаловать в это демо!</Animated.Text>
      </View>
    );
  };
  const styles = StyleSheet.create({

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
