import { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, FlatList } from 'react-native';
import { Card, Text, Divider, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: baseUrl + excursion.imagen }}
          style={styles.imageBackground}
        >
          <Text style={styles.titulo}>{excursion.nombre}</Text>
        </ImageBackground>
        <Card.Content>
          <Text style={styles.descripcion}>{excursion.descripcion}</Text>
        </Card.Content>
        <View style={styles.iconoContainer}>
          <IconButton
            icon={props.favorita ? 'heart' : 'heart-outline'}
            size={28}
            onPress={() =>
              props.favorita
                ? console.log('La excursión ya se encuentra entre las favoritas')
                : props.onPress()
            }
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  const renderEstrellas = (valoracion) => {
    return '★'.repeat(valoracion) + '☆'.repeat(5 - valoracion);
  };

  const formatearFecha = (diaStr) => {
    const fecha = new Date(diaStr.replace(/\s/g, ''));
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }) + ', ' + fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Comentarios"
        titleStyle={styles.cardTitulo}
        style={styles.cardTitleContainer}
      />
      <Card.Content>
        <FlatList
          data={comentarios}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          renderItem={({ item }) => (
            <View style={styles.comentarioItem}>
              <Text style={styles.comentarioTexto}>{item.comentario}</Text>
              <Text style={styles.estrellas}>{renderEstrellas(item.valoracion)}</Text>
              <Text style={styles.autor}>-- {item.autor}, {formatearFecha(item.dia)}</Text>
            </View>
          )}
        />
      </Card.Content>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
  comentarios: state.comentarios,
});

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: [],
    };
  }

  marcarFavorito(excursionId) {
    this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.state.favoritos.some((el) => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter(
            (comentario) => comentario.excursionId === +excursionId
          )}
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
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  descripcion: { marginTop: 20, marginBottom: 20 },
  iconoContainer: { alignItems: 'center', marginBottom: 8 },
  cardTitulo: { textAlign: 'center', fontWeight: 'bold' },
  cardTitleContainer: { alignItems: 'center' },
  comentarioItem: { paddingVertical: 10 },
  comentarioTexto: { fontSize: 14, marginBottom: 4 },
  estrellas: { fontSize: 16, color: '#f5a623', marginBottom: 4 },
  autor: { fontSize: 12, color: '#666' },
  divider: { marginVertical: 4 },
});

export default connect(mapStateToProps)(DetalleExcursion);
