package br.edu.ifrs.osorio.tads.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class LaboratorioDTO {

    private Long id;

    @NotBlank(message = "O nome não pode ser vazio")
    @Size(min = 3, max = 20, message = "O nome deve ter entre 3 e 20 caracteres")
    private String nome;

    @NotBlank(message = "O bloco é um campo obrigatório")
    @Pattern(regexp = "^[A-Z]\\d$", message = "O bloco deve ter apenas 1 letras maiúscula e 1 número (ex: B2)")
    private String bloco;

    @NotBlank(message = "O tipoLaboratorio é obrigatório")
    private String tipoLaboratorio;

    @NotBlank(message = "A descrição não pode ser vazia")
    private String descricao;

    @Min(value = 1, message = "A capacidade deve ser no mínimo 1")
    private int capacidade;

    private boolean ativo;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getBloco() {
        return bloco;
    }

    public void setBloco(String bloco) {
        this.bloco = bloco;
    }

    public String getTipoLaboratorio() {
        return tipoLaboratorio;
    }

    public void setTipoLaboratorio(String tipoLaboratorio) {
        this.tipoLaboratorio = tipoLaboratorio;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public int getCapacidade() {
        return capacidade;
    }

    public void setCapacidade(int capacidade) {
        this.capacidade = capacidade;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
}