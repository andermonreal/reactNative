import React, { Component } from 'react';
import { ScrollView, FlatList, StyleSheet, Image } from 'react-native';
import { Card, List, Text } from 'react-native-paper';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';

function Historia() {
  return (
    <Card style={styles.card}>
      <Card.Title
        title="Un poquito de historia"
        titleStyle={styles.titulo}
        style={styles.cardTitle}
      />
      <Card.Content>
        <Text style={styles.parrafo}>
          El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976
          cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil
          decidieron crear la sección montañera de dicho club. Fueron unos comienzos
          duros debido sobre todo a la situación política de entonces. Gracias al
          esfuerzo económico de sus socios y socias se logró alquilar una bajera.
          Gaztaroa ya tenía su sede social.
        </Text>
        <Text style={styles.parrafo}>
          Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros
          y montañeras que alguna vez habéis pasado por el club aportando vuestro
          granito de arena.
        </Text>
        <Text style={styles.parrafo}>Gracias!</Text>
      </Card.Content>
    </Card>
  );
}

class QuienesSomos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actividades: ACTIVIDADES,
    };
  }

  render() {
    return (
      <ScrollView>
        <Historia />
        <Card style={styles.card}>
          <Card.Title
            title='"Actividades y recursos"'
            titleStyle={styles.titulo}
            style={styles.cardTitle}
          />
          <Card.Content>
            <FlatList
              data={this.state.actividades}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <List.Item
                  title={item.nombre}
                  description={item.descripcion}
                  left={() => (
                    <List.Image
                      source={{ uri: baseUrl + item.imagen }}
                      style={styles.listImage}
                    />
                  )}
                  titleStyle={styles.listTitle}
                  descriptionNumberOfLines={10}
                />
              )}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  cardTitle: {
    alignItems: 'center',
  },
  titulo: {
    textAlign: 'center',
  },
  parrafo: {
    marginBottom: 12,
  },
  listImage: {
    width: 48,
    height: 48,
  },
  listTitle: {
    fontWeight: 'bold',
  },
});

export default QuienesSomos;
