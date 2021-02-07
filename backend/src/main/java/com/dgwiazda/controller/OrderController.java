package com.dgwiazda.controller;

import com.dgwiazda.dto.AddOrderDTO;
import com.dgwiazda.dto.UserOrdersDTO;
import com.dgwiazda.model.Order;
import com.dgwiazda.payload.response.MessageResponse;
import com.dgwiazda.repository.OrderRepository;
import com.dgwiazda.repository.ProductRepository;
import com.dgwiazda.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addOrder(@RequestBody AddOrderDTO orderDTO) {
        Order order = new Order();
        order.setRentDateFrom(orderDTO.getRentDateFrom());
        order.setRentDateTo(orderDTO.getRentDateTo());
        order.setPrice(orderDTO.getPrice());
        order.setUserId(userRepository.findById(orderDTO.getUserId()).get());

        Set productsOrder1 = new HashSet();
        long quantity = orderDTO.getQuantity();
        long productId = orderDTO.getProductId();
        for (int i = 0; i < quantity; i++) {
            productsOrder1.add(productRepository.getOne(productId + i));
        }
        order.setProducts(productsOrder1);

        orderRepository.save(order);

        return ResponseEntity.ok(new MessageResponse("Rezerwacja dokonana."));
    }

    @GetMapping("/bieznia/unavailiable")
    public List<Long> getProductIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(productRepository.getUnavailiableBiezniaId());
        return products;
    }

    @GetMapping("/bieznia/options-to-disable")
    public Set<Long> getProductIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = productRepository.getBiezniaIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = productRepository.getBiezniaIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = productRepository.getBiezniaIdToDisableInside(rentDateFrom, rentDateTo);
        if(list1 != null) {
            list.addAll(list1);
        };
        if(list2 != null) {
            list.addAll(list2);
        };
        if(list3 != null) {
            list.addAll(list3);
        };
        System.out.println(list1);
        System.out.println(list2);
        System.out.println(list3);
        System.out.println(list);
        Set<Long> products = new HashSet<>(list);
        System.out.println(products);
        return products;
    }

}
