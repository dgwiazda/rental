package com.dgwiazda.dto;

import com.dgwiazda.model.Category;

import javax.persistence.*;

public class ProductDTO {

    private Long id;
    private Float price;
    private Boolean availiable;
    private String description;
    private String category;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Boolean getAvailiable() {
        return availiable;
    }

    public void setAvailiable(Boolean availiable) {
        this.availiable = availiable;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
