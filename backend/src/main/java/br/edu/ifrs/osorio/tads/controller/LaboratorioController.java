package br.edu.ifrs.osorio.tads.controller;

import br.edu.ifrs.osorio.tads.dto.LaboratorioDTO;
import br.edu.ifrs.osorio.tads.service.LaboratorioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/laboratorios")
public class LaboratorioController {

    @Autowired
    private LaboratorioService laboratorioService;

    // Exibir lista de laboratorios
    @GetMapping
    public ResponseEntity<List<LaboratorioDTO>> listarLaboratorios() {
        List<LaboratorioDTO> laboratorios = laboratorioService.listarTodos();
        return ResponseEntity.ok(laboratorios);
    }

    // Exibir detalhes de um laboratório pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<LaboratorioDTO> buscarLaboratorioPorId(@PathVariable Long id) {
        return laboratorioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar um novo laboratório
    @PostMapping
    public ResponseEntity<LaboratorioDTO> criarLaboratorio(@RequestBody @Valid LaboratorioDTO laboratorioDTO) {
        LaboratorioDTO criado = laboratorioService.salvar(laboratorioDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    // Atualizar um laboratório existente
    @PutMapping("/{id}")
    public ResponseEntity<LaboratorioDTO> atualizarLaboratorio(@PathVariable Long id,
                                                               @RequestBody @Valid LaboratorioDTO laboratorioDTO) {
        return laboratorioService.atualizar(id, laboratorioDTO)
                .map(atualizado -> ResponseEntity.ok(atualizado))
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar um laboratório pelo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirLaboratorio(@PathVariable Long id) {
        if (laboratorioService.excluir(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}





