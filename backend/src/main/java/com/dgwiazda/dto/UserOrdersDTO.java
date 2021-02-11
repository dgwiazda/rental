package com.dgwiazda.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class UserOrdersDTO {
    private Long id;
    private Long userOrderId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss:SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime rentDateFrom;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss:SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime rentDateTo;

    private Float price;

    private String product;

    private Long quantity;

    public Long getUserOrderId() {
        return userOrderId;
    }

    public void setUserOrderId(Long userOrderId) {
        this.userOrderId = userOrderId;
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

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
}
