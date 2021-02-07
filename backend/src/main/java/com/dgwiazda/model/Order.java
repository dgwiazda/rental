package com.dgwiazda.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern = "YYYY-MM-dd HH:mm", shape = JsonFormat.Shape.STRING)
    private LocalDateTime rentDateFrom;

    @Column(nullable=false)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern = "YYYY-MM-dd HH:mm", shape = JsonFormat.Shape.STRING)
    private LocalDateTime rentDateTo;

    private Float price;

    @ManyToOne
    private User userId;

    @ManyToMany
    @JoinTable(name = "order_products", joinColumns = @JoinColumn(name = "order_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<Product> products;

    public Order(Long id, LocalDateTime rentDateFrom, LocalDateTime rentDateTo, Float price, User userId) {
        this.id = id;
        this.rentDateFrom = rentDateFrom;
        this.rentDateTo = rentDateTo;
        this.price = price;
        this.userId = userId;
    }

    public Order() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getRentDateFrom() {
        return rentDateFrom;
    }

    public void setRentDateFrom(LocalDateTime rentDateFrom) {
        this.rentDateFrom = rentDateFrom;
    }

    public LocalDateTime getRentDateTo() {
        return rentDateTo;
    }

    public void setRentDateTo(LocalDateTime rentDateTo) {
        this.rentDateTo = rentDateTo;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}
