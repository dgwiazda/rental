package com.dgwiazda.controller;

import com.dgwiazda.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/price")
    public Float getItemPrice(Long itemIndex) {
        return productRepository.getPrice(itemIndex);
    }

}
