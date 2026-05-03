import { Component } from 'react';
import {
  View, StyleSheet, ImageBackground, ScrollView,
  FlatList, Modal,
} from 'react-native';
import { Card, Text, Divider, IconButton, Button, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { IndicadorActividad } from './IndicadorActividadComponent';

// ─── Render Excursion ────────────────────────────────────────────────────────
function RenderExcursion(props) {
  const excursion = props.excursion;

  if (props.isLoading) return <IndicadorActividad />;
  if (props.errMess) return <View><Text>{props.errMess}</Text></View>;
  if (excursion == null) return <View />;

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
              : props.onPressFavorito()
          }
        />
        <IconButton
          icon="pencil"
          size={28}
          onPress={() => props.onPressComentario()}
        />
      </View>
    </Card>
  );
}

// ─── Render Comentario ───────────────────────────────────────────────────────
function RenderComentario(props) {
  const renderEstrellas = (valoracion) =>
    '★'.repeat(valoracion) + '☆'.repeat(5 - valoracion);

  const formatearFecha = (diaStr) => {
    const fecha = new Date(diaStr.replace(/\s/g, ''));
    return (
      fecha.toLocaleDateString('es-ES', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      }) + ', ' +
      fecha.toLocaleTimeString('es-ES', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      })
    );
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
          data={props.comentarios}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          renderItem={({ item }) => (
            <View style={styles.comentarioItem}>
              <Text style={styles.comentarioTexto}>{item.comentario}</Text>
              <Text style={styles.estrellas}>{renderEstrellas(item.valoracion)}</Text>
              <Text style={styles.autor}>
                -- {item.autor}, {formatearFecha(item.dia)}
              </Text>
            </View>
          )}
        />
      </Card.Content>
    </Card>
  );
}

// ─── Redux ───────────────────────────────────────────────────────────────────
const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
  comentarios: state.comentarios,
  favoritos: state.favoritos,
});

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) =>
    dispatch(postComentario(excursionId, valoracion, autor, comentario)),
});

// ─── Clase principal ─────────────────────────────────────────────────────────
class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false,
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false,
    });
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  gestionarComentario(excursionId) {
    this.props.postComentario(
      excursionId,
      this.state.valoracion,
      this.state.autor,
      this.state.comentario
    );
    this.resetForm();
  }

  render() {
    const { excursionId } = this.props.route.params;

    // Etiqueta textual de la valoración
    const etiquetaVaoracion = ['', 'Muy malo', 'Malo', 'Normal', 'Bueno', 'Excelente'];

    return (
      <ScrollView>
        {/* Modal con formulario */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Añadir comentario</Text>

            {/* Valoración con estrellas */}
            <View style={styles.estrellasContainer}>
              {[1, 2, 3, 4, 5].map((i) => (
                <IconButton
                  key={i}
                  icon={i <= this.state.valoracion ? 'star' : 'star-outline'}
                  size={32}
                  iconColor={colorGaztaroaOscuro}
                  onPress={() => this.setState({ valoracion: i })}
                />
              ))}
            </View>
            <Text style={styles.etiquetaValoracion}>
              {etiquetaVaoracion[this.state.valoracion]}
            </Text>

            {/* Campo autor */}
            <View style={styles.inputRow}>
              <MaterialCommunityIcons
                name="account"
                size={24}
                color={colorGaztaroaOscuro}
                style={styles.inputIcon}
              />
              <TextInput
                label="Autor"
                value={this.state.autor}
                onChangeText={(texto) => this.setState({ autor: texto })}
                style={styles.textInput}
                mode="outlined"
              />
            </View>

            {/* Campo comentario */}
            <View style={styles.inputRow}>
              <MaterialCommunityIcons
                name="comment-text"
                size={24}
                color={colorGaztaroaOscuro}
                style={styles.inputIcon}
              />
              <TextInput
                label="Comentario"
                value={this.state.comentario}
                onChangeText={(texto) => this.setState({ comentario: texto })}
                style={styles.textInput}
                mode="outlined"
                multiline
              />
            </View>

            {/* Botones */}
            <View style={styles.botonesContainer}>
              <Button
                icon="close"
                mode="outlined"
                onPress={() => this.resetForm()}
                style={styles.boton}
              >
                Cancelar
              </Button>
              <Button
                icon="send"
                mode="contained"
                onPress={() => this.gestionarComentario(excursionId)}
                style={styles.boton}
              >
                Enviar
              </Button>
            </View>
          </View>
        </Modal>

        {/* Vista de detalle */}
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          isLoading={this.props.excursiones.isLoading}
          errMess={this.props.excursiones.errMess}
          favorita={this.props.favoritos.favoritos.some((el) => el === excursionId)}
          onPressFavorito={() => this.marcarFavorito(excursionId)}
          onPressComentario={() => this.toggleModal()}
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

// ─── Estilos ─────────────────────────────────────────────────────────────────
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
  iconoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardTitulo: { textAlign: 'center', fontWeight: 'bold' },
  cardTitleContainer: { alignItems: 'center' },
  comentarioItem: { paddingVertical: 10 },
  comentarioTexto: { fontSize: 14, marginBottom: 4 },
  estrellas: { fontSize: 16, color: '#f5a623', marginBottom: 4 },
  autor: { fontSize: 12, color: '#666' },
  divider: { marginVertical: 4 },
  // Modal
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colorGaztaroaOscuro,
    marginBottom: 16,
  },
  estrellasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  etiquetaValoracion: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 8,
    marginTop: 6,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  boton: {
    minWidth: 120,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
