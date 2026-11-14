import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tareas, setTareas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const categoriasDisponibles = ['Análisis', 'Diseño', 'Código'];

  const agregarTarea = () => {
    if (!titulo.trim()) {
      setMensaje('Debe ingresar el nombre de la tarea');
      return;
    }

    if (!categoria) {
      setMensaje('Debe seleccionar una categoría');
      return;
    }

    setTareas([...tareas, { id: Date.now().toString(), titulo, categoria, estado: 'Pendiente' }]);

    setTitulo('');
    setCategoria('');
    setMensaje('Tarea registrada correctamente.');
  };

  const eliminarTarea = (id) => {
    const tareasFiltradas = tareas.filter(tarea => tarea.id !== id);
    setTareas(tareasFiltradas);
    setMensaje('Tarea eliminada con éxito')
  };

  const cambiarEstado = (id) => {
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id === id) {
        return { ...tarea, estado: tarea.estado === 'Pendiente' ? 'Completada' : 'Pendiente' };
      }
      return tarea;
    });
    setTareas(tareasActualizadas);
  };

  const totalTareas = tareas.length;
  const pendientes = tareas.filter(t => t.estado === 'Pendiente').length;
  const completadas = tareas.filter(t => t.estado === 'Completada').length;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mi Sprint ADSO</Text>
      <Text style={styles.subtitle}>Laura Ladino, Ficha: 3409609</Text>
      <StatusBar style="dark" />

      {/* Resumen de tareas */}
      <View style={styles.resumenContainer}>
        <Text style={styles.textoResumen}>Total tareas: {totalTareas}</Text>
        <View style={styles.subResumen}>
          <Text style={styles.pendientes}>Pendientes: {pendientes}</Text>
          <Text style={styles.completadas}>Completadas: {completadas}</Text>
        </View>
      </View>

      {/* Mensajes de validación o éxito */}
      {mensaje ? <Text style={styles.mensajeAlerta}>{mensaje}</Text> : null}

      {/* Formulario para crear tareas */}
      <View style={styles.form}>
        <Text style={styles.labelCampo}>Nombre de la tarea:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Diseñar pantalla de inicio"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.labelCampo}>Selecciona la categoría:</Text>
        <View style={styles.categoriasContainer}>
          {categoriasDisponibles.map((cat) => {
            const seleccionada = categoria === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.botonCategoria, seleccionada && styles.botonCategoriaSeleccionada]}
                onPress={() => setCategoria(cat)}
              >
                <Text style={[styles.textoBotonCategoria, seleccionada && styles.textoBotonCategoriaSeleccionado]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.boton}>
        <Button title="Agregar tarea" onPress={agregarTarea} color="#EA580C" />
      </View>

      {/* Tablero / Listado de tareas */}
      <View style={styles.listContainer}>
        {tareas.length === 0 ? (
          <Text style={styles.noTareas}>No hay tareas registradas</Text>
        ) : (
          <FlatList
            data={tareas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[
                styles.tarea,
                { borderLeftColor: item.estado === 'Completada' ? '#16A34A' : '#EA580C' }
              ]}>
                <Text style={styles.tituloTarea}>{item.titulo}</Text>
                <Text style={styles.categoriaTarea}>Categoría: {item.categoria}</Text>
                <Text style={[styles.estadoTarea, item.estado === 'Completada' ? styles.textCompletada : styles.textPendiente]}>
                  Estado: {item.estado}
                </Text>

                <View style={styles.botonesTarea}>
                  <View style={styles.accionBoton}>
                    <Button
                      title={item.estado === 'Pendiente' ? "Completar" : "Pendiente"}
                      onPress={() => cambiarEstado(item.id)}
                      color={item.estado === 'Pendiente' ? "#16A34A" : "#16A34A"}
                    />
                  </View>
                  <View style={styles.accionBoton}>
                    <Button title="Eliminar" onPress={() => eliminarTarea(item.id)} color="#DC2626" />
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B4332',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#D97706',
    fontWeight: '600',
    marginBottom: 18,
  },
  resumenContainer: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    elevation: 3,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  textoResumen: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#92400E',
  },
  subResumen: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },
  pendientes: {
    color: '#EA580C',
    fontWeight: '700',
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    overflow: 'hidden',
  },
  completadas: {
    color: '#15803D',
    fontWeight: '700',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    overflow: 'hidden',
  },
  mensajeAlerta: {
    color: '#C2410C',
    backgroundColor: '#FFEDD5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
    overflow: 'hidden',
  },
  form: {
    width: '100%',
    marginBottom: 8,
  },
  labelCampo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B4332',
    marginBottom: 6,
    marginLeft: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FCD34D',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 22,
    marginBottom: 14,
    width: '100%',
    color: '#1F2937',
  },
  categoriasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  botonCategoria: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FCD34D',
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
  },
  botonCategoriaSeleccionada: {
    backgroundColor: '#16A34A',
    borderColor: '#15803D',
  },
  textoBotonCategoria: {
    color: '#92400E',
    fontWeight: '600',
  },
  textoBotonCategoriaSeleccionado: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  boton: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  noTareas: {
    textAlign: 'center',
    color: '#65A30D',
    fontWeight: '500',
    marginTop: 24,
    fontSize: 15,
  },
  tarea: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 24,
    marginBottom: 14,
    borderLeftWidth: 6,
    borderLeftColor: '#F59E0B',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    elevation: 2,
    shadowColor: '#15803D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  tituloTarea: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#14532D',
    marginBottom: 4,
  },
  categoriaTarea: {
    color: '#B45309',
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 2,
  },
  estadoTarea: {
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '700',
  },
  textPendiente: {
    color: '#EA580C',
  },
  textCompletada: {
    color: '#16A34A',
  },
  botonesTarea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accionBoton: {
    width: '48%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});