package com.dgwiazda.model;

import javax.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Float price;
    private Boolean availiable;

    @Column(name = "item_description")
    private String description;

    @ManyToOne
    private Category category;

    public Product(Long id, Float price, Boolean availiable, String description, Category category) {
        this.id = id;
        this.price = price;
        this.availiable = availiable;
        this.description = description;
        this.category = category;
    }

    public Product() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long productId) {
        this.id = productId;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float prize) {
        this.price = prize;
    }

    public boolean isAvailiable() {
        return availiable;
    }

    public void setAvailiable(boolean availiable) {
        this.availiable = availiable;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
