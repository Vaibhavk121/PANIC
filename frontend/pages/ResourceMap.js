import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');
const ORS_API_KEY = '5b3ce3597851110001cf6248f2dbab58964147c5b6af45b7527c1557'; // <-- Replace with your OpenRouteService API key

export default function ResourceMap() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  // Generate random markers near the user's location
  const generateResources = (center) => {
    const randomOffset = () => (Math.random() - 0.5) * 0.02;
    return [
      {
        id: 1,
        type: 'Food',
        coordinate: {
          latitude: center.latitude + randomOffset(),
          longitude: center.longitude + randomOffset(),
        },
      },
      {
        id: 2,
        type: 'Shelter',
        coordinate: {
          latitude: center.latitude + randomOffset(),
          longitude: center.longitude + randomOffset(),
        },
      },
      {
        id: 3,
        type: 'Water',
        coordinate: {
          latitude: center.latitude + randomOffset(),
          longitude: center.longitude + randomOffset(),
        },
      },
      {
        id: 4,
        type: 'Food',
        coordinate: {
          latitude: center.latitude + randomOffset(),
          longitude: center.longitude + randomOffset(),
        },
      },
      {
        id: 5,
        type: 'Shelter',
        coordinate: {
          latitude: center.latitude + randomOffset(),
          longitude: center.longitude + randomOffset(),
        },
      },
    ];
  };

  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setResources(generateResources(loc.coords));
    })();
  }, []);

  // Fetch route from OpenRouteService when a marker is selected
  useEffect(() => {
    const fetchRoute = async () => {
      if (!location || !selectedResource) {
        setRouteCoords([]);
        return;
      }
      try {
        const start = [location.longitude, location.latitude];
        const end = [
          selectedResource.coordinate.longitude,
          selectedResource.coordinate.latitude,
        ];
        const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${ORS_API_KEY}&start=${start[0]},${start[1]}&end=${end[0]},${end[1]}`;
        const response = await fetch(url);
        const data = await response.json();
        if (
          data &&
          data.features &&
          data.features[0] &&
          data.features[0].geometry &&
          data.features[0].geometry.coordinates
        ) {
          const coords = data.features[0].geometry.coordinates.map(([lon, lat]) => ({
            latitude: lat,
            longitude: lon,
          }));
          setRouteCoords(coords);
        } else {
          setRouteCoords([]);
        }
      } catch (e) {
        setRouteCoords([]);
        Alert.alert('Route Error', 'Could not fetch route.');
      }
    };
    fetchRoute();
  }, [selectedResource, location]);

  return (
    <View style={styles.container}>
      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location ? location.latitude : 20.5937,
            longitude: location ? location.longitude : 78.9629,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          region={
            location
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }
              : undefined
          }
          showsUserLocation={true}
        >
          {resources.map(resource => (
            <Marker
              key={resource.id}
              coordinate={resource.coordinate}
              title={resource.type}
              pinColor={
                resource.type === 'Food'
                  ? 'orange'
                  : resource.type === 'Shelter'
                  ? 'blue'
                  : 'cyan'
              }
              onPress={() => setSelectedResource(resource)}
            />
          ))}
          {routeCoords.length > 1 && (
            <Polyline
              coordinates={routeCoords}
              strokeColor="#007AFF"
              strokeWidth={4}
            />
          )}
        </MapView>
        <Text style={styles.header}>Resource Map</Text>
        <TouchableOpacity style={styles.button} onPress={() => { /* Add navigation or modal here */ }}>
          <Text style={styles.buttonText}>List Your Resource</Text>
        </TouchableOpacity>
      </View>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  mapWrapper: {
    flex: 1,
    position: 'relative',
    margin: 0,
    padding: 0,
  },
  map: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 2,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 24,
    elevation: 3,
    zIndex: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
});