"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { createLaboratorio, getLaboratorioById, updateLaboratorio } from "../services/laboratorioService"

const LaboratorioForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    nome: "",
    bloco: "",
    tipoLaboratorio: "",
    descricao: "",
    capacidade: 0,
    ativo: true,
  })

  const [errors, setErrors] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [erroAPI, setErroAPI] = useState(null)

  useEffect(() => {
    if (isEditMode) {
      const fetchLaboratorio = async () => {
        try {
          const data = await getLaboratorioById(Number(id))
          setFormData(data)
        } catch (err) {
          console.error("Erro ao buscar laboratório:", err)
          setErroAPI("Não foi possível carregar os dados do laboratório.")
        }
      }

      fetchLaboratorio()
    }
  }, [id, isEditMode])

  const validateForm = () => {
    const newErrors = {}
    const blocoRegex = /^[A-Z]\d$/

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório"
    } else if (formData.nome.length < 3 || formData.nome.length > 40) {
      newErrors.nome = "Nome deve ter no minimo 3 caracteres e no maximo 20 caracteres"
    }

    if (!formData.bloco.trim()) {
      newErrors.bloco = "Bloco é obrigatório"
    }else if (!blocoRegex.test(formData.bloco)){
      newErrors.bloco = "Formato inválido. Use o formato letra-numero (ex: B2)"
    }

    if (!formData.tipoLaboratorio) {
      newErrors.tipoLaboratorio = "Tipo de laboratório é obrigatório"
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = "Descrição é obrigatória"
    } else if (formData.descricao.length < 10) {
      newErrors.descricao = "Descrição deve ter pelo menos 10 caracteres"
    }

    if (formData.capacidade <= 0) {
      newErrors.capacidade = "Capacidade deve ser maior que zero"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "capacidade") {
      setFormData({ ...formData, [name]: Number.parseInt(value) || 0})
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleRadioChange = (e) => {
    setFormData({ ...formData, ativo: e.target.value === "true" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErroAPI(null)

    if (!validateForm()) {
      return
    }

    try {
      setEnviando(true)
      if (isEditMode) {
        await updateLaboratorio(Number(id), formData)
      } else {
        await createLaboratorio(formData)
      }
      setEnviando(false)
      navigate("/laboratorios")
    } catch (err) {
      console.error("Erro ao salvar laboratório:", err)
      setErroAPI(
        isEditMode
          ? "Erro ao atualizar o laboratório."
          : "Erro ao criar o laboratório.",
      )
      setEnviando(false)
    }
  }

  return (
    <div>
      <h1 className="page-title">{isEditMode ? "Editar Laboratório" : "Cadastro de Laboratório"}</h1>

      {erroAPI && <div className="error-message">{erroAPI}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="form-control"
            placeholder="nome do laboratório"
          />
          {errors.nome && <div className="error-message">{errors.nome}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="bloco" className="form-label">Bloco</label>
          <input
            type="text"
            id="bloco"
            name="bloco"
            value={formData.bloco}
            onChange={handleChange}
            className="form-control"
            placeholder="A1; B2; B5"
          />
          {errors.bloco && <div className="error-message">{errors.bloco}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="tipoLaboratorio" className="form-label">Tipo de Laboratório</label>
          <select
            id="tipoLaboratorio"
            name="tipoLaboratorio"
            value={formData.tipoLaboratorio}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Selecione um tipo</option>
            <option value="QUIMICA">Química</option>
            <option value="FISICA">Física</option>
            <option value="BIOLOGIA">Biologia</option>
            <option value="INFORMATICA">Informática</option>
            <option value="MATEMÁTICA">Matemática</option>
            <option value="LETRAS">LEtras</option>
          </select>
          {errors.tipoLaboratorio && <div className="error-message">{errors.tipoLaboratorio}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="descricao" className="form-label">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="form-textarea"
            rows={4}
            placeholder="Breve descrição das atividades realizadas"
          />
          {errors.descricao && <div className="error-message">{errors.descricao}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="capacidade" className="form-label">Capacidade</label>
          <input
            type="number"
            id="capacidade"
            name="capacidade"
            value={formData.capacidade}
            onChange={handleChange}
            className="form-control"
            min="1"
          />
          {errors.capacidade && <div className="error-message">{errors.capacidade}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <div className="form-radio-group">
            <div className="form-radio-item">
              <input
                type="radio"
                id="ativo-sim"
                name="ativo"
                value="true"
                checked={formData.ativo === true}
                onChange={handleRadioChange}
              />
              <label htmlFor="ativo-sim">Ativo</label>
            </div>
            <div className="form-radio-item">
              <input
                type="radio"
                id="ativo-nao"
                name="ativo"
                value="false"
                checked={formData.ativo === false}
                onChange={handleRadioChange}
              />
              <label htmlFor="ativo-nao">Inativo</label>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-success" disabled={enviando}>Salvar</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/laboratorios")}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default LaboratorioForm