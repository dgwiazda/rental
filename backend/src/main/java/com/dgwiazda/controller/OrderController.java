package com.dgwiazda.controller;

import com.dgwiazda.dto.OrderDTO;
import com.dgwiazda.model.Order;
import com.dgwiazda.payload.response.MessageResponse;
import com.dgwiazda.repository.OrderRepository;
import com.dgwiazda.repository.ProductRepository;
import com.dgwiazda.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
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
    public ResponseEntity<?> addOrder(@RequestBody OrderDTO orderDTO){
        Order order = new Order();
        order.setRentDateFrom(orderDTO.getRentDateFrom());
        order.setRentDateTo(orderDTO.getRentDateTo());
        order.setPrice(orderDTO.getPrice());
        order.setUserId(userRepository.getOne(orderDTO.getUserId()));

        Set productsOrder1 = new HashSet();
        long quantity = orderDTO.getQuantity();
        long productId = orderDTO.getProductId();
        for (int i = 0; i < quantity; i++ ) {
            productsOrder1.add(productRepository.getOne(productId + i));
        }
        order.setProducts(productsOrder1);

        orderRepository.save(order);

        return ResponseEntity.ok(new MessageResponse("Rezerwacja dokonana."));
    }

    @DeleteMapping("/cancel")
    public ResponseEntity<?> deleteOrder(Long index) {
        orderRepository.deleteById(index);
        return ResponseEntity.ok(new MessageResponse("Rezerwacja odwołana."));
    }

}
