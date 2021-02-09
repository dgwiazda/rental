package com.dgwiazda.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

public class AddOrderDTO {

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss:SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime rentDateFrom;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss:SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime rentDateTo;

    private Float price;

    private Long userId;

    private Long productId;

    private Long quantity;

    private Long productsCount;

    public Long getProductsCount() {
        return productsCount;
    }

    public void setProductsCount(Long productsCount) {
        this.productsCount = productsCount;
    }

    private List<Long> disabledProducts;

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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public List<Long> getDisabledProducts() {
        return disabledProducts;
    }

    public void setDisabledProducts(List<Long> disabledProducts) {
        this.disabledProducts = disabledProducts;
    }
}

