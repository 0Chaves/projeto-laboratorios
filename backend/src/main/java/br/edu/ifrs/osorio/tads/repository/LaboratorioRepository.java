package br.edu.ifrs.osorio.tads.repository;

import br.edu.ifrs.osorio.tads.model.Laboratorio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaboratorioRepository extends JpaRepository<Laboratorio, Long> {
}