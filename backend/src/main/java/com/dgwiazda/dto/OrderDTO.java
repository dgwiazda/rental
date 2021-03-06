package com.dgwiazda.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class OrderDTO {

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss:SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime rentDateFrom;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss:SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime rentDateTo;

    private Float price;

    private String user;

    private Long productId;

    private Long quantity;

    private String productName;

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

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}

