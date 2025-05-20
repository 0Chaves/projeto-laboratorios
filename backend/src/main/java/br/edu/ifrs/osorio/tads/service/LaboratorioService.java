package br.edu.ifrs.osorio.tads.service;

import br.edu.ifrs.osorio.tads.dto.LaboratorioDTO;
import br.edu.ifrs.osorio.tads.entity.Laboratorio;
import br.edu.ifrs.osorio.tads.repository.LaboratorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LaboratorioService {

    @Autowired
    private LaboratorioRepository laboratorioRepository;

    // Listar todos os laboratórios
    public List<LaboratorioDTO> listarTodos() {
        return laboratorioRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Buscar por ID
    public Optional<LaboratorioDTO> buscarPorId(Long id) {
        return laboratorioRepository.findById(id)
                .map(this::convertToDTO);
    }

    // Salvar um laboratório
    public LaboratorioDTO salvar(LaboratorioDTO dto) {
        Laboratorio laboratorio = convertToEntity(dto);
        Laboratorio salvo = laboratorioRepository.save(laboratorio);
        return convertToDTO(salvo);
    }

    // Atualizar um laboratório
    public Optional<LaboratorioDTO> atualizar(Long id, LaboratorioDTO dto) {
        return laboratorioRepository.findById(id)
                .map(lab -> {
                    lab.setNome(dto.getNome());
                    lab.setBloco(dto.getBloco());
                    lab.setTipoLaboratorio(dto.getTipoLaboratorio());
                    lab.setDescricao(dto.getDescricao());
                    lab.setCapacidade(dto.getCapacidade());
                    lab.setAtivo(dto.isAtivo());
                    return laboratorioRepository.save(lab);
                })
                .map(this::convertToDTO);
    }

    // Excluir por ID
    public boolean excluir(Long id) {
        if (laboratorioRepository.existsById(id)) {
            laboratorioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Métodos de conversão
    private LaboratorioDTO convertToDTO(Laboratorio lab) {
        LaboratorioDTO dto = new LaboratorioDTO();
        dto.setId(lab.getId());
        dto.setNome(lab.getNome());
        dto.setBloco(lab.getBloco());
        dto.setTipoLaboratorio(lab.getTipoLaboratorio());
        dto.setDescricao(lab.getDescricao());
        dto.setCapacidade(lab.getCapacidade());
        dto.setAtivo(lab.isAtivo());
        return dto;
    }

    private Laboratorio convertToEntity(LaboratorioDTO dto) {
        Laboratorio lab = new Laboratorio();
        lab.setId(dto.getId());
        lab.setNome(dto.getNome());
        lab.setBloco(dto.getBloco());
        lab.setTipoLaboratorio(dto.getTipoLaboratorio());
        lab.setDescricao(dto.getDescricao());
        lab.setCapacidade(dto.getCapacidade());
        lab.setAtivo(dto.isAtivo());
        return lab;
    }
}