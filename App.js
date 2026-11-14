import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tareas, setTareas] = useState([]);
  const [mensaje, setMensaje] = useState('');


  const agregarTarea = () => {
    if (!titulo.trim()) {
      setMensaje('Debe ingresar el nombre de la tarea');
      return;
    }

    const categoriaR = categoria.trim();
    if (
      categoriaR.toLowerCase() !== 'análisis' &&
      categoriaR.toLowerCase() !== 'analisis' &&
      categoriaR.toLowerCase() !== 'diseño' &&
      categoriaR.toLowerCase() !== 'código' &&
      categoriaR.toLowerCase() !== 'codigo'
    ) {
      setMensaje('Categoría inválida. Debe ser: Análisis, Diseño o Código');
      return;
    }

    setTareas([...tareas, { id: Date.now().toString(), titulo, categoria, estado: 'Pendiente' }]);

    setTitulo('');
    setCategoria('');
    setMensaje('Tarea registrada correctamente.');

  }

  const eliminarTarea = (id) => {
    const tareasFiltradas = tareas.filter(tarea => tarea.id !== id);
    setTareas(tareasFiltradas);
  }

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
      <Text style={styles.subtitle}>Laura Sofia, Ficha: 3409609</Text>
      <StatusBar style="auto" />

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
        <TextInput
          style={styles.input}
          placeholder="Nombre de la tarea"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoría (Análisis, Diseño, Código)"
          value={categoria}
          onChangeText={setCategoria}
        />
      </View>

      <View style={styles.boton}>
        <Button title="Agregar tarea" onPress={agregarTarea} color="#007AFF" />
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
              <View style={styles.tarea}>
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
                      color="#4CD964"
                    />
                  </View>
                  <View style={styles.accionBoton}>
                    <Button title="Eliminar" onPress={() => eliminarTarea(item.id)} color="#FF3B30" />
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
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  resumenContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  textoResumen: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subResumen: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
  },
  pendientes: {
    color: '#e67e22',
    fontWeight: '600',
  },
  completadas: {
    color: '#27ae60',
    fontWeight: '600',
  },
  mensajeAlerta: {
    color: '#d9534f',
    marginBottom: 10,
    fontWeight: '500',
  },
  form: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    width: '100%',
  },
  boton: {
    width: '100%',
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  noTareas: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  tarea: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF',
    elevation: 1,
  },
  tituloTarea: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriaTarea: {
    color: '#555',
    fontSize: 14,
    marginVertical: 2,
  },
  estadoTarea: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
  textPendiente: {
    color: '#e67e22',
  },
  textCompletada: {
    color: '#27ae60',
  },
  botonesTarea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accionBoton: {
    width: '48%',
  },
});