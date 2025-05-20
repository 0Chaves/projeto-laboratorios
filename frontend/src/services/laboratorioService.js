import api from "./api"

// Lista todos os laboratórios
export const getLaboratorios = async () => {
  const response = await api.get("/laboratorios")
  return response.data
}

// Busca um laboratório especifico por id
export const getLaboratorioById = async (id) => {
  const response = await api.get(`/laboratorios/${id}`)
  return response.data
}

// Cria um novo laboratório
export const createLaboratorio = async (laboratorio) => {
  const response = await api.post("/laboratorios", laboratorio)
  return response.data
}

// Atualiza um laboratório existente
export const updateLaboratorio = async (id, laboratorio) => {
  const response = await api.put(`/laboratorios/${id}`, laboratorio)
  return response.data
}

// Exclui um laboratório
export const deleteLaboratorio = async (id) => {
  await api.delete(`/laboratorios/${id}`)
  return true
}