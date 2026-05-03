import { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';
import { IndicadorActividad } from './IndicadorActividadComponent';

function RenderItem(props) {
  if (props.isLoading) {
    return <IndicadorActividad />;
  }
  if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }

  const item = props.item;
  if (item != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: baseUrl + item.imagen }}
          style={styles.imageBackground}
        >
          <Text style={styles.titulo}>{item.nombre}</Text>
        </ImageBackground>
        <Card.Content>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
        </Card.Content>
      </Card>
    );
  }
  return <View />;
}

const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
  cabeceras: state.cabeceras,
  actividades: state.actividades,
});

class Home extends Component {
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.props.cabeceras.cabeceras.filter((item) => item.destacado)[0]}
          isLoading={this.props.cabeceras.isLoading}
          errMess={this.props.cabeceras.errMess}
        />
        <RenderItem
          item={this.props.excursiones.excursiones.filter((item) => item.destacado)[0]}
          isLoading={this.props.excursiones.isLoading}
          errMess={this.props.excursiones.errMess}
        />
        <RenderItem
          item={this.props.actividades.actividades.filter((item) => item.destacado)[0]}
          isLoading={this.props.actividades.isLoading}
          errMess={this.props.actividades.errMess}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: { margin: 8 },
  imageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titulo: {
    color: 'orange',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    paddingHorizontal: 8,
    margin: 10,
  },
  descripcion: { marginTop: 20, marginBottom: 20 },
});

export default connect(mapStateToProps)(Home);
