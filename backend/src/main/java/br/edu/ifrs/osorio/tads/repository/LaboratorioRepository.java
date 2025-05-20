package br.edu.ifrs.osorio.tads.repository;

import br.edu.ifrs.osorio.tads.entity.Laboratorio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaboratorioRepository extends JpaRepository<Laboratorio, Long> {
}