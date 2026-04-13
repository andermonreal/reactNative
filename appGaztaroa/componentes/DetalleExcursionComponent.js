import { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={require('./imagenes/40A\u00f1os.png')}
          style={styles.imageBackground}
        >
          <Text style={styles.titulo}>{excursion.nombre}</Text>
        </ImageBackground>
        <Card.Content>
          <Text style={styles.descripcion}>{excursion.descripcion}</Text>
        </Card.Content>
      </Card>
    );
  } else {
    return <View />;
  }
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
    };
  }

  render() {
    const { excursionId } = this.props.route.params;
    return <RenderExcursion excursion={this.state.excursiones[+excursionId]} />;
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  imageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titulo: {
    color: 'chocolate',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default DetalleExcursion;
