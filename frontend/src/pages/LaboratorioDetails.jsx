"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getLaboratorioById, deleteLaboratorio } from "../services/laboratorioService"

const LaboratorioDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [laboratorio, setLaboratorio] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLaboratorio = async () => {
      try {
        const data = await getLaboratorioById(Number(id))
        setLaboratorio(data)
      } catch (err) {
        console.error("Erro ao carregar detalhes do laboratório:", err)
        setError("Não foi possível carregar os detalhes do laboratório.")
      }
    }

    fetchLaboratorio()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este laboratório?")) {
      try {
        await deleteLaboratorio(Number(id))
        navigate("/laboratorios")
      } catch (err) {
        console.error("Erro ao excluir laboratório:", err)
        setError("Não foi possível excluir o laboratório.")
      }
    }
  }

  if (error) return (
    <div className="error-message">{error}</div>
  )
  
  if (!laboratorio) return (
    <div>Laboratório não encontrado</div>
  )

  return (
    <div>
      <h1 className="page-title">Detalhes do Laboratório</h1>

      <div className="detail-container">
        <div className="detail-group">
          <div className="detail-label">ID</div>
          <div>{laboratorio.id}</div>
        </div>

        <div className="detail-group">
          <div className="detail-label">Nome</div>
          <div>{laboratorio.nome}</div>
        </div>

        <div className="detail-group">
          <div className="detail-label">Bloco</div>
          <div>{laboratorio.bloco}</div>
        </div>

        <div className="detail-group">
          <div className="detail-label">Tipo de Laboratório</div>
          <div>{laboratorio.tipoLaboratorio}</div>
        </div>

        <div className="detail-group">
          <div className="detail-label">Descrição</div>
          <div>{laboratorio.descricao}</div>
        </div>

        <div className="detail-group">
          <div className="detail-label">Capacidade</div>
          <div>{laboratorio.capacidade}</div>
        </div>

        <div className="detail-group">
          <div className="detail-label">Status</div>
          <div>{laboratorio.ativo ? "Ativo" : "Inativo"}</div>
        </div>

        <div className="button-group">
          <button className="btn btn-warning" onClick={() => navigate(`/laboratorios/editar/${laboratorio.id}`)}>Editar</button>
          <button className="btn btn-danger" onClick={handleDelete}>Excluir</button>
          <button className="btn btn-secondary" onClick={() => navigate("/laboratorios")}>Voltar</button>
        </div>
      </div>
    </div>
  )
}

export default LaboratorioDetails