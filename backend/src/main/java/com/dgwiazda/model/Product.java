package com.dgwiazda.model;

import com.dgwiazda.enums.EProductType;

import javax.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Float price;
    private Boolean availiable;
    private EProductType productType;

    @Column(name = "item_description")
    private String description;

    @ManyToOne
    private Category category;


    public Product(Long id, Float price, Boolean availiable, String description, EProductType productType, Category category) {
        this.id = id;
        this.price = price;
        this.availiable = availiable;
        this.description = description;
        this.productType = productType;
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

    public EProductType getProductType() {
        return productType;
    }

    public void setProductType(EProductType productType) {
        this.productType = productType;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
