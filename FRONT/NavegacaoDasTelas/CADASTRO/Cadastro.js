import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Platform,
  Modal,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const Cadastro = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [sexo, setSexo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [erro, setErro] = useState("");

  const handlePickerChange = (itemValue) => {
    setSexo(itemValue);
  };

  const confirmarEscolha = () => {
    setSelectedValue(sexo);
    setModalVisible(false);
  };

  const botaologin = () => {
    navigation.navigate("LoginScreen");
  };

  const formatarDataDeNascimento = (dia, mes, ano) => {
    return `${dia}/${mes}/${ano}`;
  };

  const validarData = (dia, mes, ano) => {
    const dataRegex =
      /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/](19\d{2}|20[01]\d|202[0-4])$/;

    if (!dataRegex.test(`${dia}/${mes}/${ano}`)) {
      return "Data de nascimento inválida.";
    } else {
      return "";
    }
  };

  const Criar = () => {
    setErro("");

    if (!email || !senha || !nome || !cpf || !dia || !mes || !ano || !sexo) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    const dataError = validarData(dia, mes, ano);

    if (dataError) {
      setErro(dataError);
      return;
    }

    const formattedDate = formatarDataDeNascimento(dia, mes, ano);

    const dados = {
      nome: nome,
      email: email,
      senha: senha,
      cpf: cpf,
      dataDeNascimento: formattedDate,
      sexo: sexo,
    };

    fetch("http://10.110.12.20:8080/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao tentar criar usuário");
        }
        return response.json();
      })
      .then((dados) => {
        botaologin();
        console.log("Usuário criado com sucesso:", dados);
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao tentar criar usuário:", error);
        Alert.alert(
          "Erro",
          "Ocorreu um erro ao tentar criar usuário. Por favor, tente novamente."
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.TituloCadastro}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            marginTop={100}
            marginLeft={20}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Cadastro</Text>
        <Image
          source={{
            uri: "https://github.com/SSancaSH-Projetos/MyAuto/blob/main/MY%20AUT.png?raw=true",
          }}
          style={styles.logo}
        />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.label}>Digite seu E-MAIL:</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.containerText}>
        <Text style={styles.label}>NOME:</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="NOME"
        keyboardType="default"
        value={nome}
        onChangeText={setNome}
      />

      <View style={styles.containerText}>
        <Text style={styles.label}>CPF:</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        maxLength={11}
        value={cpf}
        onChangeText={setCpf}
      />
      <View style={styles.containerText}>
        <Text style={styles.label}>DATA DE NASCIMENTO:</Text>
      </View>
      <View style={styles.dataNascimentoInput}>
        <TextInput
          style={[styles.input, { width: "25%" }]}
          placeholder="DD"
          keyboardType="numeric"
          maxLength={2}
          value={dia}
          onChangeText={setDia}
        />
        <Text style={{ paddingHorizontal: 5 }}>/</Text>
        <TextInput
          style={[styles.input, { width: "30%" }]}
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
          value={mes}
          onChangeText={setMes}
        />
        <Text style={{ paddingHorizontal: 5 }}>/</Text>
        <TextInput
          style={[styles.input, { width: "40%" }]}
          placeholder="AAAA"
          keyboardType="numeric"
          maxLength={4}
          value={ano}
          onChangeText={setAno}
        />
      </View>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.input2}
      >
        <Text style={styles.pickerText}>{selectedValue || "Sexo"}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={sexo}
              onValueChange={handlePickerChange}
              style={styles.picker}
              mode="dropdown" // Definindo o modo como dropdown para iOS
            >
              <Picker.Item label="Selecionar" value="" />
              <Picker.Item label="Masculino" value="Homem" />
              <Picker.Item label="Feminino" value="Mulher" />
              <Picker.Item
                label="Prefiro Não Opinar"
                value="Prefiro Não Opinar"
              />
            </Picker>

            <Button title="Confirmar Escolha" onPress={confirmarEscolha} />
          </View>
        </View>
      </Modal>

      <View style={styles.containerText}>
        <Text style={styles.label}>Defina uma senha:</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="SENHA"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      />
      <View style={styles.ButtonStyle}>
        <TouchableOpacity onPress={Criar}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>

      {erro !== "" && <Text style={styles.error}>{erro}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    color: "white",
    fontSize: 30,
    marginLeft: "25%",
    marginTop: "25%",
  },
  TituloCadastro: {
    backgroundColor: "#0B0020",
    width: "115%",
    height: 180,
    padding: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    top: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "white",
    padding: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: "#FAFBA7",
  },
  input2: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: "#FAFBA7",
    justifyContent: "center",
  },
  resultContainer: {
    marginTop: 20,
  },
  dataNascimentoInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 8,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  containerText: {
    width: "100%",
    backgroundColor: "#0B0020",
    borderRadius: 30,
    padding: "1%",
    margin: 5,
  },
  ButtonStyle: {
    width: "90%",
    backgroundColor: "green",
    borderRadius: 30,
    padding: 12,
    marginTop: 10,
    alignItems: "center",
    marginBottom: "30%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  logo: {
    width: 100,
    height: 90,
    resizeMode: "contain",
    marginLeft: 50,
    marginTop: 90,
  },
  pickerText: {
    fontSize: 20,
    alignItems: "center",
    textAlign: "center",
    marginTop: 8,
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(1, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 30,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    width: "100%",
    ...Platform.select({
      ios: {
        color: "black",
      },
    }),
  },
});

export default Cadastro;
