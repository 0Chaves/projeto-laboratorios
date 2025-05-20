"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getLaboratorios, deleteLaboratorio } from "../services/laboratorioService"

const LaboratoriosList = () => {
  const [laboratorios, setLaboratorios] = useState([])
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLaboratorios = async () => {
      try {
        const data = await getLaboratorios()
        setLaboratorios(data)
      } catch (err) {
        console.error("Erro ao carregar laboratórios:", err)
        setError("Não foi possível carregar a lista de laboratórios.")
      }
    }

    fetchLaboratorios()
  }, [])

  const handleDelete = async (id) => {
    if (!id) return

    if (window.confirm("Tem certeza que deseja excluir este laboratório?")) {
      try {
        await deleteLaboratorio(id)
        setLaboratorios(laboratorios.filter((lab) => lab.id !== id))
      } catch (err) {
        console.error("Erro ao excluir laboratório:", err)
        setError("Não foi possível excluir o laboratório.")
      }
    }
  }

  if (error) return (
    <div className="error-message">{error}</div>
  )

  return (
    <div>
      <h1 className="page-title">Laboratórios</h1>
      <Link to="/laboratorios/novo" className="btn btn-primary">Novo Laboratório</Link>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Bloco</th>
              <th>Tipo</th>
              <th>Capacidade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {laboratorios.length > 0 ? (
              laboratorios.map((lab) => (
                <tr key={lab.id}>
                  <td>{lab.id}</td>
                  <td>{lab.nome}</td>
                  <td>{lab.bloco}</td>
                  <td>{lab.tipoLaboratorio}</td>
                  <td>{lab.capacidade}</td>
                  <td>{lab.ativo ? "Ativo" : "Inativo"}</td>
                  <td className="actions-cell">
                    <button className="btn btn-info" onClick={() => navigate(`/laboratorios/${lab.id}`)}>Ver</button>
                    <button className="btn btn-warning" onClick={() => navigate(`/laboratorios/editar/${lab.id}`)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(lab.id)}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Nenhum laboratório encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LaboratoriosList